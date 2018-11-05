$('#submit-button').on('click', postNewHighscore);

 
function postNewHighscore() {
  
  let name = $('#name').val();//......  fetch the name from your <input>/or otherwhere//
  let score = $('#points').val();//...... fetch the score from the game's "score"-variable//
  $.post( "/add-score", { "name": name, "score": score }, function(responseData) {
    //highscoreTable(responseData);
    
    // redirecting to highscore page
    location.href = '/highscore';
  });
}

$.getJSON('/json/highscore.json',highscoreTable);

function highscoreTable(namesAndScores){
 
   let i = 1;

  for(let nas of namesAndScores){

    let tr = $('<tr/>');

    tr.append('<td>'+ i +'</td>'),
    tr.append('<td>'+ nas.name +'</td>'),
    tr.append('<td>'+ nas.score +'</td>')

    $('tbody').append(tr);
    i++;
 }

}


