\dontrun{

library(shiny)
library(sunburstR)

sequences <- read.csv(
  system.file("examples/visit-sequences.csv",package="sunburstR")
  ,header=F
  ,stringsAsFactors = FALSE
)


server <- function(input,output,session){

  output$sunburst <- renderSunburst({
    #invalidateLater(1000, session)

    sequences <- sequences[sample(nrow(sequences),1000),]

    add_shiny(sunburst(sequences))
  })


  selection <- reactive({
    input$sunburst_mouseover
  })

  output$selection <- renderText(selection())
}


ui<-fluidPage(
  sidebarLayout(
    sidebarPanel(

    ),

    # plot sunburst
    mainPanel(
      sunburstOutput("sunburst"),
      textOutput("selection")
    )
  )
)

shinyApp(ui = ui, server = server)

# an example with d2b sunburst and Shiny
library(shiny)
library(sunburstR)

# use a sample of the sequences csv data
sequences <- read.csv(
  system.file("examples/visit-sequences.csv",package="sunburstR")
  ,header = FALSE
  ,stringsAsFactors = FALSE
)[1:200,]

# create a d2b sunburst
s2b <- sund2b(sequences)

options(shiny.trace=TRUE)
ui <- sund2bOutput("s2b")
server <- function(input, output, session) {
  output$s2b <- renderSund2b({
    add_shiny(s2b)
  })
}
shinyApp(ui, server)
}
