// JSON 데이터 로드
var jsonData = d3.json("anscombe.json");

Promise.all([jsonData])
    .then(function(data) {
        // 데이터 확인 (Console에 출력)
        console.log(data);

        // 데이터 구조 접근: data[0]으로 JSON 내부 데이터 접근 가능
        scatterPlot(data[0]["set1"]); // 첫 번째 데이터셋을 사용하여 산점도 그리기
        barChart(data[0]["set2"]); // 두 번째 데이터셋을 사용하여 막대 차트 그리기
    })
    .catch(function(error) {
        console.error("Error loading the JSON file: ", error);
    });

// Scatter Plot 함수 정의
function scatterPlot(inputDataset) {
    var svg = d3.select("#scatterPlot")
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

// Bar Chart 함수 정의
function barChart(inputDataset) {
    var svg = d3.select("#barChart")
        .append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var xScale = d3.scaleBand()
        .domain(inputDataset.map(function(d, i) { return i; })) // Index를 X 축 도메인으로 사용
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
