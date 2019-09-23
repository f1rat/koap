//Login check
function logChk2() {
console.log("checking login status...");
if (localStorage.token == "") {
//view.router.loadPage("login.html");


        alert("no token");

    
} 
else {
        alert("great, you have a token");

var username = localStorage.user;

var path = (location.pathname);

    var url = "https://www.kiralikotopark.com/index.php/tokenapi/user/?token="+tokeni;
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
    $("#loginbutton").text("kontrol ediliyor...");
    var url = "https://www.kiralikotopark.com/index.php/tokenapi/authenticate/?";
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
            $("#loginbutton").text("Giriş Başarılı!");
            localStorage.token = data.token;
            localStorage.user = email;
			$("#pcontainer").html("");
				$.get("main.html", function(htmldata){
    			$("#pcontainer").html(htmldata);
				});
            }
            else {
                $("#loginbutton").text("Giriş Başarısız");
           }
        }        
    });
}    
      
//Forgot Password
function forgotPass(){

	var email = $.trim($("#inputMail").val());
    var url = "https://kiralikotopark.com/index.php/admin/user/forgetpassword#content";
	$.post(url, {mail: email}, function(data) {
	$("#resetbuttonn").text("İşleniyor...");
	if (data) {
	var $div = $(data);
	var messageresult = $div.find(".label").html();
	$("#forgotmsg").text(messageresult);
	$("#resetbuttonn").text("Şifreyi Sıfırla");
	}
	});
    
}

//Register new user
function registerNewUser(){

    var usermail= $.trim($("#useremail").val());
    var password= $("#upassword").val();
    $("#registerbutton").text("Registering...");
    var url = "https://www.kiralikotopark.com/index.php/tokenapi/register/?";
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
		$("#registerMessage").text("Başarıyla kayıt oldunuz, giriş yapabilirsiniz.");
		} else {
		$("#registerMessage").text(data.message);
		}
        }        
    });
}

//Get slides
function getSlides(){
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getSlides";
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
		collector += "<div class=\"swiper-slide\"><img src=\"https://www.kiralikotopark.com/files/"+arry[i]+"\"></div>";
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
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getLatestNews&language="+lang;
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
			collector += '<img src="https://kiralikotopark.com/files/'+data[m]+'" width="80"></div><div class="item-inner"><div class="item-title-row">';
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
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getLatestNews&language="+lang;
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
			collector += '<div class="card facebook-card"><div class="card-content"><div class="card-content-inner"><a onclick="javascript:getFullText('+i+');" href="/blog-read/"><img src="https://kiralikotopark.com/files/'+data[b]+'" width="100%"></a>';
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
$('.blog-read-html').css("background-image", "url('https://kiralikotopark.com/files/"+localStorage.newsPic+"')");
$('.block-inner').html(localStorage.newsBody);
localStorage.removeItem(newsPic);
localStorage.removeItem(newsTitle);
localStorage.removeItem(newsBody);
}

//Get last 10 listing
function getLatestListings(){
    var url = "https://kiralikotopark.com/index.php/api/json/tr/10/";
	$.ajax({
        type: "POST",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        console.log(data);
        var resultcount = data.total_results;
        var collector = "";
        $("#frontlisting").html("");
        for (i = 0; i < resultcount; i++) { 
        if (data.results[i].listing.image_filename == null){
        data.results[i].listing.image_filename = "no_image.jpg";
        }
        collector += '<li><a onclick="passProductID('+data.results[i].listing.id+');" href="/product-single/" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+data.results[i].listing.image_filename+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+data.results[i].listing.json_object.field_10+'</div><div class="item-after"></div></div><div class="item-subtitle">'+data.results[i].listing.json_object.field_83+', '+data.results[i].listing.json_object.field_81+' model</div><div class="item-text">'+data.results[i].listing.field_36_int+' TL</div></div></a></li>';
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
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getSinglePropertyData&propertyID="+propertyID+"&language="+lang;
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
		collector += "<div class=\"swiper-slide\"><img src=\"https://www.kiralikotopark.com/files/"+images[i]+"\"></div>";
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
var machineCatList=[];
function getCatListing(){
	var collector = "";
	var lang = "2";
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getCatListing&language="+lang;
    	$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        var reslt = data.values;
        reslt = reslt.substring(1, reslt.length - 0);
        reslt = reslt.split(',');
        machineCatList = reslt;
        collector = "<ul>";
        for(var i=0;i<reslt.length;i++){
        collector += '<li class="item-content item-input"><div class="item-inner"><a onclick="javascript:storeMachine('+i+');" href="/machinecatlisting/" style="text-decoration:none;color:black;"><div class="item-title"><span class="badge">✓   </span>  '  +  reslt[i]+'</div></a></div></li>';
        }
        collector += '</ul>';
        $(".list-group").html(collector);
        localStorage.machineCatListing = collector;
        }
        });
}


//Store chosen category
function storeMachine(e){
localStorage.machinestoList = machineCatList[e];
}


//Get all machines under chosen category
function getAllMachines(){
	var lang = "2";
	var collector = "";
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getCatMachines&mtype="+localStorage.machinestoList+"&language="+lang;
//    localStorage.removeItem(machinestoList);
    $.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        collector = "<ul>";
        for(var i=0;i<data.length;i++){
        var details = data[i].json_object;
        details = details.replace(/field_/g,'');
        details = $.parseJSON(details);	
        console.log(details);
        if (details[36] != "") {
        var price = details[36];
        } else {
        var price = details[37];
        }
        collector += '<li><a onclick="passProductID('+data[i].property_id+');" href="/product-single/" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+data[i].image_filename+'" width="80"></div><div class="item-data"><div class=""><div class="item-title-detail">'+details[10]+'</div><div class=""></div></div><div class="">'+details[83]+','+details[81]+' model</div><div class="">'+price+' TL</div></div></a></li>';
        }
        collector += '</ul>';
        $("#machine-cat-listing").html(collector);
        }
});
}

//Get categories list and populate dropdown
var machineCatList=[];
function getCatListingForDropDown(){
	var collector = "";
	var lang = "2";
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getCatListing&language="+lang;
    	$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        var reslt = data.values;
        reslt = reslt.substring(1, reslt.length - 0);
        reslt = reslt.split(',');
        machineCatList = reslt;
        for(var i=0;i<reslt.length;i++){
        collector += '<option value="'+reslt[i]+'">'+reslt[i]+'</option>';
        }
        $("select#newlistingCategory").html(collector);
        localStorage.machineCatListing = collector;
        }
        });
        $('#newlistingCategory').on('change', function() {
        
        if (lang == "2") {
        var userToken = "c181985a387715be95d5da0a0bb13d11";
        switch (this.value) {
        	case 'Karot':
//        	$("li#additionalFieldsli").html("");
        	break;
        	case 'Forklift':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Tonnage (kgs)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTonnage"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Number of Wheels</div><div class="item-after"><span class="inputTitle"><select name="newProductWheelCount" id="newProductWheelCount"><option value="3">3</option><option value="4">4</option></select></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Wheel Type</div><div class="item-after"><span class="inputTitle"><select name="newProductWheelType" id="newProductWheelType"><option value="Havalı">Havalı</option><option value="Dolgu">Dolgu</option><option value="İz Bırakmaz Dolgu">İz Bırakmaz Dolgu</option></select></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Free Lifting?</div><div class="item-after"><span class="inputTitle"><select name="newProductFreeLift" id="newProductFreeLift"><option value="Evet">Evet</option><option value="Hayır">Hayır</option></select></span></div></div></li> <li class="item-content item-input"><div class="item-inner"><div class="item-title">Horizontal Lifting?</div><div class="item-after"><span class="inputTitle"><select name="newProductHorizontalLift" id="newProductHorizontalLift"><option value="Evet">Evet</option><option value="Hayır">Hayır</option></select></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Lifting Height (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductLiftingHeight"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Turning Distance (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTurning"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Climbing (dergrees)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductClimbing"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Daliy Shift Capacity</div><div class="item-after"><span class="inputTitle"><select name="newProductWheelCount" id="newProductDailyShift"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></span></div></div></li>');        	
        	break;
        	case 'Bobcat':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Movement</div><div class="item-after"><span class="inputTitle"><select name="newProductMovement" id="newProductMovement"><option value="Track">Track</option><option value="Tire">Tire</option></select></span></div></div></li>  <li class="item-content item-input"><div class="item-inner"><div class="item-title">Engine Power (kW)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductEnginePower"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Working Load (kg)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductWorkingLoad"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Pump Capacity (l/h)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductPumpCapacity"/></span></div></div></li>');
        	break;
        	case 'Yükleyici':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Movement</div><div class="item-after"><span class="inputTitle"><select name="newProductMovement" id="newProductMovement"><option value="Track">Track</option><option value="Tire">Tire</option></select></span></div></div></li>  <li class="item-content item-input"><div class="item-inner"><div class="item-title">Tonnage (kg)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTonnage"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Engine Power (kW)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductEnginePower"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Lifting Capacity (kg)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductLiftingCapacity"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Dig Depth (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductDigDepth"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Reching Distance (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductRechingDistance"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Max Arm Lift (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductMaxArmLift"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Max Bucket Lift (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductMaxBucketLift"/></span></div></div></li>');
        	break;
        	case 'Kamyon':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner">   <div class="item-title">Lorry Type</div>   <div class="item-after"><span class="inputTitle"><select name="newProductLorryType" id="newProductLorryType"><option value="Breakdown Truck">Breakdown Truck</option><option value="Hi-up">Hi-up</option><option value="Dumper">Dumper</option><option value="Sewage Truck">Sewage Truck</option><option value="Garbage Truck">Garbage Truck</option><option value="Tanker">Tanker</option><option value="Concrete Pump">Concrete Pump</option><option value="Concrete Mixer">Concrete Mixer</option><option value="Box Truck">Box Truck</option><option value="Earth-moving Truck">Earth-moving Truck</option><option value="Removal Truck">Removal Truck</option></select></span></div></div></li><li class="item-content item-input"><div class="item-inner">   <div class="item-title">Tonnage (kg)</div>   <div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTonnage"/></span></div></div></li><li class="item-content item-input"><div class="item-inner">   <div class="item-title">Engine Power (kW)</div>   <div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductEnginePower"/></span></div></div></li><li class="item-content item-input"><div class="item-inner">   <div class="item-title">Axle Count</div>   <div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductAxleCount"/></span></div></div></li>');
        	break;
        	case 'Dozer':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Movement</div><div class="item-after"><span class="inputTitle"><select name="newProductMovement" id="newProductMovement"><option value="Tire">Tire</option><option value="Straight Track">Straight Track</option><option value="Triangle Track">Triangle Track</option></select></span></div></div></li>  <li class="item-content item-input"><div class="item-inner"><div class="item-title">Dozer Knife</div><div class="item-after"><span class="inputTitle"><select name="newProductDozerKnife" id="newProductDozerKnife"><option value="Angledozer">Angledozer</option><option value="Bulldozer">Bulldozer</option><option value="Tiltdozer">Tiltdozer</option></select></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Transfer</div><div class="item-after"><span class="inputTitle"><select name="newProductTransfer" id="newProductTransfer"><option value="Hydrostatic">Hydrostatic</option><option value="Hydromechanic">Hydromechanic</option></select></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Engine Power (kw)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductEnginePower"/></span></div></div></li>');
        	break;
        	case 'Greyder':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Chassis Type</div><div class="item-after"><span class="inputTitle"><select name="newProductChassisType" id="newProductChassisType"><option value="Tire">Tire</option><option value="Straight Chassis">Straight Chassis</option><option value="Articulated Chassis">Articulated Chassis</option></select></span></div></div></li>  <li class="item-content item-input"><div class="item-inner"><div class="item-title">Control System</div><div class="item-after"><span class="inputTitle"><select name="newProductControlSystem" id="newProductControlSystem"><option value="Hydraulic">Hydraulic</option><option value="Mechanical">Mechanical</option><option value="Hydraulic & Mechanical">Hydraulic & Mechanical</option></select></span></div></div></li>');
        	break;
        	case 'Ekskavatör':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Movement Type</div><div class="item-after"><span class="inputTitle"><select name="newProductMovementType" id="newProductMovementType"><option value="Tire">Tire</option><option value="Track">Track</option></select></span></div></div></li>  <li class="item-content item-input"><div class="item-inner"><div class="item-title">Tonnage (kg)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTonnage"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Engine Power (kw)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductEnginePower"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Dig Depth (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductDigDepth"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Reaching Distance (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductReachingDistance"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Max Arm Lift (mm)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductMaxArmLift"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Tearing Force (kN)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTearingForce"/></span></div></div></li>');
        	break;
        	case 'TIR':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Truck Type</div><div class="item-after"><span class="inputTitle"><select name="newProductTruckType" id="newProductTruckType"><option value="Flatbed">Flatbed</option><option value="Standard">Standard</option><option value="Dumper">Dumper</option><option value="Standard Dumper">Standard Dumper</option><option value="Jumbo">Jumbo</option><option value="Optima">Optima</option><option value="Maxima">Maxima</option><option value="Trailer">Trailer</option></select></span></div></div></li>  <li class="item-content item-input"><div class="item-inner"><div class="item-title">Tonnage (kg)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTonnage"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Engine Power (kw)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductEnginePower"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Axle Count</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductAxleCount"/></span></div></div></li>');
        	break; 
        	case 'Vinç':
        	$("ul#secondPart").html('<li class="item-content item-input"><div class="item-inner"><div class="item-title">Crane Type</div><div class="item-after"><span class="inputTitle"><select name="newProductCraneType" id="newProductCraneType"><option value="Mobile Crane">Mobile Crane</option><option value="Telescopic Crane">Telescopic Crane</option><option value="Breakdown Crane">Breakdown Crane</option><option value="Tower Crane">Tower Crane</option></select></span></div></div></li>  <li class="item-content item-input"><div class="item-inner"><div class="item-title">Tonnage (kg)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductTonnage"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Boom Length (m)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductBoomLength"/></span></div></div></li><li class="item-content item-input"><div class="item-inner"><div class="item-title">Lifting Capacity (kg)</div><div class="item-after"><span class="inputTitle"><input class="cFormsInput" type="text" id="newProductLiftingCapacity"/></span></div></div></li>');
        	break;    	       	        	        	
        }
        }
		});
}

//Submit New Listing
function submitNewListing () {
//Common fields
var newProductTitle = $("input#newProductTitle").val();
var newlistingStatus = $("#listingStatus :selected").val();
var newProductPrice = $("input#newProductPrice").val();
var newProductAddress = $("input#newProductAddress").val();
var newProductDetails = $("textarea#newProductDetails").val();
var newlistingCategory = $("#newlistingCategory :selected").val();
var listingCondition = $("#listingCondition :selected").val();
var newProductModelYear = $("input#newProductModelYear").val();
var newProductKilometers = $("input#newProductKilometers").val();
var newProductEngineHours = $("input#newProductEngineHours").val();
var newProductFuelType = $("#newProductFuelType :selected").val();
var newProductColor = $("input#newProductColor").val();
//var userToken = localStorage.userToken;


//Lorry specific fields




var userToken = "c181985a387715be95d5da0a0bb13d11";
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"";

switch (newlistingCategory) {

case 'Forklift':
//Forklift specific fields
var newProductTonnage = $("input#newProductTonnage").val();
var newProductWheelCount = $("#newProductWheelCount :selected").val();
var newProductFreeLift = $("#newProductFreeLift :selected").val();
var newProductHorizontalLift = $("#newProductHorizontalLift :selected").val();
var newProductLiftingHeight = $("input#newProductLiftingHeight").val();
var newProductTurning = $("input#newProductTurning").val();
var newProductClimbing = $("input#newProductClimbing").val();
var newProductDailyShift = $("#newProductDailyShift :selected").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_119="+newProductTonnage+"&input_121="+newProductWheelCount+"&input_120="+newProductWheelType+"&input_122="+newProductFreeLift+"&input_123="+newProductHorizontalLift+"&input_124="+newProductLiftingHeight+"&input_125="+newProductTurning+"&input_126="+newProductClimbing+"&input_127="+newProductDailyShift+"";
break;
case 'Bobcat':
//Bobcat specific fields
var newProductMovement = $("#newProductMovement :selected").val();
var newProductEnginePower = $("input#newProductEnginePower").val();
var newProductWorkingLoad = $("input#newProductWorkingLoad").val();
var newProductPumpCapacity = $("input#newProductPumpCapacity").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_119="+newProductMovement+"&input_121="+newProductEnginePower+"&input_120="+newProductWorkingLoad+"&input_122="+newProductPumpCapacity+"";
break;
case 'Yükleyici':
//Loader specific fields
var newProductMovement = $("#newProductMovement :selected").val();
var newProductTonnage = $("input#newProductTonnage").val();
var newProductEnginePower = $("input#newProductEnginePower").val();
var newProductLiftingCapacity = $("input#newProductLiftingCapacity").val();
var newProductDigDepth = $("input#newProductDigDepth").val();
var RechingDistance = $("input#RechingDistance").val();
var newProductMaxArmLift = $("input#newProductMaxArmLift").val();
var newProductMaxBucketLift = $("input#newProductMaxBucketLift").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_133="+newProductMovement+"&input_134="+newProductTonnage+"&input_135="+newProductEnginePower+"&input_130="+newProductLiftingCapacity+"&input_136="+newProductDigDepth+"&input_137="+RechingDistance+"&input_138="+newProductMaxArmLift+"&input_139="+newProductMaxBucketLift+"";
break;
case 'Kamyon':
//Lorry specific fields
var newProductLorryType = $("#newProductLorryType :selected").val();
var newProductTonnage = $("input#newProductTonnage").val();
var newProductEnginePower = $("input#newProductEnginePower").val();
var newProductTonnage = $("input#newProductAxleCount").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_157="+newProductLorryType+"&input_158="+newProductTonnage+"&input_159="+newProductEnginePower+"&input_160="+newProductAxleCount+"";
break;
case 'Dozer':
//Dozer specific fields
var newProductMovement = $("#newProductMovement :selected").val();
var newProductDozerKnife = $("#newProductDozerKnife :selected").val();
var newProductTransfer = $("#newProductTransfer :selected").val();
var newProductEnginePower = $("input#newProductEnginePower").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_149="+newProductLorryType+"&input_150="+newProductDozerKnife+"&input_151="+newProductEnginePower+"&input_152="+newProductEnginePower+"";
break;
case 'Greyder':
//Grader specific fields
var newProductChassisType = $("#newProductChassisType :selected").val();
var newProductControlSystem = $("#newProductControlSystem :selected").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_154="+newProductChassisType+"&input_155="+newProductControlSystem+"";
break;
case 'Ekskavatör':
//Excavator specific fields
var newProductMovementType = $("#newProductMovementType :selected").val();
var newProductTonnage = $("input#newProductTonnage").val();
var newProductEnginePower = $("input#newProductEnginePower").val();
var newProductEnginePower = $("input#newProductDigDepth").val();
var newProductReachingDistance = $("input#newProductReachingDistance").val();
var newProductMaxArmLift = $("input#newProductMaxArmLift").val();
var newProductEnginePower = $("input#newProductTearingForce").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_141="+newProductMovementType+"&input_142="+newProductTonnage+"&input_143="+newProductEnginePower+"&input_144="+newProductDigDepth+"&input_145="+newProductReachingDistance+"&input_146="+newProductMaxArmLift+"&input_147="+newProductTearingForce+"";
break;
case 'TIR':
//TIR specific fields
var newProductTruckType = $("#newProductTruckType :selected").val();
var newProductTonnage = $("input#newProductTonnage").val();
var newProductEnginePower = $("input#newProductEnginePower").val();
var newProductAxleCount = $("input#newProductAxleCount").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_162="+newProductTruckType+"&input_163="+newProductTonnage+"&input_164="+newProductEnginePower+"&input_165="+newProductAxleCount+"";
break;
case 'Vinç':
//Crane specific fields
var newProductCraneType = $("#newProductCraneType :selected").val();
var newProductTonnage = $("input#newProductTonnage").val();
var newProductBoomLength = $("input#newProductBoomLength").val();
var newProductLiftingCapacity = $("input#newProductLiftingCapacity").val();
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"&input_167="+newProductTruckType+"&input_168="+newProductTonnage+"&input_169="+newProductBoomLength+"&input_170="+newProductLiftingCapacity+"";
break;
}

//var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+newProductAddress+"&input_title="+newProductTitle+"&input_4="+newlistingStatus+"&input_2="+newlistingCategory+"&input_description="+newProductDetails+"&input_86="+listingCondition+"&input_81="+newProductModelYear+"&input_82="+newProductKilometers+"&input_89="+newProductEngineHours+"&input_83="+newProductFuelType+"&input_87="+newProductColor+"&input_36="+newProductPrice+"";
    	$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        console.log(data);
        if (data.token_available == false) {
		$("p#submitReport").html("please log in first");
        } else {
		$("p#submitReport").append("OK, u logged in");        
        }
        if (data.success == false) {
   		$("p#submitReport").append(data.message);        
        } 
        else {
        $(".formSendButton").hide();
        $("p#submitReport").html("");
   		$("p#submitReport").append("<p>Submitted</p>"); 
   		$("p#submitReport").append("<p>Would you like to add pictures?</p>"); 
   		$("p#submitReport").append('<input type="file"  name="new-image" id="new-image"><a href="#" class="button upload-image">Upload</a>'); 
   		$("p#submitReport").append("<p><input id='file_lectura' readonly type='text' accept='image/*;capture=camera' placeholder=''/> </p>");
   		$("p#submitReport").append("<p id='vario'></p>");
   		$("p#submitReport").append("<p><br /></p>");
        }
		}
		});

$(document).on('change', '#new-image', function() 
{
    //focus
    $('#file_lectura').focus();

    //show value file
    $('#file_lectura').val(this.value);
    $('#vario').append("<img src='"+this.value+"' />");
});

}