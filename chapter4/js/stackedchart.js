/*jshint esversion:6*/
(() => {
  d3.csv("../data/movies.csv", lineChart);

  function lineChart(data) {
    // debugger;
    const fillScale = d3.scaleOrdinal()
      .domain(["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"])
      .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6", "#41a368"]);

    // legenda
    const legend = d3.legendColor().scale(fillScale);

    const xScale = d3.scaleLinear().domain([1, 10]).range([20, 470]);
    const yScale = d3.scaleLinear().domain([0, 55]).range([480, 20]);

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .tickSize(480)
      .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);


    const yAxis = d3.axisRight()
      .scale(yScale)
      .ticks(10)
      .tickSize(480);

    d3.select("svg")
    .append("g")
    .attr("id", "xAxisG")
    .call(xAxis);

    d3.select("svg")
    .append("g")
    .attr("id", "yAxisG")
    .call(yAxis);

    d3.select("svg")
    .append("g")
    .attr("id", "legend")
    .attr('transform',"translate(500, 0)")
    .call(legend);
    Object.keys(data[0]).forEach(key => {
      if (key !== "day") {

        let movieLine = d3.line()
          .x(d => xScale(d.day))
          .y(d => yScale(d[key]))
          .curve(d3.curveBasis);

        //impila i grafici l'uno sull'altro
        const simpleStacking = (lineData, lineKey) => {
          var newHeight = 0;
          Object.keys(lineData).every(key => {
            if (key !== "day") {
              newHeight += parseInt(lineData[key]);
              if (key === lineKey) {
                return false;
              }
            }
            return true;
          });
          return newHeight;
        };

        let movieArea = d3.area()
          .x(d => xScale(d.day))
          .y0(d => yScale(simpleStacking(d, key) - d[key])) //corrisponde ad accessore y di line
          .y1(d => yScale(simpleStacking(d, key))) //indica il lower bound del grafico
          .curve(d3.curveBasis);

        d3.select("svg")
          .append("path")
          .attr("id", `${key}Area`)
          .attr("d", movieArea(data))
          .attr('stroke', '#000000')
          .attr('fill', fillScale(key))
          .attr('opacity', 0.75);
      }
    });
  }

})();
