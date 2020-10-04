context("conversion")

test_that("csv_to_hier handles paths of length one", {
  csv <- utils::read.table(
    header = FALSE,
    text = "
a-b-c        1
x            1
d-e-f        1
y            1
g-h-i        1
a3-b3-c3-d3  1"
  )

  expect_identical(
    jsonlite::fromJSON(csv_to_hier(csv),simplifyVector = FALSE),
    list(children = list(list(name = "a", children = list(list(name = "b",
      children = list(list(name = "c", children = list(), size = 1L,
          colname = "X3")), colname = "X2")), colname = "X1"),
      list(name = "x", children = list(), size = 1L, colname = "X1"),
      list(name = "d", children = list(list(name = "e", children = list(
          list(name = "f", children = list(), size = 1L, colname = "X3")),
          colname = "X2")), colname = "X1"), list(name = "y", children = list(),
          size = 1L, colname = "X1"), list(name = "g", children = list(
          list(name = "h", children = list(list(name = "i", children = list(),
              size = 1L, colname = "X3")), colname = "X2")), colname = "X1"),
      list(name = "a3", children = list(list(name = "b3", children = list(
          list(name = "c3", children = list(list(name = "d3", size = 1L,
              colname = "X4")), colname = "X3")), colname = "X2")),
          colname = "X1")), name = "root")
  )
})
