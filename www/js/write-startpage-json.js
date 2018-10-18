
let language="swedish";

$('.svflag').click(function(){
   language="swedish";
});
$('.ukflag').click(function(){
    language="english";
 });

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

}



$.getJSON('/json/startpage.json', write);