function loadXML(file, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseXML);
        }
    };
    xhttp.open("GET", file, true);
    xhttp.send();
}

// Only parse records within the date range
function processData(xml) {
    let records = xml.getElementsByTagName("Record");
    let data = [];

    const startDate = new Date('2024-10-04');
    const endDate = new Date('2024-10-09');

    for (let i = 0; i < records.length; i++) {
        let type = records[i].getAttribute("type");
        let value = parseFloat(records[i].getAttribute("value"));
        let date = new Date(records[i].getAttribute("creationDate"));

        if (date >= startDate && date <= endDate) {
            if (type === "HKQuantityTypeIdentifierHeartRate" || type === "HKQuantityTypeIdentifierStepCount" || type === "HKQuantityTypeIdentifierSleepAnalysis") {
                data.push({ date: date, type: type, value: value });
            }
        }
    }
    drawDashboard(data);
}

// Visualization function (same as before)
function drawDashboard(data) {
    const margin = { top: 20, right: 20, bottom: 50, left: 50 },
        width = 1000 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([height, 0]);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y));

    // Line chart for heart rate
    const line = d3.line().x(d => x(d.date)).y(d => y(d.value));
    svg.append("path")
        .datum(data.filter(d => d.type === "HKQuantityTypeIdentifierHeartRate"))
        .attr("class", "line")
        .attr("d", line);

    // Bar chart for step count
    svg.selectAll(".bar")
        .data(data.filter(d => d.type === "HKQuantityTypeIdentifierStepCount"))
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.date) - 10)
        .attr("y", d => y(d.value))
        .attr("width", 10)
        .attr("height", d => height - y(d.value));

    // Area chart for sleep duration
    const area = d3.area().x(d => x(d.date)).y0(height).y1(d => y(d.value));
    svg.append("path")
        .datum(data.filter(d => d.type === "HKQuantityTypeIdentifierSleepAnalysis"))
        .attr("class", "area")
        .attr("d", area);
}

// Load and process the XML file
loadXML('export.xml', processData);
