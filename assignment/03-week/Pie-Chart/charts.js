var set1 = [{x:10,y:8.04},{x:8,y:6.95},{x:13,y:7.58},{x:9,y:8.81},{x:11,y:8.33},{x:14,y:9.96},{x:6,y:7.24},{x:4,y:4.26},{x:12,y:10.84},{x:7,y:4.82},{x:5,y:5.68}];

var set2 = [{x:10,y:9.14},{x:8,y:8.14},{x:13,y:8.74},{x:9,y:8.77},{x:11,y:9.26},{x:14,y:8.1},{x:6,y:6.13},{x:4,y:3.1},{x:12,y:9.13},{x:7,y:7.26},{x:5,y:4.74}];

var set3 = [{x:10,y:7.46},{x:8,y:6.77},{x:13,y:12.74},{x:9,y:7.11},{x:11,y:7.81},{x:14,y:8.84},{x:6,y:6.08},{x:4,y:5.39},{x:12,y:8.15},{x:7,y:6.42},{x:5,y:5.73}];

var set4 = [{x:8,y:6.58},{x:8,y:5.76},{x:8,y:7.71},{x:8,y:8.84},{x:8,y:8.47},{x:8,y:7.04},{x:8,y:5.25},{x:19,y:12.5},{x:8,y:5.56},{x:8,y:7.91},{x:8,y:6.89}];


function pieChart(data) {
    
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .append("g")
        .attr("transform", "translate(100,100)");

    var pie = d3.pie()
        .value(function(d) { return d.x; });

    var pieData = pie(data);

    var arc = d3.arc()
        .innerRadius(30)   
        .outerRadius(100); 

    var colors = ["#53e2e8","#dce539","#4cecbb","#f1be47","#79e950","#f6ac8d","#7be98e","#e5d17c","#8ce1af","#d6db66","#c2e596","#b4e462"];

    svg.selectAll("path")
        .data(pieData)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d) {
            var sliceIndex = d.index; 
            return colors[sliceIndex];
        })
        .attr("stroke", "white")
        .style("stroke-width", "2px");
}

pieChart(set1, "x", 100, 100);
pieChart(set2, "x", 300, 100);
pieChart(set3, "x", 100, 300);
pieChart(set4, "x", 300, 300);

pieChart(set1, "y", 100, 500);
pieChart(set2, "y", 300, 500);
pieChart(set3, "y", 100, 700);
pieChart(set4, "y", 300, 700);
