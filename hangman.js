$(document).ready(function(){
  var word = "bobafett";
  var pattern = new RegExp("[" + word + "]");
  var max_time = 60;
  var time_left;
  var timerId;
  var game_over = false;
  var game_win = false;
  var matches =[];
  var match;

  function startTimer(time){
    time_left = time; 
    timerId = window.setInterval(update, 1000);
  }

  function update(){
    time_left -= 1;
    $("span.right").text('Timer: 0:' + time_left);  
    if (time_left <= 0){
      game_over = true;
      window.clearInterval(timerId);
      if (game_win === false){
        alert('Game Over');
        $("span.right").text('Timer: 0:00');  
      }  
    }
  }

  startTimer(max_time);

  $("body").keypress(function(e){
    var key = String.fromCharCode(e.which);
    var player_word = '';
    if (pattern.test(key)){
      var regexp = new RegExp(key, 'g');
      matches = word.match(regexp);
      while ((match = regexp.exec(word)) !== null){
        matches.push(match.index);
      }
      $('#wordbox span').each(function(index){
        for (var m in matches) {
          if (index === matches[m]){ 
            $(this).text(key);
          }
        }

        player_word += $(this).text();

        if (player_word === word || game_over === true){
          if (game_over ===true){
            alert('Game Over!');
          } else {
            $('#wordbox').css('background-color', '#009933');
            alert('You win!');
            $("span.right").text('Time Elapsed: ' + (max_time - time_left) + ' s');  
          }
          window.clearInterval(timerId);
          e.preventDefault();
        }
      });
    } else {
      $('#wordbox').css('background-color', '#FF6666');
    }
  });



});
