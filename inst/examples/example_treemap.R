\dontrun{
  library(treemap)
  library(sunburstR)
  library(d3r)

  # use example from ?treemap::treemap
  data(GNI2014)
  tm <- treemap(GNI2014,
          index=c("continent", "iso3"),
          vSize="population",
          vColor="continent",
          type="index")

  tm_nest <- d3_nest(
    tm$tm[,c("continent", "iso3", "vSize", "color")],
    value_cols = c("vSize", "color")
  )

  sunburst(
    jsondata = tm_nest,
    valueField = "vSize",
    count = TRUE,
    colors = htmlwidgets::JS("function(d){return d3.select(this).datum().data.color;}")
  )
}
