var jsonData = d3.json("anscombe.json");

Promise.all([jsonData])
    .then(function(data) {
        console.log(data);
        scatterPlot(data[0]["set1"]);
        barChart(data[0]["set2"]);
    })
    .catch(function(error) {
        console.error("Error loading the JSON file: ", error);
    });

function scatterPlot(inputDataset) {
    var svg = d3.select("body")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var xScale = d3.scaleLinear()
        .domain([0, 20])
        .range([0, 300]);

    var yScale = d3.scaleLinear()
        .domain([0, 20])
        .range([300, 0]);

    svg.selectAll("circle")
        .data(inputDataset)
        .enter()
        .append("circle")
        .attr("r", 5)
        .attr("cx", function(d) { return xScale(d.x); })
        .attr("cy", function(d) { return yScale(d.y); })
        .attr("transform", "translate(30,30)");

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    svg.append("g").call(xAxis).attr("transform", "translate(30,330)");
    svg.append("g").call(yAxis).attr("transform", "translate(30,30)");
    svg.append("text").text("x").attr("x", 160).attr("y", 360);
    svg.append("text").text("y").attr("x", 0).attr("y", 160);
}

function barChart(inputDataset) {
    var svg = d3.select("body")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var xScale = d3.scaleBand()
        .domain(inputDataset.map(function(d, i) { return i; }))
        .range([0, 300])
        .padding(0.1);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(inputDataset, function(d) { return d.y; })])
        .range([300, 0]);

    svg.selectAll("rect")
        .data(inputDataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) { return xScale(i); })
        .attr("y", function(d) { return yScale(d.y); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return 300 - yScale(d.y); })
        .attr("fill", "steelblue")
        .attr("transform", "translate(30,30)");

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);

    svg.append("g").call(xAxis).attr("transform", "translate(30,330)");
    svg.append("g").call(yAxis).attr("transform", "translate(30,30)");
}
