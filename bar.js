/* draw svg and g elements */
var chart = d3.select("#barchart")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left * 1.5 + "," + margin.top / 1.5 + ")");

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

