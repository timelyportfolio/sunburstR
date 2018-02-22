#' Sunburst Using 'd2b'
#'
#' Create interactive sunburst chart with the 'd2b' charting library.
#'
#' @param data data in csv source,target form or in
#'          nested d3 JSON hierarchy with `{name:...,  children:[];}`.  \code{list}, \code{character},
#'          or \code{connection} data will be assumed to be \code{JSON}.
#'          \code{data.frame} data will be assumed to be \code{csvdata} and converted
#'          to \code{JSON} by \code{sunburstR:::csv_to_hier()}.
#' @param colors \code{vector} of strings representing colors as hexadecimal for
#'          manual colors.  If you want precise control of colors, supply a \code{list}
#'          with \code{range} and/or \code{domain}. For advanced customization, supply
#'          a JavaScript \code{function}.
#' @param valueField \code{character} for the field to use to calculate size.  The default
#'          value is \code{"size"}.
#'
#' @example inst/examples/example_sund2b.R
#'
#' @import htmlwidgets
#'
#' @export
sund2b <- function(
  data = NULL,
  colors = NULL,
  valueField = "size",
  width = NULL, height = NULL, elementId = NULL
) {


  if(is.null(data)) stop("please provide data",call.=FALSE)

  # accept JSON string as data
  if( inherits(data,c("character","connection")) ){
    data = jsonlite::toJSON(
      jsonlite::fromJSON( data )
      , auto_unbox = TRUE
      , dataframe = "rows"
    )
  }
  # accept list as data
  if( inherits(data, "list") )  {
    data = jsonlite::toJSON(
      data
      , auto_unbox = TRUE
      , dataframe = "rows"
    )
  }
  # accept data.frame as data
  #  and convert to JSON with csv_to_hier
  #  this conversion should be more robust than
  #  the JavaScript converter
  if( inherits(data, "data.frame") )  {
    data = csv_to_hier(data)
  }

  # forward options using x
  x = list(
    data = data,
    options = list(
      colors = colors,
      valueField = valueField
    )
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'sund2b',
    x,
    width = width,
    height = height,
    package = 'sunburstR',
    elementId = elementId,
    dependencies = list(
      d3r::d3_dep_v4(),
      d2b_dep()
    )
  )
}

#' Shiny bindings for d2b
#'
#' Output and render functions for using d2b within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a d2b
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name d2b-shiny
#'
#' @export
sund2bOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'sund2b', width, height, package = 'sunburstR')
}

#' @rdname d2b-shiny
#' @export
renderSund2b <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, sund2bOutput, env, quoted = TRUE)
}

#' @keywords internal
d2b_dep <- function() {
  htmltools::htmlDependency(
    name = "d2b",
    version = "0.5.1",
    src = c(
      file = system.file("htmlwidgets/lib/d2b", package="sunburstR")
    ),
    script = "d2b.js"
  )
}
