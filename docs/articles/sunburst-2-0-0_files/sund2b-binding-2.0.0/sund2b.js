HTMLWidgets.widget({

  name: 'sund2b',

  type: 'output',

  factory: function(el, width, height) {

    var sunburst = d2b.chartSunburst();
    // make this publicly available for later customization by user
    var instance = {
      chart: sunburst
    };

    return {

      renderValue: function(x) {

        var colors = d3.scaleOrdinal(d3.schemeCategory20);

        if(x.options.colors !== null){
          // if an array then we assume the colors
          //  represent an array of hexadecimal colors to be used
          if(Array.isArray(x.options.colors)) {
            try{
              colors.range(x.options.colors)
            } catch(e) {

            }
          }

          // if an object with range then we assume
          //  that this is an array of colors to be used as range
          if(x.options.colors.range){
            try{
              colors.range(x.options.colors.range)
            } catch(e) {

            }
          }

          // if an object with domain then we assume
          //  that this is an array of colors to be used as domain
          //  for more precise control of the colors assigned
          if(x.options.colors.domain){
            try{
              colors.domain(x.options.colors.domain);
            } catch(e) {

            }
          }

          // if a function then set to the function
          if(typeof(x.options.colors) === "function") {
            colors = x.options.colors;
          }
        }

        sunburst.chartFrame().size({height: height});
        sunburst.label(function(d) {
          return d.name;
        });
        sunburst.color(function(d) {
          return colors.call(this, d.name, d);
        });
        sunburst.sunburst().size(function(d) {
          return d[x.options.valueField || "size"];
        });

        d3.select(el).datum(x.data)
          .transition()
          .call(sunburst);

      },

      resize: function(width, height) {

        sunburst.chartFrame().size({height: height});
        d3.select(el).call(sunburst);

      },

      instance: instance

    };
  }
});
