/* jshint esversion:6 */
d3.csv("../data/movies.csv", dataViz);

function dataViz(data) {

  var xScale = d3.scaleLinear().domain([0, 10]).range([0, 500]);
  var yScale = d3.scaleLinear().domain([0, 60]).range([480, 0]);
  var heightScale = d3.scaleLinear().domain([0, 60]).range([0, 480]);

  var movies = ["titanic", "avatar", "akira", "frozen", "deliverance", "avengers"];

  var fillScale = d3.scaleOrdinal()
    .domain(movies)
    .range(["#fcd88a", "#cf7c1c", "#93c464", "#75734F", "#5eafc6", "#41a368"]);

  stackLayout = d3.stack().keys(movies);
  var stackData = stackLayout(data);
  d3.select("svg").selectAll("g.bar")
    .data(stackData) // per ogni data point individuo y0 e y1
    .enter()
    .append("g")
    .attr("class", "bar")
    .each(function(d){ // d = elemento dell'array stackData : contiene array di coppie
                      //e attributi aggiunti key e index
      d3.select(this).selectAll("rect") //inserisco uno stack di rect
        .data(d) //ogni serie orizzontale di rettangoli rappresenta l'andamento
                //di un film durante i giorni
        .enter()
        .append("rect") //un rect per ogni film del giorno
        //coordinate di inizio del rect:
        // x = indice + 30 px per distanziare i rect
        .attr("x", (p,q) => xScale(q) + 30) //p e q sono dato e indice della giornata
        // y = punto più alto
        .attr("y", p => yScale(p[1]))
        .attr("height", p => heightScale(p[1]-p[0]))
        .attr("width", 40)
        .style("fill",fillScale(d.key));

    });
}
