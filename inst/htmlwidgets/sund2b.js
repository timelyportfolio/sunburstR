HTMLWidgets.widget({

  name: 'sund2b',

  type: 'output',

  factory: function(el, width, height) {

    var sunburst = d2b.chartSunburst();

    return {

      renderValue: function(x) {

        sunburst.chartFrame().size({height: height});
        sunburst.label(function(d) {
          return d.name;
        });
        sunburst.sunburst().size(function(d) {
          // only sum if no children (or is leaf)
            if(!(d.children && d.children.length > 0)) return d[x.options.valueField || "size"];
        });

        d3.select(el).datum(x.data)
          .transition()
          .call(sunburst);

      },

      resize: function(width, height) {

        sunburst.chartFrame().size({height: height});
        d3.select(el).call(sunburst);

      }

    };
  }
});
