
/*
function write(data){

    if(language=="swedish"){
    $('.ourgame-name').text(data["our-game"].sv);
    $('.game2-name').text(data["game2"].sv);
    $('.game3-name').text(data["game3"].sv);
    $('.game4-name').text(data["game4"].sv);
    $('.game5-name').text(data["game5"].sv);
    $('.game6-name').text(data["game6"].sv);
    $('.game7-name').text(data["game7"].sv);
    }
    else if(language=="english"){
        $('.ourgame-name').text(data["our-game"].en);
        $('.game2-name').text(data["game2"].en);
        $('.game3-name').text(data["game3"].en);
        $('.game4-name').text(data["game4"].en);
        $('.game5-name').text(data["game5"].en);
        $('.game6-name').text(data["game6"].en);
        $('.game7-name').text(data["game7"].en);
        }
    

}
*/


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
});
$('.ukflag').click(function(){
     language="english";
     $.getJSON('/json/startpage.json', write);
});

