d3.select("#linechart select")
    .selectAll("option").data(countries)
    .enter().append("option")
    .attr("value", function(d) {
        return d;
    })
    .text(function(d) {
        return d;
    });


var updateLineChart = function(region) {

}