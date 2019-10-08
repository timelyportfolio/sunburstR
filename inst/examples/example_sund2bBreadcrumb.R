if(interactive()){

library(sunburstR)

# use a sample of the sequences csv data
sequences <- read.csv(
  system.file("examples/visit-sequences.csv",package="sunburstR")
  ,header = FALSE
  ,stringsAsFactors = FALSE
)[1:200,]

# disable the breadcrumb
sund2b(
  sequences,
  breadcrumbs = sund2bBreadcrumb(
    enabled = FALSE
  )
)

# change the breadcrumb content
sund2b(
  sequences,
  breadcrumbs = sund2bBreadcrumb(
    html = htmlwidgets::JS("
function(nodedata, size, percent) {
  return '<span style=\"font-weight: bold;\">' + nodedata.name + '</span>' + ' ' + size
}
    ")
  )
)


}
