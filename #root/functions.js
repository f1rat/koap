//////////////////////////////////////////////////////
//                EDIT TO YOUR NEEDS                //
//   												//
// Use $title_no variable to choose the title 		//
// field number.									//
//var title = "3";										//
// 						Edit END		    		//
//////////////////////////////////////////////////////


//Login check
function logChk() {
console.log("checking login status...");
if (localStorage.token == "") {
//view.router.loadPage("login.html");


        alert("DOH");

    
} 
else {
        alert("great, you have a token");

var username = localStorage.user;

var path = (location.pathname);

    var url = "http://www.makinepark.net/index.php/tokenapi/user/?token="+tokeni;
    var loginString = tokeni;

    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        success: function(data){
		var boolchecker = data.token_available;
		if (boolchecker === true) {
		alert("bool true");
		} else {
		alert("bool : false");
		}
		}       
    });
}
}

//Login
function login(){

    var email= $.trim($("#loginusername").val());
    var password= $.trim($("#loginuserpass").val());
    $("#loginbutton").text("Authenticating...");
    var url = "http://www.makinepark.net/index.php/tokenapi/authenticate/?";
    var loginString = "username="+email+"&password="+password+"&key=4PcY4Dku0JkuretevfEPMnG9BGBPi";
	localStorage.user = "";
	localStorage.token = "";

    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        data: loginString,
        async: false,
        success: function(data){
            if(data.message == "Results available") {
            $("#loginbutton").text("Login Success!");
            localStorage.token = data.token;
            localStorage.user = email;
			$("#pcontainer").html("");
				$.get("main.html", function(htmldata){
    			$("#pcontainer").html(htmldata);
				});
            }
            else {
                $("#loginbutton").text("Login Failed");
           }
        }        
    });
}    
      
    
//Forgot Password
function forgotPass(){

	var email = $.trim($("#inputMail").val());
    var url = "http://makinepark.net/index.php/admin/user/forgetpassword#content";
	$.post(url, {mail: email}, function(data) {
	$("#resetbuttonn").text("Processing...");
	if (data) {
	var $div = $(data);
	var messageresult = $div.find(".label").html();
	$("#forgotmsg").text(messageresult);
	$("#resetbuttonn").text("Reset password");
	}
	});
    
}


//Register new user
function registerNewUser(){

    var usermail= $.trim($("#useremail").val());
    var password= $("#upassword").val();
    $("#registerbutton").text("Registering...");
    var url = "http://www.makinepark.net/index.php/tokenapi/register/?";
    var loginString = "mail="+usermail+"&password="+password+"&key=4PcY4Dku0JkuretevfEPMnG9BGBPi";
    
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        data: loginString,
        async: false,
        success: function(data){
		$("#registerbutton").text("Sign Up");
		if (data.message == "Register success"){
		$("#registerMessage").text("Registration successful. You may log in now.");
		} else {
		$("#registerMessage").text(data.message);
		}
        }        
    });
}


//Get slides
function getSlides(){
    var url = "http://www.makinepark.net/mobile-functions.php?action=getSlides";
	$.ajax({
        type: 'POST',
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
		data = data.substring(1, data.length - 1);
		var arry = data.split('""');
		var i = 0;
		
		var collector = "<div data-pagination='{\"el\": \".swiper-pagination\"}' data-space-between=\"0\" class=\"swiper-container swiper-init loop\"><div class=\"swiper-wrapper\" id=\"mainsliderhost\">";
		$.each(arry, function(){
		collector += "<div class=\"swiper-slide\"><img src=\"http://www.makinepark.net/files/"+arry[i]+"\"></div>";
		i=i+1;
		});
		collector += "</div><div class=\"swiper-pagination\"></div></div>";
		$("#scontainer").append(collector);
		}     
    });
}


//Get homepage news
var globalNewsArray = "";
function getLatestNews(){
	var lang = "2"; //1-english, 2-turkish
    var url = "http://www.makinepark.net/mobile-functions.php?action=getLatestNews&language="+lang;
	$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        globalNewsArray = data;
		collector = "";
		var a = "";
		var m = "";
		for(i=0; i<data.length/4;i++){
			m = i+4;
			collector += '<ul><li><a onclick="getFullTextHome('+i+');" href="/blog-read/" class="item-link item-content"><div class="item-media">';
			collector += '<img src="http://makinepark.net/files/'+data[m]+'" width="80"></div><div class="item-inner"><div class="item-title-row">';
			a = m+4;
			collector += '<div class="item-title">'+data[a]+'</div><div class="item-after"></div></div></div></a></li></ul>';
		}
		$("#frontNewsListing").append(collector);
		}				
    });
}


//Get full news, display excerpt
var globalNews = ""; 
function getFullNews(){
	var lang = "2"; //1-english, 2-turkish
    var url = "http://www.makinepark.net/mobile-functions.php?action=getLatestNews&language="+lang;
	$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
		globalNews = data;
		collector = "";
		var a = "";
		var b = "";
		for(i=0; i<data.length/4;i++){
			a = i+12;
			b = i+4;
			collector += '<div class="card facebook-card"><div class="card-content"><div class="card-content-inner"><a onclick="javascript:getFullText('+i+');" href="/blog-read/"><img src="http://makinepark.net/files/'+data[b]+'" width="100%"></a>';
			collector += '<a onclick="javascript:getFullText('+i+');" href="/blog-read/"><p>'+data[a].substr(0,200)+'...</p></a></div></div><div class="card-footer"><a href="#" class="link">Share</a></div></div>';
		}
		$("#largeBlogContainer").append(collector);
		}				
    });
}


//Store full news entry from homepage
function getFullTextHome(i){
  
var a = i+8;
var b = i+12;
var c = i+4;

localStorage.newsPic = globalNewsArray[c];
localStorage.newsTitle = globalNewsArray[a];
localStorage.newsBody = globalNewsArray[b];
}


//Store full news entry from blog page
function getFullText(i){
var a = i+8;
var b = i+12;
var c = i+4;

localStorage.newsPic = globalNews[c];
localStorage.newsTitle = globalNews[a];
localStorage.newsBody = globalNews[b];
}

//Display single full news entry
function displayFullNews(){

$('.block-title').html(localStorage.newsTitle);
$('.block-title').css({"white-space":"unset","overflow":"visible"});
$('.blog-read-html').css("background-image", "url('http://makinepark.net/files/"+localStorage.newsPic+"')");
$('.block-inner').html(localStorage.newsBody);
localStorage.removeItem(newsPic);
localStorage.removeItem(newsTitle);
localStorage.removeItem(newsBody);
}


//Get last 10 listing
function getLatestListings(){
    var url = "http://makinepark.net/index.php/api/json/tr/10/";
	$.ajax({
        type: "POST",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        var resultcount = data.total_results;
        var collector = "";
        $("#frontlisting").html("");
        for (i = 0; i < resultcount; i++) { 
        if (data.results[i].listing.image_filename == null){
        data.results[i].listing.image_filename = "no_image.jpg";
        }
        collector += '<li><a onclick="passProductID('+data.results[i].listing.id+');" href="/product-single/" class="item-link item-content"><div class="item-media"><img src="http://makinepark.net/files/'+data.results[i].listing.image_filename+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+data.results[i].listing.json_object.field_10+'</div><div class="item-after"></div></div><div class="item-subtitle">'+data.results[i].listing.json_object.field_83+', '+data.results[i].listing.json_object.field_81+' model</div><div class="item-text">'+data.results[i].listing.field_36_int+' TL</div></div></a></li>';
        }
        $("#frontlisting").append('<ul>'+collector+'</ul>');        
        }      
    });
}

//Get clicked listing id and store it
function passNewsID(e){
localStorage.newsID = e;
}

//Get clicked news id and store it
function passProductID(e){
localStorage.propertyID = e;
}

//Display full product info
function displayProduct() {
var propertyID = localStorage.propertyID;
localStorage.removeItem(localStorage.propertyID);
var lang = "2";
    var url = "http://www.makinepark.net/mobile-functions.php?action=getSinglePropertyData&propertyID="+propertyID+"&language="+lang;
    	$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        var details = data[0]["json_object"];
        details = details.replace(/field_/g,'');
        details = $.parseJSON(details);	
		var arry = [];
		var o = "";
		for (l=0;l<data[1].length;l++) {
			o = data[1][l];
			arry.push(details[o]);
		}
		
		var w = [];
		for (var q = 0; q<arry.length;q++) {
		w.push(data[2][q].option);
		}
		
		var exclude = [];
		for (i = 0; i<data[3].length;i++) {
		if (data[5][i]) {
		} else {
		exclude.push(i);
		}
		}
				
		var coordinates = data[0].gps;
		coordinates = coordinates.split(',');
		
		//Display property images in carousel
		var images = data[0].image_repository;
		images = images.substring(1, images.length - 1);
		images = images.replace(/"/g,'');
		images = images.split(',');
		var collector = "<div data-pagination='{\"el\": \".swiper-pagination\"}' data-space-between=\"0\" class=\"swiper-container swiper-init loop\"><div class=\"swiper-wrapper\" id=\"mainsliderhost\">";
		var i = 0;
		$.each(images, function(){
		collector += "<div class=\"swiper-slide\"><img src=\"http://www.makinepark.net/files/"+images[i]+"\"></div>";
		i=i+1;
		});
		collector += "</div><div class=\"swiper-pagination\"></div></div>";
		$(".restaurant-img").html(collector);
			
		//Display property general info
		var propgeninfo = '<ul>';
		var longdescription = "<p style='text-align:justify'>";
		for (var r = 0; r<arry.length; r++) { 
		
		if (r == 4) { longdescription = arry[r]; }
		
		if (exclude.includes(r)) {} else {
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[r]+'</div><div class="item-after link-deeporange">'+arry[r]+'</div></div></div></li>'; }
		}
		propgeninfo += '</ul>'
		longdescription += '</p>'
		$("#t1").html(propgeninfo);
		$("#t2").html(longdescription);
		$("#t3").html('<script>function initMap() {  var uluru = {lat: '+coordinates[0]+', lng: '+coordinates[1]+'};  var map = new google.maps.Map(document.getElementById("map"), {zoom: 17, center: uluru});  var marker = new google.maps.Marker({position: uluru, map: map}); } </script>   <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiBBcAFK3mcRZPcE_rgzN9TKEowrsonXg&callback=initMap"> </script>');		
		
		
		
		
		
		
		
		
		
		
		
		}
});
}

//Display categories list
function getCatListing(){
var lang = "2";
    var url = "http://www.makinepark.net/mobile-functions.php?action=getCatListing&language="+lang;
    console.log("begin");
    	$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
	    console.log("end");        
        console.log(data);
        //do you
        }
        });
}