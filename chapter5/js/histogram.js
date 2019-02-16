/*jshint esversion: 6*/
(()=>{
  d3.json("../data/tweets.json", data => histogram(data.tweets) );

  function histogram(tweetsData) {
    var xScale = d3.scaleLinear().domain([ 0, 5 ]).range([ 0, 500 ]);
    var yScale = d3.scaleLinear().domain([ 0, 10 ]).range([ 400, 0 ]);
    var xAxis = d3.axisBottom().scale(xScale).ticks(5);

    var histoChart = d3.histogram();

    histoChart
      .domain(xScale.domain())
      .thresholds(xScale.ticks(6))
      .value(d => d.favorites.length);

    histoData = histoChart(tweetsData);
function retweets(){
  histoChart.value(d => d.retweets.length);
  histoData = histoChart(tweetsData);
  d3.selectAll("rect")
    .data(histoData)
    .transition().duration(500)
    // .attr("x", d => xScale(d.x0))
    .attr("y", d => yScale(d.length))
    .attr("height", d => 400 - yScale(d.length));
}
    d3.select("svg")
      .selectAll("rect")
      .data(histoData).enter()
      .append("rect")
        .attr("x", d => xScale(d.x0))
        .attr("y", d => yScale(d.length))
        .attr("width", d => xScale(d.x1 - d.x0) - 2)
        .attr("height", d => 400 - yScale(d.length))
        .on("click", retweets)
        .style("fill", "#FCD88B");

    d3.select("svg").append("g").attr("class", "x axis")
        .attr("transform", "translate(0,400)").call(xAxis);

    d3.select("g.axis").selectAll("text").attr("dx", 50);
  }
})();
