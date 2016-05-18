#' htmlwidget for d3.js sequence sunburst diagrams
#'
#' \href{https://gist.github.com/kerryrodden/7090426}{Sequences sunburst} diagrams provide
#'    an interactive method of exploring sequence data, such as website navigation paths.
#'
#' @param csvdata data in csv source,target form
#' @param jsondata data in nested d3 JSON hierarchy with `{name:...,  children:[];}`
#' @param legendOrder string vector if you would like to manually order the legend.
#'          If legendOrder is not provided, then the legend will be in the descending
#'          order of the top level hierarchy.
#' @param colors \code{vector} of strings representing colors as hexadecimal for
#'          manual colors.
#' @param percent \code{logical} to include percentage of total in the explanation.
#' @param count \code{logical} to include count and total in the explanation.
#' @param explanation JavaScript function to define a custom explanation for the center
#'          of the sunburst.  Note, this will override \code{percent} and \code{count}.
#' @param breadcrumb,legend \code{list} to customize the breadcrumb trail or legend.  This argument
#'          should be in the form \code{list(w =, h =, s =, t = )} where
#'          \code{w} is the width, \code{h} is the height, \code{s} is the spacing,
#'          and \code{t} is the tail all in \code{px}. Set \code{w} to \code{0} for
#'          breadcrumbs widths based on text length.
#' @param sortFunction \code{\link[htmlwidgets]{JS}} function to sort the slices.
#'          The default sort is by size.
#'
#' @example inst/examples/example_replicate.R
#' @example inst/examples/example_ngram.R
#'
#' @import htmlwidgets
#'
#' @export
sunburst <- function(
  csvdata = NULL
  , jsondata = NULL
  , legendOrder = NULL
  , colors = NULL
  , percent = TRUE
  , count =  FALSE
  , explanation = NULL
  , breadcrumb = list()
  , legend = list()
  , sortFunction = NULL
  , width = NULL
  , height = NULL
) {

  if(is.null(csvdata) && is.null(jsondata)) stop("please provide either csvdata or jsondata",call.=FALSE)
  if(!is.null(csvdata) && !is.null(jsondata)) warning("both csv and json provided; will use csvdata",call.=FALSE)

  if(!is.null(explanation) && !inherits(explanation,"JS_EVAL")){
    explanation = htmlwidgets::JS(explanation)
  }

  # forward options using x
  x = list(
    csvdata = csvdata
    ,jsondata = jsondata
    ,options = list(
      legendOrder = legendOrder
      ,colors = colors
      ,percent = percent
      ,count = count
      ,explanation = explanation
      ,breadcrumb = breadcrumb
      ,legend = legend
      ,sortFunction = sortFunction
    )
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'sunburst',
    x,
    width = width,
    height = height,
    package = 'sunburstR'
  )
}

#' Widget output function for use in Shiny
#'
#' @export
sunburstOutput <- function(outputId, width = '100%', height = '400px'){
  shinyWidgetOutput(outputId, 'sunburst', width, height, package = 'sunburstR')
}

#' Widget render function for use in Shiny
#'
#' @export
renderSunburst <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  shinyRenderWidget(expr, sunburstOutput, env, quoted = TRUE)
}



#' custom html function for sunburst
#' @import htmltools
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
