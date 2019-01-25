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
d3.select("#xAxisG > path.domain").style('display', 'none');

  //inizio ad creare elementi del boxplot:
  d3.select("svg")
    .selectAll("g.box")
    .data(data)
    .enter()
    .append('g')
    .attr("class", "box")
    //il transform di "g" influenza il posizionamento degli elementi
    // figli: le loro altezze partono dal valore mediano
    .attr('transform', d=> `translate(${xScale(d.day)}, ${yScale(d.median)})`)
    // .append("rect")
    // .attr('width', '20')
    // .attr('x', '0')
    // .style('stroke', 'black')
    // .attr('height', 10)
    .each(function(d,i){
      // line.range
      d3.select(this)
        .append("line")
        .attr("class", "range")
        .attr('x1', 0)
        .attr('x2', 0)
        .attr('y1', yScale(d.max) - yScale(d.median))
        .attr('y2', yScale(d.min) - yScale(d.median))
        .style('stroke', 'black')
        .style('stroke-width', '2px');
      // line.max
      d3.select(this)
        .append("line")
        .attr("class", "max")
        .attr('x1', -10)
        .attr('x2', 10)
        .attr('y1', yScale(d.max) - yScale(d.median))
        .attr('y2', yScale(d.max) - yScale(d.median))
        .style('stroke', 'black')
        .style('stroke-width', '2px');
      // line.min
      d3.select(this)
        .append("line")
        .attr("class", "min")
        .attr('x1', -10)
        .attr('x2', 10)
        .attr('y1', yScale(d.min) - yScale(d.median))
        .attr('y2', yScale(d.min) - yScale(d.median))
        .style('stroke', 'black')
        .style('stroke-width', '2px');
      // rect.distribution
      d3.select(this)
        .append("rect")
        .attr("class","distribution")
        .attr('width', '20')
        .attr('x', '-10')
        //per posizionare correttamente i box devo scalare dell'offset fra
        // mediana (centro del rettangolo) e margine superiore (terzo quartile)
        .attr('y', yScale(d.q3)-yScale(d.median))
        .attr('height', `${yScale(d.q1) - yScale(d.q3)}`)
        .style('fill', 'white')
        .style('stroke', 'black')
          .style('stroke-width', '2px');
      // line.median
      d3.select(this)
        .append("line")
        .attr("class", "median")
        .attr('x1', -10)
        .attr('x2', 10)
        .style('stroke', 'darkgray')
        .style('stroke-width', '4px');
    });
}
