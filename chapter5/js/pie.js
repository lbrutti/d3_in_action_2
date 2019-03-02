/* jshint esversion: 6*/
d3.json("../data/tweets.json", pieChart);

function pieChart(data) {
  var attributes=["numTweets", "numRetweets", "numFavorites"];
  var nestedTweets = d3.nest()
    .key(d => d.user)
    .entries(data.tweets);

  nestedTweets.forEach(d => {
    d.numTweets = d.values.length;
    d.numFavorites = d3.sum(d.values, p => p.favorites.length);
    d.numRetweets = d3.sum(d.values, p => p.retweets.length);
  });

  var pieChart = d3.pie();

  var newArc = d3.arc();
  newArc
    .innerRadius(20)
    .outerRadius(100);

  //indichiamo la funzione per accedere all'attributo cui legare l'ampiezza
  // della fetta
  pieChart
    .sort(null)
    .value(d => d.numTweets);

  var yourPie = pieChart(nestedTweets);

  var fillScale = d3.scaleOrdinal()
    .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F"]);

  d3.select("svg")
    .append("g")
      .attr("transform","translate(250,250)")
    .selectAll("path")
    .data(yourPie)
    .enter()
    .append("path")
      .attr("d", newArc)
      .style("fill", (d,i) => fillScale(i))
      .style("stroke", "black")
      .style("stroke-width", "2px");

  // creo un pulsante per ogni attributo su cui voglo filtrare
  d3.selectAll("btnContainer")
    .data(attributes)
    .enter()
    .append("button")
    .text(attr=>attr)
    .on("click", (attr,i)=>{
        pieChart.value(d => d[attr]);
        d3.selectAll("path")
          .data(pieChart(nestedTweets))
          .transition().duration(1000).attr("d", newArc);
      });

}
