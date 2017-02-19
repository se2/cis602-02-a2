/* stacked data */
var stack = d3.stack()
    .keys(countries);

var rows = stack(data),
    color = d3.scaleOrdinal(d3.schemeCategory10);

/* draw svg and g elements */
var chart = d3.select("#stacked")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left * 1.5 + "," + margin.top / 1.5 + ")");

/* draw stacked bar chart */
chart.append("g")
        .selectAll("g")
        .data(rows)
        .enter().append("g")
            .attr("fill", function(d) { return color(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
            .attr("x", function(d) { return x(d.data["Year"]); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth());

/* append x axis, transform it to bottom */
chart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)

/* append y axis */
chart.append("g")
        .call(yAxis)

/* label for x axis */
addAxisLabel(chart, {
        "transform": 'translate(' + (width / 2) + ', ' + (height + margin.top) + ')',
        "text-anchor": "middle",
        "font-size": fontSize,
        "label": xLabel
});

/* label for y axis */
addAxisLabel(chart, {
        "transform": 'translate(' + -margin.left + ', ' + (height / 2) + ')rotate(-90)',
        "text-anchor": "middle",
        "font-size": fontSize,
        "label": yLabel
});

/* note of relationship of colors - countries */
var radius = 9,
    noteFontSize = 12;

var note = chart.append("g")
                    .attr("class", "legend")
                    .selectAll("g")
                    .data(countries)
                    .enter().append("g")
                        .attr("class", function(d) { return d; })
                        .attr("transform", function(d, i) { return "translate(0," + (i * (radius + 1) * 2) + ")"; });

/* append country names */
note.append("text")
        .attr("font-size", noteFontSize)
        .attr("text-anchor", "end")
        .attr("x", width - (radius * 1.5))
        .attr("y", radius / 2)
        .text(function(d) { return d; });

/* append color circles */
note.append("circle")
        .attr("cx", width)
        .attr("cy", 0)
        .attr("r", radius)
        .attr("fill", color);

