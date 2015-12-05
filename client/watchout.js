// start slingin' some d3 here.
// function game(){
  
    d3.selectAll('.enemy')
    .transition(1000)
    .attr('cx',function (d) {return Math.floor(Math.random()*690);}) 
    .attr('cy',function (d) {return Math.floor(Math.random()*440);})   
    
    var drag = d3.behavior.drag()
    .origin(function () {
      var center = {}; 
      center.x = d3.selectAll('#grab').attr('cx'); 
      center.y = d3.selectAll('#grab').attr('cy');
      return center;
      })
    .on("drag", dragmove);
    
    d3.selectAll('.player')
      .call(drag);
      
    function dragmove(d) {
      d3.select(this)
      .attr("cx", d3.mouse(this)[0])
      .attr("cy", d3.mouse(this)[1]);
      console.log(d3.mouse(this)[0]);
    }
    
      // .attr('cx', function(d){ return Math.floor(Math.random()*700); })

      // .attr('cy', function(d){ return Math.floor(Math.random()*450); });
  
// };
// setTimeout(function(){ game() }, 1000);