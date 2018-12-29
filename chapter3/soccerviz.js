/*jshint esversion: 6 */
function createSoccerViz() {

  d3.csv("../data/worldcup.csv", data => {
    overallTeamViz(data);
  });

  function overallTeamViz(incomingData) {
    d3.select("svg")
      .append("g") //inserisco un gruppo globale come wrapper
      .attr("id", "teamsG")
      .attr("transform", "translate(50,300)")
      .selectAll("g") //selezioni tutti gli g (inizialmente non ce ne sono, li creo con binding)
      .data(incomingData) //bind dei dati provenienti da csv
      .enter()
      .append("g") // inserisco un gruppo per ogni record
      .attr("class", "overallG")
      .attr("transform", (d, i) => `translate(${(i * 50)}, 0)`); //posiziono il gruppo con offset proporzionale all'indice

    //selezioni elementi appena creati
    var teamG = d3.selectAll("g.overallG");
    //in ogni elemento g inserisco un cerchio
    teamG
      .append("circle").attr("r", 0)
      //chain delle transition
      //prima transition
      .transition()
      .delay((d, i) => i * 100)
      .duration(500)
      .attr("r", 40)
      //transition seguente
      .transition()
      .duration(500)
      .attr("r", 20);
    //e una label
    teamG
      .append("text")
      .style("text-anchor", "middle")
      .style("pointer-events", "none")
      .attr("y", 30)
      .text(d => d.team);
    //bottoni:
    const dataKeys = Object.keys(incomingData[0])
      .filter(d => d !== "team" && d != "region");
    d3.select('#controls').selectAll("button.teams")
      .data(dataKeys)
      .enter()
      .append("button")
      .on("click", buttonClick)
      .html(d => d);

    function buttonClick(datapoint) {
      var maxValue = d3.max(incomingData, d => parseFloat(d[datapoint]));
      var radiusScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([2, 20])
        .clamp(true);
      var ybRamp = d3.scaleLinear()
        .interpolate(d3.interpolateHsl)
        .domain([0, maxValue])
        .range(["blue", "yellow"]);
      d3.selectAll("g.overallG")
        .select("circle")
        .transition()
        .duration(1000)
        .delay(200)
        .attr("r", d => radiusScale(d[datapoint]))
        .style("fill", d => ybRamp(d[datapoint]));
    }

    teamG
      .on("mouseover", highlightRegion)
      .on("mouseout", unHighlight);

    var teamColor = d3.rgb("#75739F");

    function highlightRegion(d) {
      //seleziono, nel contesto dell'elemento su cui ho
      //fatto mouseover, il testo.
      //gli associo classe "active" e lo sposto verticalmente
      d3.select(this)
        .select("text")
        .classed("active", true)
        .attr("y", 10);
      d3.selectAll("g.overallG")
        .select("circle")
        .style("fill", p => p.region == d.region ? teamColor.darker(.75) : teamColor.brighter(.5));
      //this e' il gruppo di classe overallG su cui ho fatto mouseover
      d3.select(this).raise();
      // this.parentElement.appendChild(this);
    }

    function unHighlight() {
      d3.selectAll("g.overallG")
        .select("circle")
        .style("fill", teamColor)
        .attr("class", "");
      d3.selectAll("g.overallG")
        .select("text")
        .classed("active", false)
        .attr("y", 30)
      d3.select(this).lower();

    }
  }
}
