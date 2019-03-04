#' Add Shiny Events
#'
#' @param sunburst \code{sunburst} htmlwidget to which you would
#'         like to add event handling
#'
#' @return \code{sunburst} htmlwidget
#' @export
#' @example ./inst/examples/example_shiny.R
add_shiny <- function(sunburst = NULL){
  stopifnot(!is.null(sunburst),inherits(sunburst,c("sunburst","sund2b")))

  if(is.null(sunburst$x$tasks)) sunburst$x$tasks <- list()

  if(inherits(sunburst,"sunburst")) {
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
  }

  if(inherits(sunburst,"sund2b")) {
    sunburst$x$tasks[length(sunburst$x$tasks)+1] <- list(htmlwidgets::JS(
'
function(){
  var el = d3.select(this.el);
  var chart = this.instance.chart;

  function getPath(d) {
    var dat = d.datum();
    var path = [chart.label()(dat.data)];
    while(dat.parent !== null) {
    	dat = dat.parent;
    	path.push(chart.label()(dat.data));
    }
    return path.reverse();
  }

  if(!(typeof(Shiny)==="undefined")){
    el.on("mouseover.shiny", function(){
      if(d3.select(d3.event.target).classed("d2b-sunburst-arc")) {
        Shiny.onInputChange(el.attr("id") + "_mouseover", getPath(d3.select(d3.event.target)))
      }
    });
    el.on("mouseout.shiny", function(){
      if(d3.select(d3.event.target).classed("d2b-sunburst-arc")) {
        Shiny.onInputChange(el.attr("id")+ "_mouseout", getPath(d3.select(d3.event.target)))
      }
    });
    el.on("click.shiny", function(){
      if(d3.select(d3.event.target).classed("d2b-sunburst-arc")) {
        Shiny.onInputChange(el.attr("id") + "_click", getPath(d3.select(d3.event.target)))
      }
    });
  }
}
'
    ))
  }

  return(sunburst)
}
