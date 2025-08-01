import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

// --- Helper Functions ---
const cleanData = (d) => {
    const isInvalid = (val) => val === null || val === undefined || val === '?' || val === '';
    
    const numericKeys = [
        'symboling', 'normalized-losses', 'wheel-base', 'length', 'width', 'height',
        'curb-weight', 'engine-size', 'bore', 'stroke', 'compression-ratio',
        'horsepower', 'peak-rpm', 'city-mpg', 'highway-mpg', 'price'
    ];

    for (const key of numericKeys) {
        if (isInvalid(d[key])) return null; // Filter out rows with missing crucial data
        d[key] = +d[key]; // Coerce to number
    }
    
    // Also check some key categorical fields
    if (isInvalid(d.make) || isInvalid(d['body-style'])) return null;

    return d;
};


// --- Chart Components ---

// 1. Scatter Plot (replicates sns.scatterplot)
const ScatterPlot = ({ data, xVar, yVar }) => {
    const svgRef = useRef();
    const tooltipRef = useRef();
    const dimensions = { width: 800, height: 500, margin: { top: 40, right: 40, bottom: 60, left: 70 } };
    const { width, height, margin } = dimensions;
    const boundedWidth = width - margin.left - margin.right;
    const boundedHeight = height - margin.top - margin.bottom;

useEffect(() => {   // effect code }, [data, xVar, yVar, boundedHeight, boundedWidth, height, margin.left, margin.top, width]);

        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width} ${height}`);

        svg.selectAll("*").remove(); // Clear previous renders

        const bounds = svg.append("g")
            .style("transform", `translate(${margin.left}px, ${margin.top}px)`);

        // Scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d[xVar]))
            .range([0, boundedWidth])
            .nice();

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d[yVar]))
            .range([boundedHeight, 0])
            .nice();

        // Axes
        const xAxis = d3.axisBottom(xScale);
        bounds.append("g")
            .attr("class", "axis")
            .style("transform", `translate(0, ${boundedHeight}px)`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px");

        const yAxis = d3.axisLeft(yScale);
        bounds.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "12px");
            
        // Axis Labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + boundedWidth / 2)
            .attr("y", height - 10)
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(xVar.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
            
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", -(margin.top + boundedHeight / 2))
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(yVar.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));

        // Tooltip
        const tooltip = d3.select(tooltipRef.current)
            .style("opacity", 0)
            .attr("class", "absolute p-2 text-xs bg-gray-800 text-white rounded-md shadow-lg pointer-events-none")
            .style("transition", "opacity 0.2s");

        const mouseover = (event, d) => {
            tooltip.style("opacity", 1);
        };

        const mousemove = (event, d) => {
            tooltip
                .html(`
                    <strong>Make:</strong> ${d.make}<br>
                    <strong>${xVar}:</strong> ${d[xVar]}<br>
                    <strong>${yVar}:</strong> ${d[yVar]}
                `)
                .style("left", (event.pageX + 15) + "px")
                .style("top", (event.pageY - 28) + "px");
        };

        const mouseleave = (event, d) => {
            tooltip.style("opacity", 0);
        };

        // Data points
        bounds.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[xVar]))
            .attr("cy", d => yScale(d[yVar]))
            .attr("r", 5)
            .attr("fill", "#3b82f6")
            .attr("opacity", 0.7)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);

    }, [data, xVar, yVar]);

    return (
        <div className="w-full h-full relative">
            <svg ref={svgRef}></svg>
            <div ref={tooltipRef}></div>
        </div>
    );
};

// 2. Bar Chart (replicates sns.barplot)
const BarChart = ({ data, xVar, yVar }) => {
    const svgRef = useRef();
    const dimensions = { width: 800, height: 500, margin: { top: 40, right: 40, bottom: 120, left: 70 } };
    const { width, height, margin } = dimensions;
    const boundedWidth = width - margin.left - margin.right;
    const boundedHeight = height - margin.top - margin.bottom;

useEffect(() => {   // effect code }, [data, xVar, yVar, boundedHeight, boundedWidth, height, margin.left, margin.top, width]);

        // Aggregate data: calculate mean of yVar for each category in xVar
        const aggregatedData = Array.from(
            d3.group(data, d => d[xVar]),
            ([key, value]) => ({ key, value: d3.mean(value, v => v[yVar]) })
        );
        aggregatedData.sort((a, b) => d3.descending(a.value, b.value));

        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width} ${height}`);

        svg.selectAll("*").remove();

        const bounds = svg.append("g")
            .style("transform", `translate(${margin.left}px, ${margin.top}px)`);

        // Scales
        const xScale = d3.scaleBand()
            .domain(aggregatedData.map(d => d.key))
            .range([0, boundedWidth])
            .padding(0.2);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(aggregatedData, d => d.value)])
            .range([boundedHeight, 0])
            .nice();

        // Axes
        const xAxis = d3.axisBottom(xScale);
        bounds.append("g")
            .attr("class", "axis")
            .style("transform", `translate(0, ${boundedHeight}px)`)
            .call(xAxis)
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end")
            .style("font-size", "12px");

        const yAxis = d3.axisLeft(yScale);
        bounds.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "12px");
            
        // Axis Labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + boundedWidth / 2)
            .attr("y", height - 10)
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(xVar.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
            
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", -(margin.top + boundedHeight / 2))
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(`Average ${yVar.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`);

        // Bars
        bounds.selectAll("rect")
            .data(aggregatedData)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.key))
            .attr("y", d => yScale(d.value))
            .attr("width", xScale.bandwidth())
            .attr("height", d => boundedHeight - yScale(d.value))
            .attr("fill", "#10b981");

    }, [data, xVar, yVar]);

    return <svg ref={svgRef} className="w-full h-full"></svg>;
};

// 3. Histogram (replicates sns.histplot/distplot)
const Histogram = ({ data, xVar }) => {
    const svgRef = useRef();
    const dimensions = { width: 800, height: 500, margin: { top: 40, right: 40, bottom: 60, left: 70 } };
    const { width, height, margin } = dimensions;
    const boundedWidth = width - margin.left - margin.right;
    const boundedHeight = height - margin.top - margin.bottom;

useEffect(() => {   // effect code }, [data, xVar, yVar, boundedHeight, boundedWidth, height, margin.left, margin.top, width]);

        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width} ${height}`);

        svg.selectAll("*").remove();

        const bounds = svg.append("g")
            .style("transform", `translate(${margin.left}px, ${margin.top}px)`);

        // Scales
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d[xVar]))
            .range([0, boundedWidth])
            .nice();

        // Bins
        const histogram = d3.bin()
            .value(d => d[xVar])
            .domain(xScale.domain())
            .thresholds(xScale.ticks(20)); // ~20 bins

        const bins = histogram(data);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(bins, d => d.length)])
            .range([boundedHeight, 0])
            .nice();

        // Axes
        const xAxis = d3.axisBottom(xScale);
        bounds.append("g")
            .attr("class", "axis")
            .style("transform", `translate(0, ${boundedHeight}px)`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px");

        const yAxis = d3.axisLeft(yScale);
        bounds.append("g")
            .attr("class", "axis")
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "12px");

        // Axis Labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + boundedWidth / 2)
            .attr("y", height - 10)
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(xVar.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
            
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", -(margin.top + boundedHeight / 2))
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text("Frequency");

        // Bars
        bounds.selectAll("rect")
            .data(bins)
            .enter()
            .append("rect")
            .attr("x", d => xScale(d.x0) + 1)
            .attr("y", d => yScale(d.length))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0) - 1))
            .attr("height", d => boundedHeight - yScale(d.length))
            .attr("fill", "#8b5cf6");

    }, [data, xVar]);

    return <svg ref={svgRef} className="w-full h-full"></svg>;
};

// 4. Box Plot (replicates sns.boxplot)
const BoxPlot = ({ data, xVar, yVar }) => {
    const svgRef = useRef();
    const dimensions = { width: 800, height: 500, margin: { top: 40, right: 40, bottom: 60, left: 70 } };
    const { width, height, margin } = dimensions;
    const boundedWidth = width - margin.left - margin.right;
    const boundedHeight = height - margin.top - margin.bottom;

useEffect(() => {   // effect code }, [data, xVar, yVar, boundedHeight, boundedWidth, height, margin.left, margin.top, width]);

        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", `0 0 ${width} ${height}`);

        svg.selectAll("*").remove();

        const bounds = svg.append("g")
            .style("transform", `translate(${margin.left}px, ${margin.top}px)`);

        // Group data and compute stats
        const groupedData = d3.group(data, d => d[xVar]);
        const summaryStats = [];
        groupedData.forEach((groupData, key) => {
            const sortedValues = groupData.map(d => d[yVar]).sort(d3.ascending);
            const q1 = d3.quantile(sortedValues, 0.25);
            const median = d3.quantile(sortedValues, 0.5);
            const q3 = d3.quantile(sortedValues, 0.75);
            const iqr = q3 - q1;
            const min = Math.max(d3.min(sortedValues), q1 - 1.5 * iqr);
            const max = Math.min(d3.max(sortedValues), q3 + 1.5 * iqr);
            summaryStats.push({ key, q1, median, q3, min, max });
        });
        
        summaryStats.sort((a, b) => d3.ascending(a.key, b.key));

        // Scales
        const xScale = d3.scaleBand()
            .domain(summaryStats.map(d => d.key))
            .range([0, boundedWidth])
            .paddingInner(1)
            .paddingOuter(0.5);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d[yVar])])
            .range([boundedHeight, 0])
            .nice();

        // Axes
        const xAxis = d3.axisBottom(xScale);
        bounds.append("g")
            .attr("class", "axis")
            .style("transform", `translate(0, ${boundedHeight}px)`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px");

        const yAxis = d3.axisLeft(yScale);
        bounds.append("g").attr("class", "axis").call(yAxis);

        // Axis Labels
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("x", margin.left + boundedWidth / 2)
            .attr("y", height - 10)
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(xVar.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
            
        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", -(margin.top + boundedHeight / 2))
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text(yVar.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));

        // Draw box plots
        const boxWidth = 40;
        summaryStats.forEach(d => {
            const g = bounds.append("g").attr("transform", `translate(${xScale(d.key)}, 0)`);

            // Whiskers
            g.append("line")
                .attr("x1", 0)
                .attr("x2", 0)
                .attr("y1", yScale(d.min))
                .attr("y2", yScale(d.max))
                .attr("stroke", "black");

            // Box
            g.append("rect")
                .attr("x", -boxWidth / 2)
                .attr("y", yScale(d.q3))
                .attr("height", yScale(d.q1) - yScale(d.q3))
                .attr("width", boxWidth)
                .attr("stroke", "black")
                .style("fill", "#f97316");

            // Median line
            g.append("line")
                .attr("x1", -boxWidth / 2)
                .attr("x2", boxWidth / 2)
                .attr("y1", yScale(d.median))
                .attr("y2", yScale(d.median))
                .attr("stroke", "black")
                .style("stroke-width", "2px");
        });

    }, [data, xVar, yVar]);

    return <svg ref={svgRef} className="w-full h-full"></svg>;
};


// --- Main App Component ---
const App = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeChart, setActiveChart] = useState('Scatter Plot');
    
    // State for chart controls
    const [scatterX, setScatterX] = useState('horsepower');
    const [scatterY, setScatterY] = useState('price');
    const [barY, setBarY] = useState('price');
    const [barX, setBarX] = useState('make');
    const [histogramX, setHistogramX] = useState('horsepower');
    const [boxY, setBoxY] = useState('price');
    const [boxX, setBoxX] = useState('body-style');

    const dataUrl = './Automobile_data.csv';
    
    const numericCols = ['price', 'horsepower', 'peak-rpm', 'city-mpg', 'highway-mpg', 'curb-weight', 'engine-size', 'wheel-base', 'length', 'width', 'height', 'bore', 'stroke', 'compression-ratio'];
    const categoricalCols = ['make', 'fuel-type', 'aspiration', 'num-of-doors', 'body-style', 'drive-wheels', 'engine-location', 'engine-type', 'num-of-cylinders', 'fuel-system'];

    useEffect(() => {
        d3.csv(dataUrl, cleanData).then(loadedData => {
            setData(loadedData);
            setLoading(false);
        }).catch(error => {
            console.error("Error loading or parsing data:", error);
            setLoading(false);
        });
    }, []);

    const chartTypes = ['Scatter Plot', 'Bar Chart', 'Histogram', 'Box Plot'];

    const renderChart = () => {
        if (loading) return <div className="flex items-center justify-center h-full"><p className="text-lg">Loading Data...</p></div>;
        if (data.length === 0) return <div className="flex items-center justify-center h-full"><p className="text-lg text-red-500">Failed to load data. Please check console and file path.</p></div>;

        switch (activeChart) {
            case 'Scatter Plot':
                return <ScatterPlot data={data} xVar={scatterX} yVar={scatterY} />;
            case 'Bar Chart':
                return <BarChart data={data} xVar={barX} yVar={barY} />;
            case 'Histogram':
                return <Histogram data={data} xVar={histogramX} />;
            case 'Box Plot':
                 return <BoxPlot data={data} xVar={boxX} yVar={boxY} />;
            default:
                return null;
        }
    };
    
    const renderControls = () => {
        switch (activeChart) {
            case 'Scatter Plot':
                return (
                    <>
                        <ControlSelect label="X-Axis" value={scatterX} onChange={e => setScatterX(e.target.value)} options={numericCols} />
                        <ControlSelect label="Y-Axis" value={scatterY} onChange={e => setScatterY(e.target.value)} options={numericCols} />
                    </>
                );
            case 'Bar Chart':
                return (
                    <>
                        <ControlSelect label="Category (X-Axis)" value={barX} onChange={e => setBarX(e.target.value)} options={categoricalCols} />
                        <ControlSelect label="Value (Y-Axis)" value={barY} onChange={e => setBarY(e.target.value)} options={numericCols} />
                    </>
                );
            case 'Histogram':
                 return <ControlSelect label="Variable" value={histogramX} onChange={e => setHistogramX(e.target.value)} options={numericCols} />;
            case 'Box Plot':
                return (
                    <>
                        <ControlSelect label="Category (X-Axis)" value={boxX} onChange={e => setBoxX(e.target.value)} options={categoricalCols} />
                        <ControlSelect label="Value (Y-Axis)" value={boxY} onChange={e => setBoxY(e.target.value)} options={numericCols} />
                    </>
                );
            default:
                return null;
        }
    };
    
    const ControlSelect = ({ label, value, onChange, options }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <select value={value} onChange={onChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                {options.map(opt => <option key={opt} value={opt}>{opt.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>)}
            </select>
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4 flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">D3 Dashboard</h1>
                <nav className="flex-grow">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Charts</h2>
                    <ul>
                        {chartTypes.map(chart => (
                            <li key={chart} className="mb-2">
                                <button
                                    onClick={() => setActiveChart(chart)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                        activeChart === chart
                                            ? 'bg-blue-500 text-white'
                                            : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {chart}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-6">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{activeChart}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {renderControls()}
                    </div>
                </div>
                <div className="flex-grow bg-white p-4 rounded-lg shadow-sm flex items-center justify-center overflow-hidden">
                   {renderChart()}
                </div>
            </main>
        </div>
    );
};

export default App;
