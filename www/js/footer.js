$.getJSON('/json/footer.json', write);

function write (data) {

console.log(data);
let x = 1;
for(let icons in data){

	console.log(icons[0]);

	let icon=data[icons];
	console.log(icon);
	if(language=="swedish"){
		console-log(language);
		console.log(icon);
		console.log(document.getElementsByTagName);
		$(document.getElementsByTagName).text(icon.sv);
	}
	else if(language=="english"){
		console.log(language);
		$(document.getElementsByTagName).text(icon.en);
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