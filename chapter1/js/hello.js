// d3.select('svg')
// .append('line')
// .attr('x1',20)
// .attr('y1',20)
// .attr('x2',400)
// .attr('y2',400)
// .style('stroke', 'black')
// .style('stroke-width', '2px');

d3.select('svg')
.append('circle')
.attr('r',20)
.attr('cx',20)
.attr('cy',20)
.style('fill', 'red');

d3.select('svg')
.append('text')
.attr('x',20)
.attr('y',20)
.attr('id','a')
.text('HELLO WORLD')
.style('opacity',0);

d3.select('svg')
.append('circle')
.attr('r',100)
.attr('cx',400)
.attr('cy',400)
.style('fill', 'lightblue');

d3.select('svg')
.append('text')
.attr('x',400)
.attr('y',400)
.attr('id','b')
.text('UH, HI!')
.style('opacity',0);

d3.select('#a').transition().delay(1000).style('opacity', 1);
d3.select('#b').transition().delay(3000).style('opacity', 1);

d3.selectAll('circle').transition().duration(2000).attr('cy', 200);
