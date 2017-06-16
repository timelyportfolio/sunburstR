#' @keywords internal
csv_to_hier <- function(csv, delim = "-") {
  df <- dplyr::bind_rows(
    lapply(
      strsplit(as.character(csv[[1]]), delim),
      function(rw) data.frame(t(rw), stringsAsFactors = FALSE)
    )
  )
  # handle case where no delimiter in root
  if(any(is.na(df[,1]))) {
    idx_notna <- which(!is.na(df[,1]))
    df[idx_notna,2] <- df[idx_notna,1]
    df <- df[,-1]
  }
  df$size = csv[[2]]
  d3r::d3_nest(df, value_cols = "size")
}
