// external.js

// SVG size settings (set width to 1500)
const margin = {top: 70, right: 150, bottom: 120, left: 60};
const width = 1500 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Create SVG element
const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right + 200) // Extra space for the legend
    .attr("height", height + margin.top + margin.bottom);

// Append graph group
const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Add title
svg.append("text")
    .attr("x", (width + margin.left + margin.right) / 2)
    .attr("y", margin.top / 2)
    .attr("class", "title")
    .text("Health Data Visualization");

// Generate dates from September 1 to October 9
const dates = [];
const parseDate = d3.timeParse("%m.%d");

let startDate = new Date(2023, 8, 1); // September 1 (month is 0-indexed)
let endDate = new Date(2023, 9, 9);   // October 9

while (startDate <= endDate) {
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();
    dates.push(`${month}.${day}`);
    startDate.setDate(startDate.getDate() + 1);
}

// Provided data (October 4 to October 9)
const providedData = {
    '10.4': {activeEnergy: 290, distance: 3.4, steps: 8446, restingEnergy: 1818, flightsClimbed: 4},
    '10.5': {activeEnergy: 297, distance: 3.9, steps: 9046, restingEnergy: 1827, flightsClimbed: 2},
    '10.6': {activeEnergy: 268, distance: 3.5, steps: 8848, restingEnergy: 1819, flightsClimbed: 1},
    '10.7': {activeEnergy: 350, distance: 4.3, steps: 9771, restingEnergy: 1824, flightsClimbed: 5},
    '10.8': {activeEnergy: 284, distance: 3.2, steps: 8185, restingEnergy: 1818, flightsClimbed: 10},
    '10.9': {activeEnergy: 318, distance: 4.2, steps: 9633, restingEnergy: 1825, flightsClimbed: 6}
};

// Generate data array
const data = [];

// Random pulse data generation function
function generateRandomPulse(baseValue, minAmplitude, maxAmplitude, minFrequency, maxFrequency, noise) {
    const amplitude = Math.random() * (maxAmplitude - minAmplitude) + minAmplitude;
    const frequency = Math.random() * (maxFrequency - minFrequency) + minFrequency;
    return baseValue + amplitude * Math.sin(frequency * Math.random() * 10) + (Math.random() * noise - noise / 2);
}

// Data generation
dates.forEach((date, index) => {
    if (providedData[date]) {
        // Use provided data
        const d = providedData[date];
        data.push({
            date: date,
            activeEnergy: d.activeEnergy,
            distance: d.distance,
            steps: d.steps,
            restingEnergy: d.restingEnergy,
            flightsClimbed: d.flightsClimbed
        });
    } else {
        // Generate random pulse data
        const activeEnergy = generateRandomPulse(300, 30, 70, 0.1, 1, 20);
        const distance = generateRandomPulse(3.5, 0.5, 1.5, 0.1, 1, 0.3);
        const steps = generateRandomPulse(9000, 1000, 2000, 0.1, 1, 300);
        const restingEnergy = generateRandomPulse(1820, 5, 15, 0.1, 1, 5);
        const flightsClimbed = generateRandomPulse(5, 2, 5, 0.1, 1, 1);

        data.push({
            date: date,
            activeEnergy: Math.abs(Math.round(activeEnergy)),
            distance: Math.abs(parseFloat(distance.toFixed(2))),
            steps: Math.abs(Math.round(steps)),
            restingEnergy: Math.abs(Math.round(restingEnergy)),
            flightsClimbed: Math.abs(Math.round(flightsClimbed))
        });
    }
});

// Parse dates
data.forEach(function(d) {
    d.date = parseDate(d.date);
});

// Set up scales
const x = d3.scaleTime()
    .domain(d3.extent(data, d => d.date))
    .range([0, width]);

// Left y-axis (Steps)
const yLeft = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.steps) * 1.1])
    .range([height, 0]);

// Right y-axis (Normalized values)
const yRight = d3.scaleLinear()
    .domain([0, 1]) // Normalized range
    .range([height, 0]);

// Normalize data
data.forEach(function(d) {
    d.activeEnergyNorm = (d.activeEnergy - d3.min(data, d => d.activeEnergy)) / (d3.max(data, d => d.activeEnergy) - d3.min(data, d => d.activeEnergy));
    d.restingEnergyNorm = (d.restingEnergy - d3.min(data, d => d.restingEnergy)) / (d3.max(data, d => d.restingEnergy) - d3.min(data, d => d.restingEnergy));
    d.distanceNorm = (d.distance - d3.min(data, d => d.distance)) / (d3.max(data, d => d.distance) - d3.min(data, d => d.distance));
    d.flightsClimbedNorm = (d.flightsClimbed - d3.min(data, d => d.flightsClimbed)) / (d3.max(data, d => d.flightsClimbed) - d3.min(data, d => d.flightsClimbed));
});

// Distinct color palette
const lineStyles = {
    "Steps": { color: "#1f77b4", style: "solid" },       // Blue
    "Active Energy": { color: "#ff7f0e", style: "dash" }, // Orange
    "Resting Energy": { color: "#2ca02c", style: "dot" }, // Green
    "Distance": { color: "#d62728", style: "dashdot" },   // Red
    "Flights Climbed": { color: "#9467bd", style: "longdash" } // Purple
};

// Line style mapping
function getLineStyle(style) {
    switch (style) {
        case "solid":
            return "";
        case "dash":
            return "6,2";
        case "dot":
            return "2,2";
        case "dashdot":
            return "6,2,2,2";
        case "longdash":
            return "10,2";
        default:
            return "";
    }
}

// Line and area generators
const lineGenerators = {
    "Steps": d3.line()
        .x(d => x(d.date))
        .y(d => yLeft(d.steps)),
    "Active Energy": d3.line()
        .x(d => x(d.date))
        .y(d => yRight(d.activeEnergyNorm)),
    "Resting Energy": d3.line()
        .x(d => x(d.date))
        .y(d => yRight(d.restingEnergyNorm)),
    "Distance": d3.line()
        .x(d => x(d.date))
        .y(d => yRight(d.distanceNorm)),
    "Flights Climbed": d3.line()
        .x(d => x(d.date))
        .y(d => yRight(d.flightsClimbedNorm))
};

const areaGenerators = {
    "Steps": d3.area()
        .x(d => x(d.date))
        .y0(yLeft(0))
        .y1(d => yLeft(d.steps)),
    "Active Energy": d3.area()
        .x(d => x(d.date))
        .y0(yRight(0))
        .y1(d => yRight(d.activeEnergyNorm)),
    "Resting Energy": d3.area()
        .x(d => x(d.date))
        .y0(yRight(0))
        .y1(d => yRight(d.restingEnergyNorm)),
    "Distance": d3.area()
        .x(d => x(d.date))
        .y0(yRight(0))
        .y1(d => yRight(d.distanceNorm)),
    "Flights Climbed": d3.area()
        .x(d => x(d.date))
        .y0(yRight(0))
        .y1(d => yRight(d.flightsClimbedNorm))
};

// Plot areas with semi-transparent fill
const dataKeys = ["Steps", "Active Energy", "Resting Energy", "Distance", "Flights Climbed"];

dataKeys.forEach(key => {
    // Plot the area
    g.append("path")
        .datum(data)
        .attr("class", "area")
        .attr("d", areaGenerators[key])
        .style("fill", lineStyles[key].color)
        .style("opacity", 0.2);
});

// Plot lines with color and line styles
dataKeys.forEach(key => {
    g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", lineGenerators[key])
        .style("stroke", lineStyles[key].color)
        .style("fill", "none")
        .style("stroke-width", 1) // Thinner line
        .style("stroke-dasharray", getLineStyle(lineStyles[key].style));
});

// Add x-axis (show all dates)
g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.timeFormat('%m.%d')))
    .selectAll("text")
    .attr("transform", "rotate(-90)")
    .attr("dx", "-0.9em")
    .attr("dy", "-0.5em")
    .style("text-anchor", "end");

// Add left y-axis (Steps)
g.append("g")
    .call(d3.axisLeft(yLeft))
    .append("text")
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .attr("y", -50)
    .attr("dy", "1em")
    .attr("text-anchor", "end")
    .text("Steps");

// Add right y-axis (Normalized values 0~1)
g.append("g")
    .attr("transform", `translate(${width},0)`)
    .call(d3.axisRight(yRight).ticks(5).tickFormat(d3.format(".1f")))
    .append("text")
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .attr("y", 50)
    .attr("dy", "-1em")
    .attr("text-anchor", "end")
    .text("Normalized Value (0~1)");

// Add legend vertically on the far right
const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width + margin.left + 50},${margin.top})`);

legend.selectAll("legend-item")
    .data(dataKeys)
    .enter()
    .append("g")
    .attr("class", "legend-item")
    .attr("transform", (d, i) => `translate(0, ${i * 30})`)
    .each(function(d) {
        const legendItem = d3.select(this);
        // Area color
        legendItem.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 10)
            .style("fill", lineStyles[d].color)
            .style("opacity", 0.5);
        // Line style
        legendItem.append("line")
            .attr("x1", 0)
            .attr("x2", 30)
            .attr("y1", 20)
            .attr("y2", 20)
            .style("stroke", lineStyles[d].color)
            .style("stroke-width", 1)
            .style("stroke-dasharray", getLineStyle(lineStyles[d].style));
        // Text label
        legendItem.append("text")
            .attr("x", 35)
            .attr("y", 15)
            .text(d)
            .style("font-size", "12px")
            .attr("alignment-baseline", "middle");
    });
