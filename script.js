var countries = Object.keys(refugees[0]).filter(function(k) {
    return k != "Year";
});

d3.select("#linechart select")
    .selectAll("option").data(countries)
    .enter().append("option")
    .attr("value", function(d) {
        return d;
    })
    .text(function(d) {
        return d;
    });


/* return totals of refugees for each year in format of {year: year, value: total} */
var getTotals = function(refugees) {
    // var totals = [];
    refugees.forEach(function(o) {
        /* convert javascript object to an array */
        var array = Object.keys(o).map(function(key) {
            return o[key];
        });
        /* get sum of refugees for each year */
        var sum = array.reduce(function(s, e) {
            return s + e;
        }) - array[0];
        /* push to array */
        o["Total"] = sum;
    });
    return refugees;
}

/* define global variables */
var margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom,
    data = getTotals(refugees),
    fontSize = 14;

/* scale x and y */
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().range([height, 0]);

/* draw svg and g elements */
var chart = d3.select("#barchart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left * 1.5 + "," + margin.top / 1.5 + ")");

/* domain data for x and y */
x.domain(data.map(function(d) { return d["Year"]; }));
y.domain([0, d3.max(data, function(d) { return d["Total"]; }) * 1.2]);

/* ticks values for d["Year"], label every each 5 years */
var ticks = x.domain().filter(function(d, i) { return !(i % 5); } );

/* define x and y axes rules */
var xAxis = d3.axisBottom(x)
                .tickValues(ticks);

var yAxis = d3.axisLeft(y)
                .ticks(10)
                .tickFormat(d3.formatPrefix(".0", 1e3));

/* draw bar chart */
chart.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function(d) { return x(d["Year"]); })
        .attr("y", function(d) { return y(d["Total"]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d["Total"]); })
        .attr("fill", "#EB4838");

/* append x axis, transform it to bottom */
chart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

/* append y axis */
chart.append("g")
        .call(yAxis)

/* "Year" label for x axis */
chart.append("text")
        .text("Year")
        .attr("x", width / 2)
        .attr("y", height + margin.top)
        .style("text-anchor", "middle")
        .attr("font-size", fontSize);

/* "Number of Refugees" label for y axis */
chart.append("text")
        .text("Number of Refugees")
        .style("text-anchor", "middle")
        .attr('transform', 'translate(' + -margin.left + ', ' + (height / 2) + ')rotate(-90)')
        .attr("font-size", fontSize);

