/* override domain of y */
y.domain([0, d3.max(data, function(d) { return d["Total"]; }) / 1.2]);

d3.select("#linechart select")
    .selectAll("option").data(countries)
    .enter().append("option")
    .attr("value", function(d) { return d; })
    .text(function(d) { return d; });

/* draw svg and g elements */
var chart = d3.select("#linechart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left * 1.5 + "," + margin.top / 1.5 + ")");

/* draw line chart */
var line = d3.line()
				.x(function(d) { return x(d["Year"]); })
				.y(function(d) { return y(d[countries[0]]); });

var path = chart.append("path")
				.datum(data)
				.attr("fill", "transparent")
				.attr("stroke", "#7BA1C2")
				.attr("stroke-width", 1.5)
				.attr("d", line);

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

/* update line chart function */
var updateLineChart = function(region) {
	var chart = d3.select("#linechart");
	/* update line with new data */
	var line = d3.line()
					.x(function(d) { return x(d["Year"]); })
					.y(function(d) { return y(d[region]); });
	/* re-draw line with new data */
	chart.select("path")
			.transition()
			.duration(500)
            .attr("d", line);
}

