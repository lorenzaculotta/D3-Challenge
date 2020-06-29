// GENERATE SVG
var svgWidth = 960;
var svgHeight = 700;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group and shift by left and top margins.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Retrieve data from the CSV file 
d3.csv("assets/data/data.csv").then(function(journalismData) {
    console.log(journalismData);

      // parse data
    journalismData.forEach(function(d) {
        d.poverty= +d.poverty;
        d.healthcare = +d.healthcare;
    });

    // Create scale function

    var xLinearScale = d3.scaleLinear()
      .domain([8, (d3.max(journalismData, d => d.poverty)+2)])
      .range([0, width]);
    
    var yLinearScale = d3.scaleLinear()
    .domain([2, (d3.max(journalismData, d => d.healthcare)+2)])
    .range([height, 0]);

    // Create axis functions
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

    // Append Axes to the chart
    // apoend x axis and text
    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

    chartGroup.append("text")
    .attr("transform", `translate(${width/2 -20}, ${height + margin.top + 30})`)
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("In Poverty (%)");

    // apoend y axis and text
    chartGroup.append("g")
    .call(yAxis);

    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left +40)
    .attr("x", 0 - (height / 2 +50))
    .attr("dy", "1em")
    .classed("axisText", true)
    .style("font-size", "20px")
    .text("Lacks Healthcare (%)");

    // Create Circles
    var circlesGroup = chartGroup.append("g")  
        .attr("class", "nodes")
        .selectAll("circle")
        .data(journalismData)
        .enter()
        .append("g");
    
    // append circle
     circlesGroup.append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".8");
    // append text
    circlesGroup.append("text")
        .text(d => d.abbr)
        .attr("x", d=> (xLinearScale(d.poverty)-9))
        .attr("y", d => (yLinearScale(d.healthcare)+7))        
        .style("font-size", "12px")
        .attr("fill", "white" )
        .attr("font-weight", "bold");
})