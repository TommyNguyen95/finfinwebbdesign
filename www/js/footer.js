$.getJSON('/json/footer.json', write);

let language = "swedish";

function write (data) {

let x = 1;
for(let icons in data){

	let icon = data[icons];

	if(language=="swedish"){
		$('.gname'+x).text(icon.sv);
	}
	else if(language=="english"){
		$('.gname'+x).text(icon.en);
	}

}


	


}
 


$('.svflag').click(function(){
    language="swedish";
    $.getJSON('/json/footer.json', write);
});
$('.ukflag').click(function(){
     language="english";
     $.getJSON('/json/footer.json', write);
});