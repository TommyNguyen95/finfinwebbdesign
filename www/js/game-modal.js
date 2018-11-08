$('#input-name').on('submit', submitValidator);

function submitValidator(e) {
  // Prevents the form from it's natural behavior
  // (that is: reloading the page)
  e.preventDefault();
  // plockar ut stringen val() från #submit-name
  let x = $('#submit-name').val();
  // Don't allow empty names
  if (x.length < 2) {
    $('#submit-name-validation-message').text(modalText);
  }
  // But allow names with at least two characters
  else {
    $('#submit-name-validation-message').text("");
    postNewHighscore();
  }
}

$.getJSON('/json/game-modal.json', gameModalText);

let modalText;
function gameModalText(data) {
  if (language === "swedish") {
    modalText = data.sv;
  }
  else if (language === "english") {
    modalText = data.en;
  }
}

$('.svflag').click(function () {
  language = "swedish";
  $.getJSON('/json/game-modal.json', gameModalText);
});

$('.ukflag').click(function () {
  language = "english";
  $.getJSON('/json/game-modal.json', gameModalText);
});

