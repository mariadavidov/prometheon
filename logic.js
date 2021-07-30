
var tags = [];
var postNames = [];
var postTypes = [];
var topics = [];
var ava1 = new Audio('ava1.mp3');
var backgroundmusic = new Audio('backgroundmusic.mp3');
var ava2 = new Audio('ava2.mp3');

var recordings = [];
for (let i =0; i<22; i++)
{
recordings [i] = false;
}


function init() {
	
		backgroundmusic.play();	
		backgroundmusic.loop=true;
		ava1.play();
		loadData();
		
		//document.getElementById("menu").innerHTML = searchStr;
		//document.getElementById("header").innerHTML = headerText;
		//document.getElementById("nothing").innerHTML = getFrequentsOrTopics();
		document.getElementById("tagsmenu").innerHTML = "";		
		if (document.getElementById("tagpostmenu"))
			document.getElementById("tagpostmenu").innerHTML = "";
		if (document.getElementById("contentframe"))
			document.getElementById("contentframe").src = "";
		if (document.getElementById("postsmenu"))
			document.getElementById("postsmenu").innerHTML = "";	
		
		var tagParameter = getParameterByName('tag'); // "lorem"
		if (tagParameter) {
			getPostsAndTagsBySearch(tagParameter);
		}
		
		var click = getParameterByName('click');
		if (click && click == '1') {
			var tgs = document.getElementsByClassName("posts");
			if (tgs && tgs[0])
				tgs[0].click();
		}
		

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function loadData() {
		tags = processMatrix(2,1);
		postNames = getMatrixHeaders(1);
		postTypes = getMatrixTypes(1);
		topics = getMatrixTopics(2);	
}


 function getMenuByTopics() {
	var menu = "";
	var arrayLength = topics.length;
	for (var i = 0; i < arrayLength; i++) {
		//alert(topics[i]);
		menu += "<div class='topics' style='display:inline' id='menu" + i + "' onclick='getTagsByTopic(" + i + ")'>&nbsp;&nbsp; " + topics[i] + "&nbsp;&nbsp; </div> &nbsp;&nbsp;&nbsp;";
	}
	return nothingStr;
}


 function getPostsAndTagsBySearch(txt) {
	getTagsBySearch(txt);
	var tgs = document.getElementsByClassName("tags");
	if (tgs && tgs[0])
		tgs[0].click();
	getPostsByTag(document.getElementById("searchInput").value);
}

function getFrequents() {
	var freq = "";
	var arrayLength = frequents.length;
	for (var i = 0; i < arrayLength; i++) {		
		freq += "<div class='topics' style='display:inline' id='freq" + i + "' onclick='getPostsAndTagsBySearch(\"" + frequents[i] + "\")'>&nbsp;&nbsp; " + frequents[i] + "&nbsp;&nbsp; </div> &nbsp;&nbsp;&nbsp;";
	}
	return nothingStr + freq;
}

function getTagsByTopic(n) {
	//alert("tags for " + n);
	var tagMenu = "";	
	var arrayLength = tags[n].length;
	for (var i = 0; i < arrayLength; i++) {
		if ((tags[n][i] != "") && (tags[n].indexOf(tags[n][i]) == i))  {
			tagMenu += "<div class='moretags' style='display:inline' id='tagMenu" + n + "_" + i + 
			"' onclick='getPostsAndTagsBySearch(\"" + tags[n][i] + "\")'> " +  //"' onclick='getPostsByTag(" + n + "," + i + ", -2)'> " + 
			tags[n][i] + " </div> &nbsp;&nbsp;&nbsp;";
		}
	}
	if (tagMenu != "") {
		document.getElementById("nothing").innerHTML = "";
	}
	//alert(tagMenu);
	document.getElementById("tagsmenu").innerHTML = tagMenu;
}

function getFrequentsOrTopics() {
	return (frequentsOrTopics == "topics"? getMenuByTopics() : getFrequents());
	
}

function getTagsBySearch(givenText, isPointer) {	
	document.getElementById("starttext").style.display = "none";
	document.getElementById("postsmenu").style.display = "none";
	document.getElementById("contentframe").style.display = "none";
	document.getElementById("tagsmenu").style.display = "block";

	var counter = 0;

	for (let i =0; i<22; i++)
	{
		if (recordings [i] = true)
		{
			counter++;
		}
	}

	if (counter >= 23)
	{
ava2.play();
	}

	var txt = document.getElementById("searchInput").value;
	if (givenText) {
		txt = givenText;	
		if (!isPointer)
			document.getElementById("searchInput").value = txt;
	}	
		
	if (txt.trim().length < 1) {
		document.getElementById("tagsmenu").innerHTML = "";		
		if (document.getElementById("tagpostmenu"))
			document.getElementById("tagpostmenu").innerHTML = "";
		if (document.getElementById("contentframe"))
			document.getElementById("contentframe").src = "";
		if (document.getElementById("postsmenu"))
			document.getElementById("postsmenu").innerHTML = "";
		if (document.getElementById("nothing"))
			document.getElementById("nothing").innerHTML = getFrequentsOrTopics();
		return;
	
	}
	if (document.getElementById("nothing"))
		document.getElementById("nothing").innerHTML = "";
	var tagMenu = "";	
	var found = [];

	var arrayLength = tags.length;
	for (var i = 0; i < arrayLength; i++)  {
		for (var k = 0; k < tags[i].length; k++)  {
			if ((tags[i][k] != "") && (tags[i][k].toLowerCase().indexOf(txt.toLowerCase()) >= 0) && (found.indexOf(tags[i][k]) < 0))  {
				found[found.length] = tags[i][k];
				tagMenu += "<div class='tags' style='display:inline' id='tagMenu" + i + "_" + k + "' onclick='getPostsByTag(" + i + "," + k + ", -2)'> " + 
				tags[i][k] + " </div> &nbsp;&nbsp;&nbsp;";
			}
		}		
	}	

	document.getElementById("tagsmenu").innerHTML = tagMenu;
	if (found && found.length == 1) {
		document.getElementsByClassName("tags")[0].click();
	}
	if (tagMenu == "") {
		var newTxt = getTagByPointers(txt);
		if (newTxt != "") {
			getTagsBySearch(newTxt, true);
		}
	}
	
	if (tagMenu == "") {
		if (document.getElementById("postsmenu"))
			document.getElementById("postsmenu").innerHTML = "";
		if (document.getElementById("tagpostmenu"))
			document.getElementById("tagpostmenu").innerHTML = "";
	}
}

function getTagByPointers(txt) {
	var arrayLength = pointers.length;
	for (var i = 0; i < arrayLength; i++)  {
		for (var k = 1; k < pointers[i].length; k++)  {
			if (pointers[i][k] == txt) 
				return pointers[i][0];
		}
	}
	return "";

}

function getTagsByPost(p) {
	
	var tagMenu = "";	
	var tagsByPost = [];
	var arrayLength = tags.length;
	for (var i = 0; i < arrayLength; i++) {
		if ((tags[i][p] != "") && (tagsByPost.indexOf(tags[i][p]) < 0))  {
			tagsByPost [tagsByPost.length] = tags[i][p];
			tagMenu += "<div class='tags' style='display:inline' id='tagPost" + i + "_" + p + 
			"' onclick='getPostsAndTagsBySearch(\"" + tags[i][p] + "\")'> " +  //"' onclick='getPostsByTag(" + i + "," + p + ", -1)'> " + 
		tags[i][p] + " </div> &nbsp;&nbsp;&nbsp;";
		}
	}
	//alert(tagMenu);
	if (document.getElementById("tagpostmenu"))
		document.getElementById("tagpostmenu").innerHTML = tagMenu;
}


function more() {

	var cur = document.getElementById("current").innerHTML;	
	if (cur && cur != "") {
		var curs = cur.split("_");
		//alert(curs);
		getPostsByTag(curs[0], curs[1], curs[2]) ;
	}
}
function getPostsByTag(n, j, x) {
	document.getElementById("tagsmenu").style.display = "none";
	document.getElementById("postsmenu").style.display = "block";
	
	//alert("posts for " + n + j + ": " + tags[n][j]);
	//document.getElementById("searchInput").value = tags[n][j];
	var posts = [];	
	//alert(document.getElementById("current").innerHTML);
	var arrayLength = tags.length;
	for (var i = 0; i < arrayLength; i++)  {
		for (var k = 0; k < tags[i].length; k++)  {
			if ((tags[i][k] == tags[n][j]) && (posts.indexOf(k) < 0)) {
				//alert("post " + k);
				posts[posts.length] = k;
			}
		}
	}
	
	var postMenu = "";
	//alert("posts: " + posts); 
	for (var l = 0; l < posts.length; l++) {
		postMenu += "<div class='posts' style='display:inline-block; margin: 5px; padding: 5px; border-radius: 12px;' id='postMenu" + n + "_" + j + "_" + l + "' onclick='getPostsByTag(" + n + "," + j + ", " + (l - 1) + ")'> <img  height='20' src='images/" + posts[l] + ".png'><br>&nbsp;&nbsp;" + postNames[posts[l]] + "&nbsp;&nbsp;</div> &nbsp;&nbsp;&nbsp;";
	}
	document.getElementById("postsmenu").innerHTML = postMenu;
	
	var nextPost = 0;
	if (x >= 0) {		
		if (x >= posts.length - 1)
			nextPost = 0;
		else
			nextPost = parseInt(x) + 1;
	}
	
	document.getElementById("current").innerHTML = n + "_" + j + "_" + nextPost ;
	
	if (x > -2)
		loadPost(posts[nextPost]);
	
	document.getElementById("content").style.display = "block";
	/*
	if (posts.length > 1)
		document.getElementById("more").innerHTML = "עוד";
	else
		document.getElementById("more").innerHTML = "";
	*/
//	getTagsByPost(posts[nextPost]);
}

function loadPost(thePost) {
	document.getElementById("contentframe").style.display = "block";
	var d = new Date();
	var n = d.getTime(); 
	//alert(thePost + " " + postTypes[thePost]);
	if ((postTypes[thePost] && postTypes[thePost] == 'video')) {
		document.getElementById("contentframe").src= postVideos[thePost];
	} else {
		document.getElementById("contentframe").src= "./matrix/docs/" + thePost + ".htm?t=" + n;  
		recordings [thePost] = true;
	}
	newpos = postPosition [thePost];
}


