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
}
