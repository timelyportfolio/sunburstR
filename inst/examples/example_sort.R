# sorting example: place data in order of occurence

library(sunburstR)

df <- data.frame(
  group = c("foo", "bar", "xyz"),
  value = c(1, 3, 2)
)

sunburst(df,
         # create a trivial sort function
         sortFunction = htmlwidgets::JS('function(x) {return x;}'))

new_order <- c(3,2,1)
sunburst(df[new_order,],
         sortFunction = htmlwidgets::JS('function(x) {return x;}'))

