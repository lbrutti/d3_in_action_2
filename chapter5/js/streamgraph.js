/* jshint esversion:6 */
d3.csv("../data/movies.csv", dataViz);

function dataViz(data) {

  var xScale = d3.scaleLinear().domain([0, 10]).range([0, 500]);
  var yScale = d3.scaleLinear().domain([0, 100]).range([500, 0]);

  var movies = ["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"];

  var fillScale = d3.scaleOrdinal()
    .domain(movies)
    .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6", "#41a368"]);

  stackLayout = d3.stack()
    .offset(d3.stackOffsetSilhouette)
    .order(d3.stackOrderInsideOut)
    .keys(movies);
    
    yScale.domain([-50,50]);

  var stackArea = d3.area()
    .x((d, i) => xScale(i))
    .y0(d => yScale(d[0]))
    .y1(d => yScale(d[1]))
    .curve(d3.curveBasis);

  d3.select("svg").selectAll("path")
    .data(stackLayout(data)) // per ogni data point individuo y0 e y1
    .enter().append("path")
      .style("fill", d => fillScale(d.key))
      .attr("d", d => stackArea(d)); //uso y0 e y1 per disegnare area
}
