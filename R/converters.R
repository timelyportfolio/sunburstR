#' @keywords internal
csv_to_hier <- function(csv, delim = "-") {
  hier_col <- strsplit(as.character(csv[[1]]), delim)
  # determine max length of all the paths to build column names
  #   issue 107
  max_path_length <- max(unlist(lapply(hier_col, length)))
  # build column names for path
  path_col_names <- paste0("X",seq_len(max_path_length))
  df <- dplyr::bind_rows(
    lapply(
      step1,
      function(rw) {
        structure(rw, names = path_col_names[1:(length(rw))])
      }
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
