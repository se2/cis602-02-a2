## Data Visualization (DSC 530/602-02) Assignment 2

## Instructor: Professor [David Koop](http://www.cis.umassd.edu/~dkoop/)

## Goals
Start working with [Data-Driven Documents (D3)](https://d3js.org/)

## Instructions
You may complete the assignment in a single HTML file or use multiple files (e.g. one for CSS, one for HTML, and one for JavaScript). **You must use D3 v4 for this assignment**. All visualization should be done using D3 v4 calls. You may use other libraries (e.g. lodash) as long as they are not used to construct or modify SVGs, but you must credit them in the HTML file you turn in. Extensive [documentation for D3](https://github.com/mbostock/d3/wiki) is available, and [Vadim Ogievetsky's example-based introduction](https://dakoop.github.io/IntroD3) that we went through in class is also a useful reference. In addition, Scott Murray has written a great book named [Interactive Data Visualization for the Web](http://chimera.labs.oreilly.com/books/1230000000345).

## Due Date
The assignment is due at **11:59pm Monday, February 27**.

##Submission
You should submit any files required for this assignment on [myCourses](https://webapps.umassd.edu/myumd/bblearn/?crs=myinstitution). You may complete the assignment in a single HTML file or use multiple files (e.g. one for HTML, one for CSS, and one for JavaScript). Note that the files should be linked to the main HTML document accordingly. The filename of the main HTML document should be `a2.html`. myCourses may complain about the files; if so, please zip the files and submit the zip file instead.

## Details
For this assignment, we will use the same data from Part 3 of [Assignment 1](http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/assignment1.html). Recall this data is from the [U.S. Refugee Processing Center](http://www.wrapsnet.org/). The original data on historical arrivals is linked from their [Reports](http://www.wrapsnet.org/admissions-and-arrivals/). I have processed this data (retrieved Feb. 1, 2017) into a JavaScript array. By adding the following line to your web page, you will have a variable `refugees` that contains an array of objects.

    <script src="http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a1/us-refugees.js" type="text/javascript"></script>

You may also use the version hosted on git and served via https:

    <script src="https://rawgit.com/dakoop/060aab964b7e9ca2de4bf22a4f0a8195/raw/ea86ee9949c87da4c55023779bcb74931913dadc/us-refugees.js" type="text/javascript"></script>
You should add this line before your JavaScript code. Each object has eight properties: Year, Africa, Asia, Europe, Former Soviet Union,  Kosovo,Latin America/Caribbean,Near East/South Asia.

### 0. Info
Like Assignment 1, start by creating an HTML web page with the title "Assignment 2". It should contain the following text:

+ Your name
+ Your student id
+ The course title ("Data Visualization (DSC 530/CIS 602-02)"), and
+ The assignment title ("Assignment 2")
+ The text "This assignment is all my own work. I did not copy the code from any other source." (Your inclusion of this text indicates that you understand the consequences of violating the [UMass Dartmouth Student Academic Integrity Policy](http://www.umassd.edu/studentaffairs/studenthandbook/academicregulationsandprocedures/).)

If you used any additional JavaScript libraries, please append a note indicating their usage to the text above (e.g. "I used the [jQuery](http://jquery.com/) library to write callback functions.") Include links to the libraries used. You do not need to adhere to any particular style for this text, but I would suggest using headings to separate the sections of the assignment.

A template for the assignment is provided [here](http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a2/a2.html); save it as source. You may use this or create your own files.

### 1. Bar Chart (30 points)
Create a vertical bar chart, as in Part 3b of Assignment 1 but using D3. You may use the totals listed there or use your Part 3a code. You should draw both an x-axis and a y-axis and label them.

![Example Solution for Part 1](http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a2/solution-part1.png)
*Example Solution for Part 1*

Hints

+ [`d3.scaleBand`](https://github.com/d3/d3-scale#scaleBand) is useful for bar charts
+ D3 has routines (e.g. [`d3.axisLeft`](https://github.com/d3/d3-axis#axisLeft)) to build an axis given a scale
+ If you label all the years on x-axis, the text will likely overlap. Look at tickValues to address this.
+ A group element with a transform can help shift the entire visualization so that labels or axes have space
+ To rotate text, you can use the rotate transform, but do this **after** a translate
+ To truncate numbers like 100,000 to 100k, use `d3.formatPrefix(".0",1e3)` as the tick format

### 2. Stacked Bar Chart (30 points)
Create a **new** bar chart that shows, via color, the number of refugees from each region. Your bar chart will be similar to Part 1 except that each bar will be divided into pieces corresponding to the regions. Add a legend that indicates the relationship between regions and colors.

![Example Solution for Part 2](http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a2/solution-part2.png)
*Example Solution for Part 2*

Hints

+ [`d3.stack`](https://github.com/d3/d3-shape/blob/master/README.md#stacks) should be useful here. Check how the keys function works with the stack
+ If you use d3.stack, you will need nested selections (do not worry if elements are not grouped as bars)
+ [`d3.schemeCategory10`](https://github.com/d3/d3-shape/blob/master/README.md#stacks) should be useful for colors

### 3. Line Chart (30 points)
Create a third visualization that shows the number of refugees from a particular region over the years as a line chart. I have provided the following HTML code to create a dropdown menu with the possible regions. When a user selects a given region, your visualization should update to show a line chart corresponding to that region. You should use a transition to move the points and line segments as the selected region changes. For extra credit, add the ability to show (and thus compare) two different regions at the same time. The HTML code:

    Region: <select name="region" onChange="updateLineChart(this.value)"></select>

Note that this code requires you to implement the updateLineChart method that takes the region as a parameter. JavaScript code to add the options for the above region dropdown menu:

    var countries = Object.keys(refugees[0]).filter(function(k) { return k != "Year"; });

    d3.select("#linechart select")
        .selectAll("option").data(countries)
        .enter().append("option")
        .attr("value", function(d) { return d; })
       .text(function(d) { return d; });

![Example Solution for Part 3](http://www.cis.umassd.edu/~dkoop/dsc530-2017sp/a2/solution-part3.png)
*Example Solution for Part 3*

Hints

+ You will need to write code to create the chart once, but the update to the line will need to happen each time a region is selected.
+ [`d3.line`](https://github.com/d3/d3-shape#lines) may be useful