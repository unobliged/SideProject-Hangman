$(document).ready(function(){
  var word = "thinks";
  var pattern = new RegExp("[" + word + "]");
  var max_time = 60;
  var time_left;
  var timerId;
  var out_of_time = false;
  var game_win = false;
  var game_over = false;
  var matches =[];
  var match;
  var used = [];
  var wrong_guesses = 0;

  function startTimer(time){
    time_left = time; 
    timerId = window.setInterval(update, 1000);
  }

  function setWordboxLength(word){
    var length = word.length;
    for(var i = 1; i < length; i++){
      $('#base-span').clone().appendTo($('#wordbox'));
    }
  }

  function update(){
    time_left -= 1;
    if(time_left < 10){
      $("span.right").text('Timer: 0:0' + time_left);  
    } else { 
      $("span.right").text('Timer: 0:' + time_left);  
    }
    if(time_left <= 0){
      out_of_time = true;
      $('header h3').text('Out of time!');
      window.clearInterval(timerId);
      gameOver();
    }
  }

  setWordboxLength(word);
  startTimer(max_time);

  // Handles click input
  $('#letterbox span').click(function(e){
    if(out_of_time === true || game_over === true){
      e.preventDefault();
    } else {
      var letter = $(this).text().toLowerCase();
      checkLetter(letter);
    }
  });

  // Handles keyboard input
  $('body').keypress(function(e){
    if(out_of_time === true || game_over === true){
      e.preventDefault();
    } else {
      var letter = String.fromCharCode(e.which);
      checkLetter(letter);
    }
  });

  function checkLetter(letter){
    var player_word = '';
    hideLetter(letter);
    var used = usedLetter(letter);

    if(pattern.test(letter)){
      $('header h2').text('Good guess!');
      $('header h3').text('There is a ' + letter.toUpperCase() + ' in this word.');

      // Finds indexes of letters in word
      var regexp = new RegExp(letter, 'g');
      matches = word.match(regexp);
      while ((match = regexp.exec(word)) !== null){
        matches.push(match.index);
      }

      // Handles word display and game win check
      $('#wordbox span').each(function(index){
        // Displays correct letter matches
        for (var m in matches) {
          if(index === matches[m]){ 
            $(this).text(letter);
          }
        }

        // Checks to see if word fully identified
        player_word += $(this).text();
        if(player_word === word){
          game_win = true;
          gameOver();
        }
      });
    } else {
      if(used === true){
        $('header h2').text('Warning!');
        $('header h3').text('You have already tried ' + letter.toUpperCase() + '.');
      } else {
        wrong_guesses += 1;
        $('header h2').text('Sorry!');
        $('header h3').text('There is no ' + letter.toUpperCase() + ' in this word.');
        $('#container img').attr('src', 'Hangman-' + wrong_guesses + '.png');
      }  
      
      if(wrong_guesses === 6){
        gameOver();  
      }
    }
  }

  function hideLetter(letter){
    $('#letterbox span').each(function(){
      if($(this).text() === letter.toUpperCase()){
        $(this).hide();
      }
    });
  }

  function usedLetter(letter){
    if(used.indexOf(letter) !== -1){
      return true;
    } else {
      used.push(letter);
      return false;
    }
  }

  function calcStageScore(){
    var stage_score = 100; 

    if(game_win === true){
      stage_score += 60 - wrong_guesses*10 + time_left*5;
    } 
    // for future multi-stage game, 15pts for all stages cleared

    $('span.left').text('Score: ' + stage_score);
  }

  function gameOver(){
    game_over = true;
    $("span.right").text('Time Elapsed: ' + (max_time - time_left) + ' s');  
    window.clearInterval(timerId);

    if(game_win !== true){
      $('#container img').attr('src', 'Hangman-6.png');
    }

    if(game_win === true){
      $('#wordbox').css('background-color', '#008000');
      $('header h2').text('Marvelous!');
      $('header h3').text('You guessed the word!');
      alert('You won!');
    } else {
      $('#wordbox').css('background-color', '#FF6666');
      $('header h2').text('Sorry!');
      $('header h3').text('You did not guess the word!');
      alert('You lost!');
    }

    calcStageScore();
    $("body").keypress(function(e){ e.preventDefault(); });
  }
});
