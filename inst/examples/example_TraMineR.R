library(TraMineR)
library(sunburstR)
library(pipeR)

# use example from TraMineR vignette
data("mvad")
mvad.alphab <- c(
  "employment", "FE", "HE", "joblessness",
  "school", "training"
)
mvad.seq <- seqdef(mvad, 17:86, xtstep = 6, alphabet = mvad.alphab)

# to make this work, we'll compress the sequences with seqdss
#   could also aggregate with dply later
seqtab( seqdss(mvad.seq), tlim = 0, format = "SPS" ) %>>%
  attr("freq") %>>%
  (
    data.frame(
      # appending "-end" is necessary for this to work
      sequence = paste0(
        gsub(
          x = names(.$Freq)
          , pattern = "(/[0-9]*)"
          , replacement = ""
          , perl = T
        )
        ,"-end"
      )
      ,freq = as.numeric(.$Freq)
      ,stringsAsFactors = FALSE
    )
  ) %>>%
  sunburst
