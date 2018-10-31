$('#submit-button').on('click', postNewHighscore);
 
function postNewHighscore() {
  console.log(87654);
  
  let name = $('#name').val();//......  fetch the name from your <input>/or otherwhere//
  let score = $('#points').val();//...... fetch the score from the game's "score"-variable//
  $.post( "/add-score", { "name": name, "score": score }, function(responseData) {
    appendHighscoreList(responseData);
  });
}


function appendHighscoreList(highscores) {
  console.log('the new highscore-list is:', highscores);
  $('tbody').empty();
  
}