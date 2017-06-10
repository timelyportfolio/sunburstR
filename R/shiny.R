#' Add Shiny Events
#'
#' @param sunburst \code{sunburst} htmlwidget to which you would
#'         like to add event handling
#'
#' @return \code{sunburst} htmlwidget
#' @export
#' @example ./inst/examples/example_shiny.R
add_shiny <- function(sunburst = NULL){
  stopifnot(!is.null(sunburst),inherits(sunburst,"sunburst"))

  if(is.null(sunburst$x$tasks)) sunburst$x$tasks <- list()
  sunburst$x$tasks[length(sunburst$x$tasks)+1] <- list(htmlwidgets::JS(
'
function(){
  var chart = this.instance.chart;
  var el = this.el;
  if(!(typeof(Shiny)==="undefined")){
    chart.on("mouseover.shiny", function(){
      Shiny.onInputChange(el.id + "_mouseover",this)
    });
    chart.on("mouseleave.shiny", function(){
      Shiny.onInputChange(el.id + "_mouseleave",this)
    });
    chart.on("click.shiny", function(){
      Shiny.onInputChange(el.id + "_click",this)
    });
  }
}
'
  ))
  return(sunburst)
}
