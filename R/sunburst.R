#' `d3.js` Sequence Sunburst Diagrams
#'
#' \href{https://gist.github.com/kerryrodden/7090426}{Sequences sunburst} diagrams provide
#'    an interactive method of exploring sequence data, such as website navigation paths.
#'
#' @param data data in csv source,target form or in
#'          nested d3 JSON hierarchy with `{name:...,  children:[];}`.  \code{csvdata}
#'          and \code{jsondata} arguments are now deprecated in favor of this single
#'          \code{data} argument.  \code{list}, \code{character},
#'          or \code{connection} data will be assumed to be \code{JSON}.
#'          \code{data.frame} data will be assumed to be \code{csvdata} and converted
#'          to \code{JSON} by \code{sunburstR:::csv_to_hier()}.
#' @param legendOrder string vector if you would like to manually order the legend.
#'          If legendOrder is not provided, then the legend will be in the descending
#'          order of the top level hierarchy.
#' @param colors \code{vector} of strings representing colors as hexadecimal for
#'          manual colors.  If you want precise control of colors, supply a \code{list}
#'          with \code{range} and/or \code{domain}. For advanced customization, supply
#'          a JavaScript \code{function}.
#' @param valueField \code{character} for the field to use to calculate size.  The default
#'          value is \code{"size"}.
#' @param percent \code{logical} to include percentage of total in the explanation.
#' @param count \code{logical} to include count and total in the explanation.
#' @param explanation JavaScript function to define a custom explanation for the center
#'          of the sunburst.  Note, this will override \code{percent} and \code{count}.
#' @param breadcrumb \code{list} to customize the breadcrumb trail.  This argument
#'          should be in the form \code{list(w =, h =, s =, t = )} where
#'          \code{w} is the width, \code{h} is the height, \code{s} is the spacing,
#'          and \code{t} is the tail all in \code{px}. \code{w} is \code{0} by default for
#'          breadcrumbs widths based on text length.
#' @param legend \code{list} to customize the legend or \code{logical} to disable the legend.  The \code{list} argument
#'          should be in the form \code{list(w =, h =, r =, s = )} where
#'          \code{w} is the width, \code{h} is the height, \code{s} is the spacing,
#'          and \code{r} is the radius all in \code{px}.
#' @param sortFunction \code{\link[htmlwidgets]{JS}} function to sort the slices.
#'          The default sort is by size.
#' @param withD3 \code{logical} to include d3 dependency from \code{d3r}.  As of
#'          version 1.0, sunburst uses a standalone JavaScript build and will
#'          not include the entire d3 in the global/window namespace.  To include
#'          d3.js in this way, use \code{withD3=TRUE}.
#' @param height,width  height and width of sunburst htmlwidget containing div
#'          specified in any valid \code{CSS} size unit.
#' @param elementId string id as a valid \code{CSS} element id.
#' @param sizingPolicy see \code{\link[htmlwidgets]{sizingPolicy}}.
#' @param csvdata \code{deprecated} use data argument instead; data in csv source,target form
#' @param jsondata \code{deprecated} use data argument instead; data in nested d3 JSON hierarchy with `{name:...,  children:[];}`
#'
#' @example inst/examples/example_replicate.R
#' @example inst/examples/example_ngram.R
#' @example inst/examples/example_treemap.R
#' @example inst/examples/example_calendar.R
#' @example inst/examples/example_sort.R
#'
#' @import htmlwidgets
#'
#' @export
sunburst <- function(
  data = NULL
  , legendOrder = NULL
  , colors = NULL
  , valueField = "size"
  , percent = TRUE
  , count =  FALSE
  , explanation = NULL
  , breadcrumb = list()
  , legend = list()
  , sortFunction = NULL
  , withD3 = FALSE
  , width = NULL
  , height = NULL
  , elementId = NULL
  , sizingPolicy = NULL
  , csvdata = NULL
  , jsondata = NULL
) {

  if(is.null(data) && is.null(csvdata) && is.null(jsondata)) stop("please provide data",call.=FALSE)
  if(!is.null(csvdata) || !is.null(jsondata)) {
    warning("The csvdata and jsondata arguments have been deprecated in favor of a single data argument", call.=FALSE)
  }
  if(is.null(data) && !is.null(csvdata)) data <- csvdata
  if(is.null(data) && !is.null(jsondata)) data <- jsondata

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

  if(!is.null(explanation) && !inherits(explanation,"JS_EVAL")){
    explanation = htmlwidgets::JS(explanation)
  }

  # forward options using x
  x = list(
    data = data
    ,options = list(
      legendOrder = legendOrder
      ,colors = colors
      ,valueField = valueField
      ,percent = percent
      ,count = count
      ,explanation = explanation
      ,breadcrumb = breadcrumb
      ,legend = legend
      ,sortFunction = sortFunction
    )
  )

  if(is.null(sizingPolicy)){
    sizingPolicy <- htmlwidgets::sizingPolicy(browser.fill=TRUE)
  }

  # include d3 if withD3 is TRUE
  dep <- NULL
  if(withD3 == TRUE) {
    dep <- d3r::d3_dep_v4()
  }

  # create widget
  htmlwidgets::createWidget(
    name = 'sunburst',
    x,
    width = width,
    height = height,
    package = 'sunburstR',
    elementId = elementId,
    sizingPolicy = sizingPolicy,
    dependencies = dep
  )
}

#' Shiny bindings for sunburst
#'
#' Output and render functions for using sunburst within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a sunburst
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name sunburst-shiny
#'
#' @export
sunburstOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'sunburst', width, height, package = 'sunburstR')
}

#' @rdname sunburst-shiny
#' @export
renderSunburst <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, sunburstOutput, env, quoted = TRUE)
}


#' @import htmltools
#' @keywords internal
sunburst_html <- function(id, style, class, ...){
  tagList(
    tags$div( id = id, class = class, style = style, style="position:relative;"
      ,tags$div(
        tags$div(class = "sunburst-main"
          , tags$div( class = "sunburst-sequence" )
          , tags$div( class = "sunburst-chart"
              ,tags$div( class = "sunburst-explanation", style = "visibility:hidden;"
         #       ,tags$span( class = "sunburst-percentage")
              )
          )
        )
        ,tags$div(class = "sunburst-sidebar"
          , tags$input( type = "checkbox", class = "sunburst-togglelegend", "Legend" )
          , tags$div( class = "sunburst-legend", style = "visibility:hidden;" )
        )
      )
    )
  )
}
