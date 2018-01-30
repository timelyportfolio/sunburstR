library(sunburstR)

# read in sample visit-sequences.csv data provided in source
# only use first 100 rows to speed package build and check
#   https://gist.github.com/kerryrodden/7090426#file-visit-sequences-csv
sequences <- read.csv(
  system.file("examples/visit-sequences.csv",package="sunburstR")
  ,header = FALSE
  ,stringsAsFactors = FALSE
)[1:100,]

sunburst(sequences)

\dontrun{

# explore some of the arguments
sunburst(
  sequences
  ,count = TRUE
)

sunburst(
  sequences
  # apply sort order to the legends
  ,legendOrder = unique(unlist(strsplit(sequences[,1],"-")))
  # just provide the name in the explanation in the center
  ,explanation = "function(d){return d.data.name}"
)


# try with json data
sequence_json <- jsonlite::fromJSON(
  system.file("examples/visit-sequences.json",package="sunburstR"),
  simplifyDataFrame = FALSE
)
sunburst(sequence_json)



# try with csv data from this fork
#  https://gist.github.com/mkajava/7515402
# great use for new breadbrumb wrapping
sunburst(
  csvdata = read.csv(
    file = paste0(
      "https://gist.githubusercontent.com/mkajava/",
      "7515402/raw/9f80d28094dc9dfed7090f8fb3376ef1539f4fd2/",
      "comment-sequences.csv"
    )
    ,header = TRUE
    ,stringsAsFactors = FALSE
  )
)


# try with csv data from this fork
#  https://gist.github.com/rileycrane/92a2c36eb932b4f99e51/
sunburst( csvdata = read.csv(
  file = paste0(
    "https://gist.githubusercontent.com/rileycrane/",
    "92a2c36eb932b4f99e51/raw/",
    "a0212b4ca8043af47ec82369aa5f023530279aa3/visit-sequences.csv"
  )
  ,header=FALSE
  ,stringsAsFactors = FALSE
))
}
