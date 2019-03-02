/* jshint esversion: 6*/
d3.json("../data/tweets.json", pieChart);

function pieChart(data) {
  var attributes = ["tweetsSlice", "retweetsSlice", "favoritesSlice"];
  var currentAttr = attributes[0];
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
  pieChart.value(d => d.numTweets)
    .sort(null);

  var yourPie = pieChart(nestedTweets);
  var tweetsPie = pieChart(nestedTweets);
  pieChart.value(d => d.numRetweets);
  var retweetsPie = pieChart(nestedTweets);
  pieChart.value(d => d.numFavorites);
  var favoritesPie = pieChart(nestedTweets);

  nestedTweets.forEach((d, i) => {
    d.tweetsSlice = tweetsPie[i];
    d.retweetsSlice = retweetsPie[i];
    d.favoritesSlice = favoritesPie[i];
  });

  var fillScale = d3.scaleOrdinal()
    .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F"]);

  d3.select("svg")
    .append("g")
    .attr("transform", "translate(250,250)")
    .selectAll("path")
    .data(nestedTweets, d => d.key)
    .enter()
    .append("path")
    .attr("d", d => newArc(d.tweetsSlice))
    .style("fill", (d, i) => fillScale(i))
    .style("stroke", "black")
    .style("stroke-width", "2px");

  // creo un pulsante per ogni attributo su cui voglo filtrare
  d3.selectAll("btnContainer")
    .data(attributes)
    .enter()
    .append("button")
    .text(attr => attr)
    .on("click", (attr, i) => {
      d3.selectAll("path")
        .transition()
        .duration(1000)
        .attrTween("d", d => arcTween(d, attr))
        .on('end', ()=>{
          currentAttr = attr;
        });
    });

  function arcTween(d, attr) {
    return t => {
      var interpolateStartAngle = d3.interpolate(d[currentAttr].startAngle, d[attr].startAngle);

      var interpolateEndAngle = d3.interpolate(d[currentAttr].endAngle, d[attr].endAngle);
      d.startAngle = interpolateStartAngle(t);
      d.endAngle = interpolateEndAngle(t);
      return newArc(d);
    };
  }
}
