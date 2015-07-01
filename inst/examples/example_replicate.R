# devtools::install_github("timelyportfolio/sunburstR")

library(sunburstR)

# read in sample visit-sequences.csv data provided in source
#   https://gist.github.com/kerryrodden/7090426#file-visit-sequences-csv
sequence_data <- read.csv(
  "./inst/examples/visit-sequences.csv"
  ,header=F
  ,stringsAsFactors = FALSE
)

sunburst(sequence_data)
