// start slingin' some d3 here.
// function game(){
  
    d3.selectAll('.enemy').data([1,1,1,1,1,1,1,1,1,1])
    .transition(1000)
    .attr('cx',function (d) {return Math.floor(Math.random()*690);}) 
    .attr('cy',function (d) {return Math.floor(Math.random()*440);})   
    
      // .attr('cx', function(d){ return Math.floor(Math.random()*700); })

      // .attr('cy', function(d){ return Math.floor(Math.random()*450); });
  
// };
// setTimeout(function(){ game() }, 1000);