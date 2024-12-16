document.getElementById("search-btn").addEventListener("click", function() {
    document.getElementById("overlay2").remove();
});

document.getElementById("toggle-btn").addEventListener("click", function() {
    const sidebar = document.getElementById("sidebar");

    sidebar.classList.toggle("hidden");

    if (sidebar.classList.contains("hidden")) {
        this.style.left = '0';
    } else {
        this.style.left = 'calc(40% + 40px)';
    }
});

document.getElementById("menu-btn").addEventListener("click", function () {
    const menuPopup = document.getElementById("menu-popup");
    if (menuPopup.classList.contains("hidden")) {
        menuPopup.classList.remove("hidden");
        menuPopup.style.display = "block";
    } else {
        menuPopup.classList.add("hidden");
        menuPopup.style.display = "none";
    }
});

const buttons = ["btn0", "btn1", "btn2", "btn3"];
buttons.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener("click", function () {
        const menuPopup = document.getElementById("menu-popup");
        menuPopup.classList.add("hidden");
        menuPopup.style.display = "none"; 
    });
});

const map = new maplibregl.Map({
    container: 'map', 
    style: 'positron_D.json', 
    center: [-74.235242, 40.730610], 
    zoom: 10, 
    minZoom: 9.5, 
    maxZoom: 13, 
    maxBounds: [
        [-74.835242, 40.230610], 
        [-73.035242, 41.230610] 
    ] 
});

map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

function computeCentroid(polygon) {
    const coords = polygon.geometry.coordinates[0][0]; 
    const n = coords.length;

    let x = 0, y = 0;
    coords.forEach(([lon, lat]) => {
        x += lon;
        y += lat;
    });
    return [x / n, y / n];
}
function defineAmazonLayer() {
    fetch('Data/Amazon_Location.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            map.addSource('Amazon', {
                type: 'geojson',
                data: geojsonData
            });

            map.addLayer({
                id: 'Amazon_Loc',
                type: 'circle',
                source: 'Amazon',
                paint: {
                    'circle-radius': 1,         
                    'circle-color': 'rgba(0, 0, 0, 1)',  
                    'circle-stroke-width': 2,        
                    'circle-stroke-color': '#ec5d5d', 
                    'circle-opacity': 0.7,
                    'circle-stroke-opacity': 0.7    
                }
            });
        });
}
function defineTraderLayer() {
    fetch('Data/Trader_Location.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            map.addSource('Trader', {
                type: 'geojson',
                data: geojsonData
            });

            map.addLayer({
                id: 'Trader_Loc',
                type: 'circle',
                source: 'Trader',
                paint: {
                    'circle-radius': 1,           
                    'circle-color': 'rgba(0, 0, 0, 1)',  
                    'circle-stroke-width': 2,       
                    'circle-stroke-color': '#e98fbc',  
                    'circle-opacity': 0.7,
                    'circle-stroke-opacity': 0.7     
                }
            });
        });
}
function defineWalmartLayer() {
    fetch('Data/Walmart_Location.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            map.addSource('Walmart', {
                type: 'geojson',
                data: geojsonData
            });

            map.addLayer({
                id: 'Walmart_Loc',
                type: 'circle',
                source: 'Walmart',
                paint: {
                    'circle-radius': 1,        
                    'circle-color': 'rgba(0, 0, 0, 1)', 
                    'circle-stroke-width': 2,       
                    'circle-stroke-color': '#ffd461', 
                    'circle-opacity': 0.7,
                    'circle-stroke-opacity': 0.7    
                }
            });
        });
}
function defineWholeLayer() {
    fetch('Data/Whole_Food_Location.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            map.addSource('Whole_Food', {
                type: 'geojson',
                data: geojsonData
            });

            map.addLayer({
                id: 'Whole_Loc',
                type: 'circle',
                source: 'Whole_Food',
                paint: {
                    'circle-radius': 1,         
                    'circle-color': 'rgba(0, 0, 1, 1)',  
                    'circle-stroke-width': 2,      
                    'circle-stroke-color': '#3dcba4', 
                    'circle-opacity': 0.7,
                    'circle-stroke-opacity': 0.7   
                }
            });
        });
}

defineAmazonLayer();
defineTraderLayer();
defineWalmartLayer();
defineWholeLayer();

function definePackageLayer() {
    map.loadImage('Pic/package3.png', (error, image) => {
        if (error) throw error;

        if (!map.hasImage('package-icon')) {
            map.addImage('package-icon', image);
        }

        map.addSource('package-source', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-74.04172287518699, 40.74969215442544], 
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-74.01219711826798, 40.797921437587966],
                        },
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-73.94827724606394, 40.689797835365205], 
                        }, 
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-73.97785244138562, 40.78405099270973], 
                        },  
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-73.89987784823322, 40.82074299748267], 
                        },   
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-73.91080380585716, 40.89295396819356], 
                        },   
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-73.99478754903049, 40.629954952226534], 
                        },    
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-74.10502365040031, 40.62701123818052], 
                        },    
                    },
                    {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [-74.16558237954096,40.549271012607555], 
                        },     
                    },
                ],
            }, 
        });

        map.addLayer({
            id: 'package-layer',
            type: 'symbol',
            source: 'package-source',
            layout: {
                'icon-image': 'package-icon',
                'icon-size': 0.03,
            },
        });

        packageLayerVisible = true;

        map.on('zoom', () => {
            const zoom = map.getZoom();
            const size = zoom / 300; 
            map.setLayoutProperty('package-layer', 'icon-size', size);
        });
    });
}

definePackageLayer();

                       const rawData = [
                        { Unit: "Amazon", Year: "139.00", Month: "14.99", Order: "4.99" },
                        { Unit: "Amazon_Fresh", Year: "139.00", Month: "14.99", Order: "9.95" },
                        { Unit: "Whole_food", Year: "0.00", Month: "14.99", Order: "9.95" },
                        { Unit: "Instacart", Year: "99.00", Month: "9.99", Order: "7.99" },
                        { Unit: "Target", Year: "99.00", Month: "10.99", Order: "10.99" },
                        { Unit: "Walmart", Year: "98.00", Month: "12.95", Order: "9.95" },
                        { Unit: "UberEats", Year: "119.99", Month: "9.99", Order: "3.99" },
                        { Unit: "Doordash", Year: "96.00", Month: "9.99", Order: "5.00" },
                        { Unit: "Grubhub", Year: "119.00", Month: "9.99", Order: "4.00" },
                    ];
                    
                    function processCSV(data) {
                        return data.map(d => ({
                            service: d.Unit,
                            Year: +d.Year,
                            Month: +d.Month,
                            Order: +d.Order,
                        }));
                    }
                    
                    function createBarChart(data, container) {
                        const processedData = processCSV(data);
                        const margin = { top: 20, right: 30, bottom: 60, left: 60 };
                        const width = 640 - margin.left - margin.right;
                        const height = 300 - margin.top - margin.bottom;
                    
                        d3.select(container).selectAll("*").remove();
                    
                        const svg = d3
                            .select(container)
                            .append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", `translate(${margin.left},${margin.top})`);
                    
                        const x0 = d3
                            .scaleBand()
                            .domain(processedData.map(d => d.service))
                            .range([0, width])
                            .padding(0.2);
                    
                        const x1 = d3
                            .scaleBand()
                            .domain(["Year", "Month", "Order"])
                            .range([0, x0.bandwidth()])
                            .padding(0.05);
                    
                        const y = d3
                            .scaleLinear()
                            .domain([0, d3.max(processedData, d => Math.max(d.Year, d.Month, d.Order))])
                            .nice()
                            .range([height, 0]);
                    
                        const colors = {
                            Year: "#8D9AAC",
                            Month: "#556580",
                            Order: "#1D3459",
                        };
                    
                        svg.append("g")
                            .attr("transform", `translate(0,${height})`)
                            .call(d3.axisBottom(x0))
                            .selectAll("text")
                            .style("text-anchor", "end")
                            .attr("dx", "-0.8em")
                            .attr("dy", "0.15em")
                            .attr("transform", "rotate(-45)");
                    
                        svg.append("g").call(d3.axisLeft(y));
                    
                        const bars = svg
                            .selectAll("g.bar-group")
                            .data(processedData)
                            .enter()
                            .append("g")
                            .attr("class", "bar-group")
                            .attr("transform", d => `translate(${x0(d.service)},0)`);
                    
                        bars.selectAll("rect")
                            .data(d =>
                                ["Year", "Month", "Order"].map(key => ({ key, value: d[key] }))
                            )
                            .enter()
                            .append("rect")
                            .attr("x", d => x1(d.key))
                            .attr("y", d => y(d.value))
                            .attr("width", x1.bandwidth())
                            .attr("height", d => height - y(d.value))
                            .attr("fill", d => colors[d.key]);

                    svg.append("text")
                    .attr("x", width / 2)
                    .attr("y", height + 60) 
                    .attr("text-anchor", "middle")
                    .attr("font-size", "12px")
                    .text("Delivery Service");
                    
                    svg.append("text")
                    .attr("class", "y-axis-label")
                    .attr("transform", "rotate(-90)") 
                    .attr("x", -height / 2) 
                    .attr("y", -margin.left + 10) 
                    .attr("text-anchor", "middle") 
                    .attr("font-size", "12px")
                    .text("Service Fee");

                    const tooltip = svg.append("g")
                        .style("opacity", 0)
                        .attr("class", "tooltip");
                    
                    tooltip.append("rect")
                        .attr("width", 100)
                        .attr("height", 30)
                        .attr("fill", "rgb(255,255,255,0.5)")
                        .attr("stroke", "rgb(0, 45, 143,0.5)");
                    
                    tooltip.append("text")
                        .attr("x", 10)
                        .attr("y", 20)
                        .style("font-size", "12px");
                    
                    bars.selectAll("rect")
                        .on("mouseover", function(event, d) {
                            tooltip.style("opacity", 1);
                            tooltip.select("text").text(`${d.key}: $${d.value}`);
                        })
                        .on("mousemove", function(event) {
                            tooltip
                                .attr("transform", `translate(${event.pageX -90}, ${event.pageY - 280})`);
                        })
                        .on("mouseout", function() {
                            tooltip.style("opacity", 0);
                        });
                    
                        const legend = svg
                            .append("g")
                            .attr("transform", `translate(${width - 22}, -15)`);
                    
                        Object.keys(colors).forEach((key, i) => {
                            legend
                                .append("rect")
                                .attr("x", 0)
                                .attr("y", i * 20)
                                .attr("width", 10)
                                .attr("height", 10)
                                .attr("fill", colors[key]);
                    
                            legend
                                .append("text")
                                .attr("x", 15)
                                .attr("y", i * 20 + 6)
                                .text(key)
                                .style("font-size", "12px")
                                .attr("alignment-baseline", "middle");
                        });
                    }
                    const container = "#table-container";
                    createBarChart(rawData, container);
                    
                    const rawData2 = [
                        { x: 1, y: 23 },
                        { x: 2, y: 293 },
                        { x: 3, y: 218 },
                        { x: 4, y: 120 },
                        { x: 5, y: 43 },
                        { x: 6, y: 21 },
                        { x: 7, y: 12 },
                        { x: 8, y: 10 },
                        { x: 9, y: 20 },
                        { x: 10, y: 16 }
                    ];
                    function createLineChart(rawData2, container) {
                        const margin = { top: 20, right: 30, bottom: 40, left: 60 };
                        const width = 640 - margin.left - margin.right;
                        const height = 450 - margin.top - margin.bottom;
                        const svg = d3.select(container)
                            .append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", `translate(${margin.left},${margin.top})`);
                        const x = d3.scaleLinear()
                            .domain([1, d3.max(rawData2, d => d.x)]) 
                            .range([0, width]);
                    
                        const y = d3.scaleLinear()
                            .domain([0, d3.max(rawData2, d => d.y)]) 
                            .range([height, 0]);

                        svg.append("g")
                            .attr("transform", `translate(0,${height})`)
                            .call(d3.axisBottom(x));
                    
                        svg.append("g")
                            .call(d3.axisLeft(y));

                        svg.append("text")
                        .attr("x", width / 2)
                        .attr("y", height + 35)
                        .attr("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .text("Unit");
                    
                        svg.append("text")
                        .attr("class", "y-axis-label")
                        .attr("transform", "rotate(-90)") 
                        .attr("x", -height / 2) 
                        .attr("y", -margin.left + 10) 
                        .attr("text-anchor", "middle") 
                        .attr("font-size", "12px")
                        .text("Borough number");

                        const line = d3.line()
                            .x(d => x(d.x))
                            .y(d => y(d.y));
                    
                        svg.append("path")
                            .data([rawData2]) 
                            .attr("class", "line")
                            .attr("d", line)
                            .attr("fill", "none")
                            .attr("stroke", "orange")
                            .attr("stroke-width", 2);

                        const area = d3.area()
                            .x(d => x(d.x))
                            .y0(height)  
                            .y1(d => y(d.y)); 
                    
                        svg.append("path")
                            .data([rawData2])  
                            .attr("class", "area")
                            .attr("d", area)
                            .attr("fill", "url(#orange-gradient)") 
                            .attr("fill-opacity", 1); 

                        const gradient = svg.append("defs")
                            .append("linearGradient")
                            .attr("id", "orange-gradient")
                            .attr("x1", "0%")
                            .attr("y1", "0%")
                            .attr("x2", "100%")
                            .attr("y2", "0%");
                    
                        gradient.append("stop")
                            .attr("offset", "0%")
                            .attr("stop-color", "white")  
                            .attr("stop-opacity", 0);  
                    
                        gradient.append("stop")
                            .attr("offset", "100%")
                            .attr("stop-color", "orange")  
                            .attr("stop-opacity", 1); 

                        svg.selectAll(".vertical-line")
                            .data(rawData2)
                            .enter()
                            .append("line")
                            .attr("class", "vertical-line")
                            .attr("x1", d => x(d.x))
                            .attr("y1", height) 
                            .attr("x2", d => x(d.x))
                            .attr("y2", d => y(d.y))  
                            .attr("stroke", "red")
                            .attr("stroke-dasharray", "1 4") 
                            .attr("stroke-width", 1)
                            .attr("stroke-opacity", 0.5); 
                            
                            svg.append("text")
                            .attr("x", width) 
                            .attr("y", 60)
                            .attr("text-anchor", "end")
                            .attr("font-size", "14px")
                            .style("font-weight", "bold") 
                            .style("font-style", "italic") 
                            .style("fill", "rgba(0, 45, 143, 0.7)") 
                            .text("Unit Number more than 4: 31.7%"); 
                            
                            svg.append("text")
                            .attr("x",300) 
                            .attr("y", 20) 
                            .attr("text-anchor", "end") 
                            .attr("font-size", "14px")
                            .style("font-weight", "bold")
                            .style("font-style", "italic") 
                            .style("fill", "rgba(0, 45, 143, 0.7)") 
                            .text("Delivery Fee Burden:"); 
                            
                            svg.append("text")
                            .attr("x", width-70) 
                            .attr("y", 10)
                            .attr("text-anchor", "end")
                            .attr("font-size", "14px")
                            .style("font-weight", "bold") 
                            .style("font-style", "italic") 
                            .style("fill", "rgba(0, 45, 143, 0.7)") 
                            .text("Delivery Fee AVG"); 
                            
                            svg.append("text")
                            .attr("x", width) 
                            .attr("y", 30) 
                            .attr("text-anchor", "end") 
                            .attr("font-size", "14px")
                            .style("font-weight", "bold") 
                            .style("font-style", "italic") 
                            .style("fill", "rgba(0, 45, 143, 0.7)") 
                            .text("(Household-income/Highest-income)"); 
                            
                            svg.append("line")
                            .attr("x1", width - 220)  
                            .attr("y1", 17)  
                            .attr("x2", width - 20) 
                            .attr("y2", 17)  
                            .attr("stroke", "rgba(0, 45, 143, 0.7)")  
                            .attr("stroke-width", 2);  
                    
                            const tooltip = svg.append("g")
                            .style("opacity", 0) 
                            .attr("class", "tooltip");

                            tooltip.append("rect")
                            .attr("width", 150)
                            .attr("height", 30)
                            .attr("fill", "rgb(255,255,255,0.5)")
                            .attr("stroke", "rgb(0, 45, 143, 0.5)");

                             tooltip.append("text")
                            .attr("x", 10)
                            .attr("y", 20)
                            .style("font-size", "12px");

                             svg.selectAll(".line-point")
                            .data(rawData2)
                            .enter()
                            .append("circle")
                            .attr("class", "line-point")
                            .attr("cx", d => x(d.x))
                            .attr("cy", d => y(d.y))
                            .attr("r", 10)
                            .attr("fill", "transparent")
                            .attr("stroke", "transparent")
                            .attr("stroke-width", 1)
                            .on("mouseover", function(event, d) {
                                tooltip.style("opacity", 1) 
                                    .attr("transform", `translate(${x(d.x) - 160},${y(d.y) - 120})`) 
                                    .select("text")
                                    .text(`Borough number: ${d.y}`); 
                            })
                            .on("mousemove", function(event) {
                                tooltip.attr("transform", `translate(${event.pageX -160},${event.pageY - 120})`);
                            })
                            .on("mouseout", function() {
                                tooltip.style("opacity", 0); 
                            });

                            svg.selectAll(".triangle")
                            .data(rawData2)
                            .enter()
                            .append("polygon")
                            .attr("class", "triangle")
                            .attr("points", d => {
                                const centerX = x(d.x);
                                const baseY = height;
                                const heightY = height - d.x * 30; 
                                return `${centerX - 10},${baseY} ${centerX + 10},${baseY} ${centerX},${heightY}`;
                            })
                            .attr("fill", "url(#triangle-gradient)")
                            .attr("stroke", "orange") 
                            .attr("stroke-width", 1.5)
                            .attr("stroke-opacity", 0.6);

                            const triangleGradient = svg.append("defs")
                                .append("linearGradient")
                                .attr("id", "triangle-gradient")
                                .attr("x1", "0%")
                                .attr("y1", "0%")
                                .attr("x2", "0%")
                                .attr("y2", "100%");

                            triangleGradient.append("stop")
                                .attr("offset", "0%")
                                .attr("stop-color", "yellow")
                                .attr("stop-opacity", 1);

                            triangleGradient.append("stop")
                                .attr("offset", "100%")
                                .attr("stop-color", "white")
                                .attr("stop-opacity", 0);
                            }
                        
                        const rawData3 = [
                            ['Not at all', 13],
                            ['Moderately', 59],
                            ['Extremely', 28]
                        ];
                        
                        function createBarChart_Package(rawData, container) {
                            const data = rawData.map(d => ({
                                category: d[0], 
                                value: d[1] 
                            }));

                            const margin = { top: 20, right: 10, bottom: 20, left: 30 };
                            const width = 320 - margin.left - margin.right;
                            const height = 140 - margin.top - margin.bottom;
                            d3.select(container).selectAll("*").remove();
                            const svg = d3
                                .select(container)
                                .append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", `translate(${margin.left},${margin.top})`);

                            const x = d3.scaleLinear()
                                .domain([0, d3.max(data, d => d.value)])
                                .range([0, width]);
                        
                            const y = d3.scaleBand()
                                .domain(data.map(d => d.category))
                                .range([0, height])
                                .padding(0.1);

                            svg.selectAll(".background-bar")
                            .data(data)
                            .enter()
                            .append("rect")
                            .attr("class", "background-bar")
                            .attr("x", 0) 
                            .attr("y", d => y(d.category))
                            .attr("width", width) 
                            .attr("height", y.bandwidth()) 
                            .attr("fill", "#8D9AAC");

                            svg.selectAll(".bar")
                                .data(data)
                                .enter()
                                .append("rect")
                                .attr("class", "bar")
                                .attr("x", 0) 
                                .attr("y", d => y(d.category))
                                .attr("width", d => x(d.value)) 
                                .attr("height", y.bandwidth()) 
                                .attr("fill", "#556580");

                            const tooltip = svg.append("g")
                                .style("opacity", 0)
                                .attr("class", "tooltip");
                        
                            tooltip.append("rect")
                                .attr("width", 100)
                                .attr("height", 30)
                                .attr("fill", "rgb(255,255,255,0.5)")
                                .attr("stroke", "rgb(0, 45, 143,0.5)");
                        
                            svg.selectAll(".bar")
                                .on("mouseover", function(event, d) {
                                    tooltip.style("opacity", 1);
                                    tooltip.select("text").text(`${d.category}: ${d.value}`);
                                })
                                .on("mousemove", function(event) {
                                    tooltip
                                        .attr("transform", `translate(${event.pageX - 90}, ${event.pageY - 30})`);
                                })
                                .on("mouseout", function() {
                                    tooltip.style("opacity", 0);
                                });

                            svg.selectAll(".bar-label")
                                .data(data)
                                .enter()
                                .append("text")
                                .attr("class", "bar-label")
                                .attr("x", 5) 
                                .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5) 
                                .attr("dy", ".35em") 
                                .attr("text-anchor", "start") 
                                .attr("fill", "rgb(255,255,255,0.8)")
                                .style("font-size", "10px")
                                .text(d => d.category);

                                svg.selectAll(".value-label")
                                .data(data)
                                .enter()
                                .append("text")
                                .attr("class", "value-label")
                                .attr("x", width-5) 
                                .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5) 
                                .attr("dy", ".35em")
                                .attr("text-anchor", "end") 
                                .attr("fill", "rgb(255,255,255,0.8)")
                                .style("font-size", "12px")
                                .text(d => `${d.value}%`); 
                               
                                svg.selectAll(".value-label")
                                .data(data)
                                .enter()
                                .append("text")
                                .attr("class", "value-label")
                                .attr("x", width-5)
                                .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5)
                                .attr("dy", ".35em")
                                .attr("text-anchor", "end") 
                                .attr("fill", "rgb(255,255,255,0.8)")
                                .style("font-size", "12px")
                                .text(d => `${d.value}%`);

                                svg.append("text")
                                .attr("x", width - 2) 
                                .attr("y", height +15) 
                                .attr("text-anchor", "end") 
                                .style("font-size", "14px")
                                .text("Package Theft Concerned");   
                            }
                              
                        const rawData4 = [
                            [1, 34],
                            [2, 39],
                            [3, 15],
                            [4, 4],
                            ['5+', 8]
                        ];
                        
                        function createBarChart_Package2(rawData, container) {

                            const data = rawData.map(d => ({
                                category: d[0],
                                value: d[1]   
                            }));
                        
                            const margin = { top: 20, right: 10, bottom: 20, left: 0 };
                            const width = 320 - margin.left - margin.right;
                            const height = 200 - margin.top - margin.bottom;

                            d3.select(container).selectAll("*").remove();

                            const svg = d3
                                .select(container)
                                .append("svg")
                                .attr("width", width + margin.left + margin.right)
                                .attr("height", height + margin.top + margin.bottom)
                                .append("g")
                                .attr("transform", `translate(${margin.left},${margin.top})`);

                            const x = d3.scaleLinear()
                                .domain([0, d3.max(data, d => d.value)]) 
                                .range([0, width]);
                        
                            const y = d3.scaleBand()
                                .domain(data.map(d => d.category))
                                .range([0, height])
                                .padding(0.1);

                            svg.selectAll(".background-bar")
                                .data(data)
                                .enter()
                                .append("rect")
                                .attr("class", "background-bar")
                                .attr("x", 0)
                                .attr("y", d => y(d.category)) 
                                .attr("width", width)
                                .attr("height", y.bandwidth())
                                .attr("fill", "#8D9AAC");

                            svg.selectAll(".bar")
                                .data(data)
                                .enter()
                                .append("rect")
                                .attr("class", "bar")
                                .attr("x", 0) 
                                .attr("y", d => y(d.category)) 
                                .attr("width", d => x(d.value)) 
                                .attr("height", y.bandwidth()) 
                                .attr("fill", "#556580"); 

                            const tooltip = svg.append("g")
                                .style("opacity", 0)
                                .attr("class", "tooltip");
                        
                            tooltip.append("rect")
                                .attr("width", 100)
                                .attr("height", 30)
                                .attr("fill", "rgb(255,255,255,0.5)")
                                .attr("stroke", "rgb(0, 45, 143,0.5)");
                        
                            svg.selectAll(".bar")
                                .on("mouseover", function(event, d) {
                                    tooltip.style("opacity", 1);
                                    tooltip.select("text").text(`${d.category}: ${d.value}`);
                                })
                                .on("mousemove", function(event) {
                                    tooltip
                                        .attr("transform", `translate(${event.pageX - 90}, ${event.pageY - 30})`);
                                })
                                .on("mouseout", function() {
                                    tooltip.style("opacity", 0);
                                });
                        
                                svg.selectAll(".bar-label")
                                .data(data)
                                .enter()
                                .append("text")
                                .attr("class", "bar-label")
                                .attr("x", 5) 
                                .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5) 
                                .attr("dy", ".35em")
                                .attr("text-anchor", "start")
                                .attr("fill", "rgb(255,255,255,0.8)")
                                .style("font-size", "10px")
                                .text(d => d.category);

                                svg.selectAll(".value-label")
                                .data(data)
                                .enter()
                                .append("text")
                                .attr("class", "value-label")
                                .attr("x", width-5) 
                                .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5) 
                                .attr("dy", ".35em") 
                                .attr("text-anchor", "end") 
                                .attr("fill", "rgb(255,255,255,0.8)")
                                .style("font-size", "12px")
                                .text(d => `${d.value}%`); 

                                svg.append("text")
                                .attr("x", width - 2) 
                                .attr("y", height +15) 
                                .attr("text-anchor", "end") 
                                .style("font-size", "14px")
                                .text("Number of Stolen Packages");    
                            }
                                 
                                 const rawData5 = [
                                    ['Track the Delivery Process', 52],
                                    ['Stay at home when expecting a package', 50],
                                    ['Shop in-store or online with in-store pickup', 40],
                                    ['Security system', 25],
                                    ['Had it sent to another location', 19]
                                ];
                                
                                function createBarChart_Package3(rawData, container) {
                                    const data = rawData.map(d => ({
                                        category: d[0], 
                                        value: d[1]   
                                    }));

                                    const margin = { top: 0, right: 30, bottom: 20, left: 60 };
                                    const width = 600 - margin.left - margin.right;
                                    const height = 200 - margin.top - margin.bottom;

                                    d3.select(container).selectAll("*").remove();

                                    const svg = d3
                                        .select(container)
                                        .append("svg")
                                        .attr("width", width + margin.left + margin.right)
                                        .attr("height", height + margin.top + margin.bottom)
                                        .append("g")
                                        .attr("transform", `translate(${margin.left},${margin.top})`);

                                    const x = d3.scaleLinear()
                                        .domain([0, d3.max(data, d => d.value)]) 
                                        .range([0, width]);
                                
                                    const y = d3.scaleBand()
                                        .domain(data.map(d => d.category))
                                        .range([0, height])
                                        .padding(0.1);

                                    svg.selectAll(".background-bar")
                                        .data(data)
                                        .enter()
                                        .append("rect")
                                        .attr("class", "background-bar")
                                        .attr("x", 0)
                                        .attr("y", d => y(d.category)) 
                                        .attr("width", width) 
                                        .attr("height", y.bandwidth()) 
                                        .attr("fill", "#8D9AAC"); 

                                    svg.selectAll(".bar")
                                        .data(data)
                                        .enter()
                                        .append("rect")
                                        .attr("class", "bar")
                                        .attr("x", 0) 
                                        .attr("y", d => y(d.category)) 
                                        .attr("width", d => x(d.value)) 
                                        .attr("height", y.bandwidth()) 
                                        .attr("fill", d => d.category === "Stay at home when expecting a package" ? "#1D3459" : "#556580"); 

                                    const tooltip = svg.append("g")
                                        .style("opacity", 0)
                                        .attr("class", "tooltip");
                                
                                    tooltip.append("rect")
                                        .attr("width", 100)
                                        .attr("height", 30)
                                        .attr("fill", "rgb(255,255,255,0.5)")
                                        .attr("stroke", "rgb(0, 45, 143,0.5)");
                                
                                    svg.selectAll(".bar")
                                        .on("mouseover", function(event, d) {
                                            tooltip.style("opacity", 1);
                                            tooltip.select("text").text(`${d.category}: ${d.value}`);
                                        })
                                        .on("mousemove", function(event) {
                                            tooltip
                                                .attr("transform", `translate(${event.pageX - 90}, ${event.pageY - 30})`);
                                        })
                                        .on("mouseout", function() {
                                            tooltip.style("opacity", 0);
                                        });

                                    svg.selectAll(".bar-label")
                                        .data(data)
                                        .enter()
                                        .append("text")
                                        .attr("class", "bar-label")
                                        .attr("x", 5) 
                                        .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5) 
                                        .attr("dy", ".35em") 
                                        .attr("text-anchor", "start") 
                                        .attr("fill", "rgb(255,255,255,0.8)")
                                        .style("font-size", "10px")
                                        .text(d => d.category);

                                    svg.selectAll(".value-label")
                                        .data(data)
                                        .enter()
                                        .append("text")
                                        .attr("class", "value-label")
                                        .attr("x", width - 5) 
                                        .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5) 
                                        .attr("dy", ".35em") 
                                        .attr("text-anchor", "end")
                                        .attr("fill", "rgb(255,255,255,0.8)")
                                        .style("font-size", "14px")
                                        .text(d => `${d.value}%`);
                                        
                                        svg.selectAll(".value-label")
                                        .data(data)
                                        .enter()
                                        .append("text")
                                        .attr("class", "value-label")
                                        .attr("x", width-5) 
                                        .attr("y", d => y(d.category) + y.bandwidth() / 3 + 5) 
                                        .attr("dy", ".35em") 
                                        .attr("text-anchor", "end") 
                                        .attr("fill", "rgb(255,255,255,0.8)")
                                        .style("font-size", "12px")
                                        .text(d => `${d.value}%`); 

                                        svg.append("text")
                                        .attr("x", width - 2)
                                        .attr("y", height +15) 
                                        .attr("text-anchor", "end") 
                                        .style("font-size", "14px")
                                        .text("How People Prevent Package Theft");     
                                
                                    }
                                const container2 = document.getElementById("table-container2");

                                const chartTitles = [
                                    { text: "44%", left: 40, top: 150, fontSize: "18px", color: "#1D3459", fontWeight: "bold" },
                                    { text: "of Americans have<br>had a Package Stolen", left: 40, top: 170, fontSize: "14px", color: "#556580", fontWeight: "normal" },
                                    { text: "$112.3", left: 210, top: 150, fontSize: "18px", color: "#1D3459", fontWeight: "bold" },
                                    { text: "Average Value of <br>Stolen Packages", left: 210, top: 170, fontSize: "14px", color: "#556580", fontWeight: "normal" }
                                ];

                                chartTitles.forEach(titleInfo => {
                                    const titleElement = document.createElement("div");
                                    titleElement.innerHTML = titleInfo.text;   
                                    titleElement.style.position = "absolute";  
                                    titleElement.style.textAlign = "left";  
                                    titleElement.style.marginBottom = "14px";  
                                    titleElement.style.fontSize = titleInfo.fontSize;  
                                    titleElement.style.fontWeight = titleInfo.fontWeight;  
                                    titleElement.style.color = titleInfo.color;  

                                    titleElement.style.left = titleInfo.left + "px";  
                                    titleElement.style.top = titleInfo.top + "px";   

                                    container2.insertBefore(titleElement, container2.firstChild);
                                });                               
                                
                        
                        
                        

function createTrianglePath(unit) {
    const base = 10;
    const height = Math.pow(unit, 2) * 2; 
    return `M ${-base / 2} 0 L ${base / 2} 0 L 0 ${-height} Z`;
}

map.on('load', () => {
    fetch('Data/Unit_F.geojson')
        .then(response => response.json())
        .then(geojsonData => {
            map.addSource('geojson-data', {
                type: 'geojson',
                data: geojsonData
            });

            map.addLayer({
                id: 'geojson-layer',
                type: 'fill',
                source: 'geojson-data',
                paint: {
                    'fill-color': 'transparent',
                    'fill-opacity': 0
                }
            });

            map.addLayer({
                id: 'geojson-outline',
                type: 'line',
                source: 'geojson-data',
                paint: {
                    'line-color': '#ff0000',
                    'line-opacity': 0,
                    'line-width': 2
                },
                filter: ['==', 'id', ''] 
            });

            const svg = d3.select(map.getCanvasContainer())
                .append("svg")
                .attr("class", "overlay")
                .attr("width", "100%")
                .attr("height", "100%")
                .style("position", "absolute")
                .style("top", 0)
                .style("left", 0)
                .style("display", "none");

            const defs = svg.append("defs");

            const defaultGradient = defs.append("linearGradient")
                .attr("id", "default-gradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");

            defaultGradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "Orange")
                .attr("stop-opacity", 1);

            defaultGradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "Orange")
                .attr("stop-opacity", 0);

            const clickedGradient = defs.append("linearGradient")
                .attr("id", "clicked-gradient")
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "0%")
                .attr("y2", "100%");

            clickedGradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "red") 
                .attr("stop-opacity", 1);

            clickedGradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "red") 
                .attr("stop-opacity", 0);

            const features = geojsonData.features;

            let selectedTriangle = null;
            let popup = null; 

            const triangles = svg.selectAll("path")
                .data(features)
                .enter()
                .append("path")
                .attr("transform", d => {
                    const centroid = computeCentroid(d);
                    const { x, y } = map.project(centroid);
                    return `translate(${x},${y})`;
                })
                .attr("d", d => createTrianglePath(d.properties.Unit))
                .attr("fill", "url(#default-gradient)") 
                .attr("stroke", "transparent")
                .attr("stroke-width", 1.5)
                .on("click", function(event, d) {
                    if (selectedTriangle) {
                        selectedTriangle.attr("fill", "url(#default-gradient)");
                    }

                    map.setFilter('geojson-outline', ['==', 'id', d.properties.id]); 
                    map.setPaintProperty('geojson-outline', 'line-opacity', .7);

                    selectedTriangle = d3.select(this);
                    selectedTriangle.attr("fill", "url(#clicked-gradient)"); 

                    if (popup) {
                        popup.remove();
                        popup = null;
                    }

                    const centroid = computeCentroid(d);
                    const { x, y } = map.project(centroid);

                    popup = d3.select("body")
                        .append("div")
                        .attr("class", "popup")
                        .style("position", "absolute")
                        .style("background-color", "rgba(255,255,255,0.7")
                        .style("border", "1px solid black")
                        .style("padding", "10px")
                        .style("border-radius", "20px")
                        .style("box-shadow", "0px 4px 6px rgba(0, 0, 0, 0.1)")
                        .style("top", `${y - 50}px`)
                        .style("left", `${x + 20}px`);

                    popup.html(`
                        <strong>Census Tarct:</strong> ${d.properties["Re_Income_New_York_Specific_Counties_Geographic Area Name"]
                        .replace(/^Census Tract /, 'CT ') 
                        .replace(/;/g, ',')}<br> 
                        <strong>Median Income:</strong> $${parseInt(d.properties["Re_Income_New_York_Specific_Counties_Estimate!!Households!!Median income (dollars)"])
                        .toLocaleString()}<br> <!-- 천 단위 콤마 추가 -->
                        <strong>Delivery Fee Unit:</strong> ${parseFloat(d.properties["Re_Income_New_York_Specific_Counties_Units"])
                        .toFixed(3)}<br> <!-- 소수점 3자리까지만 표시 -->
                        <strong>District:</strong> ${d.properties["Destrict"]}
                    `);
                });
            map.on('click', (e) => {
                const featuresAtPoint = map.queryRenderedFeatures(e.point, { layers: ['geojson-layer'] });

                if (featuresAtPoint.length === 0) {
                    map.setPaintProperty('geojson-outline', 'line-opacity', 0);
                    map.setFilter('geojson-outline', ['==', 'id', '']); 

                    if (selectedTriangle) {
                        selectedTriangle.attr("fill", "url(#default-gradient)");
                        selectedTriangle = null;
                    }
                    if (popup) {
                        popup.remove();
                        popup = null;
                    }
                }
            });
            map.on('move', () => {
                triangles.attr("transform", d => {
                    const centroid = computeCentroid(d);
                    const { x, y } = map.project(centroid);
                    return `translate(${x},${y})`;
                });
            });
            
         
            function heatmap(map) {
                map.addSource('aged-65', {
                    type: 'geojson',
                    data: 'Data/Aged_65.geojson' 
                });

                map.addSource('disability', {
                    type: 'geojson',
                    data: 'Data/Disability.geojson' 
                });

                map.addSource('work-50', {
                    type: 'geojson',
                    data: 'Data/Work_50.geojson' 
                });
            
                map.addLayer({
                    id: 'heatmap-work-50',
                    type: 'heatmap',
                    source: 'work-50',
                    maxzoom: 20,
                    paint: {
                        'heatmap-color': [
                            'interpolate', ['linear'], ['heatmap-density'],
                            0, 'rgba(32, 0, 0, 0)',
                            0.1, 'rgba(32, 235, 150, 0.8)', 
                            0.3, 'rgba(32, 235, 150, 0.5)', 
                            0.9, 'rgba(32, 235, 150, 0.2)'
                        ],
                        'heatmap-weight': 0.1,
                        'heatmap-intensity': 0.3,
                        'heatmap-opacity': 0.7,
                        'heatmap-radius' : 10,
                        
                    }
                });

                map.addLayer({
                    id: 'heatmap-aged-65',
                    type: 'heatmap',
                    source: 'aged-65',
                    maxzoom: 20,
                    paint: {
                        'heatmap-color': [
                            'interpolate', ['linear'], ['heatmap-density'],
                            0, 'rgba(255, 255, 0, 0)', 
                            0.1, 'rgba(255, 255, 0, 0.8)', 
                            0.3, 'rgba(255, 255, 0, 0.5)',
                            0.9, 'rgba(255, 255, 0, 0.2)'
                        ],
                        'heatmap-weight': 0.1,
                        'heatmap-intensity': 0.3,
                        'heatmap-opacity': 0.7,
                        'heatmap-radius' : 10,
                    }
                });
            
                map.addLayer({
                    id: 'heatmap-disability',
                    type: 'heatmap',
                    source: 'disability',
                    maxzoom: 20,
                    paint: {
                        'heatmap-color': [
                            'interpolate', ['linear'], ['heatmap-density'],
                            0, 'rgba(255, 0, 0, 0)',
                            0.1, 'rgba(255, 0, 0, 0.8)',
                            0.3, 'rgba(219, 0, 0, 0.5)', 
                            0.9, 'rgba(255, 0, 0, 0.2)'
                        ],
                        'heatmap-weight': 0.1,
                        'heatmap-intensity': 0.3,
                        'heatmap-opacity': 0.7,
                        'heatmap-radius' : 10,
                    }
                });
              
                
            }
            function showHeatmapControls() {
                document.getElementById('heatmap-controls').style.display = 'block';
            }
            function hideHeatmapControls() {
                document.getElementById('heatmap-controls').style.display = 'none';
            }
            function toggleHeatmapLayer(map, layerId) {
                const visibility = map.getLayoutProperty(layerId, 'visibility');
                map.setLayoutProperty(layerId, 'visibility', visibility === 'visible' ? 'none' : 'visible');
            }
            function hideHeatmap(map) {
                map.setLayoutProperty('heatmap-aged-65', 'visibility', 'none');
                map.setLayoutProperty('heatmap-disability', 'visibility', 'none');
                map.setLayoutProperty('heatmap-work-50', 'visibility', 'none');
                hideHeatmapControls(); 
            }
            function showHeatmap(map) {
                map.setLayoutProperty('heatmap-aged-65', 'visibility', 'visible');
                map.setLayoutProperty('heatmap-disability', 'visibility', 'visible');
                map.setLayoutProperty('heatmap-work-50', 'visibility', 'visible');
                showHeatmapControls(); 
            }

            document.getElementById('btn-aged-65').addEventListener('click', () => {
                toggleHeatmapLayer(map, 'heatmap-aged-65');
            });

            document.getElementById('btn-disability').addEventListener('click', () => {
                toggleHeatmapLayer(map, 'heatmap-disability');
            });

            document.getElementById('btn-work-50').addEventListener('click', () => {
                toggleHeatmapLayer(map, 'heatmap-work-50');
            });
            
            heatmap(map);
            hideHeatmap(map);
            const path = d3.geoPath();  
            let isBoroughActive = false;

            function hideAllContents() {
                document.getElementById("content-title").textContent = "";
                document.getElementById("content-text").textContent = "";
                d3.select(".overlay").style("display", "none");

                if (map.getLayer('Trader_Loc')) {
                    map.removeLayer('Trader_Loc');
                }
                if (map.getSource('Trader')) {
                    map.removeSource('Trader');
                }

                if (map.getLayer('Walmart_Loc')) {
                    map.removeLayer('Walmart_Loc');
                }
                if (map.getSource('Walmart')) {
                    map.removeSource('Walmart');
                }

                if (map.getLayer('Whole_Loc')) {
                    map.removeLayer('Whole_Loc');
                }
                if (map.getSource('Whole_Food')) {
                    map.removeSource('Whole_Food');
                }

                if (map.getLayer('Amazon_Loc')) {
                    map.removeLayer('Amazon_Loc');
                }
                if (map.getSource('Amazon')) {
                    map.removeSource('Amazon');
                }
                if (map.getLayer('package-layer')) {
                    map.removeLayer('package-layer'); 
                }
                
                if (map.getSource('package-source')) {
                    map.removeSource('package-source'); 
                }

     const chartContainer = "#table-container"; 
     d3.select(chartContainer).selectAll("*").remove(); 
     hideHeatmap(map);
    }
document.getElementById('table-container2').style.display = 'none';  



document.getElementById("btn0").addEventListener("click", function() {
        hideAllContents();
        document.getElementById("content-title").innerHTML = 
    '<span style="color: black;">Cost Burden</span> and <span style="color: black;">Social Discomfort</span><br> of Delivery Services';
        document.getElementById("content-text2").textContent = "The delivery system has become an almost essential service in modern society, and especially in large cities like New York, it is hard to find areas where delivery services are unavailable. However, certain individuals may face difficulties accessing these delivery services depending on their circumstances. This article will explore two main issues: the burden of delivery fees and the inability to receive deliveries due to specific situations.";
        document.getElementById("content-text").textContent = "Delivery services are available in various forms, including packages, groceries, and meals, and these services often come with additional charges on top of the cost of the goods. While these additional costs are not a major burden for individuals with average incomes, they can be a significant financial strain for some, particularly those facing income inequality, leading to the inability to use delivery services. The average annual cost for using delivery services is $130, with a monthly average of about $13."
        defineAmazonLayer();
        defineAmazonLayer();
        defineTraderLayer();
        defineWalmartLayer();
        defineWholeLayer(); 
        definePackageLayer();     
        const container = "#table-container";
        createBarChart(rawData, container);
        document.getElementById('table-container2').style.display = 'none';  
        document.getElementById('delivery_fee_explain').style.display = 'none'; 
        document.getElementById('content-text2').style.display = 'block';  
    });

document.getElementById("btn1").addEventListener("click", function() {
    hideAllContents();
    document.getElementById("content-little-title").textContent = "Cost Burden and Social Discomfort of Delivery Services";
    document.getElementById("content-title").innerHTML = '<span style="color: black;">Delivery Fee Burden</span> by House-income';
    document.getElementById("content-text").textContent = "To calculate the burden of delivery fees, we compared the income of each household to the highest-income household. Specifically, we calculated the ratio of each household's income to the income of the highest-earning household. Using this ratio, we determined the relative burden of delivery service fees by incorporating the annual average cost of delivery services, which is approximately $130. The burden levels are scaled from 1 to a maximum of 15, and most people experience a burden level of about 2. However, there are those who feel the burden is more than four times greater compared to the highest income earners, which can make using delivery services difficult.";
    d3.select(".overlay").style("display", "block");
    document.getElementById('table-container2').style.display = 'none';  
    const container = "#table-container";
    createLineChart(rawData2, container);
    document.getElementById('delivery_fee_explain').style.display = 'block';
     document.getElementById('content-text2').style.display = 'none';  

});
document.getElementById("btn3").addEventListener("click", function() {
    hideAllContents();
    document.getElementById("content-little-title").textContent = "Cost Burden and Social Discomfort of Delivery Services";
    document.getElementById("content-title").innerHTML = '<span style="color: black;">Package Theft</span> and <span style="color: black;">Inconvenient situations</span><br> for receiving deliveries';
    document.getElementById("content-text").textContent = "Additionally, many Americans have had experiences with the theft of delivered goods, which causes them to hesitate in using delivery services. To prevent theft, most people track the delivery process or opt to receive the packages in person. However, certain groups face challenges in using these methods. For example, elderly individuals or those with disabilities who have difficulty moving can only receive deliveries in person when a caregiver is present. People with long working hours who return home late at night also face difficulties in receiving deliveries in person. These challenges highlight the accessibility limitations of delivery services, which can further exacerbate social inequality.";
    document.getElementById('table-container2').style.display = 'flex';    
    const container = "#table-container";
    const container2 = "#table-container2";
    createBarChart_Package(rawData3, "#chart1");
    createBarChart_Package2(rawData4, "#chart2");  
    createBarChart_Package3(rawData5, container);   
    showHeatmap(map);
    document.getElementById('delivery_fee_explain').style.display = 'none'; 
    document.getElementById('content-text2').style.display = 'none';  
    });
document.getElementById("btn2").addEventListener("click", function() {
    hideAllContents();
    document.getElementById("content-little-title").textContent = "Cost Burden and Social Discomfort of Delivery Services";
    document.getElementById("content-title").innerHTML = '<span style="color: black;">Delivery Usage</span> by Borough';
    document.getElementById("content-text").textContent = "Quantifying the burden of delivery fees is challenging, but examining the delivery rate index by borough reveals significant differences. Manhattan, with a relatively higher income, shows a higher delivery rate, while the boroughs of Bronx, Queens, and Brooklyn, which have lower average incomes, exhibit lower delivery rates.";
    d3.select(".overlay").style("display", "block");
    document.getElementById('table-container2').style.display = 'none';
    document.getElementById('delivery_fee_explain').style.display = 'none';    
    document.getElementById('content-text2').style.display = 'none';  
     // 이미지 추가
     const container = document.getElementById("table-container");
     container.style.display = "block"; 
     container.innerHTML = ""; 
 
     const img = document.createElement("img");
     img.src = "Pic/Borough_Delivery_Usage.png"; 
     img.style.width = "100%"; 
     img.style.height = "auto";
 
     container.appendChild(img);
    isBoroughActive = !isBoroughActive;
    
    triangles.attr("fill", d => {
        if (isBoroughActive) {
            const borough = d.properties["Destrict"];
            

            return borough === 1 ? "url(#borough-gradient-1)" :
                   borough === 2 ? "url(#borough-gradient-2)" :
                   borough === 3 ? "url(#borough-gradient-3)" :
                   borough === 4 ? "url(#borough-gradient-4)" :
                   "url(#default-gradient)"; 
        } else {
            return "url(#default-gradient)"; 
        }
    });

    if (isBoroughActive) {
        fetch('Data/Destrict.geojson')
        .then(response => response.json())
        .then(boroughData => {
            map.addSource('borough-data', {
                type: 'geojson',
                data: boroughData
            });

            map.addLayer({
                id: 'borough-fill',
                type: 'fill',
                source: 'borough-data',
                paint: {
                    'fill-color': [
                        'match', 
                        ['get', 'Destrict'], 
                        1, '#428tf4',
                        2, '#0f9d58', 
                        3, '#f4b400',
                        4, '#db4437',  
                        '#808080' 
                    ],
                    'fill-opacity': 0.1
                }
            });

            map.addLayer({
                id: 'borough-outline',
                type: 'line',
                source: 'borough-data',
                paint: {
                    'line-color': '#ffffff', 
                    'line-opacity': 0.3,
                    'line-width': 1 
                }
            });
        });

        d3.json("Data/Destrict.geojson").then(function(geojsonData) {
            svg.selectAll(".destrict")
                .data(geojsonData.features)
                .enter()
                .append("path")
                .attr("class", "destrict")
                .attr("d", path) 
                .attr("fill", "none") 
                .attr("stroke", "white") 
                .attr("stroke-width", 2) 
                .attr("opacity", 0.5); 
        });

    } else {
        map.removeLayer('borough-fill');
        map.removeLayer('borough-outline');
        map.removeSource('borough-data');
        svg.selectAll(".destrict").remove();
        map.setPaintProperty('geojson-outline', 'line-opacity', 0);
    }
});

const boroughGradients = defs.selectAll(".borough-gradient")
    .data([1, 2, 3, 4]) 
    .enter()
    .append("linearGradient")
    .attr("class", "borough-gradient")
    .attr("id", d => `borough-gradient-${d}`)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");

boroughGradients.append("stop")
    .attr("offset", "0%")
 .attr("stop-color", d => {
        return d === 1 ? "blue" :
               d === 2 ? "green" :
               d === 3 ? "Orange" :
               d === 4 ? "Red" : "red";
    })
    .attr("stop-opacity", 1);

boroughGradients.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", d => {
        return d === 1 ? "blue" :
               d === 2 ? "green" :
               d === 3 ? "Orange" :
               d === 4 ? "Red" : "lightred";
    })
    .attr("stop-opacity", 0);
        });
});

let currentSection = 0;

const sections = [
    document.getElementById("btn0"),
    document.getElementById("btn1"),
    document.getElementById("btn2"),
    document.getElementById("btn3")
];

window.addEventListener("wheel", function(event) {
    if (event.deltaY > 0) { 
        if (currentSection < sections.length - 1) {
            currentSection++;
            sections[currentSection].click();
        }
    } else {
        if (currentSection > 0) {
            currentSection--;
            sections[currentSection].click();  
        }
    }
});
