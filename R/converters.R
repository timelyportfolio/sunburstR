#' @keywords internal
csv_to_hier <- function(csv) {
  df <- dplyr::bind_rows(
    lapply(
      strsplit(as.character(csv[,1]), "-"),
      function(rw) data.frame(t(rw), stringsAsFactors = FALSE)
    )
  )
  df$size = csv[,2]
  d3r::d3_nest(df, value_cols = "size")
}
