/* jshint esversion: 6 */
d3.csv("../data/tweetdata.csv", lineChart);

function lineChart(data) {
  const orange = "#fe9a22";
  const blue = "#5eaec5";
  const green = "#92c463";
  const xScale = d3.scaleLinear().domain([1, 10.5]).range([20, 480]);
  const yScale = d3.scaleLinear().domain([0, 35]).range([480, 20]);

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickSize(480)
    .tickValues([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // .tickFormat(d3.format(".1f")); formatta con virgola e una cifra significativas

  d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);

  const yAxis = d3.axisRight()
    .scale(yScale)
    .ticks(10)
    .tickSize(480);
  d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);



  //lamda func for Xscale
  const lambdaXScale = d => xScale(d.day);
  const lineGen = (data, attr) => {
    //d3.line è un funzionale che restituisce una funzione di arietà 1
    let lineAttr = d3.line().x(lambdaXScale).y(d => yScale(d[attr])).curve(d3.curveCardinal);
    //restituisco il risultato dell'applicazione del funzionale
    return lineAttr(data);
  };

  d3.select("svg").selectAll("circle.tweets")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "tweets")
    .attr("r", 5)
    .attr("cx", lambdaXScale)
    .attr("cy", d => yScale(d.tweets))
    .style("fill", orange);

  d3.select("svg").selectAll("circle.retweets")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "retweets")
    .attr("r", 5)
    .attr("cx", lambdaXScale)
    .attr("cy", d => yScale(d.retweets))
    .style("fill", blue);

  d3.select("svg").selectAll("circle.favorites")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "favorites")
    .attr("r", 5)
    .attr("cx", lambdaXScale)
    .attr("cy", d => yScale(d.favorites))
    .style("fill", green);

  d3.select("svg")
    .append("path")
    .attr("d", lineGen(data,'tweets'))
    .attr("fill", "none")
    .attr("stroke", orange)
    .attr("stroke-width", 2);

  d3.select("svg")
    .append("path")
    .attr("d", lineGen(data,'retweets'))
    .attr("fill", "none")
    .attr("stroke", blue)
    .attr("stroke-width", 2);

  d3.select("svg")
    .append("path")
    .attr("d", lineGen(data,'favorites'))
    .attr("fill", "none")
    .attr("stroke", green)
    .attr("stroke-width", 2);


}
