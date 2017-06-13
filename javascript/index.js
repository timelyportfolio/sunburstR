import {dispatch} from 'd3-dispatch';
import {zip} from 'd3-array';
import {default as draw} from './src/sunburst-chart.js';
import HTMLWidgets from './global/htmlwidgets';

HTMLWidgets.widget({

  name: 'sunburst',

  type: 'output',

  factory: function(el, width, height) {

    var instance = {};

    instance.chart = {};

    var dispatch_ = dispatch("mouseover","mouseleave","click");
    instance.chart.on = dispatch_.on;

    // Take a 2-column CSV and transform it into a hierarchical structure suitable
    // for a partition layout. The first column is a sequence of step names, from
    // root to leaf, separated by hyphens. The second column is a count of how
    // often that sequence occurred.
    function buildHierarchy(csv) {
      var root = {"name": "root", "children": []};
      for (var i = 0; i < csv.length; i++) {
        var sequence = csv[i][0];
        var size = +csv[i][1];
        if (isNaN(size)) { // e.g. if this is a header row
          continue;
        }
        var parts = sequence.split("-");
        var currentNode = root;
        for (var j = 0; j < parts.length; j++) {
          var children = currentNode["children"];
          var nodeName = parts[j];
          var childNode;
          if (j + 1 < parts.length) {
       // Not yet at the end of the sequence; move down the tree.
     	var foundChild = false;
     	for (var k = 0; k < children.length; k++) {
     	  if (children[k]["name"] == nodeName) {
     	    childNode = children[k];
     	    foundChild = true;
     	    break;
     	  }
     	}
      // If we don't already have a child node for this branch, create it.
     	if (!foundChild) {
     	  childNode = {"name": nodeName, "children": []};
     	  children.push(childNode);
     	}
     	currentNode = childNode;
          } else {
     	// Reached the end of the sequence; create a leaf node.
     	childNode = {"name": nodeName, "size": size};
     	children.push(childNode);
          }
        }
      }
      return root;

    };

    return {

      renderValue: function(x) {

        instance.x = x;

        // x.data should be a data.frame in R so an Javascript Object of Objects
        //     but buildHierarchy expects an Array of Arrays
        //     so use d3.zip and apply to do this
        var json = [];
        if(typeof(x.csvdata) !== "undefined"){
          json = buildHierarchy(
            zip.apply(
              null,
              Object.keys(x.csvdata).map(function(ky){return x.csvdata[ky]})
            )
          );
        } else {
          json = x.data
        }
        instance.json = json;

        draw(el, instance, dispatch_);

      },

      resize: function(width, height) {

        draw(el, instance, dispatch_);

      },

      instance: instance

    };
  }
});
