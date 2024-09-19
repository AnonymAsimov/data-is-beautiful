// Sample data for Anscombe's Quartet
const anscombeData = {
    dataset1: [
        {x: 10, y: 8.04}, {x: 8, y: 6.95}, {x: 13, y: 7.58}, {x: 9, y: 8.81},
        {x: 11, y: 8.33}, {x: 14, y: 9.96}, {x: 6, y: 7.24}, {x: 4, y: 4.26},
        {x: 12, y: 10.84}, {x: 7, y: 4.82}, {x: 5, y: 5.68}
    ],
    dataset2: [
        {x: 10, y: 9.14}, {x: 8, y: 8.14}, {x: 13, y: 8.74}, {x: 9, y: 8.77},
        {x: 11, y: 9.26}, {x: 14, y: 8.10}, {x: 6, y: 6.13}, {x: 4, y: 3.10},
        {x: 12, y: 9.13}, {x: 7, y: 7.26}, {x: 5, y: 4.74}
    ],
    dataset3: [
        {x: 10, y: 7.46}, {x: 8, y: 6.77}, {x: 13, y: 12.74}, {x: 9, y: 7.11},
        {x: 11, y: 7.81}, {x: 14, y: 8.84}, {x: 6, y: 6.08}, {x: 4, y: 5.39},
        {x: 12, y: 8.15}, {x: 7, y: 6.42}, {x: 5, y: 5.73}
    ],
    dataset4: [
        {x: 8, y: 6.58}, {x: 8, y: 5.76}, {x: 8, y: 7.71}, {x: 8, y: 8.84},
        {x: 8, y: 8.47}, {x: 8, y: 7.04}, {x: 8, y: 5.25}, {x: 19, y: 12.50},
        {x: 8, y: 5.56}, {x: 8, y: 7.91}, {x: 8, y: 6.89}
    ]
};

// Set up the dimensions for each plot
const width = 400;
const height = 300;
const margin = {top: 20, right: 20, bottom: 40, left: 40};

// Create scales for the axes
const xScale = d3.scaleLinear().domain([0, 20]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, 14]).range([height, 0]);

// Function to create a scatter plot for each dataset
function createScatterPlot(data, container) {
    // Create an SVG container
    const svg = d3.select(container)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Add X axis
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append("g")
        .call(d3.axisLeft(yScale));

    // Add points with black color
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.x))
        .attr("cy", d => yScale(d.y))
        .attr("r", 4)
        .style("fill", "#000");
}

// Render all the datasets
createScatterPlot(anscombeData.dataset1, "#plot1");
createScatterPlot(anscombeData.dataset2, "#plot2");
createScatterPlot(anscombeData.dataset3, "#plot3");
createScatterPlot(anscombeData.dataset4, "#plot4");
