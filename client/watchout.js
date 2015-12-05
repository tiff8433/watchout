// start slingin' some d3 here.
// function game(){
  
var moveEnemies = function () {  
    d3.selectAll('.enemy')
    .transition(1000)
    .attr('cx',function (d) {return Math.floor(Math.random()*690);}) 
    .attr('cy',function (d) {return Math.floor(Math.random()*440);})   
};
    
setInterval(function () {moveEnemies();}, 1000);
    
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
}
    
var detectCollisions = function () {
  
  var playerCenter = [];
  playerCenter[0] = d3.selectAll('#grab').attr('cx');
  playerCenter[1] = d3.selectAll('#grab').attr('cy');
  
  d3.selectAll('.enemy')
    .data([playerCenter, playerCenter, playerCenter, playerCenter,
           playerCenter, playerCenter, playerCenter, playerCenter,
           playerCenter, playerCenter])
    .attr('hasCollided', function (d) {
      var xDif = d3.select(this).attr('cx') - d[0];
      var yDif = d3.select(this).attr('cy') - d[1];
      var separation = Math.sqrt(Math.pow(xDif, 2) + Math.pow(yDif, 2));
      if (separation < 20) {
        d3.select(this).attr('fill','red');
        return true;
      }
      return false
    });
}    

setInterval(function () {detectCollisions();}, 50);

// .attr('cx', function(d){ return Math.floor(Math.random()*700); })

// .attr('cy', function(d){ return Math.floor(Math.random()*450); });
  
// };
// setTimeout(function(){ game() }, 1000);