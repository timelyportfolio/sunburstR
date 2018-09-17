context("creation")

test_that("sunburstR makes a htmlwidget", {
  expect_is(sunburst("{}"), "htmlwidget")
  expect_is(sunburst("{}"), "sunburst")
  expect_error(sunburst())
})

test_that("sunburstR handles options as expected", {
  # check default values
  expect_equal(sunburst("{}")$x$options$valueField, "size")
  expect_equal(sunburst("{}")$sizingPolicy, htmlwidgets::sizingPolicy(browser.fill=TRUE))
  # check that arguments are passed
  expect_equal(sunburst("{}", width = 100)$width, 100)
  expect_equal(sunburst("{}", height = 100)$height, 100)
  expect_equal(sunburst("{}", legendOrder = toString(5:1))$x$options$legendOrder, toString(5:1))
  expect_equal(sunburst("{}", colors = c("red", "blue"))$x$options$color, c("red", "blue"))
})

sequences_csv <- read.csv(
  system.file("examples/visit-sequences.csv", package = "sunburstR")
  , header = FALSE
  , stringsAsFactors = FALSE
)[1:100,]

sequences_json <- jsonlite::fromJSON(
  system.file("examples/visit-sequences.json", package = "sunburstR")
  , simplifyDataFrame = FALSE
)

test_that("sunburstR works with both csv and json data", {
  # csvdata and jsondata deprecated so expect warning
  expect_warning(sunburst(csvdata=sequences_csv))
  expect_warning(sunburst(jsondata=sequences_json))
})
