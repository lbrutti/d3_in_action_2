/* jshint esversion: 6 */
function createSoccerViz() {
  d3.csv("../data/worldcup.csv", data => overallTeamViz(data));
}

function overallTeamViz(incomingData) {
  d3.select("svg")
    .append("g")
    .attr("id", "teamsG")
    .attr("transform", "translate(50,300)")
    .selectAll("g")
    .data(incomingData)
    .enter()
    .append("g")
    .attr("class", "overallG")
    .attr("transform", (d, i) => `translate(${(i * 50)}, 0)`);

  var teamG = d3.selectAll("g.overallG");

  teamG
    .append("circle").attr("r", 0)
    .transition()
    .delay((d, i) => i * 100)
    .duration(500)
    .attr("r", 40)
    .transition()
    .duration(500)
    .attr("r", 20);

  teamG
    .append("text")
    .style("text-anchor", "middle")
    .attr("y", 30)
    .text(d => d.team);

  d3.text("../resources/modal.html", html => {
    d3.select("body")
      .append("div")
      .attr("id", "modal")
      .html(html);
  });
  teamG.on("click", teamClick);

  function teamClick(d) {
    d3.selectAll("td.data").data(d3.values(d))
      .html(p => p);
  }

  //carico icona
  d3.html("../resources/icon.svg", loadSVG);

  function loadSVG(svgData) {
    d3.selectAll("g.overallG").each(function() {
      let gParent = this;
      d3.select(svgData).selectAll("path").each(function() {
        gParent.appendChild(this.cloneNode(true));
      });
    });

    d3.selectAll("g.overallG").each(function(d) {
      d3.select(this).selectAll("path").datum(d);
    });

    var fourColorScale = d3.scaleOrdinal()
      .domain(["UEFA", "CONMEBOL", "CONCACAF", "AFC"])
      .range(["#5eafc6", "#FE9922", "#93C464", "#fcbc34"]);

    d3.selectAll("path")
      .style("fill", p => {
        if (p) {
          return fourColorScale(p.region);
        }
      })
      .style("stroke", "black").style("stroke-width", "1px");
  }
  // d3.selectAll("g.overallG").insert("image", "text")
  //   .attr("xlink:href", d => `../images/${d.team}.png`)
  //   .attr("width", "45px").attr("height", "20px").attr("x", "-22")
  //   .attr("y", "-50");
}
