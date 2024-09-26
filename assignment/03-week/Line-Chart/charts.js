var set1 = [{x:10,y:8.04},{x:8,y:6.95},{x:13,y:7.58},{x:9,y:8.81},{x:11,y:8.33},{x:14,y:9.96},{x:6,y:7.24},{x:4,y:4.26},{x:12,y:10.84},{x:7,y:4.82},{x:5,y:5.68}];

var set2 = [{x:10,y:9.14},{x:8,y:8.14},{x:13,y:8.74},{x:9,y:8.77},{x:11,y:9.26},{x:14,y:8.1},{x:6,y:6.13},{x:4,y:3.1},{x:12,y:9.13},{x:7,y:7.26},{x:5,y:4.74}];

var set3 = [{x:10,y:7.46},{x:8,y:6.77},{x:13,y:12.74},{x:9,y:7.11},{x:11,y:7.81},{x:14,y:8.84},{x:6,y:6.08},{x:4,y:5.39},{x:12,y:8.15},{x:7,y:6.42},{x:5,y:5.73}];

var set4 = [{x:8,y:6.58},{x:8,y:5.76},{x:8,y:7.71},{x:8,y:8.84},{x:8,y:8.47},{x:8,y:7.04},{x:8,y:5.25},{x:19,y:12.5},{x:8,y:5.56},{x:8,y:7.91},{x:8,y:6.89}];


function lineChart(data){
    
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", 200)
        .attr("height", 200);
        
    var yScale = d3.scaleLinear().domain([0, 20]).range([200, 0]);

    
    var xLine = d3.line()
        .x(function(d, i){ return i * 10; })
        .y(function(d){ return yScale(d.x); });

    var yLine = d3.line()
        .x(function(d, i){ return i * 10; })
        .y(function(d){ return yScale(d.y); });

    
    svg.append("path")
        .data([data])
        .attr("d", xLine)
        .attr("fill", "none")
        .attr("stroke", "orange");

    
    svg.append("path")
        .data([data])
        .attr("d", yLine)
        .attr("fill", "none")
        .attr("stroke", "teal");
}


lineChart(set1);


function lineChart2(data, svg, lineColor) {
    var yScale = d3.scaleLinear().domain([0, 20]).range([200, 0]);

    
    var ourLine = d3.line()
        .x(function(d, i){ return i * 10; })
        .y(function(d){ return yScale(d.x); });

    
    svg.append("path")
        .data([data])
        .attr("d", ourLine)
        .attr("fill", "none")
        .attr("stroke", lineColor)
        .attr("opacity", 0.3);
}


var svgX = d3.select("#chart")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);


lineChart2(set1, svgX, "red");
lineChart2(set2, svgX, "purple");
lineChart2(set3, svgX, "brown");
lineChart2(set4, svgX, "magenta");


var svgY = d3.select("#chart")
    .append("svg")
    .attr("width", 200)
    .attr("height", 200);


function lineChartY(data, svg, lineColor) {
    
    var yScale = d3.scaleLinear().domain([0, 20]).range([200, 0]);

    
    var ourLineY = d3.line()
        .x(function(d, i){ return i * 10; })
        .y(function(d){ return yScale(d.y); });

    
    svg.append("path")
        .data([data])
        .attr("d", ourLineY)
        .attr("fill", "none")
        .attr("stroke", lineColor)
        .attr("opacity", 0.3);
}


lineChartY(set1, svgY, "red");
lineChartY(set2, svgY, "green");
lineChartY(set3, svgY, "lime");
lineChartY(set4, svgY, "navy");
