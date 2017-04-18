#### necessary packages ####
#devtools::install_github("cpsievert/XML2R")
#devtools::install_github("cpsievert/pitchRx")
#devtools::install_github("timelyportfolio/sunburstR")
#install.packages("dplyr")
#install.packages("tidyr")
#install.packages("stringr")
#install.packages("rvest")

#### library ####
library(sunburstR)
library(pitchRx)
library(dplyr)

#### data ####
# get all data from 2016-08-25
dat <- scrape(start = "2016-08-25", end = "2016-08-25")

# use runner data to get idea of action with a runner on base
#  please note this will not be all action from a game
#  but I think it is an easier dataset to understand
action <- dat$runner %>%
  group_by(event_num) %>%
  filter(row_number() == 1) %>%
  ungroup() %>%
  group_by(gameday_link, inning, inning_side) %>%
  summarize(event = paste(c(event),collapse="-"))

sequences <- action %>%
  ungroup() %>%
  group_by(event) %>%
  summarize(count = n())

# sorry this is messy, but get data in a form
#  so sunburst can build hierarchy
#  which means we will sort in descending order of depth
# note: this will eventually improve
sequences$depth <- unlist(lapply(strsplit(sequences$event,"-"),length))

#### sunburst ####
sb <- sequences %>%
  arrange(desc(depth), event) %>%
  sunburst(elementId = "sunburstgame") %>%
  add_shiny()

#### shiny ####
library(shiny)
ui <- tagList(
  # can just use sunburst sb without shiny functions
  #  if not expecting sunburst to be dynamic
  sb,
  textOutput("sbpath"),
  verbatimTextOutput("games")
)

server <- function(input, output, session) {
  output$sbpath <- renderText({
    input$sunburstgame_click
  })

  output$games <- renderText({
    path <- paste0(input$sunburstgame_click, collapse="-")
    action %>%
      ungroup() %>%
      filter(event == path) %>%
      select(gameday_link) %>%
      unlist() %>%
      paste0(collapse="\n")
  })
}

shinyApp(ui, server)
