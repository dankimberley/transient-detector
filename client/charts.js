let svg;
let x;
let y;

const createChart = (domainLower, domainUpper, length) => {
  const width = 1000;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;


  x = d3
    .scaleLinear()
    .domain([0, length]) // Set the x-axis domain from 0 to 12000
    .range([marginLeft, width - marginRight]);

  y = d3
    .scaleLinear()
    .domain([(domainLower > -120 ? domainLower : -120), domainUpper])
    .range([height - marginBottom, marginTop]);

  svg = d3.create("svg").attr("width", width).attr("height", height);

  document.getElementById("container").appendChild(svg.node());

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

  // Add the y-axis.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));
};

const createWaveform = (data) => {
  svg
    .append("path")
    .datum(data.waveform)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 0.4)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.time);
        })
        .y(function (d) {
          return y(d.amplitude);
        })
    );
};

export const createPoints = (data) => {
    svg
      .selectAll("circle")
      .data(data.transients)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.time)) // Use 'time' for the x position
      .attr("cy", (d) => y(d.amplitude)) // Use 'amplitude' for the y position
      .attr("r", 1) // Radius of the circle
      .attr("fill", 'red')
}

export { createChart, createWaveform};
