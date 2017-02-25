var countries = Object.keys(refugees[0]).filter(function(k) {
    return k != "Year";
});

/* return totals of refugees for each year and push to refugees */
var getTotals = function(refugees) {
    refugees.map(function(o) {
        var total = Object.keys(o).reduce(function (s, k) {
            return s + (k !== 'Year' && o[k]);
        }, 0);
        o["Total"] = total;
    });
    return refugees;
}

/* define global variables */
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    data = getTotals(refugees),
    fontSize = 14,
    xLabel = "Year",
    yLabel = "Number of Refugees";

/* scale x and y */
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().range([height, 0]);

/* domain data for x and y */
x.domain(data.map(function(d) { return d["Year"]; }));
y.domain([0, d3.max(data, function(d) { return d["Total"]; }) * 1.2]);

/* ticks values for d["Year"], label every 5 years */
var ticks = x.domain().filter(function(d, i) { return !(i % 5); } );

/* define x and y axes rules */
var xAxis = d3.axisBottom(x)
                .tickValues(ticks);

var yAxis = d3.axisLeft(y)
                .ticks(10)
                .tickFormat(d3.formatPrefix(".0", 1e3));

/* reusable function to add label to axis */
var addAxisLabel = function(chart, attrs) {
    if (attrs === undefined) attrs = {};
    var label = chart.append("text")
                        .text(attrs.label);
    for (var key in attrs) {
        label.attr(key, attrs[key]);
    }
    return chart;
}

