# D2B: Data to DashBoards

<a href = 'http://d2bjs.org'><img width = '250' src = 'https://raw.githubusercontent.com/d2bjs/d2b/master/logo/logo.png'></a>

A reusable d3-based chart library.

## Installing

If you use NPM, `npm install d2b`. Otherwise, you can download the latest build [here](https://github.com/d2bjs/d2b) or install it via [CDN](https://unpkg.com/d2b/build/d2b.min.js).

## API Reference

You can see the d2b API references [here](http://docs.d2bjs.org).

## Optional Dependencies

- [font awesome icons](http://fontawesome.io/get-started/): Many of the charts use this icon set.

- [d3-sankey](https://github.com/d3/d3-sankey): Used by the d2b [sankey chart](./charts/sankey.md) and [sankey svg](./svg/sankey.md). If using NPM this dependency will automatically be included.

- [d3-interpolate-path](https://github.com/pbeshai/d3-interpolate-path): Used by the d2b `v > 0.0.41` [line svg](./svg/line.md) and [area svg](./svg/area.md) for smoother interpolation. This dependency is optional, by default d3's path interpolation will be used. If installing with NPM this dependency will automatically be included.

## Examples

You can try out many d2b live code examples [here](http://d2bjs.org).

If you are using Vue.js there is a [vue-d2b](https://github.com/d2bjs/vue-d2b) plugin that makes using d2b even easier.

<figure><figcaption style = 'text-align:center;'>d2b.chartAxis()</figcaption><img src="./docs/gifs/chart-axis.gif" alt="Axis Chart" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.chartSunburst()</figcaption><img src="./docs/gifs/chart-sunburst.gif" alt="Sunburst Chart" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.chartSankey()</figcaption><img src="./docs/gifs/chart-sankey.gif" alt="Sankey Chart" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.chartPie()</figcaption><img src="./docs/gifs/chart-pie.gif" alt="Pie Chart" width = '100%'/></figure><br>

### Some examples of mix and match d2b.chartAxis() generators.

<br />

<figure><figcaption style = 'text-align:center;'>d2b.svgBoxPlot()</figcaption><img src="./docs/gifs/box-plot-svg-transition.gif" alt="Svg Box Plot" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.svgBubblePack()</figcaption><img src="./docs/gifs/bubble-pack-svg-transition.gif" alt="Svg Bubble Pack" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.svgArea()</figcaption><img src="./docs/gifs/area-svg-transition.gif" alt="Svg Area" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.svgLine()</figcaption><img src="./docs/gifs/line-svg-transition.gif" alt="Svg Line" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.svgScatter()</figcaption><img src="./docs/gifs/scatter-svg-transition.gif" alt="Svg Scatter" width = '100%'/></figure><br>

<figure><figcaption style = 'text-align:center;'>d2b.svgBar()</figcaption><img src="./docs/gifs/bar-svg-transition.gif" alt="Svg Bar" width = '100%'/></figure><br>
