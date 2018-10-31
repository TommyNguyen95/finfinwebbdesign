$('#submit-button').on('click', postNewHighscore);
 
function postNewHighscore() {
  console.log(87654);
  
  let name = $('#name');//......  fetch the name from your <input>/or otherwhere//
  let score = $('#points');//...... fetch the score from the game's "score"-variable//
  $.post( "/add-score", { "name": name, "score": score }, function(responseData) {
    console.log('the new highscore-list is:', responseData);
    console.error('append/use the new highscore-list then remove this console.error');
  });
}
