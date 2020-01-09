var margin = {top: 40, right: 55, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%y-%b-%d").parse,
    formatPercent = d3.format(".0%");

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

// var color = d3.scale.category10();
var color = d3.scale.ordinal()
      .domain(["Democratic", "Republican"])
      .range(["#00AEF3", "#E9141D"]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var line = d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y); })
    .y1(function(d) { return y(d.y); });

function line_to_stacked(t) {
  return d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(t * d.y0 + d.y); })
    .y1(function(d) { return y(t * d.y0 + d.y); });
}

function area_to_stacked(t) {
  return d3.svg.area()
    .interpolate("basis")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0 + (1 - t) * d.y); })
    .y1(function(d) { return y(d.y0 + d.y); });
}

var stack = d3.layout.stack()
    .values(function(d) { return d.values; });

var svg = d3.select("#linechart").append("svg")    // changed select(body) to select(linechart)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("stroke-width", 3.0)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(error, data) {
  
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "date"; }));

  data.forEach(function(d) {
    d.date = parseDate(d.date);
  });

  var browsers = stack(color.domain().map(function(name) {
    return {
      name: name,
      values: data.map(function(d) {
        return {date: d.date, y: d[name] / 100};
      })
    };
  }));

  x.domain(d3.extent(data, function(d) { return d.date; }));

  var browser = svg.selectAll(".browser")
      .data(browsers)
    .enter().append("g")
      .attr("class", "browser");

  browser.append("path")
      .attr("class", "area")
      .attr("d", function(d) { return line(d.values); })
      .style("stroke", function(d) { return color(d.name); })
      .style("fill", function(d) { return color(d.name); })
  browser.append("text")
      .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y) + ")"; })
      .attr("x", 3)
      .attr("dy", ".35em")
      .style("fill", function(d) { return color(d.name); })
      .text(function(d) { return d.name; }); svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
});

var is_area_plot = false;
function transition() {
  var duration = 2000;
  var browser = svg.selectAll(".browser")
  var transition = browser.transition()
      .delay(function(d, i) { return i * 1000; })
      .duration(duration);
  var postTransition = transition.transition();
  if (!is_area_plot) {
    transition.selectAll("path")
      .attrTween("d", shapeTween(line_to_stacked, 1));
    transition.selectAll("text")
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y) + ")"; });
    postTransition.selectAll("path")
      .attrTween("d", shapeTween(area_to_stacked, 1))
      .style("stroke-opacity", 1.0);
    postTransition.selectAll("text")
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y / 2) + ")"; });
  } else {
    transition.selectAll("path")
      .style("stroke-opacity", 2.5)
      .attrTween("d", shapeTween(area_to_stacked, 0));
    transition.selectAll("text")
        .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.y) + ")"; });
    postTransition.selectAll("path")
      .attrTween("d", shapeTween(line_to_stacked, 0));
    postTransition.selectAll("text")
      .attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y) + ")"; });
  }
  is_area_plot = !is_area_plot;
}

function shapeTween(shape, direction) {
  return function(d, i, a) {
    return function(t) {
      return shape(direction ? t : 1.0 - t)(d.values);
    };
  };
}
