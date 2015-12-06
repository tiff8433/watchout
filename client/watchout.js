// start slingin' some d3 here.
// function game(){
  
var moveEnemies = function () {  
    d3.selectAll('.enemy')
    .transition(1000)
    .attr('x',function (d) {return Math.floor(Math.random()*690);}) 
    .attr('y',function (d) {return Math.floor(Math.random()*440);})  
};
    
setInterval(function () {moveEnemies();}, 1000);

var updateCollision = function () {
    //reset the hasCollided attribute for enemies
    d3.selectAll('.enemy')
      .attr('hasCollided', function (d) {
        if (d3.select(this).attr('hasCollided') === 'true') {
          console.log(d3.select(this).attr('hasCollided'));
          //increment totalCollisions
          d3.selectAll('#totalCollisions').data([1]).attr('collisions', function (d) {return (parseInt(d3.select(this).attr('collisions')) + parseInt(d));});
          d3.selectAll('#totalCollisions').text(  d3.selectAll('#totalCollisions').attr('collisions')  );  
        }
      });
    d3.selectAll('.enemy').data([false, false, false, false, false, false, false, false, false, false, false])
      .attr('hasCollided', function(d) { return d});
}
    
setInterval(function () {updateCollision();}, 100);
    
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
      var xDif = d3.select(this).attr('x') - d[0];
      var yDif = d3.select(this).attr('y') - d[1];
      var separation = Math.sqrt(Math.pow(xDif, 2) + Math.pow(yDif, 2));
      if (separation < 20) {
        d3.select(this).attr('fill','red');
        //reset score
        d3.selectAll('#currentScore').attr('score',0);
        d3.selectAll('#currentScore').text(  d3.selectAll('#currentScore').attr('score')  );
        return true;
      }
      return false
    });
}    

setInterval(function () {
  detectCollisions();
  //increment score
  d3.selectAll('#currentScore').data([1]).attr('score', function (d) {return (parseInt(d3.select(this).attr('score')) + parseInt(d));});
  d3.selectAll('#currentScore').text(  d3.selectAll('#currentScore').attr('score')  );
  var currentScore = parseInt(d3.selectAll('#currentScore').attr('score'));
  var highScore = parseInt(d3.selectAll('#highScore').attr('highScore'));
  if (currentScore > highScore) {
    highScore = currentScore;
    d3.selectAll('#highScore').attr('highScore', highScore);
    d3.selectAll('#highScore').text(highScore);
  }
}, 50);
