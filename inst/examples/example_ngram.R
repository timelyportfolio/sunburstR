\dontrun{
#  use sunburst to analyze ngram data from Peter Norvig
#    http://norvig.com/mayzner.html

library(sunburstR)
library(pipeR)

#  read the csv data downloaded from the Google Fusion Table linked in the article
ngrams2 <- read.csv(
  system.file(
    "examples/ngrams2.csv"
    ,package="sunburstR"
  )
  , stringsAsFactors = FALSE
)

ngrams2 %>>%
  #  let's look at ngrams at the start of a word, so columns 1 and 3
  (.[,c(1,3)]) %>>%
  #  split the ngrams into a sequence by splitting each letter and adding -
  (
    data.frame(
      sequence = strsplit(.[,1],"") %>>%
        lapply( function(ng){ paste0(ng,collapse = "-") } ) %>>%
        unlist
      ,freq = .[,2]
      ,stringsAsFactors = FALSE
    )
  ) %>>%
  sunburst


library(htmltools)

ngrams2 %>>%
  (
    lapply(
      seq.int(3,ncol(.))
      ,function(letpos){
        (.[,c(1,letpos)]) %>>%
          #  split the ngrams into a sequence by splitting each letter and adding -
          (
            data.frame(
              sequence = strsplit(.[,1],"") %>>%
                lapply( function(ng){ paste0(ng,collapse = "-") } ) %>>%
                unlist
              ,freq = .[,2]
              ,stringsAsFactors = FALSE
            )
          ) %>>%
          ( tags$div(style="float:left;",sunburst( ., height = 300, width = 300 )) )
      }
    )
  ) %>>%
  tagList %>>%
  browsable
}
