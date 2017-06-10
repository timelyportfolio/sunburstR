# calendar sunburst example

library(sunburstR)

df <- data.frame(
  date = seq.Date(
    as.Date('2014-01-01'),
    as.Date('2016-12-31'),
    by = "days"
  ),
  stringsAsFactors = FALSE
)

df$year = format(df$date, "%Y")
df$quarter = paste0("Q", ceiling(as.numeric(format(df$date,"%m"))/3))
df$month = format(df$date, "%b")
df$path = paste(df$year, df$quarter, df$month, sep="-")
df$count = rep(1, nrow(df))

sunburst(
  data.frame(xtabs(count~path,df)),
  # added a degree of difficulty by providing
  #  not easily sortable names
  sortFunction = htmlwidgets::JS(
"
function(a,b){
  abb = {
    2014:-7,
    2015:-6,
    2016:-5,
    Q1:-4,
    Q2:-3,
    Q3:-2,
    Q4:-1,
    Jan:1,
    Feb:2,
    Mar:3,
    Apr:4,
    May:5,
    Jun:6,
    Jul:7,
    Aug:8,
    Sep:9,
    Oct:10,
    Nov:11,
    Dec:12
  }
  return abb[a.data.name] - abb[b.data.name];
}
"
  )
)
