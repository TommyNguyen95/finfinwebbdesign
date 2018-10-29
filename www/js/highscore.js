$('.send-to-highscore').on('click', postNewHighscore);
 
function postNewHighscore() {
  let name = $();//......  fetch the name from your <input>/or otherwhere//
  let score = $();//...... fetch the score from the game's "score"-variable//
  $.post( "/add-score", { name, score }, function(responseData) {
    console.log('the new highscore-list is:', responseData);
    console.error('append/use the new highscore-list then remove this console.error');
  });
}
