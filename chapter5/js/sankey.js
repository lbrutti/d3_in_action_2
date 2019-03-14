/*jshint esversion:6*/
d3.json("../data/sitestats.json", sankeyViz);

function sankeyViz(data) {

  var sankey = d3.sankey()
    .nodeWidth(20)
    .nodePadding(100)
    .size([460, 460])
    .nodes(data.nodes)
    .links(data.links)
    .layout(200);

  var intensityRamp = d3.scaleLinear()
    .domain([0, d3.max(data.links, d => d.value)])
    .range(["#fcd88b", "#cf7d1c"]);

  d3.select("svg").append("g")
    .attr("transform", "translate(20,20)").attr("id", "sankeyG");

  d3.select("#sankeyG").selectAll(".link")
    .data(data.links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", sankey.link())
    .style("stroke-width", d => d.dy)
    .style("stroke-opacity", 0.5)
    .style("fill", "none")
    .style("stroke", d => intensityRamp(d.value))
    .sort((a, b) => b.dy - a.dy)
    .on("mouseover", function() {
      d3.select(this).style("stroke-opacity", 0.8);
    })
    .on("mouseout", () => {
      d3.selectAll("path.link").style("stroke-opacity", 0.5);
    });

  d3.select("#sankeyG").selectAll(".node")
    .data(data.nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x} , ${d.y} )`);


  d3.selectAll(".node")
      .append('circle')
      .attr('height', d => d.dy )
      .attr('cy', d => d.dy/2 )
      .attr('r', d => d.dy/2 )
    .style("fill", "#93c464")
    .style("stroke", "gray");
    d3.selectAll(".node").append("rect")
      .attr("height", d => d.dy)
      .attr("width", 20)
      .style("fill", "#93c400")
      .style("stroke", "gray");
  d3.selectAll(".node").append("text")
    .attr("x", 0)
    .attr("y", d => d.dy / 2)
    .attr("text-anchor", "middle")
    .style("fill", "black")
    .text(d => d.name);
}
