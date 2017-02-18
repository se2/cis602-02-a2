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

/* return totals of refugees for each year */
var getTotals = function(refugees) {
    var totals = [];
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
        totals.push(sum);
    });

    return totals;
}

/* return an array of years */
var getYear = function() {
    var years = [];
    refugees.forEach(function(o) { years.push(o["Year"]) });
    return years;
}

var width = 600,
    height = 400;

