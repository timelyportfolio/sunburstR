\dontrun{

# The sund2b() API mirrors sunburst() with fewer arguments.

library(sunburstR)

# use a sample of the sequences csv data
sequences <- read.csv(
  system.file("examples/visit-sequences.csv",package="sunburstR")
  ,header = FALSE
  ,stringsAsFactors = FALSE
)[1:200,]

# create a d2b sunburst
sund2b(sequences)

# change the colors
#   using d3.js categorical color scheme
sund2b(
  sequences,
  colors = htmlwidgets::JS("d3.scaleOrdinal(d3.schemeCategory20b)")
)
#  using RColorBrewer palette
sund2b(
  sequences,
  colors = list(range = RColorBrewer::brewer.pal(9, "Set3"))
)


# use sund2b in Shiny
library(shiny)
ui <- sund2bOutput("sun")
server <- function(input, output, session) {
  output$sun <- renderSund2b({
    sund2b(sequences)
  })
}
shinyApp(ui, server)

}
