
$.getJSON('/json/startpage.json', write);

let language="swedish";

function write(data){
    let x=1;

    for(let games in data){

        let game= data[games];

        if(language=="swedish"){
            $('.gname'+x).text(game.sv);
        }
        else if(language=="english"){
            $('.gname'+x).text(game.en);
        }

        x++;       
    }
}


$('.svflag').click(function(){
    language="swedish";
    $.getJSON('/json/startpage.json', write);
    $('h1 span:first-child').text('Detta är');
    rotatingText.toRotate = ['Lol', 'LOOOOOOOOOOOOOOL'];
});
$('.ukflag').click(function(){
     language="english";
     $.getJSON('/json/startpage.json', write);
     $('h1 span:first-child').text('This is');
     rotatingText.toRotate = ['23456', 'lkjhgfd'];
});

