#' Sunburst Using 'd2b'
#'
#' Create interactive sunburst chart with the 'd2b' charting library.
#'
#' @param data data in csv source,target form or in
#'          nested d3 JSON hierarchy with `{name:...,  children:[];}`.  \code{csvdata}
#'          and \code{jsondata} arguments are now deprecated in favor of this single
#'          \code{data} argument.  \code{list}, \code{character},
#'          or \code{connection} data will be assumed to be \code{JSON}.
#'          \code{data.frame} data will be assumed to be \code{csvdata} and converted
#'          to \code{JSON} by \code{sunburstR:::csv_to_hier()}.
#'
#' @import htmlwidgets
#'
#' @export
d2bsun <- function(message, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    message = message
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'd2bsun',
    x,
    width = width,
    height = height,
    package = 'sunburstR',
    elementId = elementId,
    dependencies = list(d3r::d3_dep_v4())
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
d2bsunOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'd2b', width, height, package = 'sunburstR')
}

#' @rdname d2b-shiny
#' @export
renderD2bsun <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, d2bOutput, env, quoted = TRUE)
}
