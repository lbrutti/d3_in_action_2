(() => {
  d3.csv("../data/movies.csv", lineChart);

  function lineChart(data) {

    const xScale = d3.scaleLinear().domain([1, 10]).range([20, 470]);
    const yScale = d3.scaleLinear().domain([0, 40]).range([480, 20]);

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .tickSize(480)
      .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

    const yAxis = d3.axisRight()
      .scale(yScale)
      .ticks(10)
      .tickSize(480);

    d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);

    Object.keys(data[0]).forEach(key => {
      if (key !== "day") {
        let movieArea = d3.line()
          .x(d => xScale(d.day))
          .y(d => yScale(d[key]))
          .curve(d3.curveCardinal);

        d3.select("svg")
          .append("path")
          .attr("id", `${key}Area`)
          .attr("d", movieArea(data))
          .attr('stroke', '#000000')
          .attr('fill', '#ff0301')
          .attr('opacity', .5);
      }
    });
  }

})();
