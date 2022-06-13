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
        if(
          x.options.hasOwnProperty("showLabels") &&
          (x.options.showLabels===true || x.options.showLabels===false )
        ) {
          sunburst.sunburst().showLabels(x.options.showLabels);
        }

        if(x.options.hasOwnProperty("rootLabel") && x.options.rootLabel !== null) {
          x.data.root.name = x.options.rootLabel;
        }

        d3.select(el).datum(x.data)
          .transition()
          .call(sunburst.advanced);


        // set up a container for tasks to perform after completion
        //  one example would be add callbacks for event handling
        //  styling
        if (!(typeof x.tasks === "undefined") ){
          if ( (typeof x.tasks.length === "undefined") ||
           (typeof x.tasks === "function" ) ) {
             // handle a function not enclosed in array
             // should be able to remove once using jsonlite
             x.tasks = [x.tasks];
          }
          x.tasks.map(function(t){
            // for each tasks call the task with el supplied as `this`
            t.call({el:el,x:x,instance:instance});
          });
        }

        // add x to instance for future reference
        instance.x = x;

      },

      resize: function(width, height) {

        var x = instance.x;
        sunburst.chartFrame().size({height: height});
        d3.select(el).call(sunburst);

        // set up a container for tasks to perform after completion
        //  one example would be add callbacks for event handling
        //  styling
        if (!(typeof x.tasks === "undefined") ){
          if ( (typeof x.tasks.length === "undefined") ||
           (typeof x.tasks === "function" ) ) {
             // handle a function not enclosed in array
             // should be able to remove once using jsonlite
             x.tasks = [x.tasks];
          }
          x.tasks.map(function(t){
            // for each tasks call the task with el supplied as `this`
            t.call({el:el,x:x,instance:instance});
          });
        }
      },

      instance: instance

    };
  }
});
