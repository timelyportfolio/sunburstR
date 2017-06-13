# sunburstR 1.0.0

see [sunburstR v1 Github Project](https://github.com/timelyportfolio/sunburstR/projects/1)

### Updates

* update to `d3v4`; thanks @cjyetman (see [issue 36](https://github.com/timelyportfolio/sunburstR/issues/36))
* convert JS to standalone build to prevent conflicts with other non-d3v4 htmlwidgets (see [issue 40](https://github.com/timelyportfolio/sunburstR/issues/40))
* begin to modularize JavaScript (see [issue 37](https://github.com/timelyportfolio/sunburstR/issues/37))


### API Changes

* **BREAKING** `csvdata` and `jsondata` deprecated in favor of single data argument (see [issue 43](https://github.com/timelyportfolio/sunburstR/issues/43))
* add `dplyr` to IMPORTS
* convert csv hierarchy on the R side instead of JS side;  slightly slower but will work to improve

# sunburstR 0.6.5

### Bug Fix

* fix legend bug introduced with new color functionality; see [issue](https://github.com/timelyportfolio/sunburstR/issues/34) and [commit](https://github.com/timelyportfolio/sunburstR/commit/635ec7cd755d8d3ae417a402be65833725551cdf)

# sunburstR 0.6.4

see [treemap example](https://github.com/timelyportfolio/sunburstR/blob/master/inst/examples/example_treemap.R)

* add `valueField` argument to `sunburst()` to allow fields in json
    to be something other than `"size"` [commit](https://github.com/timelyportfolio/sunburstR/commit/52bfc78cbfb1a8083584370aace863b674b53e32)
* add ability to supply a JavaScript `function` to `colors` for
    advanced color customization or to use a color field from data
    as the color fill [commit](https://github.com/timelyportfolio/sunburstR/commit/4499a7c2bd5e57b729fbe2c562f1ef9932143f10)

# sunburstR 0.6.3

### Updates

* use the new CRAN package `d3r` for `d3.js` dependencies

# sunburstR 0.6.2

### Updates

* update d3.js to most recent tagged v3 release [commit](https://github.com/timelyportfolio/sunburstR/commit/5af0b29f08fad5e9ea8e28fb2c4e6eb9f09d1887)

# sunburstR 0.6.1

### New Features

* add click to dispatch for click event handling [commit](https://github.com/timelyportfolio/sunburstR/commit/d3239b42f7dc29dcbe9456523bccd601e25f0a20)
* add click to `add_shiny` and provide examples [commit](https://github.com/timelyportfolio/sunburstR/commit/d3239b42f7dc29dcbe9456523bccd601e25f0a20) and [commit](https://github.com/timelyportfolio/sunburstR/commit/4f72b6e9c12d23ff24f40828747ccbdce9ce075b)

### Bug Fix

* try to fix breadcrumb sizing bug for Firefox, Safari [commit](https://github.com/timelyportfolio/sunburstR/pull/24/commits/d3239b42f7dc29dcbe9456523bccd601e25f0a20)


# sunburstR 0.6

* CRAN release



