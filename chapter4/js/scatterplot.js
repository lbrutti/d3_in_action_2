/*jshint esversion:6 */
(function() {
  function dataviz() {
    var scatterData = [{
        friends: 5,
        salary: 22000
      },
      {
        friends: 3,
        salary: 18000
      },
      {
        friends: 10,
        salary: 88000
      },
      {
        friends: 0,
        salary: 180000
      },
      {
        friends: 27,
        salary: 56000
      },
      {
        friends: 8,
        salary: 74000
      }
    ];

    //calcolo il dominio dei dati
    var xMax = d3.max(scatterData, function(d) {
      return d.salary;
    });
    var yMax = d3.max(scatterData, function(d) {
      return d.friends;
    });
    //funzioni per calcolo della scala
    var xScale = d3.scaleLinear()
      .domain([0, xMax])
      .range([0, 500]);
    var yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([0, 500]);

    //sezione per disegno assi
    //right e bottom si riferiscono alla posizione delle label e tick
    var xAxis = d3.axisBottom().scale(xScale).tickSize(500).ticks(4);
    d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);
    var yAxis = d3.axisRight().scale(yScale).tickSize(500).ticks(16);
    d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);
    // d3.selectAll("#xAxisG").attr("transform", "translate(0,500)");

    d3.select("svg")
      .selectAll("circle")
      .data(scatterData)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (d) => xScale(d.salary))
      .attr("cy", d => yScale(d.friends));
  }
  return dataviz();
})();
