/* jshint esversion:6 */
function scatterplot(data) {
  var tickSize = 470;
  xScale = d3.scaleLinear().domain([1,8]).range([20,tickSize]);
  //valori invertiti per mettere lo zero in basso
  yScale = d3.scaleLinear().domain([0,100]).range([tickSize+10,20]);

  yAxis = d3.axisRight()
    .scale(yScale).ticks(8)
    .tickSize(-tickSize); //lunghezza di ciascun tick

  d3.select("svg").append("g")
      .attr("transform", `translate(${tickSize},0)`)
      .attr("id", "yAxisG")
      .call(yAxis);

  xAxis = d3.axisBottom()
    .scale(xScale)
    .tickSize(-tickSize)
    .tickValues([1,2,3,4,5,6,7]);

  d3.select("svg").append("g")
      .attr("transform", `translate(0,${tickSize+10})`)
      .attr("id", "xAxisG")
      .call(xAxis);

  d3.select("svg").selectAll("circle.median")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", "tweets")
      .attr("r", 5)
      .attr("cx", d => xScale(d.day))
      .attr("cy", d => yScale(d.median))
      .style("fill", "darkgray");

  //inizio ad creare elementi del boxplot:
  d3.select("svg")
    .selectAll("g.box")
    .data(data)
    .enter()
    .append('g')
    .attr("class", "box")
    //il transform di "g" influenza il posizionamento degli elementi
    // figli: le loro altezze partodno dal valore mediano
    .attr('transform', d=> `translate(${xScale(d.day)}, ${yScale(d.median)})`)
    .each(function(d,i){
      d3.select(this)
        .append("rect")
        .attr('width', '20')
        .attr('x', '-10')
        //per posizionare correttamente i box devo scalare dell'offset fra
        // mediana (centro del rettangolo) e margine superiore (terzo quartile)
        .attr('y', yScale(d.q3)-yScale(d.median))
        .attr('height', `${yScale(d.q1) - yScale(d.q3)}`)
        .style('fill', 'transparent')
        .style('stroke', 'black');
    });
}
