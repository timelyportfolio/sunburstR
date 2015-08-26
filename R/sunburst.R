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
#' @param percent \code{logical} to include percentage of total in the explanation.
#' @param count \code{logical} to include count and total in the explanation.
#'
#' @import htmlwidgets
#'
#' @export
sunburst <- function(
  csvdata = NULL
  , jsondata = NULL
  , legendOrder = NULL
  , percent = TRUE
  , count =  FALSE
  , width = NULL
  , height = NULL
) {

  if(is.null(csvdata) && is.null(jsondata)) stop("please provide either csvdata or jsondata",call.=FALSE)
  if(!is.null(csvdata) && !is.null(jsondata)) warning("both csv and json provided; will use csvdata",call.=FALSE)

  # forward options using x
  x = list(
    csvdata = csvdata
    ,jsondata = jsondata
    ,options = list(
      legendOrder = legendOrder
      ,percent = percent
      ,count = count
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
    tags$div( id = id, class = class, style = style
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
