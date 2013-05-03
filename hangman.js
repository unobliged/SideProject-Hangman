$(document).ready(function(){
  var word = "plyfe";
  var pattern = new RegExp("[" + word + "]");
  var max_time = 60;
  var time_left;
  var timerId;
  var game_over = false;

  function startTimer(time){
    time_left = time; 
    timerId = window.setInterval(update, 1000);
  }

  function update(){
    time_left -= 1;
    $("span.right").text(time_left);  
    if (time_left <= 0){
      window.clearInterval(timerId);
      alert('Game Over');
      game_over = true;
    }
  }

  startTimer(max_time);

  $("body").keypress(function(e){
    var key = String.fromCharCode(e.which);
    var player_word = '';
    if (pattern.test(key)){
      $('#wordbox span').each(function(index){
        if (index === word.indexOf(key)){
          $(this).text(key);
        }
        player_word += $(this).text();
        if (player_word === word || game_over === true){
          alert('You win!');
          e.preventDefault();
        }
      });
    }
  });



});
