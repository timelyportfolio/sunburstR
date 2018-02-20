(function (exports,d3,d3SvgAnnotation,d3InterpolatePath,d3Sankey) {
  'use strict';

  function __$styleInject(css, returnValue) {
    if (typeof document === 'undefined') {
      return returnValue;
    }
    css = css || '';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
    
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    return returnValue;
  }
  __$styleInject(".d2b-draggable{cursor:move}.d2b-vue-container{width:100%;height:100%}.d2b-pie-chart .d2b-pie-arc path{stroke-width:1px;stroke:#fff}.d2b-pie-chart .d2b-pie-arc text{fill:#fff;font-weight:700;pointer-events:none;text-anchor:middle}.d2b-axis-wrapper .d2b-axis-background{opacity:0}.d2b-chart-breadcrumbs{width:200px;padding-left:10px}.d2b-sunburst-breadcrumb .d2b-sunburst-label,.d2b-sunburst-tooltip .d2b-sunburst-label{text-align:center}.d2b-sunburst-breadcrumb .d2b-sunburst-value,.d2b-sunburst-tooltip .d2b-sunburst-value{font-size:14pt;margin-top:5px}.d2b-sunburst-breadcrumb .d2b-sunburst-percent{float:right}.d2b-breadcrumbs:not(.d2b-vertical) .d2b-sunburst-percent{margin-left:30px}.d2b-sunburst-tooltip{text-align:center}.d2b-sunburst-tooltip .d2b-sunburst-percent{display:inline}.d2b-sunburst-tooltip .d2b-sunburst-percent:before{content:\"(\"}.d2b-sunburst-tooltip .d2b-sunburst-percent:after{content:\")\"}.d2b-sankey-link-arrow{font-size:10px;position:relative;top:-2px}.d2b-line-graph .d2b-line{stroke-width:1.5px;fill:none}.d2b-area-graph .d2b-area{stroke:none;fill-opacity:0.3}.d2b-box .d2b-box-center,.d2b-box .d2b-box-dash,.d2b-box .d2b-box-outlier,.d2b-box .d2b-box-rect{stroke-width:1.5px}.d2b-box .d2b-box-rect{fill:#fff}.d2b-box .d2b-box-center{stroke-dasharray:3 3}.d2b-box .d2b-box-label{fill:#555;font-size:10pt}.d2b-box .d2b-box-outlier{fill:none;stroke-opacity:0.4}\n/*.d2b-box-graph {\n  .d2b-box-dash,\n  .d2b-box-center,\n  .d2b-box-rect,\n  .d2b-box-outlier {\n    stroke-width: 1.5px;\n  }\n\n  .d2b-box-rect {\n    fill: #fff;\n  }\n\n  .d2b-box-center {\n    stroke-dasharray: 3 3;\n  }\n\n  .d2b-box-label {\n    fill: #555;\n    font-size: 10pt;\n    dominant-baseline: middle;\n  }\n\n  .d2b-box-outlier {\n    fill: none;\n    stroke: #888;\n    opacity: 0.4;\n  }\n}*/.d2b-bar-graph .d2b-bar-group rect{opacity:0.8}.d2b-bubble-pack-graph .d2b-bubble-point{opacity:0.75}.d2b-bubble-pack-graph .d2b-bubble-indicator rect{fill-opacity:0.25;stroke-opacity:0.9;cursor:pointer;stroke-width:1px}.d2b-bubble-pack-graph .d2b-bubble-indicator rect:hover{stroke-width:2px}.d2b-bubble-pack-graph .d2b-bubble-indicator path,.d2b-bubble-pack-graph .d2b-bubble-indicator text{pointer-events:none}.d2b-plane text{font-size:10pt}.d2b-plane .d2b-y2-axis .d2b-axis-label,.d2b-plane .d2b-y-axis .d2b-axis-label{-webkit-transform:rotate(-90deg);transform:rotate(-90deg)}.d2b-plane .d2b-y2-axis .tick line,.d2b-plane .d2b-y-axis .tick line{stroke-width:0.6px}.d2b-plane .d2b-grid .tick line{shape-rendering:crispEdges;stroke-width:0.5px;stroke-opacity:0.15}.d2b-plane .d2b-grid .tick text{display:none}.d2b-plane .d2b-axis-label{fill:#000;font-weight:700}.d2b-plane path.domain{stroke-width:0.4px;stroke-opacity:0.4}.d2b-sunburst-arc{transition:opacity 0.2s,stroke-width 0.2s;cursor:pointer;opacity:0.9;stroke-width:0.8px;stroke:#fff}.d2b-sunburst-arc.d2b-transparent{fill-opacity:0.2}.d2b-sunburst-label{font-size:8pt;fill-opacity:0.8;pointer-events:none;font-family:arial}.d2b-sunburst-label.d2b-transparent{fill-opacity:0.2}.d2b-sunburst-center{fill-opacity:0;stroke:none;cursor:pointer}.d2b-sunburst-ancestor{opacity:0.4}.d2b-sankey-links path{fill:none}.d2b-sankey-links path,.d2b-sankey-links rect{opacity:0.4}.d2b-sankey-links path:hover,.d2b-sankey-links rect:hover{opacity:0.6}.d2b-sankey-nodes rect{stroke-width:0.3px;stroke:#000;opacity:0.6}.d2b-sankey-nodes rect:hover{opacity:0.8}.d2b-text-anchor-end{text-anchor:end}\n/*.d2b-tooltip-area {\n  pointer-events: none;*/.d2b-tooltip{pointer-events:none;background:#fff;border:1px solid #bbb;border-radius:2px;position:fixed;box-shadow:0px 0px 2px #ccc;margin:0}.d2b-tooltip:before{left:0;top:0;position:absolute;z-index:2;content:\"\"}.d2b-tooltip-content{white-space:nowrap;padding:6px 10px}.d2b-tooltip-top{-webkit-transform:translate(-50%,-100%);transform:translate(-50%,-100%);margin-left:0;margin-top:-15px}.d2b-tooltip-top:before{-webkit-transform:translateX(-50%);transform:translateX(-50%);left:50%;top:100%;width:0;height:0;border-style:solid;border-color:transparent;border-width:6px 6px 0;border-top-color:inherit}.d2b-tooltip-bottom{-webkit-transform:translate(-50%,0);transform:translate(-50%,0);margin-left:0;margin-top:15px}.d2b-tooltip-bottom:before{-webkit-transform:translateX(-50%);transform:translateX(-50%);left:50%;top:-6px;width:0;height:0;border-style:solid;border-color:transparent;border-width:0 6px 6px;border-bottom-color:inherit}.d2b-tooltip-right{-webkit-transform:translate(0,-50%);transform:translate(0,-50%);margin-left:15px;margin-top:0}.d2b-tooltip-right:before{-webkit-transform:translateY(-50%);transform:translateY(-50%);left:-6px;top:50%;width:0;height:0;border-style:solid;border-color:transparent;border-width:6px 6px 6px 0;border-right-color:inherit}.d2b-tooltip-left{-webkit-transform:translate(-100%,-50%);transform:translate(-100%,-50%);margin-left:-15px;margin-top:0}.d2b-tooltip-left:before{-webkit-transform:translateY(-50%);transform:translateY(-50%);left:100%;top:50%;width:0;height:0;border-style:solid;border-color:transparent;border-width:6px 0 6px 6px;border-left-color:inherit}\n/*}*/\n/*.d2b-tooltip-axis-area {\n  pointer-events: none;\n  font-family: 'Arial';*/.d2b-tooltip-marker{stroke-width:2px;stroke:#bbb;stroke-dasharray:5,5}.d2b-tooltip-axis{pointer-events:none;font-family:Arial;opacity:0.9;white-space:nowrap;border:1px solid #ddd;background:hsla(0,0%,100%,.8);position:absolute;box-shadow:0px 0px 2px #ccc}.d2b-tooltip-axis .d2b-tooltip-title{text-align:center;background:rgba(150,165,175,.8);padding:5px 10px;font-weight:700;color:#fff}.d2b-tooltip-axis .d2b-tooltip-content{padding:5px 10px}.d2b-tooltip-axis .d2b-tooltip-content .d2b-tooltip-row{padding-left:5px;border-left-width:3px;border-left-style:solid;margin-bottom:5px}.d2b-tooltip-axis .d2b-tooltip-content .d2b-tooltip-row:last-child{margin-bottom:0px}\n/*}*/.d2b-breadcrumbs{color:#555;font-size:9pt;box-sizing:content-box}.d2b-breadcrumbs .d2b-breadcrumb{border:0px solid transparent;border-left-width:8px;border-bottom-width:1px;padding:6px 13px;margin-bottom:10px;text-transform:uppercase;position:relative}.d2b-breadcrumbs .d2b-breadcrumb:first-child .d2b-breadcrumb-icon:after,.d2b-breadcrumbs .d2b-breadcrumb:last-child .d2b-breadcrumb-icon:after{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:-15.5px;width:13px;height:13px;text-align:center;font-family:FontAwesome;color:#fff;background-color:inherit;padding:5px;border-radius:15px}.d2b-breadcrumbs .d2b-breadcrumb:first-child .d2b-breadcrumb-icon:after{content:\"\\f015\"}.d2b-breadcrumbs .d2b-breadcrumb:not(:first-child):last-child .d2b-breadcrumb-icon:after{content:\"\\f25a\"}.d2b-breadcrumbs:not(.d2b-vertical){white-space:nowrap}.d2b-breadcrumbs:not(.d2b-vertical) .d2b-breadcrumb{border-right-width:1px;border-top-width:1px;white-space:nowrap;display:inline-block}.d2b-breadcrumbs:not(.d2b-vertical) .d2b-breadcrumb:not(:last-child){margin-right:20px}.d2b-breadcrumbs:not(.d2b-vertical) .d2b-breadcrumb:not(:last-child):after{width:0;height:0;border-style:solid;border-color:transparent;border-width:6px 0 6px 6px;border-left-color:inherit;position:absolute;z-index:2;content:\"\";top:50%;left:100%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.d2b-breadcrumbs.d2b-vertical .d2b-breadcrumb{/*&:after {\n      triangle: pointing-right;\n      width: 100px;\n      height: 100px;\n      background-color: inherit;\n      position: absolute;\n      z-index: 2;\n      content: '';\n\n      top: 100%;\n      left: 50%;\n\n      transform: translateX(-50%);\n\n    }*/}.d2b-breadcrumbs.d2b-vertical .d2b-breadcrumb:not(:last-child):after{width:0;height:0;border-style:solid;border-color:transparent;border-width:6px 6px 0;border-top-color:inherit;position:absolute;z-index:2;content:\"\";top:100%;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.stuff{display:none}.d2b-legend{color:#555;font-size:9pt}.d2b-legend .d2b-legend-item{border:0px solid transparent;padding:2px;padding-left:18px;position:relative;cursor:pointer}.d2b-legend .d2b-legend-item .d2b-legend-icon{position:absolute;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);left:7px;width:12px;height:12px}.d2b-legend .d2b-legend-item .d2b-legend-svg-icon{margin-left:-5px;margin-top:-5px;pointer-events:none}.d2b-legend .d2b-legend-item .d2b-legend-svg-icon path,.d2b-legend .d2b-legend-item .d2b-legend-svg-icon text{font-family:FontAwesome;text-anchor:middle;stroke-width:1px;fill-opacity:0.8}.d2b-legend:not(.d2b-vertical) .d2b-legend-item{display:inline-block}.d2b-legend:not(.d2b-vertical) .d2b-legend-item:not(:last-child){margin-right:10px}.d2b-legend:not(.d2b-vertical) .d2b-legend-icon{margin-top:1.5px}.d2b-chart-frame{height:100%;width:100%;position:relative}.d2b-chart-frame .d2b-breadcrumbs-frame,.d2b-chart-frame .d2b-chart,.d2b-chart-frame .d2b-legend-frame{position:absolute;overflow:auto}.d2b-chart-frame .d2b-breadcrumbs-frame .d2b-breadcrumbs,.d2b-chart-frame .d2b-legend-frame .d2b-breadcrumbs{padding-left:10px;padding-right:2px}.d2b-chart-frame .d2b-breadcrumbs-frame:not(.d2b-vertical),.d2b-chart-frame .d2b-legend-frame:not(.d2b-vertical){overflow-y:hidden}.d2b-chart-frame .d2b-breadcrumbs-frame:not(.d2b-vertical) .d2b-breadcrumbs,.d2b-chart-frame .d2b-breadcrumbs-frame:not(.d2b-vertical) .d2b-legend,.d2b-chart-frame .d2b-breadcrumbs-frame:not(.d2b-vertical) .d2b-legend-item,.d2b-chart-frame .d2b-legend-frame:not(.d2b-vertical) .d2b-breadcrumbs,.d2b-chart-frame .d2b-legend-frame:not(.d2b-vertical) .d2b-legend,.d2b-chart-frame .d2b-legend-frame:not(.d2b-vertical) .d2b-legend-item{white-space:nowrap;overflow-y:hidden}.d2b-chart-frame .d2b-breadcrumbs-frame:not(.d2b-vertical).d2b-legend-frame,.d2b-chart-frame .d2b-legend-frame:not(.d2b-vertical).d2b-legend-frame{height:20px;text-align:center}.d2b-chart-frame .d2b-breadcrumbs-frame:not(.d2b-vertical).d2b-breadcrumbs-frame,.d2b-chart-frame .d2b-legend-frame:not(.d2b-vertical).d2b-breadcrumbs-frame{height:55px}.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical .d2b-breadcrumbs-container,.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical .d2b-legend-container,.d2b-chart-frame .d2b-legend-frame.d2b-vertical .d2b-breadcrumbs-container,.d2b-chart-frame .d2b-legend-frame.d2b-vertical .d2b-legend-container{display:table;height:100%;width:100%}.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical .d2b-breadcrumbs-container .d2b-legend,.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical .d2b-legend-container .d2b-legend,.d2b-chart-frame .d2b-legend-frame.d2b-vertical .d2b-breadcrumbs-container .d2b-legend,.d2b-chart-frame .d2b-legend-frame.d2b-vertical .d2b-legend-container .d2b-legend{display:table-cell;vertical-align:middle}.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical .d2b-breadcrumbs-container .d2b-breadcrumbs,.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical .d2b-legend-container .d2b-breadcrumbs,.d2b-chart-frame .d2b-legend-frame.d2b-vertical .d2b-breadcrumbs-container .d2b-breadcrumbs,.d2b-chart-frame .d2b-legend-frame.d2b-vertical .d2b-legend-container .d2b-breadcrumbs{display:table-cell;vertical-align:top}.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical.d2b-breadcrumbs-frame,.d2b-chart-frame .d2b-legend-frame.d2b-vertical.d2b-breadcrumbs-frame{width:180px}.d2b-chart-frame .d2b-breadcrumbs-frame.d2b-vertical.d2b-legend-frame,.d2b-chart-frame .d2b-legend-frame.d2b-vertical.d2b-legend-frame{width:110px}", undefined);

  var version = "0.5.0";

  function functor(v) {
    return typeof v === 'function' ? v : function () {
      return v;
    };
  }

  // Work around for JavaScripts ||= operator. Only null, undefined, NaN, and false will be construed as falsy.

  function oreq () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var val = args[0];
    args.forEach(function (a) {
      if (val === null || val === undefined || val === false) val = a;
    });
    return val;
  }

  // Wraps text based on character count and text accessor. This method uses
  // d3's enter/update/exit strategy as to be less destructive on the text content.
  function textWrap (text) {
    var getText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (d) {
      return d.label;
    };
    var getCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
    var getAnchor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'start';

    getText = functor(getText);
    getCount = functor(getCount);
    getAnchor = functor(getAnchor);

    text.each(function (d, i) {
      var text = d3.select(this),
          words = ('' + getText.call(this, d, i)).split(/\s+/).reverse(),
          word = void 0,
          lines = [],
          line = [words.pop()],
          lineHeight = 1.1,
          count = getCount.call(this, d, i),
          anchor = getAnchor.call(this, d, i),
          x = +text.attr('x'),
          y = +text.attr('y'),
          dy = parseFloat(text.attr('dy')) || 0;

      // clear text if the wrapper is being run for the first time
      if (oreq(text.html(), '').indexOf('tspan') === -1) text.text('');

      word = words.pop();
      while (word) {
        if (line.join(' ').length + word.length > count) {
          lines.push(line);
          line = [];
        }

        line.push(word);
        word = words.pop();
      }
      lines.push(line);

      var tspan = text.selectAll('tspan').data(lines),
          height = (lines.length - 1) * lineHeight,
          offset = anchor === 'end' ? height : anchor === 'middle' ? height / 2 : 0;

      tspan.merge(tspan.enter().append('tspan')).text(function (d) {
        return d.join(' ');
      }).attr('x', x).attr('y', y).attr('dy', function (d, i) {
        return dy + i * lineHeight - offset + 'em';
      });
    });
  }

  // Wrap text based on pixel length.
  // This isn't used very frequently because it causes problems with event
  // rebinding namely double click events.
  function textWrapPX (text) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;

    text.each(function () {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word = void 0,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1,
          // ems
      y = parseFloat(text.attr('y')) || 0,
          dy = parseFloat(text.attr('dy')) || 0,
          tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');

      word = words.pop();
      while (word) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text.append('tspan').attr('x', 0).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
        }
        word = words.pop();
      }
    });
  }

  function tweenArc (context, arc) {
    function getProperties(d) {
      return {
        innerRadius: arc.innerRadius()(d),
        outerRadius: arc.outerRadius()(d),
        startAngle: arc.startAngle()(d),
        endAngle: arc.endAngle()(d)
      };
    }

    // if context is not a transition just render the arc and update current
    if (!context.selection) {
      return context.attr('d', function (d) {
        this.current = getProperties(d);
        return arc(d);
      });
    }

    // if context is a transition tween the 'd' attribute
    context.attrTween('d', function (d) {
      var _this = this;

      // omit data attribute incase of a pie chart with nested associations
      d = getProperties(d);
      this.current = this.current || d;
      var i = d3.interpolate(this.current, d);
      return function (t) {
        _this.current = i(t);
        return arc(_this.current);
      };
    });
  }

  function numberize (x) {
    var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (isNaN(x) || x === null) return def;
    return x;
  }

  function tweenNumber (context) {
    var number = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (d) {
      return d;
    };
    var format = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (d) {
      return d;
    };

    number = functor(number);

    // if context is not a transition just render the text and update current
    if (!context.selection) {
      return context.text(function (d, i) {
        this.current = numberize(number.call(this, d, i));
        return format(this.current);
      });
    }

    context.tween('text', function (d, i) {
      var _this = this;

      var val = numberize(number.call(this, d, i));
      this.current = numberize(this.current, val);
      var interpolate = d3.interpolate(this.current, val);
      return function (t) {
        _this.textContent = format(_this.current = interpolate(t));
      };
    });
  }

  function tweenCentroid (context, arc) {
    var rotate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (d) {
      return d.rotate;
    };

    rotate = functor(rotate);

    // get specific set of properties in case of recursive
    function getProperties(d) {
      return {
        innerRadius: arc.innerRadius()(d),
        outerRadius: arc.outerRadius()(d),
        startAngle: arc.startAngle()(d),
        endAngle: arc.endAngle()(d),
        rotate: rotate(d) || 0
      };
    }

    // if context is not a transition just render the centroid and update current
    if (!context.selection) {
      return context.attr('transform', function (d) {
        this.current = getProperties(d);
        return 'translate(' + arc.centroid(this.current) + ')' + ('rotate(' + this.current.rotate + ')');
      });
    }

    context.attrTween('transform', function (d) {
      var _this = this;

      d = getProperties(d);
      this.current = this.current || d;
      var i = d3.interpolate(this.current, d);
      return function (t) {
        _this.current = i(t);
        return 'translate(' + arc.centroid(_this.current) + ') ' + ('rotate(' + (_this.current.rotate || 0) + ')');
      };
    });
  }

  /**
    * d2b.modelBase() returns a d2b base model.
    *
    * model.interface() will return a base interface with various built in
    * getter/setter methods.
    * model.values() will return the values set through the interface.
    * @param {function} base - function that will act as the model interface
    * @param {object} $$ - attributes set by interactive with the base interface
    * @return {Object} model - object with properties and methods
    */

  function base() {
    var _base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _this = this;

    var $$ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var protect = arguments[2];


    // Define an emitter updater that will fire events around the base updater
    // if (typeof base === 'function') {
    //   base.emitter = function (context) {
    //     if (context.dispatch) context.dispatch('beforeApply', {bubbles: true});
    //     base.apply(this, arguments);
    //     if (context.dispatch) context.dispatch('applied', {bubbles: true});
    //   };
    // }

    var propFn = function propFn(prop, cb) {
      return function (_) {
        if (!arguments.length) return $$[prop];
        var old = $$[prop];
        $$[prop] = _;
        if (cb) cb(_, old);
        return _base;
      };
    };

    var propFnGet = function propFnGet(prop) {
      return function () {
        return $$[prop];
      };
    };

    var propFnFunctor = function propFnFunctor(prop, cb) {
      return function (_) {
        if (!arguments.length) return $$[prop];
        var old = $$[prop];
        $$[prop] = functor(_);
        if (cb) cb($$[prop], old);
        return _base;
      };
    };

    var scaleFnFunctor = function scaleFnFunctor(prop, cb) {
      return function (_) {
        if (!arguments.length) return $$[prop];
        var old = $$[prop];
        if (_ && _.domain) $$[prop] = function () {
          return _;
        };else $$[prop] = functor(_);
        if (cb) cb($$[prop], old);
        return _base;
      };
    };

    /* Base Model */
    var model = {
      base: function base() {
        return _base;
      },
      values: function values() {
        return $$;
      },
      /**
        * model.removeProp removes the specified property
        * @param {Number} prop    - property key
        * @return {Object} model  - returns model to allow for method chaining
        */
      removeProp: function removeProp(prop) {
        if (protect.indexOf(prop) !== -1) {
          // console.log(`Cannot remove ${prop} property or value`);
          return model;
        }

        $$[prop] = null;
        _base[prop] = null;
        return model;
      },
      /**
        * model.addProp allows new properties to be added to the model and base
        * interface. If the property is already defined an error will be raised.
        * @param {Number} prop    - property key
        * @param {Number} value   - default value to set
        * @param {Number} fn      - function as new prop getter/setter
        * @param {Number} cb      - callback function after prop is set
        * @return {Object} model  - returns model to allow for method chaining
        */
      addProp: function addProp(prop) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : propFn(prop);
        var cb = arguments[3];

        if ($$[prop] || _base[prop]) {
          // console.error(`${prop} property is already defined.`);
          return model;
        }
        // allow for null:default 'fn' in order to access callback
        fn = fn || propFn(prop, cb);

        fn(value);

        _base[prop] = fn;

        return model;
      },
      /**
        * model.addPropGet is similar to addProp except it doesn't allow for the
        * property to be reset through the API.
        * @param {Number} prop    - property key
        * @param {Number} value   - default value to set
        * @param {Number} fn      - function as new prop getter
        * @return {Object} model  - returns model to allow for method chaining
        */
      addPropGet: function addPropGet(prop) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : propFnGet(prop);

        if ($$[prop] || _base[prop]) {
          // console.error(`${prop} property is already defined.`);
          return model;
        }

        $$[prop] = value;
        _base[prop] = fn;

        return model;
      },
      /**
        * model.addMethod allows new methods to be added to the model and base
        * interface. If the method is already defined an error will be raised.
        * @param {Number} method  - method key
        * @param {Number} fn      - new method
        * @return {Object} model  - returns model to allow for method chaining
        */
      addMethod: function addMethod(method, fn) {
        if (_base[method]) {
          // console.error(`${method} method is already defined.`);
          return model;
        }
        _base[method] = fn;

        return model;
      },
      /**
        * model.addPropFunctor allows new functor properties to be added to the
        * model and base interface. If the property is already defined an error
        * will be raised.
        * @param {Number} prop    - property key
        * @param {Number} value   - default value to set
        * @param {Number} fn      - function as new prop getter/setter
        * @return {Object} model  - returns model to allow for method chaining
        */
      addPropFunctor: function addPropFunctor(prop) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : propFnFunctor(prop);
        var cb = arguments[3];

        if ($$[prop] || _base[prop]) {
          // console.error(`${prop} property is already defined.`);
          return model;
        }
        // allow for null:default 'fn' in order to access callback
        fn = fn || propFnFunctor(prop, cb);

        fn(value);

        _base[prop] = fn;

        return model;
      },
      /**
        * model.addScaleFunctor allows new scale functor properties to be added
        * to the model and base interface. If the property is already defined
        * an error will be raised.
        * @param {Number} prop    - property key
        * @param {Number} value   - default value to set
        * @param {Number} fn      - function as new prop getter/setter
        * @return {Object} model  - returns model to allow for method chaining
        */
      addScaleFunctor: function addScaleFunctor(prop) {
        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var fn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : scaleFnFunctor(prop);
        var cb = arguments[3];

        return model.addProp(prop, value, fn, cb);
      },
      /**
        * model.addDispatch allows dispatcher to be added to the model and base
        * interface.
        * @param {Number} prop    - property key
        * @param {Number} store   - store key
        * @param {Number} events  - array of event keys
        * @return {Object} model  - returns model to allow for method chaining
        */
      addDispatcher: function addDispatcher(events) {
        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'on';
        var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'dispatch';

        if (_base[prop]) {
          // console.error(`${prop} property is already defined.`);
          return model;
        }
        if ($$[store]) {
          // console.error(`${store} value is already defined.`);
          return model;
        }

        _base[prop] = function (key, fn) {
          if (arguments.length === 0) return $$[store];
          if (arguments.length === 1) return $$[store].on(key);
          $$[store].on(key, fn);

          return _base;
        };

        $$[store] = d3.dispatch.apply(_this, events);

        return model;
      }
    };

    return model;
  }

  var isTouchDevice = function isTouchDevice() {
    return 'ontouchstart' in window || window.navigator.msPointerEnabled;
  };

  function tooltip () {
    var $$ = {};

    var tooltip = function tooltip(context) {
      var selection = context.selection ? context.selection() : context;
      selection.on(event('mouseover'), mouseover).on(event('mouseout'), mouseout);

      if (isTouchDevice()) {
        selection.on(event('click'), mouseout);
      } else {
        selection.on(event('mousemove'), mousemove);
      }

      return tooltip;
    };

    var getCoords = function getCoords(d, i) {
      var box = this.getBoundingClientRect();
      var coords = {};

      // construct at object, if null automatically set it based on cursor event position
      var at = ($$.at.call(this, d, i) || (d3.event.clientX > window.innerWidth / 2 ? 'center left' : 'center right')).split(' ');
      at = { x: at[1], y: at[0] };

      // switch for horizontal coordinate
      switch (at.x) {
        case 'left':
          coords.x = box.left;
          break;
        case 'center':
          coords.x = box.left + box.width / 2;
          break;
        default:
          // right
          coords.x = box.left + box.width;
      }

      // switch for vertical coordinate
      switch (at.y) {
        case 'bottom':
          coords.y = box.top + box.height;
          break;
        case 'center':
          coords.y = box.top + box.height / 2;
          break;
        default:
          // top
          coords.y = box.top;
      }
      return coords;
    };

    var mouseover = function mouseover(d, i) {
      var tooltipUpdate = $$.container.selectAll('.d2b-tooltip').data(function (d) {
        return [d];
      });

      var newTooltip = tooltipUpdate.enter().append('div').style('opacity', 0).attr('class', 'd2b-tooltip');

      newTooltip.append('div').attr('class', 'd2b-tooltip-content');

      tooltipUpdate = tooltipUpdate.merge(newTooltip);

      tooltipUpdate.transition().duration(100).style('opacity', 1);

      $$.dispatch.call('insert', tooltipUpdate, this, d, i);

      mousemove.call(this, d, i);
    };

    var mousemove = function mousemove(d, i) {
      var html = $$.html.call(this, d, i),
          target = $$.target.call(this, d, i),
          color = $$.color.call(this, d, i),
          targetNode = target ? target.node() : this,
          coords = $$.followMouse.call(this, d, i) ? { x: d3.event.clientX, y: d3.event.clientY } : getCoords.call(targetNode, d, i);

      // if (!$$.container.selectAll('.d2b-tooltip').size()) return mouseover(d, i);

      var tooltipUpdate = $$.container.selectAll('.d2b-tooltip').data(function (d) {
        return [d];
      });

      var my = $$.my.call(this, d, i) || (d3.event.clientX > window.innerWidth / 2 ? 'left' : 'right');

      tooltipUpdate.attr('class', 'd2b-tooltip d2b-tooltip-' + my).style('top', coords.y + 'px').style('left', coords.x + 'px').style('border-color', color).select('.d2b-tooltip-content').html(html);

      $$.dispatch.call('move', tooltipUpdate, this, d, i);
    };

    var mouseout = function mouseout(d, i) {
      var tooltipUpdate = $$.container.selectAll('.d2b-tooltip').data(function (d) {
        return [d];
      });

      tooltipUpdate.transition().duration(100).style('opacity', 0).remove();

      $$.dispatch.call('remove', tooltipUpdate, this, d, i);
    };

    var event = function event(listener) {
      return listener + '.d2b-tooltip';
    };

    /* Inherit from base model */
    base(tooltip, $$).addProp('container', d3.select('body')) //, null, updateContainer)
    .addMethod('clear', function (context) {
      (context.selection ? context.selection() : context).on(event('mouseover'), null).on(event('mouseout'), null).on(event('mousemove'), null);

      return tooltip;
    }).addPropFunctor('followMouse', false).addPropFunctor('color', null).addPropFunctor('my', null).addPropFunctor('at', null).addPropFunctor('target', null).addPropFunctor('html', null).addDispatcher(['insert', 'move', 'remove']);

    return tooltip;
  }

  function tooltipAxis () {
    var $$ = {};

    var tooltip = {};

    // Position markers relative to selected points and axes
    var positionMarker = function positionMarker(marker, info, type) {
      if (type === 'y') {
        if (info.y === Infinity) return marker.style('opacity', 0);
        marker.style('opacity', 1).attr('transform', 'translate(0, ' + info.y + ')').attr('y1', 0).attr('y2', 0).attr('x1', 0).attr('x2', $$.size.width);
      } else {
        if (info.x === Infinity) return marker.style('opacity', 0);
        marker.style('opacity', 1).attr('transform', 'translate(' + info.x + ', 0)').attr('x1', 0).attr('x2', 0).attr('y1', 0).attr('y2', $$.size.height);
      }
    };

    // Position tooltip relative to selected points and axes
    var positionTooltip = function positionTooltip(tooltip, info, base) {
      var node = tooltip.node();
      if (!node) return;
      var tooltipBox = tooltip.node().getBoundingClientRect();
      var x = base.x,
          y = base.y,
          pad = 10;

      if ($$.trackY) {
        if (info.y > $$.size.height / 2) {
          y += info.y - pad - tooltipBox.height;
        } else {
          y += info.y + pad;
        }
      } else {
        if (d3.event.clientY - base.y > $$.size.height / 2) {
          y = d3.event.clientY - pad - tooltipBox.height;
        } else {
          y = d3.event.clientY + pad;
        }
      }

      if ($$.trackX) {
        if (info.x > $$.size.width / 2) {
          x += info.x - pad - tooltipBox.width;
        } else {
          x += info.x + pad;
        }
      } else {
        if (d3.event.clientX - base.x > $$.size.width / 2) {
          x = d3.event.clientX - pad - tooltipBox.width;
        } else {
          x = d3.event.clientX + pad;
        }
      }

      x += window.pageXOffset;
      y += window.pageYOffset;

      tooltip.style('left', x + 'px').style('top', y + 'px');
    };

    // Populate tooltip with point rows
    var populateTooltip = function populateTooltip(tooltip, info) {
      var title = $$.title(info.points.map(function (d) {
        return d.data;
      }));

      tooltip.select('.d2b-tooltip-title').style('display', title ? 'block' : 'none').html(title);

      var content = tooltip.select('.d2b-tooltip-content');

      var row = content.selectAll('.d2b-tooltip-row').data(info.points);
      var rowEnter = row.enter().append('div').attr('class', 'd2b-tooltip-row');

      row.exit().remove();

      row = row.merge(rowEnter).html(function (d) {
        return d.row;
      }).style('border-left-color', function (d) {
        return d.color || 'transparent';
      });
    };

    // Finds the x, y coordinates associated with the points 'closest' to the cursor.
    // Also returns the set of points that meet the 'closest' configuration.
    var findPointInfo = function findPointInfo(base) {
      var cursor = { x: d3.event.clientX - base.x, y: d3.event.clientY - base.y };
      var x = Infinity,
          y = Infinity,
          points = [];
      for (var groupName in groups) {
        if (!groups.hasOwnProperty(groupName)) continue;
        var group = groups[groupName];

        var _loop = function _loop(graphName) {
          if (!group.hasOwnProperty(graphName)) return 'continue';
          var graph = group[graphName];
          var newPoints = [];
          graph.config.data.forEach(function (d, i) {
            var item = {
              data: d,
              x: oreq(graph.config.x(d, i), $$.x(d, i)),
              y: oreq(graph.config.y(d, i), $$.y(d, i)),
              color: oreq(graph.config.color(d, i), $$.color(d, i)),
              row: oreq(graph.config.row(d, i), $$.row(d, i))
            };

            if ($$.trackX && $$.trackY) {
              if (item.x === x && item.y === y) return newPoints.push(item);

              var od = Math.sqrt(Math.pow(x - cursor.x, 2) + Math.pow(y - cursor.y, 2));
              var nd = Math.sqrt(Math.pow(item.x - cursor.x, 2) + Math.pow(item.y - cursor.y, 2));

              if (nd < od && nd < $$.threshold) {
                x = item.x;
                y = item.y;
                points = [];
                newPoints = [item];
              }
            } else if ($$.trackX) {
              if (item.x === x) return newPoints.push(item);

              var _od = Math.abs(x - cursor.x);
              var _nd = Math.abs(item.x - cursor.x);

              if (_nd < _od && _nd < $$.threshold) {
                x = item.x;
                points = [];
                newPoints = [item];
              }
            } else if ($$.trackY) {
              if (item.y === y) return newPoints.push(item);

              var _od2 = Math.abs(y - cursor.y);
              var _nd2 = Math.abs(item.y - cursor.y);

              if (_nd2 < _od2 && _nd2 < $$.threshold) {
                y = item.y;
                points = [];
                newPoints = [item];
              }
            }
          });

          points = points.concat(newPoints);
        };

        for (var graphName in group) {
          var _ret = _loop(graphName);

          if (_ret === 'continue') continue;
        }
      }

      points = points.sort(function (a, b) {
        return d3.ascending(a.x, b.x) || d3.ascending(a.y, b.y);
      });

      return { x: x, y: y, points: points };
    };

    // Exit tooltip element.
    var exitElement = function exitElement(el) {
      el.transition().duration(50).style('opacity', 0).remove();
    };

    // Enter tooltip element.
    var enterElement = function enterElement(el) {
      el.transition().duration(50).style('opacity', 1);
    };

    // Enter tooltip components.
    var enter = function enter(d, i) {
      var markerX = $$.svgContainer.selectAll('.d2b-tooltip-marker-x').data($$.trackX ? [tooltip] : []);
      var markerXEnter = markerX.enter().append('line').attr('class', 'd2b-tooltip-marker-x d2b-tooltip-marker');

      var markerY = $$.svgContainer.selectAll('.d2b-tooltip-marker-y').data($$.trackY ? [tooltip] : []);
      var markerYEnter = markerY.enter().append('line').attr('class', 'd2b-tooltip-marker-y d2b-tooltip-marker');

      var tooltipEl = $$.htmlContainer.selectAll('.d2b-tooltip').data([tooltip]);

      var tooltipEnter = tooltipEl.enter().append('div').attr('class', 'd2b-tooltip d2b-tooltip-axis');

      tooltipEnter.merge(tooltipEl).call(enterElement);
      markerY.merge(markerYEnter).call(enterElement);
      markerX.merge(markerXEnter).call(enterElement);

      tooltipEnter.append('div').attr('class', 'd2b-tooltip-title');
      tooltipEnter.append('div').attr('class', 'd2b-tooltip-content');

      $$.dispatch.call('insert', $$.tooltip, d, i);
    };

    // Exit tooltip components.
    var exit = function exit() {
      $$.svgContainer.selectAll('.d2b-tooltip-marker-x').data([]).exit().call(exitElement);
      $$.svgContainer.selectAll('.d2b-tooltip-marker-y').data([]).exit().call(exitElement);
      $$.htmlContainer.selectAll('.d2b-tooltip').data([]).exit().call(exitElement);
    };

    // Tracker mousemove event.
    var mousemove = function mousemove(d, i) {
      var base = $$.svgContainer.selectAll('.d2b-tooltip-base').data([d]);
      base = base.merge(base.enter().append('rect').attr('class', 'd2b-tooltip-base'));
      var baseBox = base.node().getBoundingClientRect();
      baseBox = { x: baseBox.left, y: baseBox.top };

      var pointInfo = findPointInfo(baseBox);

      if (pointInfo.points.length) enter();else return exit();

      $$.svgContainer.select('.d2b-tooltip-marker-x').call(positionMarker, pointInfo, 'x');

      $$.svgContainer.select('.d2b-tooltip-marker-y').call(positionMarker, pointInfo, 'y');

      $$.htmlContainer.select('.d2b-tooltip').call(populateTooltip, pointInfo).call(positionTooltip, pointInfo, baseBox);

      $$.dispatch.call('move', $$.tooltip, d, i);
    };

    // Tracker mouseout event.
    var mouseout = function mouseout(d, i) {
      exit();

      $$.dispatch.call('remove', $$.tooltip, d, i);
    };

    // Event key builder.
    var event = function event(listener) {
      return listener + '.d2b-tooltip-axis';
    };

    // update mouse event tracker
    var updateTracker = function updateTracker(n, o) {
      if (o) {
        o.on(event('mouseout'), null).on(event('mousemove'), null);
      }
      if (n) {
        n.on(event('mouseout'), mouseout).on(event('mousemove'), mousemove);
      }
    };

    // setup tooltip model
    base(tooltip, $$).addProp('htmlContainer', d3.select('body')).addProp('svgContainer', null).addProp('tracker', d3.select('body'), null, updateTracker).addProp('size', { height: 0, width: 0 }).addProp('trackX', true).addProp('trackY', false).addProp('threshold', Infinity).addMethod('clear', function (groupName, graphName) {
      if (arguments.length === 0) groups = {};else if (arguments.length === 1) delete groups[groupName];else if (arguments.length >= 2) delete groups[groupName][graphName];

      return tooltip;
    }).addPropFunctor('title', null).addPropFunctor('x', function (d) {
      return d.x;
    }).addPropFunctor('y', function (d) {
      return d.y;
    }).addPropFunctor('color', null).addPropFunctor('row', null).addDispatcher(['move', 'insert', 'remove']);

    // construct an interface for each graph that is initialized
    var groups = {};
    tooltip.graph = function () {
      var groupName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var graphName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var graphs = groups[groupName] = groups[groupName] || {};
      var graph = graphs[graphName];

      if (!graph) {
        graph = graphs[graphName] = { interface: {}, config: {} };
        var graphModel = base(graph.interface, graph.config);

        graphModel.addProp('data', []).addMethod('clear', function () {
          graph.config.data = [];
          return graph.interface;
        }).addMethod('addPoint', function (p) {
          graph.config.data.push(p);
          return graph.interface;
        }).addPropFunctor('x', null).addPropFunctor('y', null).addPropFunctor('color', null).addPropFunctor('row', null);
      }

      return graph.interface;
    };

    return tooltip;
  }

  // d2b.stack will stack the x and y values in place for
  // some datum and d3.stack configuration.
  function stack () {
    var $$ = {};

    var stack = function stack(datum) {
      var _this = this;

      var original = datum;

      // for simplicity map datum to just array of values arrays
      datum = datum.map($$.values);

      // format values to be in the form
      // [
      //   {x_1: y_1, x_2: y_2, .. },
      //   {x_1: y_1, x_2: y_2, .. },
      //   ..
      // ]
      var xset = [];

      var vals = datum.map(function (d) {
        var nodes = {};
        d.forEach(function (d, i) {
          var x = $$.x.call(_this, d, i);
          xset.push(x);
          nodes[x] = $$.y.call(_this, d, i);
        });
        return nodes;
      });

      // find unique set of x values
      xset = d3.set(xset).values();

      // value => index mapping of x values
      var xmap = xset.reduce(function (o, v, i) {
        o[v] = i;
        return o;
      }, {});

      // graph keys (just use index)
      var keys = d3.range(0, datum.length);

      // transpose values for d3.stack
      var tvals = xset.map(function (col) {
        return vals.map(function (row) {
          return row[col] || 0;
        });
      });

      // stack transposed values
      $$.stack.keys(keys).value(function (d, k) {
        return d[k] || 0;
      });
      var stacking = $$.stack(tvals);

      // reassociate the stacked values with the original datum
      datum.forEach(function (d, i) {
        d.forEach(function (val, ind) {
          var x = $$.x.call(_this, val, ind);
          var ys = stacking[i][xmap[x]];
          $$.out.call(_this, val, ys[0], ys[1], x);
        });
      });

      return original;
    };

    /* Inherit from base model */
    base(stack, $$).addProp('stack', d3.stack()).addPropFunctor('values', function (d) {
      return d;
    }).addPropFunctor('x', function (d) {
      return d.x;
    }).addPropFunctor('y', function (d) {
      return d.y;
    }).addProp('out', function (d, y0, y1) {
      d.y0 = y0;
      d.y1 = y1;
    });

    return stack;
  }

  function breadcrumbs () {
    var $$ = {};

    var breadcrumbs = function breadcrumbs(context) {
      var selection = context.selection ? context.selection() : context;

      var bcs = selection.selectAll('.d2b-breadcrumbs').data(function (d) {
        return [d];
      });

      var bcsEnter = bcs.enter().append('div').attr('class', 'd2b-breadcrumbs');

      bcs = bcs.merge(bcsEnter).classed('d2b-vertical', $$.vertical);

      var bc = bcs.selectAll('.d2b-breadcrumb').data($$.values, $$.key),
          bcExit = bc.exit();

      var bcEnter = bc.enter().append('div').attr('class', 'd2b-breadcrumb').style('opacity', 0);

      bcEnter.append('div').attr('class', 'd2b-breadcrumb-icon');
      bcEnter.append('div').attr('class', 'd2b-breadcrumb-content');

      bc = bc.merge(bcEnter).order();

      bc.select('.d2b-breadcrumb-content').html($$.html);

      if (context !== selection) {
        bc = bc.transition(context);
        bcExit = bcExit.transition(context).style('opacity', 0);
      }

      bc.style('border-color', $$.color).style('opacity', 1).select('.d2b-breadcrumb-icon').style('background-color', $$.color);

      bcExit.remove();

      selection.dispatch('breadcrumbs-updated', { bubbles: true });

      return breadcrumbs;
    };

    /* Inherit from base model */
    base(breadcrumbs, $$).addPropFunctor('values', function (d) {
      return d;
    }).addPropFunctor('key', function (d, i) {
      return i;
    }).addPropFunctor('color', 'blue').addPropFunctor('html', function (d) {
      return d.html;
    }).addPropFunctor('vertical', true);

    return breadcrumbs;
  }

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  function legend () {
    var $$ = {};

    var symbol = d3.symbol().size(80);

    var legend = function legend(context) {
      var selection = context.selection ? context.selection() : context;

      var leg = selection.selectAll('.d2b-legend').data(function (d) {
        return [d];
      });

      var legEnter = leg.enter().append('div').attr('class', 'd2b-legend');

      leg = leg.merge(legEnter).classed('d2b-vertical', $$.vertical);

      var legItem = leg.selectAll('.d2b-legend-item').data($$.values, $$.key),
          legItemExit = legItem.exit();

      var legItemEnter = legItem.enter().append('div').attr('class', 'd2b-legend-item').style('opacity', 0);

      legItemEnter.append('div').attr('class', 'd2b-legend-icon');
      legItemEnter.append('div').attr('class', 'd2b-legend-content');

      legItem = legItem.merge(legItemEnter).order();

      legItem.select('.d2b-legend-content').html($$.html);

      if (context !== selection) {
        legItem = legItem.transition(context);
        legItemExit = legItemExit.transition(context).style('opacity', 0);
      }

      legItem.style('opacity', 1).each(function (d, i) {
        // legend item customization
        var item = d3.select(this),
            color = $$.color(d, i),
            empty = $$.empty(d, i);

        item.style('border-color', color);

        // legend icon customization
        var icon = $$.icon(d, i),
            iconDiv = item.select('.d2b-legend-icon'),
            fa = [],
            shape = [],
            rect = iconDiv.node().getBoundingClientRect(),
            size = { width: rect.width, height: rect.height },
            center = { x: size.width / 2, y: size.height / 2 };

        if (typeof icon === 'string') fa.push(icon);else shape.push(icon);

        var svgIcon = iconDiv.selectAll('.d2b-legend-svg-icon').data(function (d) {
          return [d];
        });

        var svgIconEnter = svgIcon.enter().append('svg');
        svgIconEnter.attr('class', 'd2b-legend-svg-icon').attr('width', size.width).attr('height', size.height);

        svgIcon = svgIcon.merge(svgIconEnter);

        var svgFa = svgIcon.selectAll('text').data(fa),
            svgFaEnter = svgFa.enter().append('text');
        svgFa.exit().remove();
        svgFaEnter.append('tspan');
        svgFa = svgFa.merge(svgFaEnter);
        svgFa.style('stroke', color).style('fill', empty ? 'white' : color).attr('transform', 'translate(' + center.x + ',' + center.y * 1.65 + ')').select('tspan').text(function (d) {
          return d;
        });

        var svgShape = svgIcon.selectAll('path').data(shape);
        svgShape.exit().remove();
        svgShape = svgShape.merge(svgShape.enter().append('path'));
        svgShape.style('stroke', color).style('fill', empty ? 'white' : color).attr('d', function (d) {
          return symbol.type(d)();
        }).attr('transform', 'translate(' + center.x + ',' + center.y + ')');
      });

      // bind events
      leg.each(function (d, i) {
        var allowEmptied = $$.allowEmptied(d, i),
            items = d3.select(this).selectAll('.d2b-legend-item'),
            setAllEmpty = function setAllEmpty(state) {
          items.each(function (dd, ii) {
            $$.setEmpty(dd, ii, state);
          });
        },
            allEmpty = function allEmpty() {
          var allEmpty = true;

          items.each(function (dd, ii) {
            if (!$$.empty(dd, ii)) allEmpty = false;
          });

          return allEmpty;
        },
            click = function click(d, i) {
          $$.setEmpty(d, i, !$$.empty(d, i));
          if (!allowEmptied && allEmpty()) setAllEmpty(false);
          selection.call(legend);
          d3.select(this.parentNode).dispatch('change', { bubbles: true });
        },
            dblclick = function dblclick(d, i) {
          setAllEmpty(true);
          $$.setEmpty(d, i, false);
          selection.call(legend);
          d3.select(this.parentNode).dispatch('change', { bubbles: true });
        };

        items.each(function (d, i) {
          var clickable = $$.clickable(d, i),
              dblclickable = $$.dblclickable(d, i);

          d3.select(this).on('click', clickable ? click : null).on('dblclick', dblclickable ? dblclick : null);
        });
      });

      selection.dispatch('legend-updated', { bubbles: true });

      legItemExit.remove();
    };

    /* Inherit from base model */
    base(legend, $$).addPropFunctor('values', function (d) {
      return d;
    }).addPropFunctor('key', function (d, i) {
      return i;
    }).addPropFunctor('color', function (d) {
      return color(d.html);
    }).addPropFunctor('html', function (d) {
      return d.html;
    }).addPropFunctor('icon', '\uF111').addPropFunctor('vertical', false).addPropFunctor('allowEmptied', false).addPropFunctor('clickable', false).addPropFunctor('dblclickable', false).addPropFunctor('empty', function (d) {
      return d.empty;
    }).addPropFunctor('setEmpty', function (d, i, state) {
      return d.empty = state;
    });

    return legend;
  }

  function chartFrame () {

    // Padding can either be a constant or an object containing any of the
    // attributes (left, right, top, bottom). cleanPadding returns an object
    // with (left, right, top, bottom) attributes.
    function cleanPadding(pad) {
      var padding = { top: 0, left: 0, right: 0, bottom: 0 };
      if (typeof pad === 'number') return { top: pad, left: pad, right: pad, bottom: pad };
      ['top', 'bottm', 'right', 'left'].forEach(function (d) {
        if (pad[d]) padding[d] == pad[d];
      });
      return padding;
    }

    // Size can contain width or height attibutes. If either are unset the
    // size is derived from the bounding client rectangle.
    function cleanSize(s, box) {
      return {
        width: s && s.width > 0 ? s.width : box.width,
        height: s && s.height > 0 ? s.height : box.height
      };
    }

    var $$ = {};

    var chartFrame = function chartFrame(context) {
      var selection = context.selection ? context.selection() : context;

      var frame = selection.selectAll('.d2b-chart-frame').data(function (d) {
        return [d];
      }),
          frameEnter = frame.enter().append('div').attr('class', 'd2b-chart-frame');

      frame = frame.merge(frameEnter);

      selection.each(function (d) {
        var frame = d3.select(this).select('.d2b-chart-frame'),
            frameUpdate = frame,
            padding = cleanPadding($$.padding(d)),
            chartPadding = cleanPadding($$.chartPadding(d)),
            size = cleanSize($$.size(d), this.getBoundingClientRect());

        enterUpdate(frame, frameUpdate, function (d) {
          d.style('width', size.width + 'px').style('height', size.height + 'px');
        });

        size.width -= padding.left + padding.right;
        size.height -= padding.top + padding.bottom;

        var legendDatum = $$.legendEnabled(d) ? [d] : [];

        var legend = frame.selectAll('.d2b-legend-frame').data(legendDatum),
            legendEnter = legend.enter().append('div').attr('class', 'd2b-legend-frame'),
            legendExit = legend.exit();

        legendExit.remove();

        legendEnter.append('div').attr('class', 'd2b-legend-container');

        legend = legend.merge(legendEnter);

        var legendUpdate = legend;

        var breadcrumbsDatum = $$.breadcrumbsEnabled(d) ? [d] : [];

        var breadcrumbs = frame.selectAll('.d2b-breadcrumbs-frame').data(breadcrumbsDatum),
            breadcrumbsEnter = breadcrumbs.enter().append('div').attr('class', 'd2b-breadcrumbs-frame'),
            breadcrumbsExit = breadcrumbs.exit();

        breadcrumbsExit.remove();

        breadcrumbsEnter.append('div').attr('class', 'd2b-breadcrumbs-container');

        breadcrumbs = breadcrumbs.merge(breadcrumbsEnter);

        var breadcrumbsUpdate = breadcrumbs;

        var chart = frame.selectAll('.d2b-chart').data(function (d) {
          return [d];
        }),
            chartEnter = chart.enter().append('svg').attr('class', 'd2b-chart');

        chartEnter.append('g').attr('class', 'd2b-chart-container');

        chart = chart.merge(chartEnter);

        var chartUpdate = chart;

        if (context !== selection) {
          frameUpdate = frameUpdate.transition(context);
          legendUpdate = legendUpdate.transition(context);
          breadcrumbsUpdate = breadcrumbsUpdate.transition(context);
          chartUpdate = chartUpdate.transition(context);
        }

        placeComponent(breadcrumbs, breadcrumbsEnter, breadcrumbsUpdate, $$.breadcrumbsOrient(d), padding, size);
        placeComponent(legend, legendEnter, legendUpdate, $$.legendOrient(d), padding, size);

        enterUpdate(chartEnter, chartUpdate, function (d) {
          d.style('left', padding.left + 'px').style('top', padding.top + 'px').style('width', size.width + 'px').style('height', size.height + 'px');

          d.select('.d2b-chart-container').attr('transform', 'translate(' + [chartPadding.left, chartPadding.top] + ')');
        });

        size.width -= chartPadding.left + chartPadding.right;
        size.height -= chartPadding.top + chartPadding.bottom;

        // Store the chart size on the node so that the chart itself can get the
        // true size instead of the transitioning size.
        chart.select('.d2b-chart-container').node().__size__ = size;
      });

      selection.dispatch('chart-frame-updated', { bubbles: true });

      return chartFrame;
    };

    function enterUpdate(enter, update, fn) {
      fn(enter);
      fn(update);
    }

    function placeComponent(el, enter, update, orient, padding, size) {
      var node = el.node();
      if (node) {
        update.style('top', '').style('left', '').style('right', '').style('bottom', '').style('width', '').style('height', '');

        var box = void 0;

        if (orient === 'right' || orient === 'left') {
          el.classed('d2b-vertical', true);
          box = node.getBoundingClientRect();

          enterUpdate(enter, update, function (d) {
            d.style(orient, padding[orient] + 'px').style('top', padding.top + 'px').style('height', size.height + 'px');
          });

          padding[orient] += box.width;
          size.width -= box.width;
        } else if (orient === 'top' || orient === 'bottom') {
          el.classed('d2b-vertical', false);
          box = node.getBoundingClientRect();

          enterUpdate(enter, update, function (d) {
            d.style(orient, padding[orient] + 'px').style('left', padding.left + 'px').style('width', size.width + 'px');
          });

          padding[orient] += box.height;
          size.height -= box.height;
        } else {
          el.classed('d2b-vertical', false);
        }
      }
    }

    /* Inherit from base model */
    base(chartFrame, $$).addPropFunctor('size', null).addPropFunctor('legendEnabled', true).addPropFunctor('legendOrient', 'bottom').addPropFunctor('breadcrumbsEnabled', false).addPropFunctor('breadcrumbsOrient', 'right').addPropFunctor('chartPadding', 10).addPropFunctor('padding', 10);

    return chartFrame;
  }

  var d2bid = (function () {
    return Math.random().toString(36).substr(2, 9);
  });

  // Returns the specified object, omit the properties with keys matching
  // those in the specified keys array.

  function omit(obj, keys) {
    var newObj = {};
    for (var k in obj) {
      if (typeof obj[k] !== 'function') {
        if (keys.indexOf(k) < 0) newObj[k] = obj[k];
      }
    }
    return newObj;
  }

  var number = (function (x) {
    return x === null ? NaN : +x;
  });

  function mean(arr, value, weight) {
    var totalWeight = 0,
        contribution = 0;
    weight = functor(weight || 1);
    value = functor(value || function (d) {
      return d;
    });
    arr.filter(function (a) {
      return !isNaN(number(weight(a))) && !isNaN(number(value(a)));
    }).forEach(function (item) {
      var w = weight(item),
          v = value(item);
      totalWeight += w;
      contribution += v * w;
    });
    if (arr.length && totalWeight) return contribution / totalWeight;
  }

  mean.tendancy = 'mean';

  function median(arr, value, weight) {
    weight = functor(weight || 1);
    value = functor(value || function (d) {
      return d;
    });

    var medians = [],
        midWeight;

    var newArray = arr.filter(function (a) {
      return weight(a) !== 0 && !isNaN(number(weight(a))) && !isNaN(number(value(a)));
    }).sort(function (a, b) {
      return d3.ascending(value(a), value(b));
    });

    midWeight = Math.round(d3.sum(newArray, function (item) {
      return weight(item);
    }) / 2 * 1e12) / 1e12;

    var currentPosition = 0;
    var getNext = false;

    newArray.forEach(function (item) {
      if (getNext) {
        medians.push(value(item));
        getNext = false;
      }

      currentPosition += weight(item);

      if (currentPosition === midWeight) {
        medians.push(value(item));
        getNext = true;
      }

      if (currentPosition > midWeight && medians.length === 0) {
        medians.push(value(item));
      }
    });

    if (arr.length) return mean(medians);
  }

  median.tendancy = 'median';

  function mode(arr, value, weight) {
    weight = functor(weight || 1);
    value = functor(value || function (d) {
      return d;
    });

    var modes = [],
        maxFrequency = 0,
        frequencies = {};

    arr.forEach(function (item) {
      var val = number(value(item));
      if (isNaN(value(item))) return;
      frequencies[val] = frequencies[val] || 0;
      frequencies[val] += weight(item);

      if (frequencies[val] > maxFrequency) {
        maxFrequency = frequencies[value(item)];
        modes = [value(item)];
      } else if (frequencies[value(item)] == maxFrequency) {
        modes.push(value(item));
      }
    });

    if (maxFrequency <= 1 || !modes.length) return null;else if (modes.length === 1) return modes[0];else return modes;
  }

  mode.tendancy = 'mode';

  function range(arr, value) {
    value = functor(value || function (d) {
      return d;
    });
    var extent = d3.extent(arr, value);
    if (arr.length) return extent[1] - extent[0];
  }

  range.tendancy = 'range';

  function midpoint(arr, value) {
    value = functor(value || function (d) {
      return d;
    });
    if (arr.length) return d3.mean(d3.extent(arr, value));
  }

  midpoint.tendancy = 'midpoint';

  function toDegrees (angle) {
    return angle * (180 / Math.PI);
  }

  function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

  var pi = Math.PI;
  var sqrt8 = Math.sqrt(8);
  var sqrt2 = Math.sqrt(2);

  var mars = {
    draw: function draw(context, size) {
      var r = Math.sqrt(size / (pi + 5 / 4));
      var s = 0.3125 * r;
      var theta = 2 * Math.asin(1 / 4);
      var theta2 = (pi / 2 - theta) / 2;
      var circlex = r / sqrt8 - r * Math.cos(theta2);
      var circley = r * Math.sin(theta2);

      context.arc(circlex, circley, r, -theta2, 2 * pi - theta - theta2);
      context.lineTo(r * (5 / 4 - 1 / sqrt2), -r * (1 / sqrt8 + 5 / 4 - 1 / sqrt2));
      context.lineTo(r * (5 / 4 - 1 / sqrt2) - s, -r * (1 / sqrt8 + 5 / 4 - 1 / sqrt2));
      context.lineTo(r * (5 / 4 - 1 / sqrt2) - s, -r * (1 / sqrt8 + 7 / 4 - 1 / sqrt2));
      context.lineTo(r * (7 / 4 - 1 / sqrt2 + 1 / sqrt8), -r * (1 / sqrt8 + 7 / 4 - 1 / sqrt2));
      context.lineTo(r * (7 / 4 - 1 / sqrt2 + 1 / sqrt8), -r * (5 / 4 - 1 / sqrt2) + s);
      context.lineTo(r * (5 / 4 - 1 / sqrt2 + 1 / sqrt8), -r * (5 / 4 - 1 / sqrt2) + s);
      context.lineTo(r * (5 / 4 - 1 / sqrt2 + 1 / sqrt8), -r * (5 / 4 - 1 / sqrt2));
      context.closePath();
    }
  };

  var venus = {
    draw: function draw(context, size) {
      var r = Math.sqrt(size / (pi + 5 / 4));
      var theta = 2 * Math.asin(1 / 4);
      var circley = r / 4 - r * Math.cos(theta / 2);

      context.arc(0, circley, r, -pi * 3 / 2 + theta / 2, pi / 2 - theta / 2);
      context.lineTo(r / 4, 3 * r / 4);
      context.lineTo(r * 3 / 4, 3 * r / 4);
      context.lineTo(r * 3 / 4, 5 * r / 4);
      context.lineTo(r / 4, 5 * r / 4);
      context.lineTo(r / 4, 7 * r / 4);
      context.lineTo(-r / 4, 7 * r / 4);
      context.lineTo(-r / 4, 5 * r / 4);
      context.lineTo(-r * 3 / 4, 5 * r / 4);
      context.lineTo(-r * 3 / 4, 3 * r / 4);
      context.lineTo(-r / 4, 3 * r / 4);
      context.closePath();
    }
  };

  // point svg generator
  function point () {
    var $$ = {};

    /* Update Function */
    var point = function point(context) {
      var selection = context.selection ? context.selection() : context;

      // point background
      var back = selection.selectAll('path.d2b-point-back').data(function (d) {
        return [d];
      });

      back.enter().append('path').attr('class', 'd2b-point-back').attr('d', symbolNormal).style('fill-opacity', 0).style('stroke', $$.stroke).style('stroke-width', $$.strokeWidth);

      if (context !== selection) {
        back = back.transition(context);
      }

      back.attr('d', symbolNormal).style('stroke', $$.stroke).style('stroke-width', $$.strokeWidth);

      // point foreground
      var front = selection.selectAll('path.d2b-point-front').data(function (d) {
        return [d];
      });

      front.enter().append('path').attr('class', 'd2b-point-front').attr('d', symbolSmall).style('opacity', frontOpacity).style('fill', $$.fill).style('stroke', $$.stroke).style('stroke-width', $$.strokeWidth);

      if (context !== selection) {
        front = front.transition(context);
      }

      front.attr('d', symbolSmall).style('opacity', frontOpacity).style('fill', $$.fill).style('stroke', $$.stroke).style('stroke-width', $$.strokeWidth);

      // set mouse events if active
      selection.each(function (d, i) {
        var active = $$.active.call(this, d, i);
        d3.select(this).on('mouseover.d2b-point', active ? mouseover : null).on('mouseout.d2b-point', active ? mouseout : null);
      });

      selection.dispatch('point-updated', { bubbles: true });

      return point;
    };

    var symbol = d3.symbol();

    /* Inherit from base model */
    base(point, $$).addPropFunctor('size', 150, null, function (d) {
      return symbol.size(d);
    }).addPropFunctor('type', d3.symbolCircle, null, function (d) {
      return symbol.type(d);
    }).addPropFunctor('active', false).addPropFunctor('empty', false).addPropFunctor('fill', 'steelblue').addPropFunctor('stroke', function (d, i) {
      return d3.rgb($$.fill.call(this, d, i)).darker(0.3);
    }).addPropFunctor('strokeWidth', '1px');

    function frontOpacity(d, i) {
      return $$.empty.call(this, d, i) ? 0 : 1;
    }

    function symbolBig(d, i) {
      var size = $$.size.call(this, d, i),
          empty = $$.empty.call(this, d, i);
      return symbol.size(empty ? size : 2.5 * size).call(this, d, i);
    }

    function symbolSmall(d, i) {
      var size = $$.size.call(this, d, i),
          empty = $$.empty.call(this, d, i);
      return symbol.size(empty ? size / 3 : size).call(this, d, i);
    }

    function symbolNormal(d, i) {
      var size = $$.size.call(this, d, i);
      return symbol.size(size).call(this, d, i);
    }

    function mouseover(d, i) {
      var empty = $$.empty.call(this, d, i);

      d3.select(this).select('path.d2b-point-back').transition().duration(100).attr('d', symbolBig);

      d3.select(this).select('path.d2b-point-front').transition().duration(100).style('opacity', empty ? 0.5 : 1).attr('d', symbolSmall);
    }

    function mouseout(d, i) {
      var empty = $$.empty.call(this, d, i);

      d3.select(this).select('path.d2b-point-back').transition().duration(100).attr('d', symbolNormal);

      d3.select(this).select('path.d2b-point-front').transition().duration(100).style('opacity', empty ? 0 : 1).attr('d', symbolSmall);
    }

    return point;
  }

  // pie svg generator
  function svgPie () {

    var $$ = {};

    /* Update Function */
    var pie = function pie(context) {
      var selection = context.selection ? context.selection() : context;

      $$.pie.value($$.value);

      $$.arc.startAngle(function (d) {
        return d.startAngle;
      }).endAngle(function (d) {
        return d.endAngle;
      }).padAngle(function (d) {
        return d.padAngle;
      });

      var pieSvg = selection.selectAll('.d2b-pie').data(function (d) {
        return [$$.pie($$.values(d))];
      }),
          pieSvgEnter = pieSvg.enter().append('g').attr('class', 'd2b-pie');

      pieSvg = pieSvg.merge(pieSvgEnter);

      pieSvg.each(function (values) {
        var el = d3.select(this);

        // select arc group and get their old data
        var arc = el.selectAll('.d2b-pie-arc');
        var oldData = arc.data();

        arc = arc.data(values, function (d, i) {
          d.key = $$.key(d.data, i);
          return d.key;
        });

        var arcEnter = arc.enter().append('g').attr('class', 'd2b-pie-arc'),
            arcExit = arc.exit(),
            arcUpdate = arc.merge(arcEnter).order();

        arcEnter.append('path').attr('fill', function (d, i) {
          return $$.color.call(this, d.data, i);
        });

        // retrieve new data
        var newData = arcUpdate.data();

        // for new arcs, find and set the neighboring insertion point
        arcEnter.select('path').each(function (d, i) {
          this.current = findNeighborArc(i, oldData, newData);
        });

        arcExit.datum(function (d, i) {
          var data = findNeighborArc(i, newData, oldData);
          data.data = d.data;
          data.innerRadius = d.innerRadius;
          data.outerRadius = d.outerRadius;
          return data;
        });

        // start transition for exiting and updating arcs
        if (context !== selection) {
          arcExit = arcExit.transition(context);
          arcUpdate = arcUpdate.transition(context);
        }

        // transition arc path
        arcUpdate.select('path').call(tweenArc, $$.arc).attr('fill', function (d, i) {
          return $$.color.call(this, d.data, i);
        });

        arcExit.remove().select('path').call(tweenArc, $$.arc);
      });

      selection.dispatch('svg-pie-updated', { bubbles: true });

      return pie;
    };

    /* Inherit from base model */
    base(pie, $$).addProp('arc', d3.arc()).addProp('pie', d3.pie().sort(null)).addPropFunctor('values', function (d) {
      return d;
    }).addPropFunctor('key', function (d) {
      return d.label;
    }).addPropFunctor('value', function (d) {
      return d.value;
    }).addPropFunctor('color', function (d) {
      return color(d.label);
    });

    function findNeighborArc(i, data0, data1) {
      var preceding = findPreceding(i, data0, data1),
          following = findFollowing(i, data0, data1);
      if (preceding) {
        return { startAngle: preceding.endAngle, endAngle: preceding.endAngle };
      } else if (following) {
        return { startAngle: following.startAngle, endAngle: following.startAngle };
      }
      return { startAngle: 0, endAngle: 0 };
    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1) {
      var m = data0.length;
      while (--i >= 0) {
        var k = $$.key(data1[i].data, i);
        for (var j = 0; j < m; ++j) {
          if ($$.key(data0[j].data, j) === k) return data0[j];
        }
      }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1) {
      var n = data1.length,
          m = data0.length;
      while (++i < n) {
        var k = $$.key(data1[i].data, i);
        for (var j = 0; j < m; ++j) {
          if ($$.key(data0[j].data, j) === k) return data0[j];
        }
      }
    }

    return pie;
  }

  function isFinitePath (path) {
    return !(path.indexOf('NaN') > -1 || path.indexOf('Inifnity') > -1);
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var asyncGenerator = function () {
    function AwaitValue(value) {
      this.value = value;
    }

    function AsyncGenerator(gen) {
      var front, back;

      function send(key, arg) {
        return new Promise(function (resolve, reject) {
          var request = {
            key: key,
            arg: arg,
            resolve: resolve,
            reject: reject,
            next: null
          };

          if (back) {
            back = back.next = request;
          } else {
            front = back = request;
            resume(key, arg);
          }
        });
      }

      function resume(key, arg) {
        try {
          var result = gen[key](arg);
          var value = result.value;

          if (value instanceof AwaitValue) {
            Promise.resolve(value.value).then(function (arg) {
              resume("next", arg);
            }, function (arg) {
              resume("throw", arg);
            });
          } else {
            settle(result.done ? "return" : "normal", result.value);
          }
        } catch (err) {
          settle("throw", err);
        }
      }

      function settle(type, value) {
        switch (type) {
          case "return":
            front.resolve({
              value: value,
              done: true
            });
            break;

          case "throw":
            front.reject(value);
            break;

          default:
            front.resolve({
              value: value,
              done: false
            });
            break;
        }

        front = front.next;

        if (front) {
          resume(front.key, front.arg);
        } else {
          back = null;
        }
      }

      this._invoke = send;

      if (typeof gen.return !== "function") {
        this.return = undefined;
      }
    }

    if (typeof Symbol === "function" && Symbol.asyncIterator) {
      AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
        return this;
      };
    }

    AsyncGenerator.prototype.next = function (arg) {
      return this._invoke("next", arg);
    };

    AsyncGenerator.prototype.throw = function (arg) {
      return this._invoke("throw", arg);
    };

    AsyncGenerator.prototype.return = function (arg) {
      return this._invoke("return", arg);
    };

    return {
      wrap: function (fn) {
        return function () {
          return new AsyncGenerator(fn.apply(this, arguments));
        };
      },
      await: function (value) {
        return new AwaitValue(value);
      }
    };
  }();

  // copy d3.annotation instance for single use cases

  var copy = function copy(_annotation) {
    return d3SvgAnnotation.annotation().disable(_annotation.disable()).textWrap(_annotation.textWrap()).notePadding(_annotation.notePadding()).type(_annotation.type()).accessors(_annotation.accessors()).accessorsInverse(_annotation.accessorsInverse()).ids(_annotation.ids()).editMode(_annotation.editMode()).collection(_annotation.collection());
  };

  // Update a set of annotations, should only be used for point oriented annotations. (e.g. not rectangles / thresholds)
  /**
   * @param {d3 transition or selection}    context             annotation container context
   * @param {d3 annotation}                 annotation          annotation generator
   * @param {string}                        selectorClass       class by which to select the annotations
   * @param {accessor}                      getData             get annotation data array from context datum
   * @param {accessor (d, a) => {}}         getColor            get annotation color from from context datum and annotation datum
   * @param {accessor (d, a) => {}}         getTransform        get annotation transform from context datum and annotation datum
   * @param {accessor (d, a) => {}}         getTransformEnter   get annotation entrance transform from context datum and annotation datum
   */

  var update = function update(context, annotation, selectorClass) {
    var getData = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (d) {
      return d.annotation ? [d.annotation] : [];
    };
    var getColor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (d) {
      return d.color;
    };
    var getTransform = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 'translate(0, 0)';
    var getTransformEnter = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'translate(0, 0)';


    var selection = context.selection ? context.selection() : context;

    context.each(function (d) {
      var el = d3.select(this),
          data = functor(getData)(d),
          annotationSvg = el.selectAll('g.' + selectorClass).data(data),
          annotationEnter = annotationSvg.enter().append('g');

      var annotationUpdate = annotationSvg.merge(annotationEnter),
          annotationExit = annotationSvg.exit();

      annotationEnter.attr('class', selectorClass).attr('transform', function (a) {
        return functor(getTransformEnter)(d, a);
      }).style('opacity', 0);

      data.forEach(function (a) {
        a.x = 0;
        a.y = 0;
        a.color = functor(getColor)(d, a);
      });

      if (data.length && annotation) {
        annotationUpdate.selectAll('*').remove();
        annotationUpdate.call(copy(annotation).annotations(data));
      }

      // handle annotation transitions and exiting
      if (context !== selection) {
        annotationUpdate = annotationUpdate.transition(context);
        annotationExit = annotationExit.transition(context);
      }

      annotationUpdate.attr('transform', function (a) {
        return functor(getTransform)(d, a);
      }).style('opacity', 1);

      annotationExit.attr('transform', function (a) {
        return functor(getTransform)(d, a);
      }).style('opacity', 0).remove();
    });
  };

  // quick implementation of shallow object clone

  function clone(obj) {
    if (null == obj || "object" != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  // Transform x, y, x2, y2 into d3.annotation pixel attributes and update axis annotations accordingly
  /**
   * @param {d3 transition or selection}    context             annotation container context
   * @param {d3 annotation}                 annotation          annotation generator
   * @param {accessor}                      data                annotation data array
   * @param {object}                        scales              annotation scales { x, y, x2, y2 }
   */

  var updateAnnotations = function updateAxis(context, annotation, data, scales) {

    var selection = context.selection ? context.selection() : context,
        node = selection.node(),
        preScales = node.__scales || scales;

    var getTransform = function getTransform(a, scales) {
      var x = scales[a.xType],
          y = scales[a.yType],
          xVal = a.x === Infinity ? x.range()[0] : x(a.x),
          yVal = a.y === Infinity ? y.range()[0] : y(a.y),
          x2Val = a.x2 === Infinity ? x.range()[1] : x(a.x2),
          y2Val = a.y2 === Infinity ? y.range()[1] : y(a.y2);

      return 'translate(' + [isNaN(x2Val) ? xVal : Math.min(xVal, x2Val), isNaN(y2Val) ? yVal : Math.min(yVal, y2Val)] + ')';
    };

    var getSubject = function getSubject(a, scales) {
      var subjectCopy = clone(a.data.subject) || {},
          x = scales[a.xType],
          y = scales[a.yType],
          xVal = a.x === Infinity ? x.range()[0] : x(a.x),
          yVal = a.y === Infinity ? y.range()[0] : y(a.y),
          x2Val = a.x2 === Infinity ? x.range()[1] : x(a.x2),
          y2Val = a.y2 === Infinity ? y.range()[1] : y(a.y2),
          width = a.x2 ? Math.abs(xVal - x2Val) : 0,
          height = a.y2 ? Math.abs(yVal - y2Val) : 0;

      if (a.x2 && a.y2) {
        subjectCopy.width = width;
        subjectCopy.height = height;
      } else if (a.x2) {
        subjectCopy.x1 = 0;
        subjectCopy.x2 = width;
      } else if (a.y2) {
        subjectCopy.y1 = 0;
        subjectCopy.y2 = height;
      }

      subjectCopy.dx = subjectCopy.dx * width;
      subjectCopy.dy = subjectCopy.dy * height;

      return subjectCopy;
    };

    node.__scales = {
      x: scales.x.copy(),
      y: scales.y.copy(),
      x2: scales.x2.copy(),
      y2: scales.y2.copy()
    };

    var aSvg = selection.selectAll('.d2b-axis-annotation').data(data, function (d) {
      return d.key;
    }),
        aEnter = aSvg.enter().append('g'),
        aExit = aSvg.exit();

    // clear out the annotaiton before updating in case of a change in annotation type
    aSvg.selectAll('*').remove();

    aSvg = aSvg.merge(aEnter);

    aEnter.attr('class', 'd2b-axis-annotation').attr('transform', function (a) {
      return getTransform(a, preScales);
    }).style('opacity', 0);

    if (context !== selection) {
      aSvg = aSvg.transition(context);
      aExit = aExit.transition(context);
    }

    aSvg.attr('transform', function (a) {
      return getTransform(a, scales);
    }).style('opacity', 1);

    aExit.attr('transform', function (a) {
      return getTransform(a, scales);
    }).style('opacity', 0).remove();

    aSvg.each(function (a) {
      var aCopy = clone(a.data),
          aSvg = d3.select(this),
          annotationCopy = copy(annotation);

      aCopy.x = 0;
      aCopy.y = 0;
      aCopy.color = a.color;
      aCopy.subject = getSubject(a, scales);
      aCopy.dx = (aCopy.subject.dx || 0) + (a.data.dx || 0);
      aCopy.dy = (aCopy.subject.dy || 0) + (a.data.dy || 0);

      // if transitioning, custom tween the subject contents
      if (context !== selection) {
        aSvg.transition(context).tween('annotation-tween', function () {
          var _this = this;

          var i = d3.interpolateObject(this.__subject || getSubject(a, scales), aCopy.subject);
          return function (t) {
            _this.__subject = aCopy.subject = i(t);
            aCopy.dx = (aCopy.subject.dx || 0) + (a.data.dx || 0);
            aCopy.dy = (aCopy.subject.dy || 0) + (a.data.dy || 0);
            aSvg.call(annotationCopy.annotations([aCopy]));
          };
        });
      } else {
        aSvg.call(annotationCopy.annotations([aCopy]));
      }
    });
  };

  // line svg generator
  function line$1 () {
    var $$ = {};

    function getGraphs(d, i) {
      var graphs = $$.graphs(d, i).map(function (graph, i) {
        var newGraph = {
          data: graph,
          index: i,
          align: $$.align(graph, i),
          tooltipGraph: $$.tooltipGraph(graph, i),
          shift: $$.shift(graph, i),
          stackBy: $$.stackBy(graph, i),
          key: $$.key(graph, i),
          color: $$.color(graph, i)
        };
        newGraph.values = $$.values(graph, i).map(function (point, i) {
          var newPoint = {
            data: point,
            index: i,
            graph: newGraph,
            key: $$.pkey(point, i),
            x: $$.px(point, i),
            y: $$.py(point, i),
            color: $$.pcolor(point, i) || newGraph.color,
            annotation: $$.pannotation(point, i)
          };
          // initialize y values (these will be overwritten by the stack if stacking applies)
          newPoint.y1 = newPoint.y;
          newPoint.y0 = 0;
          return newPoint;
        });
        return newGraph;
      });

      stackNest.entries(graphs).forEach(function (sg) {
        if (sg.values.length > 1) stacker(sg.values);
      });

      return graphs;
    }

    /* Update Function */
    var line = function line(context) {
      var selection = context.selection ? context.selection() : context;

      var graphs = selection.selectAll('.d2b-line-graphs').data(function (d) {
        return [d];
      });

      graphs = graphs.merge(graphs.enter().append('g').attr('class', 'd2b-line-graphs'));

      var graph = graphs.selectAll('.d2b-line-graph').data(function (d, i) {
        return getGraphs(d, i);
      }, function (d) {
        return d.key;
      });

      var graphEnter = graph.enter().append('g').attr('class', 'd2b-line-graph d2b-graph').style('opacity', 0);

      graphEnter.append('path').attr('class', 'd2b-line').style('stroke', function (d) {
        return d.color;
      }).attr('d', function (d) {
        // on entered graphs initialize with the preserved scales
        // if there are any
        var graphsNode = this.parentNode.parentNode,
            x = graphsNode.__scaleX,
            y = graphsNode.__scaleY;

        return getPath.call(this, d, x || $$.x, y || $$.y);
      });

      var graphUpdate = graph.merge(graphEnter).order(),
          graphExit = graph.exit();

      var lineUpdate = graphUpdate.select('.d2b-line');

      if (context !== selection) {
        graphUpdate = graphUpdate.transition(context);
        graphExit = graphExit.transition(context);
        lineUpdate = lineUpdate.transition(context);

        var lineExit = graphExit.style('opacity', 0).select('.d2b-line');
        var tweenD = function tweenD(d) {
          var setupTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          var maxX = d3.max(d.values, function (dd) {
            return dd.x;
          });
          var minX = d3.min(d.values, function (dd) {
            return dd.x;
          });
          return d3InterpolatePath.interpolatePath(this.getAttribute('d'), getPath.call(this, d, $$.x, $$.y, setupTooltip), function (a) {
            return a.x == maxX || a.x == minX;
          });
        };

        // use d3-interpolate-path if available
        if (typeof d3InterpolatePath.interpolatePath == "undefined") {
          lineExit.attr('d', function (d) {
            return getPath.call(this, d, $$.x, $$.y);
          });
          lineUpdate.attr('d', function (d) {
            return getPath.call(this, d, $$.x, $$.y, true);
          });
        } else {
          lineExit.attrTween('d', function (d) {
            return tweenD.call(this, d);
          });
          lineUpdate.attrTween('d', function (d) {
            return tweenD.call(this, d, true);
          });
        }
      } else {
        lineUpdate.attr('d', function (d) {
          return getPath.call(this, d, $$.x, $$.y, true);
        });
      }

      graphUpdate.style('opacity', 1);

      // update graph annotations
      graphUpdate.each(function (d) {
        var graphsNode = this.parentNode,
            graph = d3.select(this),
            align = d.align,
            x = graphsNode.__scaleX || $$.x,
            y = graphsNode.__scaleY || $$.y,
            annotationValues = d.values.filter(function (v) {
          return v.annotation;
        });

        var a = graph.selectAll('.d2b-line-annotation-group').data(annotationValues, function (v) {
          return v.key;
        }),
            aEnter = a.enter().append('g');

        aEnter.attr('class', 'd2b-line-annotation-group').attr('transform', function (v) {
          return 'translate(' + (x(v.x) + d.shift) + ', ' + y(v[align]) + ')';
        });

        var aUpdate = a.merge(aEnter),
            aExit = a.exit();

        if (context !== selection) {
          aUpdate = aUpdate.transition(context);
          aExit = aExit.transition(context);
        }

        aUpdate.style('opacity', 1).attr('transform', function (v) {
          return 'translate(' + ($$.x(v.x) + d.shift) + ', ' + $$.y(v[align]) + ')';
        }).call(update, $$.annotation, 'd2b-line-annotation');

        aExit.attr('transform', function (v) {
          // join the exiting annotation with the value if it still exists
          v = d.values.filter(function (ov) {
            return v.key === ov.key;
          })[0] || v;
          return 'translate(' + ($$.x(v.x) + d.shift) + ', ' + $$.y(v[align]) + ')';
        }).style('opacity', 0).remove();
      });

      graphExit.remove().selectAll('.d2b-line-annotation-group').attr('transform', function (v) {
        return 'translate(' + ($$.x(v.x) + v.graph.shift) + ', ' + $$.y(v[v.graph.align]) + ')';
      });

      lineUpdate.style('stroke', function (d) {
        return d.color;
      });

      // Make a copy of the scales sticky on the 'graphs' node
      var xCopy = $$.x.copy(),
          yCopy = $$.y.copy();

      graphs.each(function () {
        this.__scaleX = xCopy;
        this.__scaleY = yCopy;
      });

      selection.dispatch('svg-line-updated', { bubbles: true });

      return line;
    };

    var getPath = function getPath(d, x, y) {
      var setupTooltip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      var shift = d.shift;
      if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

      if (d.tooltipGraph && setupTooltip) d.tooltipGraph.data(d.values).x(function (dd) {
        return x(dd.x) + shift;
      }).y(function (dd) {
        return y(dd[d.align]);
      }).color(function (dd) {
        return dd.color;
      });

      $$.line.x(function (dd) {
        return x(dd.x) + shift;
      }).y(function (dd) {
        return y(dd[d.align]);
      });

      var path = $$.line(d.values);

      return isFinitePath(path) ? path : this.getAttribute('d');
    };

    var stacker = stack().values(function (d) {
      return d.values;
    }).y(function (d) {
      return d.y;
    }).x(function (d) {
      return d.x;
    });

    var stackNest = d3.nest().key(function (d) {
      var key = d.stackBy;
      return key !== false && key !== null ? key : d2bid();
    });

    /* Inherit from base model */
    base(line, $$).addProp('line', d3.line()).addProp('stack', stacker.stack(), null, function (d) {
      return stacker.stack(d);
    }).addProp('x', d3.scaleLinear()).addProp('y', d3.scaleLinear()).addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addPropGet('type', 'line').addPropFunctor('graphs', function (d) {
      return d;
    })
    // graph props
    .addPropFunctor('align', 'y1').addPropFunctor('tooltipGraph', function (d) {
      return d.tooltipGraph;
    }).addPropFunctor('shift', null).addPropFunctor('stackBy', null).addPropFunctor('key', function (d) {
      return d.label;
    }).addPropFunctor('values', function (d) {
      return d.values;
    }).addPropFunctor('color', function (d) {
      return color(d.label);
    })
    // points props
    .addPropFunctor('px', function (d) {
      return d.x;
    }).addPropFunctor('py', function (d) {
      return d.y;
    }).addPropFunctor('pcolor', null).addPropFunctor('pkey', function (d, i) {
      return i;
    }).addPropFunctor('pannotation', function (d) {
      return d.annotation;
    })
    // methods
    .addMethod('getComputedGraphs', function (context) {
      return (context.selection ? context.selection() : context).data().map(function (d, i) {
        return getGraphs(d, i);
      });
    }).addMethod('getVisiblePoints', function (context) {
      var data = line.getComputedGraphs(context);
      return data.map(function (graphs) {
        return [].concat.apply([], graphs.map(function (graph) {
          return graph.values.map(function (v) {
            return { x: v.x, y: v[graph.align], graph: graph };
          });
        }));
      })[0];
    });

    return line;
  }

  // line svg generator
  function area$1 () {
    var $$ = {};

    function getGraphs(d, i) {
      var graphs = $$.graphs(d, i).map(function (graph, i) {
        var newGraph = {
          data: graph,
          index: i,
          tooltipGraph: $$.tooltipGraph(graph, i),
          shift: $$.shift(graph, i),
          stackBy: $$.stackBy(graph, i),
          key: $$.key(graph, i),
          color: $$.color(graph, i)
        };
        newGraph.values = $$.values(graph, i).map(function (point, i) {
          var newPoint = {
            data: point,
            index: i,
            graph: newGraph,
            key: $$.pkey(point, i),
            x: $$.px(point, i),
            y: $$.py(point, i),
            y0: $$.py0(point, i),
            color: $$.pcolor(point, i) || newGraph.color,
            annotations: $$.pannotations(point, i)
          };
          // initialize y1 and y0 (these will be overwritten by the stack if stacking applies)
          newPoint.y1 = newPoint.y;
          newPoint.y0 = oreq(newPoint.y0, 0);

          return newPoint;
        });
        return newGraph;
      });

      stackNest.entries(graphs).forEach(function (sg) {
        if (sg.values.length > 1) stacker(sg.values);
      });

      return graphs;
    }

    /* Update Function */
    var area = function area(context) {
      var selection = context.selection ? context.selection() : context;

      var graphs = selection.selectAll('.d2b-area-graphs').data(function (d) {
        return [d];
      });

      graphs = graphs.merge(graphs.enter().append('g').attr('class', 'd2b-area-graphs'));

      var graph = graphs.selectAll('.d2b-area-graph').data(function (d, i) {
        return getGraphs(d, i);
      }, function (d) {
        return d.key;
      });

      var graphEnter = graph.enter().append('g').attr('class', 'd2b-area-graph d2b-graph').style('opacity', 0);

      graphEnter.append('path').attr('class', 'd2b-area').style('fill', function (d) {
        return d.color;
      }).attr('d', function (d) {
        // on entered graphs initialize with the preserved scales
        // if there are any
        var graphsNode = this.parentNode.parentNode,
            x = graphsNode.__scaleX,
            y = graphsNode.__scaleY;

        return getPath.call(this, d, x || $$.x, y || $$.y);
      });

      var graphUpdate = graph.merge(graphEnter).order(),
          graphExit = graph.exit();

      var areaUpdate = graphUpdate.select('.d2b-area');

      if (context !== selection) {
        graphUpdate = graphUpdate.transition(context);
        graphExit = graphExit.transition(context);
        areaUpdate = areaUpdate.transition(context);

        var areaExit = graphExit.style('opacity', 0).select('.d2b-area');
        var tweenD = function tweenD(d) {
          var setupTooltip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

          var maxX = d3.max(d.values, function (dd) {
            return dd.x;
          });
          var minX = d3.min(d.values, function (dd) {
            return dd.x;
          });
          return d3InterpolatePath.interpolatePath(this.getAttribute('d'), getPath.call(this, d, $$.x, $$.y, setupTooltip), function (a) {
            return a.x == maxX || a.x == minX;
          });
        };

        // use d3-interpolate-path if available
        if (typeof d3InterpolatePath.interpolatePath == "undefined") {
          areaExit.attr('d', function (d) {
            return getPath.call(this, d, $$.x, $$.y);
          });
          areaUpdate.attr('d', function (d) {
            return getPath.call(this, d, $$.x, $$.y, true);
          });
        } else {
          areaExit.attrTween('d', function (d) {
            return tweenD.call(this, d);
          });
          areaUpdate.attrTween('d', function (d) {
            return tweenD.call(this, d, true);
          });
        }
      } else {
        areaUpdate.attr('d', function (d) {
          return getPath.call(this, d, $$.x, $$.y, true);
        });
      }

      graphUpdate.style('opacity', 1);

      // update graph annotations
      graphUpdate.each(function (d) {
        var graphsNode = this.parentNode,
            graph = d3.select(this),
            x = graphsNode.__scaleX || $$.x,
            y = graphsNode.__scaleY || $$.y;

        ['y0', 'y1'].forEach(function (align) {
          var annotationValues = d.values.filter(function (v) {
            return (v.annotations || []).filter(function (a) {
              return a.location === align;
            }).length;
          });

          var a = graph.selectAll('.d2b-area-annotation-group-' + align).data(annotationValues, function (v) {
            return v.key;
          }),
              aEnter = a.enter().append('g');

          aEnter.attr('class', 'd2b-area-annotation-group-' + align).attr('transform', function (v) {
            return 'translate(' + (x(v.x) + d.shift) + ', ' + y(v[align]) + ')';
          });

          var aUpdate = a.merge(aEnter),
              aExit = a.exit();

          if (context !== selection) {
            aUpdate = aUpdate.transition(context);
            aExit = aExit.transition(context);
          }

          aUpdate.style('opacity', 1).attr('transform', function (v) {
            return 'translate(' + ($$.x(v.x) + d.shift) + ', ' + $$.y(v[align]) + ')';
          }).call(update, $$.annotation, 'd2b-area-annotation', function (v) {
            return v.annotations.filter(function (a) {
              return a.location === align;
            });
          });

          aExit.attr('transform', function (v) {
            // join the exiting annotation with the value if it still exists
            v = d.values.filter(function (ov) {
              return v.key === ov.key;
            })[0] || v;
            return 'translate(' + ($$.x(v.x) + d.shift) + ', ' + $$.y(v[align]) + ')';
          }).style('opacity', 0).remove();
        });
      });

      graphExit.remove();

      graphExit.selectAll('.d2b-area-annotation-group-y0').attr('transform', function (v) {
        return 'translate(' + ($$.x(v.x) + v.graph.shift) + ', ' + $$.y(v.y0) + ')';
      });

      graphExit.selectAll('.d2b-area-annotation-group-y1').attr('transform', function (v) {
        return 'translate(' + ($$.x(v.x) + v.graph.shift) + ', ' + $$.y(v.y1) + ')';
      });

      areaUpdate.style('fill', function (d) {
        return d.color;
      });

      // Make a copy of the scales sticky on the 'graphs' node
      var xCopy = $$.x.copy(),
          yCopy = $$.y.copy();

      graphs.each(function () {
        this.__scaleX = xCopy;
        this.__scaleY = yCopy;
      });

      selection.dispatch('svg-area-updated', { bubbles: true });

      return area;
    };

    var getPath = function getPath(d, x, y) {
      var setupTooltip = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


      var shift = d.shift;
      if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

      if (d.tooltipGraph && setupTooltip) d.tooltipGraph.data(d.values).x(function (p) {
        return x(p.x) + shift;
      }).y(function (p) {
        return y(p.y1);
      }).color(function (p) {
        return p.color;
      });

      $$.area.x(function (p) {
        return x(p.x) + shift;
      }).y0(function (p) {
        return y(p.y0);
      }).y1(function (p) {
        return y(p.y1);
      });

      var path = $$.area(d.values);

      return isFinitePath(path) ? path : this.getAttribute('d');
    };

    var stacker = stack().values(function (d) {
      return d.values;
    }).y(function (d) {
      return d.y;
    }).x(function (d) {
      return d.x;
    });

    var stackNest = d3.nest().key(function (d) {
      var key = d.stackBy;
      return key !== false && key !== null ? key : d2bid();
    });

    /* Inherit from base model */
    base(area, $$).addProp('area', d3.area()).addProp('stack', stacker.stack(), null, function (d) {
      return stacker.stack(d);
    }).addProp('x', d3.scaleLinear()).addProp('y', d3.scaleLinear()).addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addPropGet('type', 'area').addPropFunctor('graphs', function (d) {
      return d;
    })
    // graph props
    .addPropFunctor('tooltipGraph', function (d) {
      return d.tooltipGraph;
    }).addPropFunctor('shift', null).addPropFunctor('stackBy', null).addPropFunctor('key', function (d) {
      return d.label;
    }).addPropFunctor('values', function (d) {
      return d.values;
    }).addPropFunctor('color', function (d) {
      return color(d.label);
    })
    // points props
    .addPropFunctor('px', function (d) {
      return d.x;
    }).addPropFunctor('py', function (d) {
      return d.y;
    }).addPropFunctor('py0', function (d) {
      return d.y0;
    }).addPropFunctor('pcolor', null).addPropFunctor('pkey', function (d, i) {
      return i;
    }).addPropFunctor('pannotations', function (d) {
      return d.annotations;
    })
    // methods
    .addMethod('getComputedGraphs', function (context) {
      return (context.selection ? context.selection() : context).data().map(function (d, i) {
        return getGraphs(d, i);
      });
    }).addMethod('getVisiblePoints', function (context) {
      var data = area.getComputedGraphs(context);
      return data.map(function (graphs) {
        var y0s = [].concat.apply([], graphs.map(function (graph) {
          return graph.values.map(function (v) {
            return { x: v.x, y: v.y0, graph: graph };
          });
        }));
        var y1s = [].concat.apply([], graphs.map(function (graph) {
          return graph.values.map(function (v) {
            return { x: v.x, y: v.y1, graph: graph };
          });
        }));
        return y0s.concat(y1s);
      })[0];
    });

    return area;
  }

  // scatter svg generator
  function scatter () {
    var $$ = {};

    function getGraphs(d, i) {
      var graphs = $$.graphs(d, i).map(function (graph, i) {
        var newGraph = {
          data: graph,
          index: i,
          align: $$.align(graph, i),
          tooltipGraph: $$.tooltipGraph(graph, i),
          shift: $$.shift(graph, i),
          stackBy: $$.stackBy(graph, i),
          key: $$.key(graph, i),
          color: $$.color(graph, i),
          symbol: $$.symbol(graph, i)
        };
        newGraph.values = $$.values(graph, i).map(function (point, i) {
          var newPoint = {
            data: point,
            index: i,
            graph: newGraph,
            x: $$.px(point, i),
            y: $$.py(point, i),
            color: $$.pcolor(point, i) || newGraph.color,
            symbol: $$.psymbol(point, i) || newGraph.symbol,
            key: $$.pkey(point, i),
            size: $$.psize(point, i),
            annotation: $$.pannotation(point, i)
          };
          // initialize y values (these will be overwritten by the stack if stacking applies)
          newPoint.y1 = newPoint.y;
          newPoint.y0 = 0;
          return newPoint;
        });
        return newGraph;
      });

      stackNest.entries(graphs).forEach(function (sg) {
        if (sg.values.length > 1) stacker(sg.values);
      });

      return graphs;
    }

    /* Update Function */
    var scatter = function scatter(context) {
      var selection = context.selection ? context.selection() : context;

      var graphs = selection.selectAll('.d2b-scatter-graphs').data(function (d) {
        return [d];
      });

      graphs = graphs.merge(graphs.enter().append('g').attr('class', 'd2b-scatter-graphs'));

      var graph = graphs.selectAll('.d2b-scatter-graph').data(function (d, i) {
        return getGraphs(d, i);
      }, function (d) {
        return d.key;
      });

      var graphEnter = graph.enter().append('g').attr('class', 'd2b-scatter-graph d2b-graph').style('opacity', 0);

      var graphUpdate = graph.merge(graphEnter).order(),
          graphExit = graph.exit();

      if (context !== selection) {
        graphUpdate = graphUpdate.transition(context);
        graphExit = graphExit.transition(context);

        graphExit.style('opacity', 0)
        // points needs to be transitioned to where there new locations "would be"
        // if the graphs had been included
        .each(function (d) {
          var el = d3.select(this),
              x = $$.x,
              y = $$.y;

          var pointExit = el.selectAll('.d2b-scatter-point');

          if (context !== selection) pointExit = pointExit.transition(context);

          var shift = d.shift;
          if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

          pointExit.style('opacity', 0).call(pointTransform, x, y, shift, d.align).remove();
        });
      }

      graphUpdate.style('opacity', 1);

      graphExit.remove();

      graphUpdate.each(function (d) {
        var el = d3.select(this),
            x = $$.x,
            y = $$.y,
            graphsNode = this.parentNode,
            preX = graphsNode.__scaleX || x,
            preY = graphsNode.__scaleY || y;

        var shift = d.shift;
        if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

        var preShift = shift;
        if (preShift === null) shift = preX.bandwidth ? preX.bandwidth() / 2 : 0;

        if (d.tooltipGraph) d.tooltipGraph.data(d.values).x(function (p) {
          return x(p.x) + shift;
        }).y(function (p) {
          return y(p.y);
        }).color(function (p) {
          return p.color;
        });

        $$.point.fill(function (p) {
          return p.color;
        }).type(function (p) {
          return p.symbol;
        }).size(function (p) {
          return p.size;
        });

        var point = el.selectAll('.d2b-scatter-point').data(d.values, function (p) {
          return p.key;
        });
        var pointEnter = point.enter().append('g').attr('class', 'd2b-scatter-point');

        var pointUpdate = point.merge(pointEnter).order(),
            pointExit = point.exit();

        // define transitions if the parent context was a transition
        if (context !== selection) {
          pointUpdate = pointUpdate.transition(context);
          pointExit = pointExit.transition(context);
        }

        // if band scale is used enter points at their new location
        if (preX.bandwidth || preY.bandwidth || x.bandwidth || y.bandwidth) {
          pointEnter.call(pointTransform, x, y, shift, d.align);
        } else {
          pointEnter.call(pointTransform, preX, preY, preShift, d.align);
        }

        // enter update exit point configuration
        pointEnter.style('opacity', 0);

        pointUpdate.style('opacity', 1).call($$.point).call(pointTransform, x, y, shift, d.align);

        pointExit.style('opacity', 0).call(pointTransform, x, y, shift, d.align).remove();

        // update annotations
        update(pointUpdate, $$.annotation, 'd2b-scatter-annotation');
      });

      // Make a copy of the scales sticky on the 'graphs' node
      graphs.each(function () {
        this.__scaleX = $$.x.copy();
        this.__scaleY = $$.y.copy();
      });

      selection.dispatch('svg-scatter-updated', { bubbles: true });

      return scatter;
    };

    function pointTransform(transition, x, y, shift, align) {
      transition.attr('transform', function (p) {
        var yPos = y(p[align]),
            xPos = x(p.x) + shift;
        return isFinite(xPos) && isFinite(yPos) ? 'translate(' + [xPos, yPos] + ')' : this.getAttribute('transform');
      });
    }

    var stacker = stack().values(function (d) {
      return d.values;
    }).y(function (d) {
      return d.y;
    }).x(function (d) {
      return d.x;
    });

    var stackNest = d3.nest().key(function (d) {
      var key = d.stackBy;
      return key !== false && key !== null ? key : d2bid();
    });

    /* Inherit from base model */
    base(scatter, $$).addProp('point', point().active(true)).addProp('stack', stacker.stack(), null, function (d) {
      return stacker.stack(d);
    }).addProp('x', d3.scaleLinear()).addProp('y', d3.scaleLinear()).addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addPropGet('type', 'scatter').addPropFunctor('graphs', function (d) {
      return d;
    })
    // graph props
    .addPropFunctor('align', 'y1').addPropFunctor('tooltipGraph', function (d) {
      return d.tooltipGraph;
    }).addPropFunctor('shift', null).addPropFunctor('stackBy', null).addPropFunctor('key', function (d) {
      return d.label;
    }).addPropFunctor('values', function (d) {
      return d.values;
    }).addPropFunctor('color', function (d) {
      return color(d.label);
    }).addPropFunctor('symbol', function () {
      return d3.symbolCircle;
    })
    // points props
    .addPropFunctor('px', function (d) {
      return d.x;
    }).addPropFunctor('py', function (d) {
      return d.y;
    }).addPropFunctor('pcolor', null).addPropFunctor('psymbol', null).addPropFunctor('pkey', function (d, i) {
      return i;
    }).addPropFunctor('psize', 25).addPropFunctor('pannotation', function (d) {
      return d.annotation;
    })
    // methods
    .addMethod('getComputedGraphs', function (context) {
      return (context.selection ? context.selection() : context).data().map(function (d, i) {
        return getGraphs(d, i);
      });
    }).addMethod('getVisiblePoints', function (context) {
      var data = scatter.getComputedGraphs(context);
      return data.map(function (graphs) {
        return [].concat.apply([], graphs.map(function (graph) {
          return graph.values.map(function (v) {
            return { x: v.x, y: v[graph.align], graph: graph };
          });
        }));
      })[0];
    });

    return scatter;
  }

  // bar svg generator
  function bar () {
    var $$ = {};

    function getOrientMap(orient) {
      return orient === 'horizontal' ? { rotate: true, px: 'py', py: 'px', x: 'y', y: 'x', w: 'height', h: 'width' } : { rotate: false, px: 'px', py: 'py', x: 'x', y: 'y', w: 'width', h: 'height' };
    }

    function getGraphs(d, i) {
      var orientMap = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getOrientMap($$.orient(d, i));


      var graphs = $$.graphs(d, i).map(function (graph, i) {

        var newGraph = {
          data: graph,
          index: i,
          tooltipGraph: $$.tooltipGraph(graph, i),
          shift: $$.shift(graph, i),
          stackBy: $$.stackBy(graph, i),
          key: $$.key(graph, i),
          color: $$.color(graph, i)
        };
        newGraph.values = $$.values(graph, i).map(function (point, i) {
          return {
            data: point,
            index: i,
            graph: newGraph,
            key: $$.pkey(point, i),
            x: $$.px(point, i),
            y: $$.py(point, i),
            centered: $$.pcentered(point, i),
            color: $$.pcolor(point, i) || newGraph.color,
            annotation: $$.pannotation(point, i)
          };
        });
        return newGraph;
      });

      stacker.x(function (d) {
        return d[orientMap.x];
      }).y(function (d) {
        return d[orientMap.y];
      });
      stackNest.entries(graphs).forEach(function (sg, si) {
        return stacker.out(buildOut(si))(sg.values);
      });

      modifyBaseline(graphs, $$.baseline(d, i, [].concat.apply([], graphs.map(function (g) {
        return g.values.map(function (v) {
          return v.extent[1];
        });
      }))));

      return graphs;
    }

    /* Update Function */
    var bar = function bar(context) {
      var selection = context.selection ? context.selection() : context;

      var scales = { x: $$.x, y: $$.y };
      // iterate through each selection element
      selection.each(function (d, i) {
        var orient = $$.orient(d, i),
            orientMap = getOrientMap(orient),
            graphs = getGraphs(d, i, orientMap),
            x = scales[orientMap.x].copy(),
            _y = scales[orientMap.y].copy();

        var padding = $$.padding(d, i),
            groupPadding = $$.groupPadding(d, i),
            bandwidth = $$.bandwidth(d, i);

        bandwidth = (1 - padding) * oreq(bandwidth || getBandwidth(x, graphs, orientMap));

        var stacking = stackNest.entries(graphs);

        var barWidth = bandwidth / Math.max(1, stacking.length);

        groupPadding = barWidth * groupPadding;

        // get custom scales
        var base = getBaseScale(x, bandwidth, barWidth, groupPadding),
            extent = getExtentScale(_y);

        barWidth -= groupPadding * 2;

        var graphsSVG = d3.select(this).selectAll('.d2b-bar-graphs').data(function (d) {
          return [d];
        });

        graphsSVG = graphsSVG.merge(graphsSVG.enter().append('g').attr('class', 'd2b-bar-graphs'));

        var graphsNode = graphsSVG.node(),
            preBase = graphsNode.__scaleBase || base,
            preY = graphsNode.__scaleY || _y,
            preX = graphsNode.__scaleX || x,
            preBarWidth = graphsNode.__barWidth || barWidth;

        var graph = graphsSVG.selectAll('.d2b-bar-graph').data(graphs.slice().reverse(), function (d) {
          return d.key;
        });

        var graphEnter = graph.enter().append('g').attr('class', 'd2b-bar-graph d2b-graph');

        var graphUpdate = graph.merge(graphEnter).order(),
            graphExit = graph.exit();

        if (context !== selection) {
          graphUpdate = graphUpdate.transition(context);
          graphExit = graphExit.transition(context);

          graphExit.each(function (d) {
            var shift = d.shift;
            if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

            var barExit = d3.select(this).selectAll('.d2b-bar-group').transition(context);

            if (preX.bandwidth || preY.bandwidth || x.bandwidth || _y.bandwidth) {
              // exit
              barExit.style('opacity', 0);
            } else {
              // exit
              barExit.call(updateBars, {
                opacity: 0,
                x: function x(point) {
                  return base(point, shift);
                },
                y: function y() {
                  return _y(0);
                },
                width: barWidth,
                height: function height() {
                  return 0;
                },
                graph: d,
                orientMap: orientMap
              });
            }
          });
        }

        graphExit.remove();

        // iterate through graph containers
        graphUpdate.each(function (d) {
          var graph = d3.select(this);

          var shift = d.shift;
          if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

          // enter update exit bars
          var bar = graph.selectAll('.d2b-bar-group').data(d.values, function (v) {
            return v.key;
          });
          var barEnter = bar.enter().append('g').attr('class', 'd2b-bar-group');
          barEnter.append('rect');
          barEnter.append('g').attr('class', 'd2b-bar-annotation-group');
          var barUpdate = bar.merge(barEnter).order(),
              barExit = bar.exit();

          if (d.tooltipGraph) d.tooltipGraph.data(d.values)[orientMap.x](function (point) {
            return x(point.base) + shift;
          })[orientMap.y](function (point) {
            return extent(point)[1];
          }).color(function (point) {
            return point.color;
          });

          if (context !== selection) {
            barUpdate = barUpdate.transition(context);
            barExit = barExit.transition(context);
          }

          barEnter.attr('class', 'd2b-bar-group');

          barExit.remove();

          if (preX.bandwidth || preY.bandwidth || x.bandwidth || _y.bandwidth) {

            // enter
            barEnter.call(updateBars, {
              opacity: 0,
              x: function x(point) {
                return base(point, shift);
              },
              y: function y() {
                return _y(0);
              },
              width: preBarWidth,
              height: function height() {
                return 0;
              },
              graph: d,
              orientMap: orientMap
            });

            // exit
            barExit.style('opacity', 0);
          } else {

            // enter
            barEnter.call(updateBars, {
              opacity: 0,
              x: function x(point) {
                return preBase(point, shift);
              },
              y: function y() {
                return preY(0);
              },
              width: preBarWidth,
              height: function height() {
                return 0;
              },
              graph: d,
              orientMap: orientMap
            });

            // exit
            barExit.call(updateBars, {
              opacity: 0,
              x: function x(point) {
                return base(point, shift);
              },
              y: function y() {
                return _y(0);
              },
              width: barWidth,
              height: function height() {
                return 0;
              },
              graph: d,
              orientMap: orientMap
            });
          }

          // update
          barUpdate.call(updateBars, {
            opacity: 1,
            x: function x(point) {
              return base(point, shift);
            },
            y: function y(point) {
              return extent.sorted(point)[0];
            },
            width: barWidth,
            height: function height(d) {
              return extent.sorted(d)[1] - extent.sorted(d)[0];
            },
            graph: d,
            orientMap: orientMap
          });
        });

        // Make a copy of the scales sticky on the 'graphs' node
        graphsNode.__scaleY = _y;
        graphsNode.__scaleX = x;
        graphsNode.__scaleBase = base;
        graphsNode.__barWidth = barWidth;
      });

      selection.dispatch('svg-bar-updated', { bubbles: true });

      return bar;
    };

    var stacker = stack().values(function (d) {
      return d.values;
    });

    var stackNest = d3.nest().key(function (d) {
      return d.stackBy;
    });

    // custom stacker build out that separates the negative and possitive bars
    function buildOut(stackIndex) {
      var offsets = {};
      return function (d, y0, y1, x) {
        var offset = offsets[x] = offsets[x] || [0, 0];

        d.dy = y1 - y0;
        d.stackIndex = stackIndex;
        d.base = x;
        if (d.dy > 0) d.extent = [offset[0], offset[0] += d.dy];else d.extent = [offset[1], offset[1] += d.dy];
      };
    }

    function updateBars(bars, options) {
      bars.style('opacity', options.opacity).call(transformBar, options).select('rect').attr('fill', function (point) {
        return point.color;
      }).attr(options.orientMap.w, options.width).attr(options.orientMap.h, options.height);

      bars.select('.d2b-bar-annotation-group').call(transformAnnotationGroup, options).call(update, $$.annotation, 'd2b-bar-annotation');
    }

    // transform bar position
    function transformBar(transition, options) {
      transition.attr('transform', function (d) {
        var xPos = options[options.orientMap.x](d),
            yPos = options[options.orientMap.y](d);
        return 'translate(' + [xPos, yPos] + ')';
      });
    }

    // transform annotation group position
    function transformAnnotationGroup(transition, options) {
      transition.attr('transform', function (d) {
        var pos = { x: options.width / 2, y: d.extent[0] < d.extent[1] ? 0 : options.height(d) };
        return 'translate(' + [pos[options.orientMap.x], pos[options.orientMap.y]] + ')';
      });
    }

    function getBaseScale(x, bandwidth, barWidth, groupPadding) {
      return function (point, shift) {
        var barShift = point.centered ? shift - bandwidth / 4 : shift - bandwidth / 2 + point.stackIndex * barWidth + groupPadding;
        return x(point.base) + barShift;
      };
    }

    function getExtentScale(y) {
      var scale = function scale(point) {
        return [y(point.extent[0]), y(point.extent[1])];
      };

      scale.sorted = function (point) {
        return scale(point).slice().sort(d3.ascending);
      };

      return scale;
    }

    // find closes non equal point pixel distance on the base axis
    function getBandwidth(x, graphs, orientMap) {
      var xVals = [],
          bandwidth = Infinity;
      graphs.forEach(function (graph) {
        var values = graph.values,
            range = x.range();

        bandwidth = Math.min(bandwidth, Math.abs(range[1] - range[0]));

        values.forEach(function (point) {
          xVals.push(x(point[orientMap.x]));
        });
      });

      xVals.sort(d3.ascending);

      for (var i = 0; i < xVals.length - 1; i++) {
        if (xVals[i + 1] === xVals[i]) continue;
        bandwidth = Math.min(xVals[i + 1] - xVals[i], bandwidth);
      }

      return bandwidth === Infinity ? 0 : bandwidth;
    }

    function modifyBaseline(graphs, baseline) {
      // if baseline is null find it dynamically
      if (baseline === null) {
        var values = [].concat.apply([], graphs.map(function (d) {
          return d.values;
        }));
        var range = d3.extent(values.map(function (d) {
          return d.extent[1];
        }));

        if (range[1] < 0) baseline = range[1];else if (range[0] > 0) baseline = range[0];else baseline = 0;
      }

      graphs.forEach(function (graph) {
        graph.values.forEach(function (value) {
          if (Math.abs(value.extent[0]) < Math.abs(baseline)) {
            value.extent[0] = baseline;
          }
        });
      });
    }

    /* Inherit from base model */
    base(bar, $$).addProp('x', d3.scaleLinear()).addProp('y', d3.scaleLinear()).addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addPropGet('type', 'bar').addPropFunctor('graphs', function (d) {
      return d;
    }).addPropFunctor('padding', 0.5).addPropFunctor('groupPadding', 0).addPropFunctor('bandwidth', null).addPropFunctor('baseline', 0)
    // graph props
    .addPropFunctor('tooltipGraph', function (d) {
      return d.tooltipGraph;
    }).addPropFunctor('orient', 'vertical').addPropFunctor('shift', null).addPropFunctor('stackBy', function (d, i) {
      return i;
    }).addPropFunctor('key', function (d) {
      return d.label;
    }).addPropFunctor('values', function (d) {
      return d.values;
    }, null).addPropFunctor('color', function (d) {
      return color(d.label);
    })
    // point props
    .addPropFunctor('px', function (d) {
      return d.x;
    }).addPropFunctor('py', function (d) {
      return d.y;
    }).addPropFunctor('pcentered', false).addPropFunctor('pcolor', null).addPropFunctor('pkey', function (d, i) {
      return i;
    }).addPropFunctor('pannotation', function (d) {
      return d.annotation;
    })
    // methods
    .addMethod('getComputedGraphs', function (context) {
      return (context.selection ? context.selection() : context).data().map(function (d, i) {
        return getGraphs(d, i);
      });
    }).addMethod('getVisiblePoints', function (context) {
      return (context.selection ? context.selection() : context).data().map(function (d, i) {
        var orient = $$.orient(d, i),
            orientMap = getOrientMap(orient),
            graphs = getGraphs(d, i, orientMap);

        var extent0 = [].concat.apply([], graphs.map(function (graph) {
          return graph.values.map(function (v) {
            var point = {};
            point['' + orientMap.x] = v.base;
            point['' + orientMap.y] = v.extent[0];
            point.graph = graph;
            return point;
          });
        }));
        var extent1 = [].concat.apply([], graphs.map(function (graph) {
          return graph.values.map(function (v) {
            var point = {};
            point['' + orientMap.x] = v.base;
            point['' + orientMap.y] = v.extent[1];
            point.graph = graph;
            return point;
          });
        }));

        return extent0.concat(extent1);
      })[0];
    });

    return bar;
  }

  //original stacking function, might revert to this one instead of d3 stack layout in the future
  // // create stack layout based on $$.stack key accessor
  // const stacking = stackNest.entries(data);
  // const bandwidth = (1 - $$.padding.call(this, data, i)) * ($$.bandwidth.call(this, data, i) || getBandwidth(data, orient));
  // const barWidth = bandwidth / stacking.length;
  // const groupPadding = barWidth * $$.groupPadding.call(this, data, i);
  //
  // stacking.forEach((stack, stackIndex) => {
  //   // group values in this stack by positive 'sp' and negative 'sn' values
  //   const sp = {}, sn = {};
  //
  //   stack.values.forEach((graph, graphIndex) => {
  //     graphIndex = data.indexOf(graph);
  //     const values = $$.values.call(data, graph, graphIndex),
  //           x = $$[orient.x].call(data, graph, graphIndex),
  //           y = $$[orient.y].call(data, graph, graphIndex),
  //           offset = $$.offset.call(data, graph, graphIndex) || (x.rangeBand)? x.rangeBand() / 2 : 0;
  //     values.forEach((d, i) => {
  //       const px = $$[orient.px].call(graph, d, i),
  //             py = $$[orient.py].call(graph, d, i),
  //             barOffset = offset - bandwidth / 2 + stackIndex * barWidth + groupPadding;
  //
  //       d.base = x(px) + barOffset;
  //       if (py > 0) d.extent = [y(sp[px] = sp[px] || 0), y(sp[px] = sp[px] + py)];
  //       else d.extent = [y(sn[px] = sn[px] || 0), y(sn[px] = sn[px] + py)];
  //       d.extent.sort(d3.ascending);
  //     });
  //   });
  // });

  // creates a box and whisker set for box plots

  // box svg generator
  function box () {
    var $$ = {};

    /* Update Function */
    var box = function box(context) {
      var selection = context.selection ? context.selection() : context,
          scale = $$.scale,
          enterScale = $$.enterScale || scale,
          valueFormat = $$.valueFormat,
          vertical = $$.orient === 'vertical',
          orient = vertical ? { x: 'x', y: 'y', x1: 'x1', x2: 'x2', y1: 'y1', y2: 'y2', width: 'width', height: 'height', cx: 'cx', cy: 'cy', translate: function translate(x, y) {
          return 'translate(' + x + ', ' + y + ')';
        } } : { x: 'y', y: 'x', x1: 'y1', x2: 'y2', y1: 'x1', y2: 'x2', width: 'height', height: 'width', cx: 'cy', cy: 'cx', translate: function translate(x, y) {
          return 'translate(' + y + ', ' + x + ')';
        } };

      // setup box-group and extract all necessary properties
      var group = selection.selectAll('.d2b-box').data(function (d, i) {
        d = $$.data(d, i);

        var outliers = $$.outliers(d, i) || [],
            minimum = $$.minimum(d, i),
            maximum = $$.maximum(d, i);

        return [{
          data: d,
          index: i,
          median: $$.median(d, i),
          upperQuartile: $$.upperQuartile(d, i),
          lowerQuartile: $$.lowerQuartile(d, i),
          minimum: minimum,
          maximum: maximum,
          outliers: outliers,
          maxOutliers: outliers.filter(function (d) {
            return d > maximum;
          }),
          minOutliers: outliers.filter(function (d) {
            return d < minimum;
          }),
          color: $$.color(d, i),
          width: $$.width(d, i),
          annotations: $$.annotations(d, i)
        }];
      });
      var groupEnter = group.enter().append('g').attr('class', 'd2b-box');
      var groupUpdate = group.merge(groupEnter).order();

      // setup box-center
      var center = groupUpdate.selectAll('.d2b-box-center').data(function (d) {
        return [d];
      });
      var centerEnter = center.enter().append('line').attr(orient.x1, 0).attr(orient.x2, 0).attr(orient.y1, function (d) {
        return enterScale(d.minimum);
      }).attr(orient.y2, function (d) {
        return enterScale(d.maximum);
      }).attr('class', 'd2b-box-center');
      var centerUpdate = center.merge(centerEnter);

      // setup box-rect
      var rect = groupUpdate.selectAll('.d2b-box-rect').data(function (d) {
        return [d];
      });
      var rectEnter = rect.enter().append('rect').attr('class', 'd2b-box-rect').attr(orient.width, function (d) {
        return d.width;
      }).attr(orient.height, function (d) {
        return Math.abs(enterScale(d.upperQuartile) - enterScale(d.lowerQuartile));
      }).attr(orient.x, function (d) {
        return -d.width / 2;
      }).attr(orient.y, function (d) {
        return Math.min(enterScale(d.upperQuartile), enterScale(d.lowerQuartile));
      });
      var rectUpdate = rect.merge(rectEnter);

      // enter, update, exit all outliers
      ['max', 'min'].forEach(function (outlierType) {
        var outlier = groupUpdate.selectAll('.d2b-box-' + outlierType + '-outlier').data(function (d) {
          return d[outlierType + 'Outliers'].map(function (o) {
            return {
              outlier: o,
              box: d
            };
          });
        });
        var outlierEnter = outlier.enter().append('circle').style('opacity', 0).attr('r', function (d) {
          return d.box.width / 5;
        }).attr(orient.cx, 0).attr(orient.cy, function (d) {
          return enterScale(d.outlier);
        }).attr('class', 'd2b-box-outlier d2b-box-' + outlierType + '-outlier');
        var outlierUpdate = outlier.merge(outlierEnter),
            outlierExit = outlier.exit();

        if (context !== selection) {
          outlierUpdate = outlierUpdate.transition(context);
          outlierExit = outlierExit.transition(context);
        }

        outlierUpdate.style('opacity', 1).attr('stroke', function (d) {
          return d.box.color;
        }).attr('r', function (d) {
          return d.box.width / 5;
        }).attr(orient.cx, 0).attr(orient.cy, function (d) {
          return scale(d.outlier);
        });

        outlierExit.attr(orient.cx, 0).attr(orient.cy, function (d) {
          return scale(d.outlier);
        }).style('opacity', 0).remove();
      });

      // enter, update all dashes
      ['maximum', 'median', 'minimum'].forEach(function (dashType) {
        var dash = groupUpdate.selectAll('.d2b-box-dash-' + dashType).data(function (d) {
          return [d];
        });
        var dashEnter = dash.enter().append('line').attr('class', 'd2b-box-dash d2b-box-dash-' + dashType).attr(orient.x1, function (d) {
          return -d.width / 2;
        }).attr(orient.x2, function (d) {
          return d.width / 2;
        }).attr(orient.y1, function (d) {
          return enterScale(d[dashType]);
        }).attr(orient.y2, function (d) {
          return enterScale(d[dashType]);
        });
        var dashUpdate = dash.merge(dashEnter);

        if (context !== selection) dashUpdate = dashUpdate.transition(context);

        dashUpdate.attr('stroke', function (d) {
          return d.color;
        }).attr(orient.x1, function (d) {
          return -d.width / 2;
        }).attr(orient.x2, function (d) {
          return d.width / 2;
        }).attr(orient.y1, function (d) {
          return scale(d[dashType]);
        }).attr(orient.y2, function (d) {
          return scale(d[dashType]);
        });
      });

      // enter, update all labels and annotations
      ['maximum', 'upperQuartile', 'median', 'lowerQuartile', 'minimum'].forEach(function (textType, i) {
        var label = groupUpdate.selectAll('.d2b-box-label-group-' + textType).data(function (d) {
          return [d];
        });
        var labelEnter = label.enter().append('g').attr('class', 'd2b-box-label-group d2b-box-label-group-' + textType).attr('transform', function (d) {
          return orient.translate(0, enterScale(d[textType]));
        });

        labelEnter.append('text').attr('class', 'd2b-box-label').attr(orient.x, function (d) {
          return (3 + d.width / 2) * (i % 2 === 0 ? 1 : -1);
        }).style('text-anchor', i % 2 === 0 ? 'start' : 'end');

        var labelUpdate = label.merge(labelEnter);

        if (context !== selection) labelUpdate = labelUpdate.transition(context);

        labelUpdate.attr('transform', function (d) {
          return orient.translate(0, scale(d[textType]));
        }).call(update, $$.annotation, 'd2b-box-annotation', function (d) {
          return (d.annotations || []).filter(function (a) {
            return a.location === textType;
          });
        });

        var labelText = labelUpdate.select('.d2b-box-label').text(function (d) {
          return valueFormat(d[textType]);
        });

        if (vertical) {
          labelText.select().style('text-anchor', i % 2 === 0 ? 'start' : 'end').style('dominant-baseline', 'middle').attr(orient.x, function (d) {
            return (3 + d.width / 2) * (i % 2 === 0 ? 1 : -1);
          });
        } else {
          labelText.style('text-anchor', 'middle').style('dominant-baseline', i % 2 === 0 ? 'baseline' : 'hanging').attr(orient.x, function (d) {
            return (3 + d.width / 2) * (i % 2 === 0 ? -1 : 1);
          });
        }
      });

      if (context !== selection) {
        rectUpdate = rectUpdate.transition(context);
        centerUpdate = centerUpdate.transition(context);
      }

      rectUpdate.attr(orient.x, function (d) {
        return -d.width / 2;
      }).attr(orient.y, function (d) {
        return Math.min(scale(d.upperQuartile), scale(d.lowerQuartile));
      }).attr(orient.width, function (d) {
        return d.width;
      }).attr(orient.height, function (d) {
        return Math.abs(scale(d.upperQuartile) - scale(d.lowerQuartile));
      }).attr('stroke', function (d) {
        return d.color;
      });

      centerUpdate.attr(orient.x1, 0).attr(orient.x2, 0).attr(orient.y1, function (d) {
        return scale(d.minimum);
      }).attr(orient.y2, function (d) {
        return scale(d.maximum);
      }).attr('stroke', function (d) {
        return d.color;
      });

      selection.dispatch('box-updated', { bubbles: true });

      return box;
    };

    /* Inherit from base model */
    base(box, $$).addProp('scale', d3.scaleLinear()).addProp('enterScale', null).addProp('valueFormat', d3.format(',')).addProp('orient', 'vertical').addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addPropFunctor('data', function (d) {
      return d;
    }).addPropFunctor('median', function (d) {
      return d.median;
    }).addPropFunctor('upperQuartile', function (d) {
      return d.upperQuartile;
    }).addPropFunctor('lowerQuartile', function (d) {
      return d.lowerQuartile;
    }).addPropFunctor('minimum', function (d) {
      return d.minimum;
    }).addPropFunctor('maximum', function (d) {
      return d.maximum;
    }).addPropFunctor('outliers', function (d) {
      return d.outliers;
    }).addPropFunctor('width', 20).addPropFunctor('color', 'steelblue').addPropFunctor('annotations', function (d) {
      return d.annotations;
    });

    return box;
  }

  // import id from '../util/id';

  // box-plot svg generator
  function boxPlot () {
    var $$ = {};

    function getGraphs(d, i) {
      var graphs = $$.graphs(d, i).map(function (graph, i) {
        var newGraph = {
          data: graph,
          index: i,
          tooltipGraph: $$.tooltipGraph(graph, i),
          shift: $$.shift(graph, i),
          key: $$.key(graph, i),
          color: $$.color(graph, i),
          orient: $$.orient(graph, i)
        };

        newGraph.values = $$.values(graph, i).map(function (point, i) {
          return {
            data: point,
            index: i,
            graph: newGraph,
            x: $$.px(point, i),
            y: $$.py(point, i),
            annotations: $$.pannotations(point, i),
            median: $$.box.median()(point, i)
          };
        });
        return newGraph;
      });

      return graphs;
    }

    /* Update Function */
    var boxPlot = function boxPlot(context) {
      var selection = context.selection ? context.selection() : context;

      var graphs = selection.selectAll('.d2b-box-plot-graphs').data(function (d) {
        return [d];
      });

      graphs = graphs.merge(graphs.enter().append('g').attr('class', 'd2b-box-plot-graphs'));

      var graph = graphs.selectAll('.d2b-box-plot-graph').data(function (d, i) {
        return getGraphs(d, i);
      }, function (d) {
        return d.key;
      });

      var graphEnter = graph.enter().append('g').attr('class', 'd2b-box-plot-graph d2b-graph').style('opacity', 0);

      var graphUpdate = graph.merge(graphEnter).order(),
          graphExit = graph.exit();

      $$.box.data(function (p) {
        return p.data;
      }).annotation($$.annotation).annotations($$.pannotations);

      if (context !== selection) {
        graphUpdate = graphUpdate.transition(context);
        graphExit = graphExit.transition(context);

        graphExit.style('opacity', 0)
        // boxes needs to be transitioned to where their new locations
        // "would be" if the graphs had been included
        .each(function (d) {
          var el = d3.select(this),
              vertical = d.orient === 'vertical',
              orient = vertical ? { x: 'x', y: 'y' } : { x: 'y', y: 'x' },
              x = $$[orient.x],
              y = $$[orient.y];

          $$.box.scale(y).orient(d.orient).color(function (p, i) {
            return $$.pcolor(p, i) || d.color;
          });

          var boxSvgExit = el.selectAll('.d2b-box-plot-box');

          if (context !== selection) boxSvgExit = boxSvgExit.transition(context);

          var shift = d.shift;
          if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

          boxSvgExit.style('opacity', 0).attr('transform', function (p) {
            return translateBox(x(p[orient.x]) + shift, vertical);
          }).call($$.box).remove();
        });
      }

      graphUpdate.style('opacity', 1);

      graphExit.remove();

      graphUpdate.each(function (d) {
        var el = d3.select(this),
            vertical = d.orient === 'vertical',
            orient = vertical ? { x: 'x', y: 'y' } : { x: 'y', y: 'x' },
            x = $$[orient.x],
            y = $$[orient.y],
            graphsNode = this.parentNode,
            preScales = { x: graphsNode.__scaleX || x, y: graphsNode.__scaleY || y },
            preX = preScales[orient.x],
            preY = preScales[orient.y];

        var shift = d.shift;
        if (shift === null) shift = x.bandwidth ? x.bandwidth() / 2 : 0;

        var preShift = shift;
        if (preShift === null) shift = preX.bandwidth ? preX.bandwidth() / 2 : 0;

        if (d.tooltipGraph) d.tooltipGraph.data(d.values)[orient.x](function (p) {
          return x(p[orient.x]) + shift;
        })[orient.y](function (p) {
          return y(p.median);
        }).color(function (p, i) {
          return $$.pcolor(p.data, i) || d.color;
        });

        $$.box.scale(y).enterScale(preY).orient(d.orient).color(function (p, i) {
          return $$.pcolor(p, i) || d.color;
        });

        var boxSvg = el.selectAll('.d2b-box-plot-box').data(d.values, $$.pkey);
        var boxSvgEnter = boxSvg.enter().append('g').attr('class', 'd2b-box-plot-box');

        var boxSvgUpdate = boxSvg.merge(boxSvgEnter).order(),
            boxSvgExit = boxSvg.exit();

        if (context !== selection) {
          boxSvgUpdate = boxSvgUpdate.transition(context);
          boxSvgExit = boxSvgExit.transition(context);
        }

        // if band scale is used enter boxes at their new location
        if (preX.bandwidth || preY.bandwidth || x.bandwidth || y.bandwidth) {
          $$.box.enterScale(y);
          boxSvgEnter.attr('transform', function (p) {
            return translateBox(x(p[orient.x]) + shift, vertical);
          });
        } else {
          $$.box.enterScale(preY);
          boxSvgEnter.attr('transform', function (p) {
            return translateBox(preX(p[orient.x]) + shift, vertical);
          });
        }

        boxSvgEnter.style('opacity', 0);

        boxSvgUpdate.attr('transform', function (p) {
          return translateBox(x(p[orient.x]) + shift, vertical);
        }).style('opacity', 1).call($$.box);

        boxSvgExit.attr('transform', function (p) {
          return translateBox(x(p[orient.x]) + shift, vertical);
        }).style('opacity', 0).call($$.box).remove();
      });

      graphs.each(function () {
        this.__scaleX = $$.x.copy();
        this.__scaleY = $$.y.copy();
      });

      selection.dispatch('svg-box-updated', { bubbles: true });

      return boxPlot;
    };

    function translateBox(position, vertical) {
      return 'translate(' + (vertical ? [position, 0] : [0, position]) + ')';
    }

    /* Inherit from base model */
    base(boxPlot, $$).addProp('x', d3.scaleLinear()).addProp('y', d3.scaleLinear()).addProp('box', box()).addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addPropGet('type', 'boxPlot').addPropFunctor('graphs', function (d) {
      return d;
    })
    // graph props
    .addPropFunctor('tooltipGraph', function (d) {
      return d.tooltipGraph;
    }).addPropFunctor('shift', null).addPropFunctor('key', function (d) {
      return d.label;
    }).addPropFunctor('values', function (d) {
      return d.values;
    }).addPropFunctor('color', function (d) {
      return color(d.label);
    }).addPropFunctor('orient', 'vertical')
    // points props
    .addPropFunctor('px', function (d) {
      return d.x;
    }).addPropFunctor('py', function (d) {
      return d.y;
    }).addPropFunctor('pcolor', null).addPropFunctor('pkey', function (d, i) {
      return i;
    }).addPropFunctor('pannotations', function (d) {
      return d.annotations;
    })
    // methods
    .addMethod('getComputedGraphs', function (context) {
      return (context.selection ? context.selection() : context).data().map(function (d, i) {
        return getGraphs(d, i);
      });
    }).addMethod('getVisiblePoints', function (context) {
      var data = boxPlot.getComputedGraphs(context),
          points = [];
      data.forEach(function (graphs) {
        graphs.forEach(function (graph) {
          graph.values.forEach(function (v, i) {
            ['maximum', 'minimum', 'upperQuartile', 'lowerQuartile', 'median'].forEach(function (metric) {
              points.push({ x: v.x, y: $$.box[metric]()(v.data, i), graph: graph });
            });

            ($$.box.outliers()(v.data, i) || []).forEach(function (outlier) {
              points.push({ x: v.x, y: outlier, graph: graph });
            });
          });
        });
      });

      return points;
    });

    return boxPlot;
  }

  // bubble pack svg generator
  function bubblePack () {
    var $$ = {};

    var indicatorSymbol = d3.symbol().size(80);

    function getPoint(point, i, graph) {
      return {
        data: point,
        index: i,
        graph: graph,
        x: $$.px(point, i),
        y: $$.py(point, i),
        color: $$.pcolor(point, i) || graph.color,
        symbol: $$.psymbol(point, i) || graph.symbol,
        key: $$.pkey(point, i),
        size: $$.psize(point, i),
        indicator: $$.pindicator(point, i),
        annotation: $$.pannotation(point, i),
        children: ($$.pchildren(point, i) || []).map(function (point, i) {
          return getPoint(point, i, graph);
        })
      };
    }

    function getGraphs(d, i) {
      var graphs = $$.graphs(d, i).map(function (graph, i) {

        var newGraph = {
          data: graph,
          index: i,
          tendancy: $$.tendancy(graph, i),
          tooltipGraph: $$.tooltipGraph(graph, i),
          shift: $$.shift(graph, i),
          key: $$.key(graph, i),
          color: $$.color(graph, i),
          symbol: $$.symbol(graph, i)
        };

        newGraph.values = $$.values(graph, i).map(function (point, i) {
          return getPoint(point, i, newGraph);
        });

        return newGraph;
      });

      graphs.forEach(function (graph) {
        return graph.values.forEach(function (v) {
          return setStructure(v, graph.tendancy);
        });
      });

      return graphs;
    }

    // bubble pack updater
    // The autoEnter flag will decide whether the entering bubbles will render
    // at their respective location or if they will expand from their parents
    // location. When the bubblePack is re-rendered upon clicking
    // on a parent bubble, this will be called with autoEnter = false to preserve
    // the flow of child bubbles flowing from their parents location to their
    // location.
    var bubblePack = function bubblePack(context) {
      var autoEnter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var transition = context.selection ? context : null,
          selection = context.selection ? context.selection() : context;

      var graphs = selection.selectAll('.d2b-bubble-pack-graphs').data(function (d) {
        return [d];
      });

      graphs = graphs.merge(graphs.enter().append('g').attr('class', 'd2b-bubble-pack-graphs'));

      var graph = graphs.selectAll('.d2b-bubble-pack-graph').data(function (d, i) {
        return getGraphs(d, i);
      }, function (d) {
        return d.key;
      });

      // enter graph
      var graphEnter = graph.enter().append('g').attr('class', 'd2b-bubble-pack-graph d2b-graph');

      var graphUpdate = graph.merge(graphEnter).order(),
          graphExit = graph.exit();

      if (transition) {
        graphUpdate = graphUpdate.transition(transition);
        graphExit = graphExit.transition(transition);
      }

      // update graph
      graphUpdate.style('opacity', 1);

      // exit graph
      graphExit.style('opacity', 0).remove();

      // iterate through each context element
      context.each(function (d, i) {
        var selection = d3.select(this),
            duration = $$.duration(d, i),
            graph = selection.selectAll('.d2b-bubble-pack-graph'),
            graphsNode = selection.selectAll('.d2b-bubble-pack-graphs').node(),
            preX = graphsNode.__d2bPreserveScaleX__ || $$.x,
            preY = graphsNode.__d2bPreserveScaleY__ || $$.y;

        selection.on('change', function () {
          selection.transition().duration(duration).call(bubblePack, false);
        });

        var maxWidth = 0;

        // render the bubble packs for each graph
        graph.each(function (graph) {
          var el = d3.select(this),
              xRange = $$.x.range();

          maxWidth = Math.max(maxWidth, Math.abs(xRange[0] - xRange[1]));

          var shift = graph.shift;
          if (shift === null) shift = $$.x.bandwidth ? $$.x.bandwidth() / 2 : 0;

          $$.point.active(function (d) {
            return !!d.children.length;
          }).fill(function (point) {
            return point.color;
          }).type(function (point) {
            return point.symbol;
          });

          var addTooltipPoint = graph.tooltipGraph ? graph.tooltipGraph.clear().x(function (point) {
            return $$.x(point.x) + shift;
          }).y(function (point) {
            return $$.y(point.y);
          }).color(function (point) {
            return point.color;
          }).addPoint : null;

          renderPacks(el, graph.values, transition, $$.x, $$.y, preX, preY, shift, selection, addTooltipPoint, autoEnter);
        });
        positionIndicators(selection, maxWidth);
      });

      // Make a copy of the scales sticky on the 'graphs' node
      graphs.each(function () {
        this.__d2bPreserveScaleX__ = $$.x.copy();
        this.__d2bPreserveScaleY__ = $$.y.copy();
      });

      selection.dispatch('svg-bubble-pack-updated', { bubbles: true });

      return bubblePack;
    };

    // propagate expanded state to child tree
    function propagateExpanded(data, state) {
      data.data.expanded = state;
      data.children.forEach(function (child) {
        return propagateExpanded(child, state);
      });
    }

    // Position all bubble indicators to be next to each other.
    function positionIndicators(selection, maxWidth) {
      var positionx = 5,
          positiony = 5;
      selection.selectAll('.d2b-bubble-indicator.d2b-active').attr('transform', function () {
        var box = this.getBBox();

        if (box.width + positionx > maxWidth && positionx > 0) {
          positionx = 5;
          positiony += box.height + 5;
        }

        var translate = 'translate(' + positionx + ', ' + positiony + ')';
        positionx += box.width + 5;
        return translate;
      });
    }

    /**
     * Renders bubble.
     * @param {d3.selection} el - bubble pack
     * @param {d3.transition or null} trans - transition if present
     * @param {d3.scale} x - x scale
     * @param {d3.scale} y - y scale
     * @param {Number} shift - horizontal pixel shift
     */
    function renderPoint(el, trans, x, y, shift) {
      el.each(function (d) {
        var el = d3.select(this);

        var transform = el.attr('transform');

        if (!transform) {
          el.attr('transform', 'translate(' + (x(d.parent ? d.parent.x : d.x) + shift + ',') + (y(d.parent ? d.parent.y : d.y) + ')'));
        }

        if (d.children.length && !d.data.expanded) {
          el.attr('cursor', 'pointer').on('click', function () {
            d3.select(this).dispatch('change', { bubbles: true, cancelable: true });
          }).on('change', function (d) {
            return d.data.expanded = !d.data.expanded;
          });
        } else el.attr('cursor', '').on('click', null);

        if (trans) el = el.transition(trans);

        if (d.data.expanded) el.style('opacity', 0).selectAll('*').remove();else el.style('opacity', null).call($$.point);

        el.attr('transform', 'translate(' + (x(d.x) + shift) + ', ' + y(d.y) + ')');

        // update annotations
        update(el, $$.annotation, 'd2b-bubble-annotation');
      });
    }

    /**
     * Renders bubble indicator.
     * @param {d3.selection} el - bubble pack
     * @param {d3.transition or null} trans - transition if present
     * @param {d3.scale} x - x scale
     * @param {d3.scale} y - y scale
     * @param {Number} shift - horizontal pixel shift
     */
    function renderIndicator(el) {
      el.each(function (d) {
        var el = d3.select(this).classed('d2b-active', d.data.expanded);

        if (!d.data.expanded) return el.selectAll('rect, text, path').remove();

        var rect = el.select('rect'),
            text = el.select('text'),
            path = el.select('path');
        if (!rect.size()) rect = el.append('rect');
        if (!text.size()) text = el.append('text');
        if (!path.size()) path = el.append('path');

        text.text(function (d) {
          return d.indicator.substring(0, 5);
        }).attr('x', 20);
        var textBox = text.node().getBBox();
        text.attr('y', textBox.height / 1.35);
        rect.on('click', function () {
          d3.select(this).dispatch('change', { bubbles: true, cancelable: true });
        }).on('change', function (d) {
          d.data.expanded = !d.data.expanded;
          if (!d.data.expanded) propagateExpanded(d, false);
        }).attr('width', textBox.width + 25).attr('height', textBox.height).style('fill', $$.point.fill()).style('stroke', $$.point.stroke());

        path.attr('d', function (d) {
          return indicatorSymbol.type(d.symbol)();
        }).attr('transform', 'translate(10, 9.5)').style('fill', $$.point.stroke());
      });
    }

    /**
     * Renders bubble packs recursively.
     * @param {d3.selection} el - packs container
     * @param {Array} data - packs data
     * @param {d3.transition or null} trans - transition if present
     * @param {d3.scale} x - x scale
     * @param {d3.scale} y - y scale
     * @param {d3.scale} preX - pervious x scale
     * @param {d3.scale} preY - pervious y scale
     * @param {Number} shift - horizontal pixel shift
     * @param {d3.selection} chart - master chart container
     * @param {function} addTooltipPoint - function to append a point to the tooltip component
     * @param {Boolean} autoEnter - enter point at its own location rather than its parents
     * @param {Number} depth - depth tracker
     */
    function renderPacks(el, data, trans, x, y, preX, preY, shift, chart, addTooltipPoint, autoEnter) {
      var depth = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;

      // set pack data
      var pack = el.selectAll('.d2b-bubble-pack.d2b-depth-' + depth).data(data, function (d) {
        return d.key;
      }),
          packEnter = pack.enter().append('g').attr('class', 'd2b-bubble-pack d2b-depth-' + depth),
          packUpdate = pack.merge(packEnter);

      var pointEnter = packEnter.append('g').attr('class', 'd2b-bubble-point');
      if (autoEnter) renderPoint(pointEnter, false, preX, preY, shift);
      pointEnter.style('opacity', 0);
      renderPoint(packUpdate.select('.d2b-bubble-point'), trans, x, y, shift);
      packEnter.append('g').attr('class', 'd2b-bubble-indicator');
      renderIndicator(packUpdate.select('.d2b-bubble-indicator'));

      // update children bubbles if expanded
      packUpdate.each(function (point) {
        var el = d3.select(this);
        var subPacks = el.selectAll('.d2b-bubble-pack');
        subPacks = trans ? subPacks.transition(trans) : subPacks;

        if (point.children.length && point.data.expanded) {
          renderPacks(el, point.children, trans, x, y, preX, preY, shift, chart, addTooltipPoint, autoEnter, depth + 1);
        } else {
          if (addTooltipPoint) addTooltipPoint(point);
          subPacks.remove().select('.d2b-bubble-point').style('opacity', 0).attr('transform', 'translate(' + [x(point.x) + shift, y(point.y)] + ')');
        }
      });

      var packExit = pack.exit();
      if (trans) packExit = packExit.transition(trans);
      packExit.remove();
    }

    // Recursively set the data structure starting at root node `d`
    function setStructure(d, tendancy) {
      var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      d.children = d.children || [];
      d.leaves = d.children.length ? [] : [d];
      d.depth = depth;
      if (d.children.length) {
        d.children.forEach(function (child) {
          setStructure(child, tendancy, depth + 1);
          child.parent = d;
          d.leaves = d.leaves.concat(child.leaves);
        });
      }

      d.size = oreq(d.size, d3.sum(d.leaves, function (d) {
        return d.size;
      }));

      d.x = oreq(d.x, (tendancy.x || tendancy)(d.leaves, function (d) {
        return d.x;
      }, function (d) {
        return d.size;
      }));
      d.y = oreq(d.y, (tendancy.y || tendancy)(d.leaves, function (d) {
        return d.y;
      }, function (d) {
        return d.size;
      }));
    }

    /* Inherit from base model */
    base(bubblePack, $$).addProp('point', point().size(function (d) {
      return d.size * 100;
    })).addProp('x', d3.scaleLinear()).addProp('y', d3.scaleLinear()).addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addPropGet('type', 'bubblePack').addPropFunctor('duration', 250).addPropFunctor('graphs', function (d) {
      return d;
    })
    // graph props
    .addPropFunctor('tendancy', mean, function (_) {
      if (!arguments.length) return $$.tendancy;
      if (_ && _.tendancy) $$.tendancy = function () {
        return _;
      };else $$.tendancy = functor(_);

      return bubblePack;
    }).addPropFunctor('tooltipGraph', function (d) {
      return d.tooltipGraph;
    }).addPropFunctor('shift', null).addPropFunctor('key', function (d) {
      return d.label;
    }).addPropFunctor('values', function (d) {
      return d.values;
    }).addPropFunctor('color', function (d) {
      return color(d.label);
    }).addPropFunctor('symbol', function () {
      return d3.symbolCircle;
    })
    // point props
    .addPropFunctor('px', function (d) {
      return d.x;
    }).addPropFunctor('py', function (d) {
      return d.y;
    }).addPropFunctor('psize', function (d) {
      return d.size;
    }).addPropFunctor('pchildren', function (d) {
      return d.children;
    }).addPropFunctor('pcolor', null).addPropFunctor('psymbol', null).addPropFunctor('pindicator', function (d) {
      return d.label;
    }).addPropFunctor('pkey', function (d, i) {
      return i;
    }).addPropFunctor('pannotation', function (d) {
      return d.annotation;
    })
    // methods
    .addMethod('getComputedGraphs', function (context) {
      return (context.selection ? context.selection() : context).data().map(function (d, i) {
        return getGraphs(d, i);
      });
    }).addMethod('getVisiblePoints', function (context) {
      var data = bubblePack.getComputedGraphs(context);

      function addPoint(point, points, graph) {
        if (!point.data.expanded) {
          points.push({ x: point.x, y: point.y, graph: graph });
        } else {
          point.children.forEach(function (point) {
            return addPoint(point, points, graph);
          });
        }
      }

      return data.map(function (graphs) {
        return [].concat.apply([], graphs.map(function (graph) {
          var points = [];
          graph.values.forEach(function (point) {
            return addPoint(point, points, graph);
          });
          return points;
        }));
      })[0];
    });

    return bubblePack;
  }

  // sunburst svg generator
  function svgSunburst () {

    var $$ = {};

    var arc = d3.arc();

    /* Update Function */
    var sunburst = function sunburst(context) {
      var selection = context.selection ? context.selection() : context;

      $$.pie.value(function (d) {
        return d.value;
      });

      selection.each(function (d, i) {
        var el = d3.select(this),
            zoomable = $$.zoomable(d, i),
            highlight = $$.highlight(d, i),
            innerRadius = $$.innerRadius(d, i),
            showLabels = $$.showLabels(d, i),
            root = getHierarchy(d);

        var selected = getSelected(root);
        setVisibility(selected, $$.descendantLevels(d, i) + selected.depth);

        root.each(function (d) {
          return d.selected = selected;
        });

        var radii = getRadii(d, i, root, selected);

        updateNodes.call(this, [root], 'arc', 0, $$.startAngle(d, i), $$.endAngle(d, i), {
          transition: context !== selection ? context : null,
          oldRadii: oreq(this.__radii, radii),
          radii: radii,
          zoomable: zoomable
        });

        updateNodes.call(this, showLabels ? [root] : [], 'label', 0, $$.startAngle(d, i), $$.endAngle(d, i), {
          transition: context !== selection ? context : null,
          oldRadii: oreq(this.__radii, radii),
          radii: radii
        });

        // insert a center circle that is transparent, but whenever it is clicked
        // the selection will be passed to the current selection's parent
        var center = el.selectAll('.d2b-sunburst-center');

        center.data([selected]).enter().append('circle').attr('class', 'd2b-sunburst-center').merge(center).attr('cx', 0).attr('cy', 0).attr('r', Math.max(0, innerRadius)).on('click', function (d) {
          if (!d.parent) return;
          d.data.selected = false;
          d.parent.data.selected = true;
          el.transition().duration($$.duration(d, i)).call(sunburst);
        });

        this.__radii = radii;

        el.selectAll('path.d2b-sunburst-arc').on('click', zoomable ? function (node) {
          root.each(function (d) {
            return d.data.selected = false;
          });
          node.data.selected = true;
          el.transition().duration($$.duration(d, i)).call(sunburst);
        } : null).on('mouseover', highlight ? function (node) {
          var ancestors = node.ancestors();

          el.selectAll('.d2b-sunburst-arc').classed('d2b-transparent', function (d) {
            return ancestors.indexOf(d) === -1;
          });

          el.selectAll('.d2b-sunburst-label').classed('d2b-transparent', function (d) {
            return ancestors.indexOf(d) === -1;
          });
        } : null).on('mouseout', function () {
          el.selectAll('.d2b-sunburst-arc').classed('d2b-transparent', false);
          el.selectAll('.d2b-sunburst-label').classed('d2b-transparent', false);
        });
      });

      selection.dispatch('svg-sunburst-updated', { bubbles: true });

      return sunburst;
    };

    /* Inherit from base model */
    base(sunburst, $$).addProp('pie', d3.pie().sort(null)).addProp('ancestorBanding', d3.scaleLinear()).addProp('descendantBanding', d3.scalePow().exponent(0.85))
    // Datum Level Accessors
    .addPropFunctor('duration', 250).addPropFunctor('innerRadius', 30).addPropFunctor('outerRadius', 200).addPropFunctor('ancestorPadding', 10).addPropFunctor('ancestorRatio', 0.2).addPropFunctor('descendantLevels', Infinity).addPropFunctor('startAngle', 0).addPropFunctor('endAngle', 2 * Math.PI).addPropFunctor('showLabels', false).addPropFunctor('zoomable', true).addPropFunctor('highlight', true)
    // Node Level Accessors
    .addPropFunctor('key', function (d) {
      return $$.label(d);
    }).addPropFunctor('label', function (d) {
      return d.label;
    }).addPropFunctor('color', function (d) {
      return color($$.label(d));
    }).addPropFunctor('children', function (d) {
      return d.children;
    }).addPropFunctor('size', function (d) {
      return d.size;
    });

    function getHierarchy(d) {
      return updateDescendants(d3.hierarchy(d, $$.children).sum($$.size));
    }

    function updateDescendants(node) {
      var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      node.key = $$.key(node.data, i);
      node.color = $$.color(node.data, i);
      node.label = $$.label(node.data, i);

      if (!node.children) return;

      node.children.forEach(updateDescendants);

      return node;
    }

    function getSelected(root) {
      var node = null;

      // find selected node
      root.each(function (d) {
        if (d.data.selected) node = d;
      });

      // if selected isn't defined set it to the root node
      if (!node) node = root;
      // if selected is a leaf (bottom) node give selected to the parent
      // else if ((!node.children || !node.children.length) && node.parent) {
      //   node.data.selected = false;
      //   node = node.parent;
      // }

      // make sure selected flag is still asserted
      node.data.selected = true;

      return node;
    }

    // set visibility flag for all nodes
    function setVisibility(d, maxDepth) {
      d.ancestors().concat(d.descendants()).filter(function (d) {
        return d.depth <= maxDepth && d.value > 0;
      }).forEach(function (d) {
        return d.visible = true;
      });
    }

    // returns a function used to find the inner/outer radii for an arc based
    // on it's depth
    function getRadii(d, i, root, selected) {
      var innerRadius = $$.innerRadius(d, i),
          outerRadius = $$.outerRadius(d, i),
          ancestorPadding = $$.ancestorPadding(d, i),
          ancestorRatio = $$.ancestorRatio(d, i);

      var height = 0;

      root.each(function (node) {
        if (node.visible) height = Math.max(height, node.depth);
      });

      var width = outerRadius - innerRadius - ancestorPadding,
          breakpoint = innerRadius + width * ancestorRatio,

      // radii-inner-scale is used to position inner bands
      radiiInner = $$.ancestorBanding.copy().range([innerRadius, breakpoint]).domain([0, selected.depth + 1]),

      // radii-outer-scale is used to position outer bands
      radiiOuter = $$.descendantBanding.copy().range([breakpoint + ancestorPadding, outerRadius]).domain([selected.depth + 1, height + 1]);

      // fetch the { inner, outer } radii for an arc based on it's depth
      return function (depth) {
        var scale = void 0;
        if (depth <= selected.depth) scale = radiiInner;else scale = radiiOuter;
        return { inner: scale(depth), outer: scale(depth + 1) };
      };
    }

    function getLabelRotation(centerAngle) {
      if (centerAngle > Math.PI) return toDegrees(centerAngle) + 90;else return toDegrees(centerAngle) - 90;
    }

    function getLabelOffset(centerAngle, radii) {
      var offset = (radii.inner - radii.outer) / 2.2;
      if (centerAngle > Math.PI) return -offset;else return offset;
    }

    function getLabelAnchor(centerAngle) {
      if (centerAngle > Math.PI) return 'end';else return 'start';
    }

    function updateNodes(newData, type, depth, startAngle, endAngle, tools) {

      var tween = type === 'arc' ? tweenArc : tweenCentroid;

      newData = newData.filter(function (d) {
        return d.visible;
      });

      $$.pie.startAngle(startAngle).endAngle(endAngle);

      $$.pie(newData).forEach(function (d) {
        var radii = tools.radii(d.data.depth);

        d.data.startAngle = d.startAngle;
        d.data.endAngle = d.endAngle;
        d.data.padAngle = d.padAngle;
        d.data.innerRadius = radii.inner;
        d.data.outerRadius = radii.outer;
        d.data.centerAngle = (d.startAngle + d.endAngle) / 2;

        d.data.rotate = getLabelRotation(d.data.centerAngle);
        d.data.labelOffset = getLabelOffset(d.data.centerAngle, radii);
        d.data.labelAnchor = getLabelAnchor(d.data.centerAngle);
      });

      var el = d3.select(this),
          levelClass = 'd2b-sunburst-level-' + depth;

      var arcUpdate = el.selectAll('.d2b-sunburst-' + type + '-group.' + levelClass);

      var oldData = arcUpdate.data();

      arcUpdate = arcUpdate.data(newData, function (d) {
        return d.key;
      });

      var arcEnter = arcUpdate.enter().append('g').attr('class', 'd2b-sunburst-' + type + '-group ' + levelClass),
          pathEnter = arcEnter.append(type === 'arc' ? 'path' : 'text').attr('class', 'd2b-sunburst-' + type + ' ' + levelClass).each(function (d, i) {
        var radii = tools.oldRadii(d.depth),
            neighbor = d.neighbor || findNeighborArc(i, oldData, newData);

        this.current = {
          startAngle: neighbor.startAngle,
          endAngle: neighbor.endAngle,
          innerRadius: radii.inner,
          outerRadius: radii.outer,
          rotate: getLabelRotation((neighbor.startAngle + neighbor.endAngle) / 2)
        };

        if (!d.children) return;

        d.children.forEach(function (dd) {
          return dd.neighbor = neighbor;
        });
      });

      arcEnter.append('g').attr('class', 'd2b-sunburst-' + type + '-children ' + levelClass);

      if (type === 'arc') pathEnter.style('fill', function (d) {
        return d.color;
      });else pathEnter.style('opacity', 0).attr('y', 4);

      var arcExit = arcUpdate.exit();

      arcUpdate = arcUpdate.merge(arcEnter);

      arcUpdate.select('.d2b-sunburst-' + type + '.' + levelClass).classed('d2b-sunburst-ancestor', function (d) {
        return d.depth < d.selected.depth;
      });

      if (tools.transition) {

        arcExit.each(function (d, i) {
          var data = findNeighborArc(i, newData, oldData);
          var el = d3.select(this);

          var pathExit = el.selectAll('.d2b-sunburst-' + type).datum(function (d) {
            var radii = tools.radii(d.depth);
            d.innerRadius = radii.inner;
            d.outerRadius = radii.outer;
            d.startAngle = data.startAngle;
            d.endAngle = data.endAngle;
            d.centerAngle = data.centerAngle;

            d.rotate = getLabelRotation(d.centerAngle);
            d.labelOffset = getLabelOffset(d.centerAngle, radii);

            return d;
          }).transition(tools.transition).call(tween, arc);

          if (type === 'label') {
            pathExit.style('opacity', 0).attr('x', function (d) {
              return d.labelOffset;
            });
          }
        });

        arcExit = arcExit.transition(tools.transition);

        arcUpdate = arcUpdate.transition(tools.transition);
      }

      arcExit.remove();

      var pathUpdate = arcUpdate.select('.d2b-sunburst-' + type + '.' + levelClass).call(tween, arc);

      if (type === 'arc') {
        pathUpdate.style('fill', function (d) {
          return d.color;
        });
      } else {
        pathUpdate.text(function (d) {
          return d.depth >= d.selected.depth ? d.label : '';
        }).style('opacity', 1).attr('x', function (d) {
          return d.labelOffset;
        }).style('text-anchor', function (d) {
          return d.labelAnchor;
        });
      }

      arcUpdate.select('.d2b-sunburst-' + type + '-children.' + levelClass).each(function (d) {
        var children = d.children || [];
        updateNodes.call(this, children, type, depth + 1, d.startAngle, d.endAngle, tools);
      });
    }

    function findNeighborArc(i, data0, data1) {
      var preceding = findPreceding(i, data0, data1),
          following = findFollowing(i, data0, data1);
      if (preceding) {
        return { startAngle: preceding.endAngle, endAngle: preceding.endAngle };
      } else if (following) {
        return { startAngle: following.startAngle, endAngle: following.startAngle };
      }
      return { startAngle: 0, endAngle: 0, centerAngle: 0 };
    }

    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1) {
      var m = data0.length;
      while (--i >= 0) {
        var k = data1[i].key;
        for (var j = 0; j < m; ++j) {
          if (data0[j].key === k) return data0[j];
        }
      }
    }

    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1) {
      var n = data1.length,
          m = data0.length;
      while (++i < n) {
        var k = data1[i].key;
        for (var j = 0; j < m; ++j) {
          if (data0[j].key === k) return data0[j];
        }
      }
    }

    return sunburst;
  }

  // sankey svg generator
  function sankey$1 () {

    var $$ = {};

    /* Update Function */
    var sankey = function sankey(context) {
      var selection = context.selection ? context.selection() : context;

      selection.each(function (datum) {
        var transition = context === selection ? null : context;

        var el = d3.select(this),
            size = $$.size(datum),
            sankeyLink = d3Sankey.sankeyLinkHorizontal();

        // map node data wrapper
        var nodesData = $$.nodes(datum).map(function (d, i) {
          var key = $$.nodeKey(d, i);

          return {
            key: key,
            label: $$.nodeLabel(d, i, key),
            color: $$.nodeColor(d, i, key),
            draggableX: $$.nodeDraggableX(d, i),
            draggableY: $$.nodeDraggableY(d, i),
            preserveDragging: $$.nodePreserveDragging(d, i),
            wrapLength: $$.nodeLabelWrapLength(d, i),
            data: d,
            index: i
          };
        });

        // map link data wrapper
        var linksData = $$.links(datum).map(function (d, i) {
          var source = $$.linkSource(d, i),
              target = $$.linkTarget(d, i);

          var sourceKey = (typeof source === 'undefined' ? 'undefined' : _typeof(source)) === 'object' ? $$.nodeKey(source) : source,
              targetKey = (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' ? $$.nodeKey(target) : target;

          var key = $$.linkKey(d, i, sourceKey, targetKey);

          return {
            sourceKey: sourceKey,
            targetKey: targetKey,
            key: key,
            keyTrim: key.replace(/ /g, ''),
            sourceColor: $$.linkSourceColor(d, i, sourceKey),
            targetColor: $$.linkTargetColor(d, i, targetKey),
            value: $$.linkValue(d, i),
            source: source,
            target: target,
            data: d,
            index: i
          };
        });

        // config sankey
        $$.sankey.size([size.width, size.height]).nodeId(function (d) {
          return d.key;
        }).nodes(nodesData).links(linksData);

        var nodeWidth = $$.sankey.nodeWidth();

        // get sankey graph layout and filter out those that have a falsy value
        var graph = $$.sankey.nodes(nodesData).links(linksData)();
        graph.links = graph.links.filter(function (n) {
          return !!n.value;
        });
        graph.nodes = graph.nodes.filter(function (n) {
          return !!n.value;
        });
        graph = $$.sankey.nodes(graph.nodes).links(graph.links)();

        // render link gradients
        var linkDefs = el.selectAll('.d2b-sankey-link-defs').data([graph.links]),
            linksDefsEnter = linkDefs.enter().append('defs').attr('class', 'd2b-sankey-link-defs');

        linkDefs = linkDefs.merge(linksDefsEnter);

        var linkGradient = linkDefs.selectAll('.d2b-def-gradient').data(function (d) {
          return d;
        }, function (d) {
          return d.keyTrim;
        }),
            linkGradientEnter = linkGradient.enter().append('linearGradient').attr('class', 'd2b-def-gradient'),
            linkGradientExit = linkGradient.exit();

        linkGradientEnter.append('stop').attr('class', 'd2b-gradient-from').attr('offset', '0%');

        linkGradientEnter.append('stop').attr('class', 'd2b-gradient-to').attr('offset', '100%');

        linkGradient = linkGradient.merge(linkGradientEnter);

        if (transition) {
          linkGradientExit = linkGradientExit.transition(transition);
          linkGradient = linkGradient.transition(transition);
        }

        linkGradientExit.remove();

        linkGradient.attr('id', function (d) {
          return d.keyTrim;
        });

        linkGradient.select('.d2b-gradient-from').attr('stop-color', function (d) {
          return d.sourceColor;
        });

        linkGradient.select('.d2b-gradient-to').attr('stop-color', function (d) {
          return d.targetColor;
        });

        // render links
        var links = el.selectAll('.d2b-sankey-links').data([graph.links]),
            linksEnter = links.enter().append('g').attr('class', 'd2b-sankey-links');

        links = links.merge(linksEnter);

        var link = links.selectAll('.d2b-sankey-link').data(function (d) {
          return d;
        }, function (d) {
          return d.key;
        }),
            linkEnter = link.enter().append('g').attr('class', 'd2b-sankey-link'),
            linkExit = link.exit();

        var linkStatic = link = link.merge(linkEnter);

        if (transition) {
          link = link.transition(transition);
          linkExit = linkExit.transition(transition);
        }

        // render nodes
        var nodes = el.selectAll('.d2b-sankey-nodes').data([graph.nodes]),
            nodesEnter = nodes.enter().append('g').attr('class', 'd2b-sankey-nodes');

        nodes = nodes.merge(nodesEnter);

        var node = nodes.selectAll('.d2b-sankey-node').data(function (d) {
          return d;
        }, function (d) {
          return d.key;
        }),
            nodeEnter = node.enter().append('g').attr('class', 'd2b-sankey-node'),
            nodeExit = node.exit();

        var nodeStatic = node = node.merge(nodeEnter);

        if (transition) {
          node = node.transition(transition);
          nodeExit = nodeExit.transition(transition);
        }

        // setup node dragging and preserve previous dragging
        node.each(function (d) {
          if (d.draggableX || d.draggableY) {
            d3.select(this).classed('d2b-draggable', true).call(d3.drag().on('drag', drag));
          } else {
            d3.select(this).classed('d2b-draggable', false).on('.drag', null);
          }

          if (d.preserveDragging) {
            if (this.__dragX0 !== undefined) {
              d.x0 = this.__dragX0 * size.width;
              d.x1 = d.x0 + nodeWidth;
            }

            if (this.__dragY0 !== undefined) {
              var height = d.y1 - d.y0;
              d.y0 = this.__dragY0 * size.height;
              d.y1 = d.y0 + height;
            }
          }
        });

        $$.sankey.update(graph);

        linkEnter.style('opacity', 0).append('path').attr('d', sankeyLink).style('stroke', function (d) {
          return 'url(#' + d.keyTrim + ')';
        }).style('stroke-width', function (d) {
          return d.width + 'px';
        });

        linkExit.style('opacity', 0).remove();

        nodeEnter.attr('transform', function (d) {
          return 'translate(' + d.x0 + ', ' + d.y0 + ')';
        }).style('opacity', 0);

        nodeEnter.append('rect').attr('width', Math.max(0, nodeWidth)).attr('height', function (d) {
          return Math.max(0, d.y1 - d.y0);
        });

        nodeEnter.append('text').attr('x', labelX).attr('y', labelY);

        nodeExit.style('opacity', 0).remove();

        updater(transition);

        function labelX(d) {
          return labelLeft(d) ? nodeWidth + 5 : -5;
        }

        function labelLeft(d) {
          return d.x0 < size.width / 2;
        }

        function labelY(d) {
          return 5 + Math.max(0, d.y1 - d.y0) / 2;
        }

        function drag(d) {
          if (d.draggableX) {
            d.x0 = Math.max(0, Math.min(size.width - nodeWidth, d.x0 + d3.event.dx));
            d.x1 = d.x0 + nodeWidth;
            this.__dragX0 = d.x0 / size.width; // save drag position as a percent of the width
          }
          if (d.draggableY) {
            var height = d.y1 - d.y0;
            d.y0 = Math.max(0, Math.min(size.height - (d.y1 - d.y0), d.y0 + d3.event.dy));
            d.y1 = d.y0 + height;
            this.__dragY0 = d.y0 / size.height; // save drag position as a percent of the height
          }
          $$.sankey.update(graph);
          updater();
        }

        // set attributes on defined nodes and links
        function updater() {
          var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

          nodeStatic.select('text').classed('d2b-text-anchor-end', function (d) {
            return !labelLeft(d);
          }).call(textWrap, function (d) {
            return d.label;
          }, function (d) {
            return d.wrapLength;
          }, 'middle');

          var l = transition ? link : linkStatic,
              n = transition ? node : nodeStatic;

          l.style('opacity', 1).select('path').attr('d', sankeyLink).style('stroke', function (d) {
            return 'url(#' + d.keyTrim + ')';
          }).style('stroke-width', function (d) {
            return d.width + 'px';
          });

          // fix for rectangular link gradients
          l.each(function (d) {
            var l = d3.select(this);

            // special case draw a rect
            if (Math.abs(d.y1 - d.y0) < 0.00001) {
              var rect = l.selectAll('rect').data([d]),
                  rectEnter = rect.enter().append('rect'),
                  width = d.target.x0 - d.source.x1;

              rect = rect.merge(rectEnter);

              if (transition) rect = rect.transition(transition);

              rect.attr('x', d.source.x1 + Math.min(0, width)).attr('y', d.y0 - d.width / 2).attr('height', Math.max(0, d.width)).attr('width', Math.abs(d.target.x0 - d.source.x1)).style('fill', 'url(#' + d.keyTrim + ')');

              l.select('path').style('display', 'none');
            } else {
              l.select('rect').remove();
              l.select('path').style('display', '');
            }
          });

          n.attr('transform', function (d) {
            return 'translate(' + d.x0 + ', ' + d.y0 + ')';
          }).style('opacity', 1);

          n.select('rect').attr('width', Math.max(0, nodeWidth)).attr('height', function (d) {
            return Math.max(0, d.y1 - d.y0);
          }).style('fill', function (d) {
            return d.color;
          });

          n.select('text').attr('x', labelX).attr('y', labelY);
        }
      });

      selection.dispatch('svg-sankey-updated', { bubbles: true });

      return sankey;
    };

    /* Inherit from base model */
    base(sankey, $$).addProp('sankey', d3Sankey.sankey()).addPropFunctor('size', { width: 960, height: 500 }).addPropFunctor('nodes', function (d) {
      return d.nodes;
    }).addPropFunctor('nodeKey', function (d) {
      return d.name;
    }).addPropFunctor('nodeLabel', function (d, i, key) {
      return key;
    }).addPropFunctor('nodeLabelWrapLength', Infinity).addPropFunctor('nodeDraggableX', false).addPropFunctor('nodeDraggableY', false).addPropFunctor('nodePreserveDragging', true).addPropFunctor('nodeColor', function (d, i, key) {
      return color(key);
    }).addPropFunctor('links', function (d) {
      return d.links;
    }).addPropFunctor('linkSource', function (d) {
      return d.source;
    }).addPropFunctor('linkSourceColor', function (d, i, sourceKey) {
      return color(sourceKey);
    }).addPropFunctor('linkTarget', function (d) {
      return d.target;
    }).addPropFunctor('linkTargetColor', function (d, i, targetKey) {
      return color(targetKey);
    }).addPropFunctor('linkKey', function (d, i, sourceKey, targetKey) {
      return sourceKey + '-' + targetKey;
    }).addPropFunctor('linkValue', function (d) {
      return d.value;
    });

    return sankey;
  }

  // TODO: Clean up text wrapping with transition udpates
  // TODO: Clean up plane build workflow

  // plane svg generator
  function plane () {

    var $$ = {},
        labelPad = 5;

    /* Update Function */
    var plane = function plane(context) {
      var selection = context.selection ? context.selection() : context;

      selection.each(function (d, i) {
        // get plane props
        var size = $$.size.call(this, d, i) || { width: 960, height: 500 },
            margin = makeMargin($$.margin.call(this, d, i)),
            x = $$.x.call(this, d, i),
            x2 = $$.x2.call(this, d, i),
            y = $$.y.call(this, d, i),
            y2 = $$.y2.call(this, d, i),
            el = d3.select(this),
            axes = {
          x: { type: 'x', data: x },
          x2: { type: 'x2', data: x2 },
          y: { type: 'y', data: y },
          y2: { type: 'y2', data: y2 }
        };

        // check if user defined padding
        var padding = makePadding($$.padding.call(this, d, i));

        // enter plane svg group
        var planeUpdate = el.selectAll('.d2b-plane').data([d]),
            planeEnter = planeUpdate.enter().append('g').attr('class', 'd2b-plane'),
            plane = planeUpdate.merge(planeEnter);

        var clipID = this.__clipID = this.__clipID || 'd2b-clip-plane-' + d2bid();

        planeEnter.append('defs').append('clipPath').attr('id', clipID).attr('class', 'd2b-clip-plane').append('rect');

        var transCtx = context !== selection ? context : null;

        setupAxis(axes.x, i, plane, size.width, transCtx);
        setupAxis(axes.x2, i, plane, size.width, transCtx);
        setupAxis(axes.y, i, plane, size.height, transCtx);
        setupAxis(axes.y2, i, plane, size.height, transCtx);

        // if padding is not set, find it dynamically
        if (!padding) padding = dynamicPadding(axes);

        // define plane box properties
        var planeBox = {
          top: padding.top + margin.top,
          bottom: padding.bottom + margin.bottom,
          left: padding.left + margin.left,
          right: padding.right + margin.right
        };
        planeBox.width = size.width - planeBox.left - planeBox.right;
        planeBox.height = size.height - planeBox.top - planeBox.bottom;

        // store plane box on the node
        this.__box__ = planeBox;

        if (transCtx) planeUpdate = planeUpdate.transition(transCtx);

        // position plane
        planeEnter.attr('transform', 'translate(' + planeBox.left + ', ' + planeBox.top + ')');
        planeUpdate.attr('transform', 'translate(' + planeBox.left + ', ' + planeBox.top + ')');

        updateAxis(axes.x, planeBox.width, 0, planeBox.height);
        updateAxis(axes.x2, planeBox.width, 0, 0);
        updateAxis(axes.y, planeBox.height, 0, 0);
        updateAxis(axes.y2, planeBox.height, planeBox.width, 0);

        updateGrid(axes.x, planeBox.width, planeBox.height);
        updateGrid(axes.x2, planeBox.width, planeBox.height);
        updateGrid(axes.y, planeBox.height, planeBox.width);
        updateGrid(axes.y2, planeBox.height, planeBox.width);

        updateLabel(axes.x, planeBox.width);
        updateLabel(axes.x2, planeBox.width);
        updateLabel(axes.y, -planeBox.height);
        updateLabel(axes.y2, -planeBox.height);

        plane.select('.d2b-clip-plane').select('rect').attr('width', planeBox.width + 1).attr('height', planeBox.height + 1);

        plane.selectAll('.d2b-grid').attr('clip-path', 'url(#' + clipID + ')');
      });

      selection.dispatch('plane-updated', { bubbles: true });

      return plane;
    };

    /* Inherit from base model */
    base(plane, $$)
    // plane level functors
    .addPropFunctor('size', function (d) {
      return d.size;
    }).addPropFunctor('padding', null).addPropFunctor('margin', 0).addPropFunctor('x', function (d) {
      return d.x;
    }).addPropFunctor('x2', function (d) {
      return d.x2;
    }).addPropFunctor('y', function (d) {
      return d.y;
    }).addPropFunctor('y2', function (d) {
      return d.y2;
    })
    // axis level functors
    .addPropFunctor('axis', function (d) {
      return d.axis;
    }).addPropFunctor('orient', function (d) {
      return d.orient || 'outer';
    }).addPropFunctor('wrapLength', function (d) {
      return oreq(d.wrapLength, Infinity);
    }).addPropFunctor('tickSize', function (d) {
      return oreq(d.tickSize, 6);
    }).addPropFunctor('showGrid', function (d) {
      return d.showGrid !== false;
    }).addPropFunctor('label', function (d) {
      return d.label;
    }).addPropFunctor('labelOrient', function (d) {
      return d.labelOrient || 'outer middle';
    })
    // Method to get the computed box of a specific plane container. This
    // method should be used after the plane has been rendered. Either the
    // legend SVG node or a d3 selection of the node may be specified.
    .addMethod('box', function (_) {
      var node = _.node ? _.node() : _;
      if (!node) return null;
      return node.__box__;
    });

    return plane;

    function setupAxis(axis, index, plane, extent, transCtx) {
      var axisData = [],
          gridData = [],
          data = axis.data;

      if (data) {
        setAxisInfo(axis, data, index, plane, extent);
        axisData = [data];
        if (axis.info.showGrid) gridData = [data];
      }

      // enter new axis container
      axis.update = plane.selectAll('.d2b-' + axis.type + '-axis').data(axisData);
      axis.enter = axis.update.enter().append('g').attr('class', 'd2b-axis d2b-' + axis.type + '-axis');

      // enter label container
      axis.labelEnter = axis.enter.append('text').attr('class', 'd2b-axis-label');

      // merge axis svg container
      axis.svg = axis.enter.merge(axis.update);

      // fetch axis label
      axis.label = axis.svg.select('.d2b-axis-label');

      // exit axis
      axis.update.exit().remove();

      // set axis grid data
      axis.gridUpdate = plane.selectAll('.d2b-' + axis.type + '-grid').data(gridData);

      // enter axis grid
      axis.gridEnter = axis.gridUpdate.enter().append('g').attr('class', 'd2b-grid d2b-' + axis.type + '-grid');

      // exit axis grid
      axis.gridUpdate.exit().remove();

      // merge axis grid
      axis.grid = axis.gridEnter.merge(axis.gridUpdate);

      if (transCtx) {
        axis.svg = axis.svg.transition(transCtx);
        axis.update = axis.update.transition(transCtx);
        axis.grid = axis.grid.transition(transCtx);
        axis.gridUpdate = axis.gridUpdate.transition(transCtx);
        axis.label = axis.label.transition(transCtx);
      }
    }

    function updateAxis(axis, extent, x, y) {
      if (!axis.data) return;
      setAxisTickSize(axis);
      setAxisRange(axis, extent);

      axis.enter.call(axis.info.axis).attr('transform', 'translate(' + x + ', ' + y + ')');
      axis.update.call(axis.info.axis).attr('transform', 'translate(' + x + ', ' + y + ')');

      axis.svg.call(wrapTicks, axis).on('end', function () {
        axis.svg.call(wrapTicks, axis);
      });
    }

    function updateGrid(axis, extentRange, extentGrid) {
      if (!axis.data) return;
      setGridTickSize(axis, extentGrid);
      setAxisRange(axis, extentRange);

      axis.gridUpdate.call(axis.info.axis).selectAll('.tick text').remove();

      axis.gridEnter.call(axis.info.axis).selectAll('.tick text').remove();
    }

    function updateLabel(axis, extent) {
      if (!axis.data) return;
      axis.labelEnter.text(axis.info.label).attr('x', labelX(axis, extent)).attr('y', labelY(axis)).attr('text-anchor', labelAnchor(axis));
      axis.label.text(axis.info.label).attr('x', labelX(axis, extent)).attr('y', labelY(axis)).attr('text-anchor', labelAnchor(axis));
    }

    function setGridTickSize(axis, extent) {
      if (!axis.data) return;
      switch (axis.type) {
        case 'x':
          return axis.info.axis.tickSize(axis.info.orient === 'inner' ? -extent : extent);
        case 'x2':
          return axis.info.axis.tickSize(axis.info.orient === 'inner' ? extent : -extent);
        case 'y':
          return axis.info.axis.tickSize(axis.info.orient === 'inner' ? extent : -extent);
        case 'y2':
          return axis.info.axis.tickSize(axis.info.orient === 'inner' ? -extent : extent);
      }
    }

    function setAxisTickSize(axis) {
      if (!axis.data) return;
      axis.info.axis.tickSizeOuter(0).tickSizeInner(axis.info.tickSize);
    }

    function setAxisRange(axis, extent) {
      if (!axis.data) return;
      if (['y', 'y2'].indexOf(axis.type) > -1) {
        axis.info.axis.scale().range([extent, 0]);
      } else {
        axis.info.axis.scale().range([0, extent]);
      }
    }

    // insert and remove dummy ticks and labels to pad axes accordingly
    function setAxisInfo(axis, d, i, cont, extent) {
      if (!axis.data) return;
      var info = axis.info = {};

      info.axis = $$.axis(d, i);
      info.orient = $$.orient(d, i);
      info.wrapLength = $$.wrapLength(d, i);
      info.label = oreq($$.label(d, i), '');
      info.labelOrient = $$.labelOrient(d, i);
      info.tickSize = $$.tickSize(d, i);
      info.showGrid = $$.showGrid(d, i);
      info.labelOrient1 = info.labelOrient.split(' ')[0];
      info.labelOrient2 = info.labelOrient.split(' ')[1];

      info.wrapAnchor = wrapAnchor(axis);

      setAxisTickSize(axis);
      setAxisRange(axis, extent);

      var dummyAxis = cont.append('g').attr('class', 'd2b-axis d2b-' + axis.type + '-axis').call(info.axis).call(wrapTicks, axis);
      info.axisBox = dummyAxis.node().getBBox();

      var dummyLabel = dummyAxis.append('text').attr('class', 'd2b-axis-label d2b-' + axis.type + '-label').text(info.label);
      info.labelBox = dummyLabel.node().getBBox();

      dummyAxis.remove();
    }

    function labelAnchor(axis) {
      if (!axis.data) return;
      var info = axis.info,
          vert = ['y', 'y2'].indexOf(axis.type) > -1;
      return info.labelOrient2 === 'start' && vert ? 'end' : info.labelOrient2 === 'end' && !vert ? 'end' : info.labelOrient2 === 'middle' ? 'middle' : 'start';
    }

    function wrapAnchor(axis) {
      if (!axis.data) return;
      switch (axis.type) {
        case 'x':
          return axis.info.orient === 'inner' ? 'end' : 'start';
        case 'x2':
          return axis.info.orient === 'outer' ? 'end' : 'start';
        case 'y':
        case 'y2':
          return 'middle';
        default:
          return 'start';
      }
    }

    function labelY(axis) {
      if (!axis.data) return;
      var info = axis.info;

      switch (axis.type + ' ' + info.orient + ' ' + info.labelOrient1) {
        case 'x inner inner':
        case 'x2 outer outer':
          return -info.axisBox.height - labelPad;
        case 'x inner outer':
        case 'x2 outer inner':
          return info.labelBox.height + labelPad;
        case 'x outer inner':
        case 'x2 inner outer':
        case 'y inner outer':
        case 'y2 outer inner':
          return -labelPad;
        case 'x outer outer':
        case 'x2 inner inner':
          return info.labelBox.height + info.axisBox.height + labelPad;
        case 'y inner inner':
        case 'y2 outer outer':
          return info.labelBox.height + info.axisBox.width + labelPad;
        case 'y outer inner':
        case 'y2 inner outer':
          return info.labelBox.height + labelPad;
        case 'y outer outer':
        case 'y2 inner inner':
          return -info.axisBox.width - labelPad;
      }
    }

    function labelX(axis, extent) {
      if (!axis.data) return;
      return axis.info.labelOrient2 === 'start' ? 0 : axis.info.labelOrient2 === 'middle' ? extent / 2 : extent;
    }

    function dynamicPadding(axes) {
      var padding = { top: 0, left: 0, right: 0, bottom: 0 };

      if (axes.x.data) {
        if (axes.x.info.orient === 'outer') padding.bottom += axes.x.info.axisBox.height;
        if (axes.x.info.labelOrient1 === 'outer') padding.bottom += axes.x.info.labelBox.height + labelPad;
      }

      if (axes.x2.data) {
        if (axes.x2.info.orient === 'outer') padding.top += axes.x2.info.axisBox.height;
        if (axes.x2.info.labelOrient1 === 'outer') padding.top += axes.x2.info.labelBox.height;
      }

      if (axes.y.data) {
        if (axes.y.info.orient === 'outer') padding.left += axes.y.info.axisBox.width;
        if (axes.y.info.labelOrient1 === 'outer') padding.left += axes.y.info.labelBox.height;
      }

      if (axes.y2.data) {
        if (axes.y2.info.orient === 'outer') padding.right += axes.y2.info.axisBox.width;
        if (axes.y2.info.labelOrient1 === 'outer') padding.right += axes.y2.info.labelBox.height + labelPad;
      }

      padding.top = Math.max(padding.top, 10);
      padding.bottom = Math.max(padding.bottom, 10);
      padding.left = Math.max(padding.left, 10);
      padding.right = Math.max(padding.right, 10);

      return padding;
    }

    function wrapTicks(el, axis) {
      if (!axis.data) return;
      var length = axis.info.wrapLength,
          anchor = axis.info.wrapAnchor;
      el.selectAll('.tick text').each(function () {
        var tick = d3.select(this);
        if (oreq(tick.html(), '').indexOf('tspan') === -1) this.storeText = tick.text();
        tick.text('');
      }).call(textWrap, function () {
        return this.storeText;
      }, length, anchor);
    }

    // create padding from number or object
    function makePadding(p) {
      return typeof p === 'number' ? { top: p, left: p, right: p, bottom: p } : p;
    }

    // create margin same as padding but default as 0
    function makeMargin(m) {
      return makePadding(m || 0);
    }
  }

  /**
   * d2b.chartPie() returns a d2b
   * pie chart generator
   */
  function pie () {

    var $$ = {};

    var chart = function chart(context) {
      context.call($$.chartFrame);

      // make sure pie, arc, and legend accessors are defined properly
      $$.pie.value($$.value).color($$.color).key($$.key);

      $$.legend.html($$.label).key($$.key).color($$.color);

      $$.tooltip.color(function (d) {
        return d3.rgb($$.color(d.data)).darker(0.3);
      });

      var selection = context.selection ? context.selection() : context;

      selection.each(function (datum) {
        update.call(this, datum, context !== selection ? context : null);
      });

      selection.dispatch('chart-pie-updated', { bubbles: true });

      return chart;
    };

    // percent formater
    var percent = d3.format('.0%');

    // configure model properties
    base(chart, $$).addProp('chartFrame', chartFrame().legendEnabled(true).breadcrumbsEnabled(false)).addProp('legend', legend().clickable(true).dblclickable(true)).addProp('key', function (d) {
      return d.label;
    }).addProp('pie', svgPie()).addProp('tooltip', tooltip().followMouse(true).html(function (d) {
      return '<b>' + $$.label(d.data) + '</b>: ' + $$.value(d.data) + ' (' + percent(d.__percent__) + ')';
    })).addPropFunctor('values', function (d) {
      return d;
    }).addPropFunctor('duration', 250).addPropFunctor('donutRatio', 0).addPropFunctor('at', 'center center').addPropFunctor('showPercent', function (d, total) {
      return $$.value(d) / total > 0.03;
    }).addPropFunctor('radius', function (d, w, h) {
      return Math.min(w, h) / 2;
    }).addPropFunctor('color', function (d) {
      return color(d.label);
    }).addPropFunctor('value', function (d) {
      return d.value;
    }).addPropFunctor('label', function (d) {
      return d.label;
    });

    // update chart
    function update(datum, transition) {
      var el = d3.select(this),
          selection = el.select('.d2b-chart-container'),
          size = selection.node().__size__,
          radius = $$.radius(datum, size.width, size.height),
          donutRatio = $$.donutRatio(datum),
          legendEmpty = $$.legend.empty(),
          values = $$.values(datum),
          filtered = values.filter(function (d) {
        return !legendEmpty(d);
      });

      $$.pie.values(filtered);
      $$.legend.values(values);

      // legend functionality
      el.select('.d2b-legend-container').call($$.legend).on('change', function () {
        return el.transition($$.duration(datum)).call(chart);
      }).selectAll('.d2b-legend-item').on('mouseover', function (d) {
        arcGrow.call(this, el, d);
      }).on('mouseout', function (d) {
        arcShrink.call(this, el, d);
      });

      // get pie total
      var total = d3.sum(filtered, function (d) {
        return $$.value(d);
      });

      // select and enter pie chart 'g' element.
      var chartGroup = selection.selectAll('.d2b-pie-chart').data([filtered]);
      var chartGroupEnter = chartGroup.enter().append('g').attr('class', 'd2b-pie-chart');

      chartGroup = chartGroup.merge(chartGroupEnter);

      if (transition) chartGroup = chartGroup.transition(transition);

      $$.pie.arc().innerRadius(radius * donutRatio).outerRadius(radius);

      chartGroup.call($$.pie);

      var arcGroup = selection.selectAll('.d2b-pie-arc').each(function (d) {
        // store inner and outer radii so that they can be used for hover
        // transitions
        d.__innerRadius__ = radius * donutRatio;
        d.__outerRadius__ = radius;

        // store percent for use with the tooltip
        d.__percent__ = d.value / total;
      }).on('mouseover', function (d) {
        arcGrow.call(this, el, d.data);
      }).on('mouseout', function (d) {
        arcShrink.call(this, el, d.data);
      }).call($$.tooltip);

      var arcPercent = arcGroup.selectAll('.d2b-pie-arc-percent').data(function (d) {
        return [d];
      });

      arcPercent.enter().append('g').attr('class', 'd2b-pie-arc-percent').append('text').attr('y', 6);

      arcGroup.each(function () {
        var elem = d3.select(this),
            current = elem.select('.d2b-pie-arc path').node().current,
            percentGroup = elem.select('.d2b-pie-arc-percent'),
            percentText = percentGroup.select('text').node();
        percentGroup.node().current = current;
        percentText.current = percentText.current || 0;
      });

      if (transition) {
        arcGroup = arcGroup.each(function () {
          this.transitioning = true;
        }).transition(transition).on('end', function () {
          this.transitioning = false;
        });
      }

      arcGroup.select('.d2b-pie-arc-percent').call(tweenCentroid, $$.pie.arc()).select('text').call(tweenNumber, function (d) {
        return $$.value(d.data) / total;
      }, percent).style('opacity', function (d) {
        return $$.showPercent.call(this, d.data, total) ? 1 : 0;
      });

      var coords = chartCoords(datum, radius, size);
      chartGroupEnter.attr('transform', 'translate(' + coords.x + ', ' + coords.y + ')');
      chartGroup.attr('transform', 'translate(' + coords.x + ', ' + coords.y + ')');
    }

    // Position the pie chart according to the 'at' string (e.g. 'center left',
    // 'top center', ..). Unless at is an object like {x: , y:}, then position
    // according to these coordinates.
    function chartCoords(datum, radius, size) {
      var coords = $$.at(datum, size.width, size.height, radius);

      if ((typeof coords === 'undefined' ? 'undefined' : _typeof(coords)) !== 'object') {
        coords = coords.split(' ');
        var at = { x: coords[1], y: coords[0] };
        coords = {};
        switch (at.x) {
          case 'left':
            coords.x = radius;
            break;
          case 'center':
          case 'middle':
            coords.x = size.width / 2;
            break;
          case 'right':
          default:
            coords.x = size.width - radius;
        }

        switch (at.y) {
          case 'bottom':
            coords.y = size.height - radius;
            break;
          case 'center':
          case 'middle':
            coords.y = size.height / 2;
            break;
          case 'top':
          default:
            coords.y = radius;
        }
      }

      return coords;
    }

    function arcGrow(el, d) {
      var arc = $$.pie.arc();

      arc.outerRadius(function (d) {
        return d.outerRadius;
      }).innerRadius(function (d) {
        return d.innerRadius;
      });

      el.selectAll('.d2b-pie-arc').filter(function (dd) {
        return dd.data === d;
      }).each(function (d) {
        d.outerRadius = d.__outerRadius__ * 1.03;
        d.innerRadius = d.__innerRadius__;
      }).select('path').transition().duration(100).call(tweenArc, arc);
    }

    function arcShrink(el, d) {
      var arc = $$.pie.arc();

      arc.outerRadius(function (d) {
        return d.outerRadius;
      }).innerRadius(function (d) {
        return d.innerRadius;
      });

      el.selectAll('.d2b-pie-arc').filter(function (dd) {
        return dd.data === d;
      }).each(function (d) {
        d.outerRadius = d.__outerRadius__;
        d.innerRadius = d.__innerRadius__;
      }).select('path').transition().duration(100).call(tweenArc, arc);
    }

    return chart;
  }

  function axis () {

    var $$ = {};

    var chart = function chart(context) {
      context.call($$.chartFrame);

      $$.legend.empty(function (d) {
        return d.data.hidden;
      }).setEmpty(function (d, i, state) {
        return d.data.hidden = state;
      }).html(function (d) {
        return d.label;
      }).key(function (d) {
        return d.label;
      }).color(function (d) {
        return d.color;
      });

      var selection = context.selection ? context.selection() : context;

      selection.each(function (datum) {
        update.call(this, datum, context !== selection ? context : null);
      });

      selection.dispatch('chart-axis-updated', { bubbles: true });

      return chart;
    };

    base(chart, $$).addProp('plane', plane()).addProp('annotation', d3SvgAnnotation.annotation ? d3SvgAnnotation.annotation() : null).addProp('chartFrame', chartFrame().legendEnabled(true).breadcrumbsEnabled(false)).addProp('legend', legend().clickable(true).dblclickable(true)).addPropFunctor('tooltipConfig', function (d) {
      return d.tooltipConfig;
    }).addPropFunctor('duration', 250).addPropFunctor('x', {}).addPropFunctor('y', {}).addPropFunctor('x2', {}).addPropFunctor('y2', {}).addPropFunctor('clipPlane', true).addPropFunctor('annotations', function (d) {
      return d.annotations;
    }).addPropFunctor('groups', function (d) {
      return d.groups;
    }).addPropFunctor('sets', function (d) {
      return d.sets;
    })
    // group functors
    .addPropFunctor('groupLabel', function (d) {
      return d.label;
    }).addPropFunctor('groupColor', function (d) {
      return color($$.groupLabel(d));
    })
    // set functors
    .addPropFunctor('setKey', function (d, i) {
      return i;
    }).addPropFunctor('setGenerators', function (d) {
      return d.generators;
    }).addPropFunctor('setXType', function (d) {
      return d.xType;
    }).addPropFunctor('setYType', function (d) {
      return d.yType;
    }).addPropFunctor('setGraphs', function (d) {
      return d.graphs;
    })
    // graph functors
    .addPropFunctor('graphKey', function (d) {
      return d.label;
    }).addPropFunctor('graphLabel', function (d) {
      return d.label;
    }).addPropFunctor('graphGroup', function (d) {
      return d.group;
    }).addPropFunctor('graphColor', function (d) {
      return color($$.graphLabel(d));
    }).addPropFunctor('graphTooltipConfig', function (d) {
      return d.tooltipConfig;
    }).addPropFunctor('graphAnnotations', function (d) {
      return d.annotations;
    })
    // annotation functors
    .addPropFunctor('annotationKey', function (d, i) {
      return i;
    }).addPropFunctor('annotationXType', function (d) {
      return d.xType;
    }).addPropFunctor('annotationYType', function (d) {
      return d.yType;
    }).addPropFunctor('annotationZ', function (d) {
      return d.z;
    }).addPropFunctor('annotationX', function (d) {
      return d.x;
    }).addPropFunctor('annotationY', function (d) {
      return d.y;
    }).addPropFunctor('annotationX2', function (d) {
      return d.x2;
    }).addPropFunctor('annotationY2', function (d) {
      return d.y2;
    }).addPropFunctor('annotationColor', function (d) {
      return d.color;
    });

    function update(datum, transition) {
      var container = d3.select(this),
          chartContainer = container.select('.d2b-chart-container'),
          chartNode = chartContainer.node(),
          legendContainer = container.select('.d2b-legend-container'),
          size = chartContainer.node().__size__,
          sets = getSets(datum),
          allGraphs = getAllGraphs(sets),
          duration = $$.duration(datum),
          groups = getGroups(datum, sets),
          clipPlane = $$.clipPlane(datum);

      // define chart level annotations
      var annotations = ($$.annotations(datum) || []).slice().map(function (a, i) {
        return {
          key: $$.annotationKey(a, i),
          xType: $$.annotationXType(a) || 'x',
          yType: $$.annotationYType(a) || 'y',
          z: $$.annotationZ(a) || 'front',
          x: $$.annotationX(a),
          y: $$.annotationY(a),
          x2: $$.annotationX2(a),
          y2: $$.annotationY2(a),
          color: $$.annotationColor(a) || 'steelblue',
          data: a
        };
      });

      propagateHidden(groups);

      // make tooltip sticky on the chart node because tooltipAxis requires
      // one instance per axisChart
      var tooltip = chartNode.tooltip = chartNode.tooltip || tooltipAxis().trackX(true).trackY(false).threshold(50);

      tooltip.title(function (points) {
        return '' + oreq(points[0].x, points[0].x1, points[0].median);
      }).clear();

      // update functionality
      $$.legend.values(groups);
      legendContainer.call($$.legend).on('change', function () {
        return container.transition().duration(duration).call(chart);
      }).selectAll('.d2b-legend-item').on('mouseover', function (d) {
        return legendMouseover(d, chartContainer);
      }).on('mouseout', function (d) {
        return legendMouseout(d, chartContainer);
      });

      // update plane dimensions, width and height
      $$.plane.size(size);

      var plane = chartContainer.selectAll('.d2b-axis-plane').data([datum]),
          planeUpdate = plane,
          planeEnter = plane.enter().append('g').attr('class', 'd2b-axis-plane');

      planeUpdate = plane = plane.merge(planeEnter);

      // enter axis-set wrapper
      var wrapper = chartContainer.selectAll('.d2b-axis-wrapper').data([datum]),
          wrapperUpdate = wrapper,
          wrapperEnter = wrapper.enter().append('g').attr('class', 'd2b-axis-wrapper');

      wrapperEnter.append('rect').attr('class', 'd2b-axis-background');
      wrapperEnter.append('g').attr('class', 'd2b-axis-back-annotations');
      wrapperEnter.append('g').attr('class', 'd2b-axis-sets');
      wrapperEnter.append('g').attr('class', 'd2b-axis-front-annotations');

      wrapperUpdate = wrapper = wrapper.merge(wrapperEnter);

      var backAnnotationsUpdate = wrapper.select('.d2b-axis-back-annotations'),
          frontAnnotationsUpdate = wrapper.select('.d2b-axis-front-annotations');

      // enter axis-sets
      var set = wrapper.select('.d2b-axis-sets').selectAll('.d2b-axis-set').data(sets, function (d) {
        return d.key;
      }),
          setEnter = set.enter().append('g').attr('class', 'd2b-axis-set'),
          setExit = set.exit();

      set = set.merge(setEnter).order();

      // queue transitions if context is a transition
      if (transition) {
        setExit = setExit.transition(transition);
        wrapperUpdate = wrapperUpdate.transition(transition);
        planeUpdate = planeUpdate.transition(transition);
        backAnnotationsUpdate = backAnnotationsUpdate.transition(transition);
        frontAnnotationsUpdate = frontAnnotationsUpdate.transition(transition);
      }

      // initialze generator and visible point sets
      var visible = {
        x: [],
        x2: [],
        y: [],
        y2: []
      };

      set.each(function (s) {
        var el = d3.select(this),
            graphs = s.graphs.filter(function (g) {
          return !g.data.hidden;
        }),
            graphsRaw = graphs.map(function (g) {
          return g.data;
        });

        // add graph annotations to chart annotations
        graphs.forEach(function (g) {
          annotations = annotations.concat(g.annotations.map(function (a, i) {
            return {
              key: s.key + '-' + g.key + '-' + $$.annotationKey(a, i),
              xType: s.xType,
              yType: s.yType,
              z: $$.annotationZ(a) || 'front',
              x: $$.annotationX(a),
              y: $$.annotationY(a),
              x2: $$.annotationX2(a),
              y2: $$.annotationY2(a),
              color: $$.annotationColor(a) || g.color,
              data: a,
              graph: g.data
            };
          }));
        });

        this.genUpdate = el.selectAll('.d2b-graph-generator').data(s.generators.slice().reverse(), function (d) {
          return d.key;
        });

        this.genEnter = this.genUpdate.enter().append('g').attr('class', 'd2b-graph-generator').style('opacity', 0);

        this.genExit = this.genUpdate.exit();

        this.gen = this.genUpdate.merge(this.genEnter).order();

        var size = this.gen.size();

        this.gen.each(function (d, i) {
          var gen = d3.select(this),
              visiblePoints = d.generator.tooltipGraph(function (graph) {
            if (i < size - 1) return null;
            var tooltipGraph = tooltip.graph(d2bid());

            matchGraph(graph, allGraphs).tooltipConfig(tooltipGraph);
            return tooltipGraph;
          }).color(function (graph) {
            return matchGraph(graph, allGraphs).color;
          }).graphs(graphsRaw).getVisiblePoints(gen);

          if (d.generator.duration) d.generator.duration(duration);

          visiblePoints.forEach(function (point) {
            visible[s.xType].push(point.x);
            visible[s.yType].push(point.y);
          });
        });
      });

      var xData = $$.x(datum, visible.x),
          yData = $$.y(datum, visible.y),
          x2Data = $$.x2(datum, visible.x2),
          y2Data = $$.y2(datum, visible.y2);

      setupAxis(xData, visible.x, axisDefaults.x);
      setupAxis(yData, visible.y, axisDefaults.y);
      setupAxis(x2Data, visible.x2, axisDefaults.x2);
      setupAxis(y2Data, visible.y2, axisDefaults.y2);

      $$.plane.axis(function (d) {
        return d.__axis__;
      }).x(xData.__axis__ && visible.x.length ? xData : null).y(yData.__axis__ && visible.y.length ? yData : null).x2(x2Data.__axis__ && visible.x2.length ? x2Data : null).y2(y2Data.__axis__ && visible.y2.length ? y2Data : null);

      // update plane
      planeEnter.call($$.plane);
      planeUpdate.call($$.plane);

      // after plane update, fetch plane box
      var planeBox = $$.plane.box(plane);

      // add clip path from plane
      var planeClip = 'url(#' + plane.select('.d2b-clip-plane').attr('id') + ')';
      wrapper.attr('clip-path', clipPlane ? planeClip : '');

      // update the graphs with their generators
      set.each(function (s) {
        var xAxis = s.xType === 'x2' ? x2Data.__axis__ : xData.__axis__,
            yAxis = s.yType === 'y2' ? y2Data.__axis__ : yData.__axis__;

        if (transition) {
          this.genUpdate = this.genUpdate.transition(transition);
          this.genExit = this.genExit.transition(transition).style('opacity', 0);
        }

        this.genExit.remove();

        this.gen.each(function (d) {
          var el = d3.select(this);
          if (transition) el = el.transition(transition);

          d.generator.x(xAxis.scale()).y(yAxis.scale());

          el.style('opacity', 1).call(d.generator);
        });

        d3.select(this).on('change', function () {
          return container.transition().duration(duration).call(chart);
        });
      });

      // remaining transitions and exits
      setExit.style('opacity', 0).remove();

      // position wrapper
      wrapperEnter.attr('transform', 'translate(' + planeBox.left + ', ' + planeBox.top + ')').select('rect.d2b-axis-background').attr('height', Math.max(0, planeBox.height)).attr('width', Math.max(0, planeBox.width));

      wrapperUpdate.attr('transform', 'translate(' + planeBox.left + ', ' + planeBox.top + ')').select('rect.d2b-axis-background').attr('height', Math.max(0, planeBox.height)).attr('width', Math.max(0, planeBox.width));

      // update annotations

      if ($$.annotation) {
        var annotationScales = {
          x: xData.__scale__,
          y: yData.__scale__,
          x2: x2Data.__scale__,
          y2: y2Data.__scale__
        };

        backAnnotationsUpdate.call(updateAnnotations, $$.annotation, annotations.filter(function (a) {
          return a.z === 'back';
        }), annotationScales);

        frontAnnotationsUpdate.call(updateAnnotations, $$.annotation, annotations.filter(function (a) {
          return a.z === 'front';
        }), annotationScales);
      }

      // configure tooltip
      tooltip.row(function (point) {
        var graphLabel = matchGraph(point.graph.data, allGraphs).label;
        return graphLabel + ': ' + oreq(point.y, point.y1, point.median);
      });

      $$.tooltipConfig(tooltip);
      tooltip.svgContainer(wrapper).tracker(wrapper).size(planeBox);
    }

    // defaultz axis components
    var bandDefault = d3.scaleBand(),
        linearDefault = d3.scaleLinear(),
        axisDefaults = {
      x: {
        band: bandDefault.copy(),
        linear: linearDefault.copy(),
        axis: d3.axisBottom()
      },
      y: {
        band: bandDefault.copy(),
        linear: linearDefault.copy(),
        axis: d3.axisLeft()
      },
      x2: {
        band: bandDefault.copy(),
        linear: linearDefault.copy(),
        axis: d3.axisTop()
      },
      y2: {
        band: bandDefault.copy(),
        linear: linearDefault.copy(),
        axis: d3.axisRight()
      }
    };

    function getGroups(d) {
      var sets = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getSets(d);
      var graphs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : getAllGraphs(sets);

      var graphGroups = graphs.filter(function (graph) {
        return !graph.group;
      });

      graphGroups.forEach(function (g) {
        g.groupType = 'graph';
        g.groupGraphs = [g];
      });

      return ($$.groups(d) || []).map(function (group) {
        var newGroup = {
          groupType: 'group',
          data: group,
          label: $$.groupLabel(group),
          color: $$.groupColor(group)
        };

        newGroup.groupGraphs = graphs.filter(function (graph) {
          return newGroup.label === graph.group;
        });

        newGroup.groupGraphs.forEach(function (g) {
          g.color = newGroup.color;
        });

        return newGroup;
      }).concat(graphGroups);
    }

    function getSets(d) {
      return $$.sets(d).map(function (set, i) {
        var generatorTypes = {};
        return {
          data: set,
          key: $$.setKey(set, i),
          xType: $$.setXType(set) || 'x',
          yType: $$.setYType(set) || 'y',
          generators: $$.setGenerators(set).map(function (generator, i) {
            var type = generator.type();

            // only annotate first generator
            if (i !== 0) (generator.pannotation || generator.pannotations || function () {})(null);

            generator.annotation($$.annotation).key($$.graphKey);

            generatorTypes[type] = generatorTypes[type] || 0;
            return {
              data: generator,
              key: type + '-' + (generatorTypes[type] += 1),
              generator: generator
            };
          }),
          graphs: getSetGraphs(set)
        };
      });
    }

    function getSetGraphs(d) {
      return $$.setGraphs(d).map(function (graph, i) {
        return {
          data: graph,
          label: $$.graphLabel(graph) || '',
          key: $$.graphKey(graph, i),
          color: $$.graphColor(graph),
          group: $$.graphGroup(graph),
          annotations: $$.graphAnnotations(graph) || [],
          tooltipConfig: $$.graphTooltipConfig(graph) || function () {}
        };
      });
    }

    function getAllGraphs(sets) {
      return [].concat.apply([], sets.map(function (set) {
        return set.graphs;
      }));
    }

    function propagateHidden(groups) {
      groups.forEach(function (group) {
        group.groupGraphs.forEach(function (graph) {
          return graph.data.hidden = group.data.hidden;
        });
      });
    }

    function legendMouseover(d, selection) {
      var graphs = selection.selectAll('.d2b-graph'),
          annotations = selection.selectAll('.d2b-axis-annotation');
      if (!d.groupGraphs.some(function (graph) {
        return !graph.data.hidden;
      })) return;
      graphs.style('opacity', 0.2).filter(function (graph) {
        return d.data === graph.data || (d.groupGraphs.map(function (d) {
          return d.data;
        }) || []).indexOf(graph.data) > -1;
      }).style('opacity', '');

      annotations.style('opacity', 0.2).filter(function (annotation) {
        return d.data === annotation.graph || (d.groupGraphs.map(function (d) {
          return d.data;
        }) || []).indexOf(annotation.graph) > -1;
      }).style('opacity', '');
    }

    function legendMouseout(d, selection) {
      selection.selectAll('.d2b-graph').style('opacity', 1);
      selection.selectAll('.d2b-axis-annotation').style('opacity', 1);
    }

    function matchGraph(graph, allGraphs) {
      return allGraphs.filter(function (g) {
        return g.data === graph || g.data === graph.data;
      })[0];
    }

    function setupAxis(data, points, defaults) {
      if (!points.length) data.hidden = true;

      var axis = data.axis || defaults.axis,
          scale = data.scale ? data.scale.copy() : getScale(points, defaults);

      var domain = scale.domain();

      if (!scale.bandwidth && data.linearPadding) {
        var dist = domain[1] - domain[0];
        domain[0] = domain[0] + dist * data.linearPadding[0];
        domain[1] = domain[1] + dist * data.linearPadding[1];
      }

      scale.domain(domain);
      data.__axis__ = axis.scale(scale);
      data.__scale__ = scale;
    }

    function getScale(points, defaults) {
      var band = points.some(function (d) {
        return isNaN(d);
      }),
          domain = band ? d3.set(points).values() : d3.extent(points).map(function (d) {
        return d || 0;
      }),
          scale = band ? defaults.band : defaults.linear;

      return scale.domain(domain);
    }

    return chart;
  }

  /**
   * d2b.chartSunburst() returns a d2b
   * sunburst chart generator
   */
  function sunburst () {

    var $$ = {};

    // chart updater
    var chart = function chart(context) {
      context.call($$.chartFrame);

      // configure sunburst
      $$.sunburst.label($$.label).color($$.color);
      // configure breadcrumbs
      $$.breadcrumbs.color(function (d) {
        return $$.color(d.data);
      }).key(function (d, i) {
        return i;
      });
      // configure tooltip
      $$.tooltip.color(function (d) {
        return $$.color(d.data);
      });

      var selection = context.selection ? context.selection() : context;

      selection.each(function (datum) {
        update.call(this, datum, context !== selection ? context : null);
      });

      selection.dispatch('chart-sunburst-updated', { bubbles: true });

      return chart;
    };

    // configure chart properties
    base(chart, $$).addProp('chartFrame', chartFrame().legendEnabled(false).breadcrumbsEnabled(true)).addProp('sunburst', svgSunburst()).addProp('breadcrumbs', breadcrumbs().html(function (d) {
      return '<div class = \'d2b-sunburst-breadcrumb\'>' + tipTemplate(d) + '</div>';
    })).addProp('tooltip', tooltip().followMouse(true).html(function (d) {
      return '<div class = \'d2b-sunburst-tooltip\'>' + tipTemplate(d) + '</div>';
    })).addPropFunctor('label', function (d) {
      return d.label;
    }).addPropFunctor('color', function (d) {
      return color($$.label(d));
    }).addPropFunctor('outerRadius', function (d, w, h) {
      return Math.min(w, h) / 2;
    }).addPropFunctor('innerRadius', function (d, w, h) {
      return Math.min(50, Math.min(w, h) / 4);
    });

    // helpers
    var format = d3.format(',.0f'),
        formatPercent = d3.format('.1%');

    var tipTemplate = function tipTemplate(d) {
      var percent = d.value / d.selected.value;
      var percentText = percent > 1 ? '' : '<div class = \'d2b-sunburst-percent\'>\n        ' + formatPercent(d.value / d.selected.value) + '\n      </div>';

      return '\n      <div class = \'d2b-sunburst-label\'>\n        ' + $$.label(d.data) + '\n      </div>\n      <div class = \'d2b-sunburst-value\'>\n        ' + format(d.value) + '\n        ' + percentText + '\n      </div>\n    ';
    };

    // update breadcrumbs
    function setBreadcrumbs(el, data) {
      el.select('.d2b-breadcrumbs-container').datum(data).transition('sunburst-breadcrumbs').duration(100).call($$.breadcrumbs);
    }

    // define mouseover and click events
    function defineEvents(el) {
      var sunburstChart = el.select('.d2b-sunburst-chart'),
          root = el.selectAll('.d2b-sunburst-arc.d2b-sunburst-level-0').datum(),
          selected = root.selected;

      setBreadcrumbs(el, [selected]);
      sunburstChart.selectAll('.d2b-sunburst-arc').call($$.tooltip.clear).call($$.tooltip).on('mouseover.breadcrumbs', function (d) {
        var ancestors = d.ancestors();
        ancestors = ancestors.slice(0, ancestors.indexOf(selected) + 1);
        setBreadcrumbs(el, ancestors.reverse());
      }).on('mouseout.breadcrumbs', function () {
        return setBreadcrumbs(el, [selected]);
      });

      sunburstChart.on('mouseout', function () {
        return defineEvents(el);
      }).on('click', function () {
        return defineEvents(el);
      });
    }

    // update sunburst
    function update(datum, transition) {
      var el = d3.select(this),
          selection = el.select('.d2b-chart-container'),
          size = selection.node().__size__,
          transform = 'translate(' + size.width / 2 + ', ' + size.height / 2 + ')';

      var sunburstChart = selection.selectAll('.d2b-sunburst-chart').data(function (d) {
        return [d];
      }),
          sunburstChartEnter = sunburstChart.enter().append('g').attr('transform', transform).attr('class', 'd2b-sunburst-chart');

      sunburstChart = sunburstChart.merge(sunburstChartEnter);

      if (transition) {
        sunburstChart = sunburstChart.transition(transition);
      }

      $$.sunburst.outerRadius($$.outerRadius(datum, size.width, size.height)).innerRadius($$.innerRadius(datum, size.width, size.height));

      sunburstChart.attr('transform', transform).call($$.sunburst);

      defineEvents(el);
    }

    return chart;
  }

  function sankey$2 () {

    var $$ = {};

    function chart(context) {
      context.call($$.chartFrame);

      var selection = context.selection ? context.selection() : context;

      selection.each(function (datum) {
        update.call(this, datum, context !== selection ? context : null);
      });

      selection.dispatch('chart-sankey-updated', { bubbles: true });

      return chart;
    }

    function update(datum, transition) {
      var el = d3.select(this),
          selection = el.select('.d2b-chart-container'),
          size = selection.node().__size__;

      var sankeyChart = selection.selectAll('.d2b-sankey-chart').data(function (d) {
        return [d];
      }),
          sankeyChartEnter = sankeyChart.enter().append('g').attr('class', 'd2b-sankey-chart');

      sankeyChart = sankeyChart.merge(sankeyChartEnter);

      if (transition) {
        sankeyChart = sankeyChart.transition(transition);
      }

      sankeyChart.call($$.sankey.size(size));

      sankeyChart.selectAll('.d2b-sankey-link').call($$.linkTooltip);

      sankeyChart.selectAll('.d2b-sankey-node').call($$.nodeTooltip);

      return chart;
    }

    var defaultNodeTooltip = tooltip().html(function (d) {
      return '\n          <b>' + d.key + '</b>:\n          ' + d.value + '\n        ';
    }).color(function (d) {
      return d.color;
    }).followMouse(true);

    var defaultLinkTooltip = tooltip().html(function (d) {
      return '\n          <b>' + d.source.key + '</b>\n          <i class=\'fa fa-arrow-right d2b-sankey-link-arrow\' aria-hidden=\'true\'></i>\n          <b>' + d.target.key + '</b>:\n          ' + d.value + '\n        ';
    }).color('#444').followMouse(true);

    // configure the model
    base(chart, $$).addProp('chartFrame', chartFrame().legendEnabled(false).breadcrumbsEnabled(false)).addProp('sankey', sankey$1()).addProp('nodeTooltip', defaultNodeTooltip).addProp('linkTooltip', defaultLinkTooltip);

    return chart;
  }

  exports.version = version;
  exports.textWrap = textWrap;
  exports.textWrapPX = textWrapPX;
  exports.tweenArc = tweenArc;
  exports.tweenNumber = tweenNumber;
  exports.tweenCentroid = tweenCentroid;
  exports.tooltip = tooltip;
  exports.tooltipAxis = tooltipAxis;
  exports.stack = stack;
  exports.breadcrumbs = breadcrumbs;
  exports.legend = legend;
  exports.chartFrame = chartFrame;
  exports.defaultColor = color;
  exports.id = d2bid;
  exports.color = color;
  exports.omit = omit;
  exports.mean = mean;
  exports.median = median;
  exports.mode = mode;
  exports.range = range;
  exports.midpoint = midpoint;
  exports.toDegrees = toDegrees;
  exports.toRadians = toRadians;
  exports.modelBase = base;
  exports.symbolMars = mars;
  exports.symbolVenus = venus;
  exports.point = point;
  exports.svgPie = svgPie;
  exports.svgLine = line$1;
  exports.svgArea = area$1;
  exports.svgScatter = scatter;
  exports.svgBar = bar;
  exports.svgBoxPlot = boxPlot;
  exports.svgBubblePack = bubblePack;
  exports.svgSunburst = svgSunburst;
  exports.svgSankey = sankey$1;
  exports.plane = plane;
  exports.box = box;
  exports.chartPie = pie;
  exports.chartAxis = axis;
  exports.chartSunburst = sunburst;
  exports.chartSankey = sankey$2;

}((this.d2b = this.d2b || {}),d3,d3,d3,d3));