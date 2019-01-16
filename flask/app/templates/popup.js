function hello() {
	var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.linkedin.com/learning/topics/python", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    // WARNING! Might be evaluating an evil script!
    var resp = eval("(" + xhr.responseText + ")");
  }
}
xhr.send();
	// var xmlhttp = new XMLHttpRequest();
	// var r=xmlhttp.open("GET","https://www.linkedin.com/learning/topics/python",true);
	// var r = $.get('https://www.linkedin.com/learning/topics/python');
	// var players = r.getElementsByClassName("gLFyf gsfi");
	// for (var i = 0; i < players.length; i++) { console.log( players[i].textContent ); }
}
function transferComplete(evt) {
	var players = document.getElementsByClassName("entity-feed-list");
	for (var i = 0; i < players.length; i++) { console.log( players[i].textContent ); }

}
document.getElementById('clickme').addEventListener('click', hello);
