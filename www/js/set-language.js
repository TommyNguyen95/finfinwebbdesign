

let language="swedish";

$('.svflag').click(function(){
   language="swedish";
   $.getJSON('/json/startpage.json', write);
});
$('.ukflag').click(function(){
    language="english";
    $.getJSON('/json/startpage.json', write);
});
