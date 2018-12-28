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
      .append("circle")
      .attr("r", 20);
    //e una label
    teamG
      .append("text")
      .style("text-anchor", "middle")
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

    function buttonClick(datapoint){
      var maxValue  = d3.max(incomingData, d=>parseFloat(d[datapoint]));
      var radiusScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([2, 20])
        .clamp(true);
      d3.selectAll("g.overallG")
        .select("circle")
        .transition()
        .duration(1000)
        .attr("r", d => radiusScale(d[datapoint]));
    }

    teamG
      .on("mouseover", highlightRegion)
      .on("mouseout", function(){
        d3.selectAll("g.overallG")
          .select("circle")
          .classed("inactive", false)
          .classed("active", false);
      });

    function highlightRegion(d){
      d3.selectAll("g.overallG")
        .select("circle")
        // selection.attr(name[, value]) <>
        // If a value is specified, sets the attribute with the specified name to the
        // specified value on the selected elements and returns this selection.
        // If the value is a constant, all elements are given the same attribute value;
        // otherwise, if the value is a function, it is evaluated for each selected element,
        // in order, being passed the current datum (d), the current index (i),
        //  and the current group (nodes), with this as the current DOM element
        // (nodes[i]).
        // The function’s return value is then used to set each element’s attribute.
        // A null value will remove the specified attribute.
        .attr("class", p => p.region === d.region ? "active" : "inactive");
    }
  }
}
