// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app  = new Framework7({
  root: '#app', // App root element
  id: 'com.kiralikotopark', // App bundle ID
  name: 'Kiralık Otopark', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: '',
        lastName: '',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  cache: true,
  preloadPreviousPage: false,
  iosSwipeBack: false
});


//Login popup
var loginPopup = app.popup.create({
  backdrop : true,
  closeByBackdropClick : false,
  animate : true,
  content : '<div class="popup popup-login"><p><a style="margin-left:5%;margin-top:5%;"  onclick="javascript:wontLogin();">Vazgeç</a></p><div class="loginWarning"><p class="fading">Kullanıcı girişi yapmalısınız</p></div><form><div class="list margin-bottom-30 samosa"><ul class="no-border"><li><div class="item-content"><div class="input-icon item-media"><i class="flaticon-email"></i></div><div class="item-inner no-margin"><div class="item-input" style="width:100%"><input type="email" class="text-thiny" placeholder="E-posta" id="loginusername"  style="width:100%"></div></div></div></li><li><div class="item-content"><div class="input-icon item-media"><i class="flaticon-key"></i></div><div class="item-inner no-margin"><div class="item-input" style="width:100%"><input type="password" style="width:100%" class="text-thiny" placeholder="Şifre" id="loginuserpass"></div></div></div></li></ul><a href="/remember-password/" class="text-underline text-extrat-thiny gray-text" style="margin-left:5%;line-height:45px;">Şifrenizi mi unuttunuz?</a></div><div class="row btn-form-group margin-bottom-10" style="text-align:center"><a href="javascript:login();" class="button button-fill color-black text-thiny" id="loginbutton" style="height:40px;width:90%;margin-bottom:5px;margin-left: 5%;line-height: 40px;text-transform:none;">Giriş Yap</a><a href="#" class="button button-fill color-facebook text-thiny" style="height:40px;width:90%;margin-left: 5%;line-height: 40px; text-transform:none;">Facebook</a></div><div class="text-center margin-bottom-15" style=" margin-top: 3%;"><a href="#" onclick="javascript:popupRegister()" class="text-underline text-extrat-thiny gray-text" style="width:90%;margin-left:5%;">Hesabınız yok ise hemen kayıt olabilirsiniz</a></div></form></div>',
  // Events
  on: {
    open: function (popup) {
    //console.log('Popup open');
    },
    opened: function (popup) {
    //console.log('Popup close');
    },
  }
});


//No photo upload
function noPhoto () {
    imagePopup.close();
    app.router.navigate("/");
}

//Image upload popup
var imagePopup = app.popup.create({
    
    //Old Content 
    
    /*
  content: '<div class="popup"><div class="block"><p>İlanınız eklendi.</p><p>Fotoğraf eklemek ister misiniz?</p><input type="file"  name="files[]h" id="new-image" multiple><a onclick="javascript:uploadFiles(153)"href="#" class="button upload-image">Yükle</a><p><input id="file_lectura" readonly type="text" accept="image/*;capture=camera" placeholder=""/> </p><p id="vario"></p><p><br /></p><a href="#" onclick="javascript:submitNewListing('+localStorage.getItem("newListingId")+');"class="formImageSendButton">İlanı Kaydet</a><a onclick="javascript:noPhoto();">Fotoğraf eklemek istemiyorum</a></div></div>',
    */
    
    //New Content https://makitweb.com/how-to-upload-image-file-using-ajax-and-jquery/
    content: '<div class="popup"><div class="container"><form method="post" action="" enctype="multipart/form-data" id="myform"><div class="preview"><img src="" id="img" width="100" height="100"></div>     <div >          <input type="file" id="file" name="file" />            <input type="button" class="button" value="Upload" id="but_upload">        </div>    </form></div><a onclick="javascript:noPhoto();">Fotoğraf eklemek istemiyorum</a></div></div>',
    
    
    
  // Events
  on: {
    open: function (popup) {
        alert(localStorage.getItem("newListingId"));
      console.log('Popup open');
    },
    opened: function (popup) {
      console.log('Popup opened');
    },
  }
});
// Events also can be assigned on instance later
imagePopup.on('close', function (popup) {
  console.log('Popup close');
});
imagePopup.on('closed', function (popup) {
  console.log('Popup closed');
});

// Open dynamic popup
$$('.dynamic-popup').on('click', function () {
  imagePopup.open();
});



var detailedSearch = app.popup.create({
  backdrop : true,
  closeByBackdropClick : false,
  animate : true,
  on: {
    open: function (popup) {
      //console.log('Popup open');
    },
    opened: function (popup) {
      //console.log('Popup close');
    },
  }
});

//Short Text Counter
function hundred() {
    var text_max = 140;
    $('#nPShortDesc_feedback').html(text_max + ' karakter kaldı');
    $('#nPShortDesc').keyup(function() {
        var text_length = $('#nPShortDesc').val().length;
        var text_remaining = text_max - text_length;

        $('#nPShortDesc_feedback').html(text_remaining + ' karakter kaldı');
    });
}

//Login check
function logChk(f) {
if (localStorage.getItem("token") === null) {
loginPopup.open();
} 
else {
	// check if the token is valid
var username = localStorage.user;
var path = (location.pathname);
    var tokeni = localStorage.token;
    var url = "https://www.kiralikotopark.com/index.php/tokenapi/user/?token="+tokeni;
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        success: function(data){
		var boolchecker = data.token_available;
		if (boolchecker === true) {
		} else {
	    app.dialog.confirm('Güvenlik anahtarınızın süresi dolmuş. Lütfen tekrar giriş yapın.', function () {
    	app.router.navigate('/login/');
  		},
  		function () {
		app.router.navigate('/');
		}
  		);
		}
		}       
    });
}
}

//Register link clicked from popup login window
function popupRegister() {
loginPopup.close();
app.router.navigate("/register/", {
pushState: false
});
}

//Login
function login(){
    $("#loginbutton").text("kontrol ediliyor...");
    var email= $.trim($("#loginusername").val());
    var password= $.trim($("#loginuserpass").val());
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
            $("#loginbutton").text("Giriş başarılı");
            localStorage.token = data.token;
            localStorage.email = email;
            localStorage.user = data.user_data.name_surname;
            loginPopup.close();
			app.router.back({
                    force: true//,
            //        ignoreCache: true
                })
                
                					
            }
            else {
                console.log(data);
                $("#loginbutton").text("Giriş başarısız");
           }
        }        
    });
}    
      
      
//Forgot Password
function forgotPass(){
	var email = $.trim($("#inputMail").val());
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(email) == false) 
        {
            alert('Invalid Email Address');
            return false;
        }
    var url = "https://kiralikotopark.com/index.php/admin/user/forgetpassword#content";
	$.post(url, {mail: email}, function(data) {
	$("#resetbuttonn").text("İşleniyor...");
	var $div = $(data);
	var messageresult = $div.find(".label").html();
	$("#resetbuttonn").css("pointer-events","none");
	$("#resetbuttonn").text("gönderildi");
	$("#forgotmsg").text(messageresult);
	$("#resetmessage").html('<p style="text-align:center">Şifre değiştirme bağlantısı e-posta adresinize gönderildi.</p>');
	
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
		collector += "<div class=\"swiper-slide\"><img src=\"https://www.kiralikotopark.com/files/"+arry[i]+"\" class=\"slideShowImg\"></div>";
		i=i+1;
		});
		collector += "</div><div class=\"swiper-pagination\"></div></div>";
		$("#scontainer").append(collector);
		}     
    });
}

function getSlideso(){
    
		
		var collector = "<div data-pagination='{\"el\": \".swiper-pagination\"}' data-space-between=\"0\" class=\"swiper-container swiper-init loop\"><div class=\"swiper-wrapper\" id=\"mainsliderhost\">";
		collector += "<div class=\"swiper-slide\"><img src=\"slides\\slide2.jpg\" class=\"slideShowImg\"></div>";
        collector += "</div><div class=\"swiper-pagination\"></div></div>";
		$("#scontainer").append(collector);
		}

//Get homepage news
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
        localStorage.setItem("globalNewsArray", JSON.stringify(data));
		collector = "";
		var a = "";
		var m = "";
		for(i=0; i<data.length/4;i++){
			m = i+4;
			collector += '<ul><li><a onclick="getFullTextHome('+i+');" href="#" class="item-link item-content"><div class="item-media">';
			collector += '<img src="https://kiralikotopark.com/files/'+data[m]+'" width="80" height="32"></div><div class="item-inner"><div class="item-title-row">';
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
var globalNewsArray = JSON.parse(localStorage.getItem("globalNewsArray"));
localStorage.newsPic = globalNewsArray[c];
localStorage.newsTitle = globalNewsArray[a];
localStorage.newsBody = globalNewsArray[b];

mainView.router.navigate('/blog-read/')
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

$('#block-title').html(localStorage.newsTitle);
$('.block-title').css({"white-space":"unset","overflow":"visible"});
$('.blog-read-html').css("background-image", "url('https://kiralikotopark.com/files/"+localStorage.newsPic+"')");
$('.block-inner').html(localStorage.newsBody);
localStorage.removeItem("newsPic");
localStorage.removeItem("newsTitle");
localStorage.removeItem("newsBody");
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
        var resultcount = data.total_results;
        var collector = "";
        $("#frontlisting").html("");
        for (i = 0; i < resultcount; i++) { 
        if (data.results[i].listing.image_filename == null){
        data.results[i].listing.image_filename = "no_image.jpg";
        }
        collector += '<li><a onclick="passProductID('+data.results[i].listing.id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+data.results[i].listing.image_filename+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+data.results[i].listing.json_object.field_10+'</div><div class="item-after"></div></div><div class="item-subtitle">'+data.results[i].listing.json_object.field_4+'</div><div class="item-text">'+data.results[i].listing.field_37_int+' TL / ay</div></div></a></li>';
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
mainView.router.navigate('/product-single/')
}

//Display full product info
function displayProduct() {
var propertyID = localStorage.propertyID;
var lang = "2";
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getSinglePropertyData&propertyID="+localStorage.propertyID+"&language="+lang;
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
		for (var q = 0; q<arry.length; q++) {
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
        if (images == null) {
        $(".restaurant-img").html("<img src='https://www.kiralikotopark.com/files/no_image.jpg' alt='fotoğrafsız' />");
        } 
            else {
		images = images.substring(1, images.length - 1);
		images = images.replace(/"/g,'');
		images = images.split(',');
		var collector = "<div data-pagination='{\"el\": \".swiper-pagination\"}' data-space-between=\"0\" class=\"swiper-container swiper-init loop\"><div class=\"swiper-wrapper\" id=\"mainsliderhost\">";
		var i = 0;
		$.each(images, function(){
		collector += "<div class=\"swiper-slide\"><img src=\"https://www.kiralikotopark.com/files/"+images[i]+"\" class=\"productSlideShowImg\"></div>";
		i=i+1;
		});
		collector += "</div><div class=\"swiper-pagination\"></div></div>";
		$(".restaurant-img").html(collector);
        }
		
            
            
        var reArray = [];
		//Display property general info
        var preinfo = '';
		var propgeninfo = '<ul class="listingul"><li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">İlan Numarası</div><div class="item-after link-deeporange">'+propertyID+'</div></div></div></li>';
		var longdescription = "<p style='text-align:justify !important'>";
         
            
            
        if (exclude.includes(r)) {} else {
            
            
            
        var one = w.indexOf("İlan Tipi");
            if(w[one] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[one]+'</div><div class="item-after link-deeporange">'+arry[one]+'</div></div></div></li>'; }
        
        
        var two = w.indexOf("İlan Sahibi");   
            if(w[two] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[two]+'</div><div class="item-after link-deeporange">'+arry[two]+'</div></div></div></li>'; }
        
        
        var three = w.indexOf("Otopark Tipi");   
            if(w[three] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[three]+'</div><div class="item-after link-deeporange">'+arry[three]+'</div></div></div></li>'; }
        
        
        var four = w.indexOf("Park Alanı Boyutu");   
            if(w[four] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[four]+'</div><div class="item-after link-deeporange">'+arry[four]+'</div></div></div></li>'; }
        
        
        var five = w.indexOf("Araç Kapasitesi");   
            if(w[five] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[five]+'</div><div class="item-after link-deeporange">'+arry[five]+'</div></div></div></li>'; }
        
        
        var six = w.indexOf("Kapı");   
            if(w[six] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[six]+'</div><div class="item-after link-deeporange">'+arry[six]+'</div></div></div></li>'; }
            
            
        var seven = w.indexOf("Güvenlik");   
            if(w[seven] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[seven]+'</div><div class="item-after link-deeporange">Evet</div></div></div></li>'; }
            
            
        var eight = w.indexOf("Engelli otoparkı");   
            if(w[eight] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[eight]+'</div><div class="item-after link-deeporange">Evet</div></div></div></li>'; }
            
            
        var nine = w.indexOf("Asansör");   
            if(w[nine] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[nine]+'</div><div class="item-after link-deeporange">Evet</div></div></div></li>';  }
            
            
        var ten = w.indexOf("Elektrik");   
            if(w[ten] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[ten]+'</div><div class="item-after link-deeporange">Evet</div></div></div></li>'; }
        
            
        var eleven = w.indexOf("Isıtma");  
            if(w[eleven] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[eleven]+'</div><div class="item-after link-deeporange">Evet</div></div></div></li>'; }
        
            
        var twelve = w.indexOf("Aylık Kira");   
            if(w[twelve] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[twelve]+'</div><div class="item-after link-deeporange">'+arry[twelve]+' TL</div></div></div></li>';  }
            
        
        var thirteen = w.indexOf("Yıllık Kira");   
            if(w[thirteen] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[thirteen]+'</div><div class="item-after link-deeporange">'+arry[thirteen]+' TL</div></div></div></li>'; }
        
        }
            
            
            
        for (var r = 0; r<arry.length; r++) { 
		
		if (r == 3) { preinfo = arry[r]; } else {
		
		
		}
        }
		propgeninfo += '</ul>'
        longdescription += details[17];
		longdescription += '</p>'
		$("#preinfo").html(preinfo);
		$("#t1").html(propgeninfo);
		$("#t2").html(longdescription);
		$("#t3").html('<script>function initMap() {  var uluru = {lat: '+coordinates[0]+', lng: '+coordinates[1]+'};  var map = new google.maps.Map(document.getElementById("map"), {zoom: 17, center: uluru});  var marker = new google.maps.Marker({position: uluru, map: map}); } </script>   <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiBBcAFK3mcRZPcE_rgzN9TKEowrsonXg&callback=initMap"> </script>');		
		
		}
});
    checkFav();
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
        collector += '<li class="item-content item-input"><div class="item-inner"><a onclick="javascript:storeMachine('+i+');" href="#" style="text-decoration:none;color:black;"><div class="item-title"><span class="badge">✓   </span>  '  +  reslt[i]+'</div></a></div></li>';
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
mainView.router.navigate('/machinecatlisting/');
}

//Get all machines under chosen category
function getAllMachines(){
	var lang = "2";
	var collector = "";
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getCatMachines&mtype="+localStorage.machinestoList+"&language="+lang;
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
        if (details[36] != "") {
        var price = details[36];
        } else {
        var price = details[37];
        }
        var picUrl = data[i].image_filename;
        if (picUrl == null) {
            picUrl = "no-image.jpg";
        }
        collector += '<li><a onclick="passProductID('+data[i].property_id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+picUrl+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+details[10]+'</div><div class="item-after"></div></div><div class="item-subtitle">'+details[83]+','+details[81]+' model</div><div class="item-text">'+price+' TL</div></div></a></li>';
        }
        collector += '</ul>';
        $("#machine-cat-listing").html(collector);
        }
});
}


//Submit New Listing
function submitNewListing() {
//Common fields

var nPCat = $("#newlistingCategory :selected").val();
var nPStatus = $("#listingStatus :selected").val();
var nPTitle = $("input#newProductTitle").val();
var nPAddress = $("input#newProductAddress").val();
var nPShortDesc = $("textarea#nPShortDesc").val();
var nPLongDesc = $("textarea#nPLongDesc").val();
var listingOwner = $("#listingOwner :selected").val();
var nPType = $("#nPType :selected").val();
var door = $("#door :selected").val();
var vehicleCapacity = $("#vehicleCapacity :selected").val();
var vehicleSize = $("#vehicleSize :selected").val();
var asansor = $("#asansor").val();
var elektrik = $("#elektrik").val();
var isitma = $("#isitma").val();
var guvenlik = $("#guvenlik").val();
var engelli = $("#engelli").val();
var aylikKira = $("input#aylikKira").val();
var yillikKira = $("input#yillikKira").val();
var userToken = localStorage.token;

var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+nPAddress+"&input_title="+nPTitle+"&input_description="+nPShortDesc+"&input_79="+nPCat+"&input_4=Kiralık&input_17="+nPLongDesc+"&input_54="+listingOwner+"&input_2="+nPType+"&input_106="+door+"&input_108="+vehicleCapacity+"&input_30="+asansor+"&input_3="+vehicleSize+"&input_11="+elektrik+"&input_33="+isitma+"&input_28="+guvenlik+"&input_29="+engelli+"&input_37="+aylikKira+"&input_55="+yillikKira+"";

    	$.ajax({
        type: "post",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
            alert(data.message);
        if (data.message == '"Please populate all fields!"') {
            $("p#submitReport").append("<p>Lütfen tüm alanları, eksiksiz doldurunuz</p>");
            return 0;
        }
            localStorage.setItem('newListingId', data.estate.id);
        if (data.token_available == false) {
		$("p#submitReport").html("Lütfen önce kullanıcı girişi yapın");
        } else {
		$("p#submitReport").append("Başarıyla giriş yaptınız");        
        }
        if (data.success == false) {
   		$("p#submitReport").append(data.message);        
        } 
        else {
        $(".formSendButton").hide();
        scroll(0,0);
        imagePopup.open();
        }
		}
		});

$(document).on('change', '#new-image', function() 
{
    //focus
    $('#file_lectura').focus();

    //show value file
    $('#file_lectura').val(this.value);
});

}

//File upload function - INCOMPLETE
function uploadFiles(f) {
    alert(f);
	var x = document.getElementById("new-image").files;
	var u = "&property_id="+f+"";
	submitNewListing(u);
}

//Menu Greeting Function
function getUserData() {
if (localStorage.getItem("token") === null) {
$("#userGreeting").html("Merhaba, sayın ziyaretçi");
$("#loginText").html("<a href='/login/' class='panel-close no-animation' style='color:black;'>Giriş</a> / <a href='/register/' class='panel-close no-animation' style='color:black;'>Kayıt</a></a>");
} else {
$("#userGreeting").html("Merhaba, sayın "+localStorage.user+"");
$("#loginText").html("<p><a href='/profile/' class='panel-close no-animation' style='color:black;'>Profiliniz</a> / <a href='#' onclick='logoutUser();' class='panel-close no-animation' style='color:black;'>Çıkış</a></p>");
}
}

//Logout function
function logoutUser(){
if (typeof localStorage.getItem("user") !== 'undefined' && localStorage.getItem("user") !== null) {
localStorage.removeItem("user");
}
if (typeof localStorage.getItem("email") !== 'undefined' && localStorage.getItem("email") !== null) {
localStorage.removeItem("email");
}
if (typeof localStorage.getItem("token") !== 'undefined' && localStorage.getItem("token") !== null) {
localStorage.removeItem("token");
}
$("#miniavatardiv").html('<img class="menuavatar" src="../img/default-avatar.png" alt="Profil Fotoğrafı" width="80" height="80">');
app.router.navigate('/', {
  ignoreCache: true,
  reloadCurrent: true  
});
}

//Populate user profile
function profileLoginCheck () {
if (localStorage.getItem("token") === null) {
loginPopup.open();
} 
else {
	// check if the token is valid
var username = localStorage.user;
var path = (location.pathname);
    var tokeni = localStorage.token;
    var url = "https://www.kiralikotopark.com/index.php/tokenapi/user/?token="+tokeni;
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        success: function(data){
		var boolchecker = data.token_available;
		if (boolchecker === true) {
		if (typeof data.results.image_user_filename !== 'undefined' && data.results.image_user_filename !== null) {
		$('#profileHeaderPic').html('<img class="profilePic" src="https://kiralikotopark.com/files/'+data.results.image_user_filename+'" alt="'+data.results.name_surname+'" width="120" height="120">');}
		else {
		$('#profileHeaderPic').html('<img class="profilePic" src="../img/default-avatar.png" alt="user" width="120" height="120">');}
		$('#inputNameSurname').val(data.results.name_surname);
		$('#inputUsername').val(data.results.username);
		$('#userAddress').val(data.results.address);
		$('#userBio').val(data.results.description);
		$('#inputPhone').val(data.results.phone);
		$('#inputEmail').val(data.results.mail);
		} else {
	    app.dialog.confirm('Güvenlik anahtarınızın süresi dolmuş. Lütfen tekrar giriş yapın.', function () {
    	app.router.navigate('/login/');
  		},
  		function () {
		app.router.navigate('/');
		}
  		);
		}
		}       
    });
}
}

//Get user avatar for menu
function getUserMiniAvatar() {
if (localStorage.email != undefined) {
var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getUserMiniAvatar&user="+localStorage.email;
var userminiavatar;
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        success: function(data){
		if(data.image_user_filename == null) {
		$("#miniavatardiv").html('<img class="menuavatar" src="../img/default-avatar.png" alt="Profil Fotoğrafı" width="80" height="80">');
        } else {
        $("#miniavatardiv").html('<img class="menuavatar" src="https://kiralikotopark.com/files/thumbnail/'+data[0].image_user_filename+'" alt="Profil Fotoğrafı" width="80" height="80">');
        }		
        }
        });
}
else {
$("#miniavatardiv").html('<img class="menuavatar" src="../img/default-avatar.png" alt="Profil Fotoğrafı" width="80" height="80">');
}
}


//Update user profile
function updateProfile () {
$('#profileUpdateMessage').html('');
var url = "https://www.kiralikotopark.com/mobile-functions.php?action=updateUserData&token="+localStorage.token+"&name_surname="+$('#inputNameSurname').val()+"&input_address="+$('#userAddress').val()+"&username="+$('#inputUsername').val()+"&userbio="+$('#userBio').val()+"&phone="+$('#inputPhone').val()+"&useremail="+$('#inputEmail').val()+"";
	$.ajax({
        type: "post",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        $('#profileUpdateMessage').html('<p>Profiliniz başarıyla güncellendi.</p>');
		}
	});
	}

//Log every search criteria
function recordSearch(s) {
//
}

//Search results page search function
function searchResultsSearch(){
    var s = document.getElementById("searchResultsSearchKeyword").value;
    searchBox(s);
}

//Search Box Function
function searchBox(s){
app.panel.close();

localStorage.searchKeyword = s;
if (app.views.main.router.url == "/searchresults/") {
self.app.router.navigate(app.views.main.router.url, {reloadCurrent: true});    
} else {
app.router.navigate('/searchresults/', { replace: true, force: true });
}
}

function doSearch(s){
$("#searchResultsSearchKeyword").val(s);    
$("#seachResutlsDiv").html("<p></p>");    
var collector = "";
var machineType = "";    
var machineStatus = "";    
var priceMin = 0;    
var priceMax = 999999999999;
    
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=detailedSearch&machineType="+machineType+"&machineStatus="+machineStatus+"&priceMin="+priceMin+"&priceMax="+priceMax+"&keyword="+s;
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
        if(! details) {
        $("#seachResutlsDiv").html("<p style='text-align:center; width:100%'>Sonuç hiç bulunamadı.</p>");
        return 0;
        }
        details = details.replace(/field_/g,'');
        details = $.parseJSON(details);	
        var imgUrl = data[i].image_filename;
        if (imgUrl == null) {
            imgUrl = "strict_cache/380x250no_image.jpg";
        }
        collector += '<li class="searchResultsListing"><a onclick="passProductID('+data[i].property_id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+imgUrl+'" width="80"></div><div class="item-data listingitemdata"><div class="item-title-detail searchResultListingTitle">'+details[10]+'</div><div class="searchResultListingPrice">'+data[i].field_37_int+' TL</div><div class="">'+details[2]+', '+details[106]+'</div></div></a></li>';
        }
        
        collector += '</ul>';
        var serpil = document.getElementById('seachResutlsDiv');
        $("#seachResutlsDiv").html(collector);
        }
});
}


//Do detailed search 
function doSearchDetail(){
$("#seachResutlsDiv").html("<p></p>");    
var collector = "";

var machineType = $('#newlistingCategory').val();    
var machineStatus = $('#element_4').val();    
var priceMin = $('#fiyatMin').val();    
var priceMax = $('#fiyatMax').val();
    
        switch (machineStatus) {
            case "0":
                machineStatus = "";
                break;
            case "1":
                machineStatus = "Açık";
                break;
            case "2":
                machineStatus = "Üstü Kapalı";
                break;
            case "3":
                machineStatus = "Kapalı";
                break;
        }
    
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=detailedSearch&machineType="+machineType+"&machineStatus="+machineStatus+"&priceMin="+priceMin+"&priceMax="+priceMax;
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
        if(! details) {
            $("#seachResutlsDiv").html("<p style='text-align:center; width:100%'>Sonuç hiç bulunamadı.</p>");
            return 0;
        }
        details = details.replace(/field_/g,'');
        details = $.parseJSON(details);	
        if (details[37] != "") {
        var price = details[37];
        } else {
        var price = details[37];
        }
        var imgUrl = data[i].image_filename;
        if (imgUrl == null) {
            imgUrl = "strict_cache/380x250no_image.jpg";
        }
        collector += '<li class="searchResultsListing"><a onclick="passProductID('+data[i].property_id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+imgUrl+'" width="80"></div><div class="item-data listingitemdata"><div class="item-title-detail searchResultListingTitle">'+details[10]+'</div><div class="searchResultListingPrice">'+price+' TL</div><div class="">'+details[83]+','+details[81]+' model</div></div></a></li>';
        }
        
        collector += '</ul>';
        var serpil = document.getElementById('seachResutlsDiv');
        $("#seachResutlsDiv").html(collector);
        }
});
}

function doInquiry(s){
var collector = "";
var whichProduct = localStorage.propertyID;
fetch('https://kiralikotopark.com/index.php/property/'+ whichProduct +'/tr/')
    .then(
    function(response) {
        // When the page is loaded convert it to text
        return response.text()
    })
    .then(function(html) {
        // Initialize the DOM parser
        var parser = new DOMParser();
        // Parse the text
        var doc = parser.parseFromString(html, "text/html");
        // You can now even select part of that html as you would in the regular DOM 
        // Example:
        var docArticle = doc.querySelector('#form').innerHTML;
        
        $('#inqContent').append(docArticle);
        $("input.hidden").css("display","none");
        $("div.panel-heading").html("<h2>İletişim Formu</h2><p style='text-align:center;margin-left:10%;margin-right:10%;'>Lütfen tüm alanları eksiksiz doldurduğunuzdan emin olunuz.</p><p id='messageDisplay' style='margin-left:10%;margin-right:10%;font-weight:bold;color:red;'></p>");
        $("h2").css("text-align","center");
        $("input.form-control").css({"line-height":"24px","font-size":"16px","margin":"5%","border-bottom":"1px dotted black","padding-left":"10px","width":"90%"});
        $("textarea#message").css({"height":"6em","font-size":"16px","margin":"5%","border-bottom":"1px dotted black","padding-left":"10px","width":"90%"});
        $('img').css("margin-left","15%");
        $('button').css({"height":"3em","width":"60%","margin-left":"20%","margin-top":"5%","background-color":"#f1c40f","color":"white","font-weight":"bold","font-size":"1.1em"});
//        $('#inqContent').append("<input type='button' value='hele' onclick='javascript:sendInquiryForm()'/>");
        sendInquiryForm();
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
    
}

//Send Inquiry Form
function sendInquiryForm() {
    var selim = document.getElementById("inqForm");
    selim.onsubmit = function (){
    event.preventDefault();
    $.ajax({
      url: $('#inqForm').attr('action'),
      type: 'POST',
      data : $('#inqForm').serialize(),
      success: function(data){
        var parser = new DOMParser();
        // Parse the text
        var doc = parser.parseFromString(data, "text/html");
        var docArti = doc.querySelector('.alert');
          if (docArti == null) {
              $('#messageDisplay').css({'color':'green','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Mesajınız İletildi.</p>');
              $('#firstname').val('');
              $('#email').val('');
              $('#phone').val('');
              $('#datetimepicker1').val('');
              $('#datetimepicker2').val('');
              $('#address').val('');
              $('#message').val('');
              $('.captcha').val('');
          } else {
          var docArticle = docArti.innerHTML;
          $('#messageDisplay').html(docArticle);
              }
      }
    });
    return false;

 };   
//    localStorage.removeItem("localStorage.productID");

};

//List Favorites
function getFavs(){
        var loginString = "token="+localStorage.token+"&lang_code='tr'";
        var url = "https://www.kiralikotopark.com/index.php/tokenapi/favorites/?"+loginString;
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
                if (data.results.length > 0 ) {
        var resultcount = data.results.length;
        var collector = "";
        for (i = 0; i < resultcount; i++) { 
        if (data.results[i].listing.image_filename == null){
        data.results[i].listing.image_filename = "no_image.jpg";
        }
        collector += '<li><a onclick="passProductID('+data.results[i].listing.id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+data.results[i].listing.image_filename+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+data.results[i].listing.json_object.field_10+'</div><div class="item-after"></div></div><div class="item-subtitle">'+data.results[i].listing.json_object.field_83+', '+data.results[i].listing.json_object.field_81+' model</div><div class="item-text">'+data.results[i].listing.field_36_int+' TL</div></div></a></li>';
        }
        $("#favsContainer").html('<ul>'+collector+'</ul>');        
                } else {
                    $("#favsContainer").html("<p>Favori ilanınız bulunmuyor</p>");
                }
                
            }
            else {
                $("#favsContainer").html(data);
           }
        }        
    });
} 

//Add Favorites
function addFav(w){
    logChk();
        var loginString = "token="+localStorage.token+"&lang_code='tr'&property_id="+w;
        var url = "https://www.kiralikotopark.com/index.php/tokenapi/favorites/POST/?"+loginString;
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        data: loginString,
        async: false,
        success: function(data){
        $("#msgFavBtnDiv").html('<a href="/inquire/" class="button button-fill color-deeporange text-extrat-thiny twins">Mesaj Gönder</a>  <a onclick="javascript:remFav('+localStorage.propertyID+');" class="button button-fill color-deeporange text-extrat-thiny twins" id="favButtonBey">Favori Listenizde</a>');
        }        
    });
} 

//Remove Favorites
function remFav(w){
    logChk();
        var loginString = "token="+localStorage.token+"&lang_code='tr'&property_id="+w;
        var url = "https://www.kiralikotopark.com/index.php/tokenapi/favorites/DELETE/?"+loginString;
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        data: loginString,
        async: false,
        success: function(data){
        $("#msgFavBtnDiv").html('<a href="/inquire/" class="button button-fill color-deeporange text-extrat-thiny twins">Mesaj Gönder</a>  <a onclick="javascript:addFav('+localStorage.propertyID+');" class="button button-fill color-deeporange text-extrat-thiny twins" id="favButtonBey">Favorilere Ekle</a>');
        }        
    });
} 

function getFaqs() {
var collector = "";
var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getFaqs";
$.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
   		for(var i=0;i<data.length-1;i++){
		collector += '<div class="accordion-item"><div class="accordion-item-toggle"><i class="icon icon-plus">+</i><i class="icon icon-minus">-</i><span>'+data[i].question+'</span></div><div class="accordion-item-content"><p>'+data[i].answer+'</p></div></div>';
   		}
        $('#faqscarrier').html(collector);
        }
});
$('.accordion-item-toggle').css({
    "padding": "0px 15px",
    "font-size": "17px",
    "color": "#000",
    "border-bottom": "1px solid rgba(0, 0, 0, 0.15)",
    "cursor": "pointer",
    "margin-bottom":"15px",
    "padding-bottom":"15px"});
$('i.icon-plus').css({    
	"display": "inline-block",
    "width": "22px",
    "height": "22px",
    "border": "1px solid #000",
    "border-radius": "100%",
    "line-height": "20px",
    "text-align": "center",
    "position":"fixed"});
$('i.icon-minus').css({    
	"display": "none",
    "width": "22px",
    "height": "22px",
    "border": "1px solid #000",
    "border-radius": "100%",
    "line-height": "20px",
    "text-align": "center"});
$('.accordion-item-toggle span').css({
	"display": "inline-block",
    "margin-left": "35px"});
$('.accordion-item-content p').css({
	"display": "inline-block",
    "font-size":"1.2em",
    "text-align":"justify"});
}

//Check if product exists in favs
function checkFav(g){
        var loginString = "token="+localStorage.token+"&lang_code='tr'";
        var url = "https://www.kiralikotopark.com/index.php/tokenapi/favorites/?"+loginString;
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        data: loginString,
        async: false,
        success: function(data){
            if (data.message == "Something is wrong with request") {
            $("#msgFavBtnDiv").html('<a href="/inquire/" class="button button-fill color-deeporange text-extrat-thiny twins">Mesaj Gönder</a>  <a onclick="javascript:addFav('+localStorage.propertyID+');" class="button button-fill color-deeporange text-extrat-thiny twins" id="favButtonBey">Favorilere Ekle</a>');
            } else if (data.message == "Results available") {
            var allSizes = [];
            for (i=0;i<data.results.length;i++) {
                allSizes.push(data.results[i].listing.id)
            }
            if (allSizes.includes(localStorage.propertyID) == true) {
                $("#msgFavBtnDiv").html('<a href="/inquire/" class="button button-fill color-deeporange text-extrat-thiny twins">Mesaj Gönder</a>  <a onclick="javascript:remFav('+localStorage.propertyID+');" class="button button-fill color-deeporange text-extrat-thiny twins" id="favButtonBey">Favori Listenizde</a>');
            } else {
                $("#msgFavBtnDiv").html('<a href="/inquire/" class="button button-fill color-deeporange text-extrat-thiny twins">Mesaj Gönder</a>  <a onclick="javascript:addFav('+localStorage.propertyID+');" class="button button-fill color-deeporange text-extrat-thiny twins" id="favButtonBey">Favorilere Ekle</a>');
            }
            }
            else {
            $("#msgFavBtnDiv").html('<a href="/inquire/" class="button button-fill color-deeporange text-extrat-thiny twins">Mesaj Gönder</a>  <a onclick="javascript:addFav('+localStorage.propertyID+');" class="button button-fill color-deeporange text-extrat-thiny twins" id="favButtonBey">Favorilere Ekle</a>');
            }
        }        
    });
} 

//List specific user's listings
function getUserListing() {
	var lang = "1";
	var collector = "";
    var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getUserListing&user="+localStorage.email+"&language="+lang;
    $.ajax({
        type: "POST",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
        console.log(data);
            if (data == 'no-result') {
                collector = "<p>Henüz ilanınız yok</p>";
            } else {
            
        collector = "<ul>";
        for(var i=0;i<data.length;i++){
        var details = data[i].json_object;
        details = details.replace(/field_/g,'');
        details = $.parseJSON(details);	
        if (details[36] != "") {
        var price = details[36];
        } else {
        var price = details[37];
        }
        var picUrl = data[i].image_filename;
        if (picUrl == null) {
            picUrl = "no_image.jpg";
        }
        collector += '<li><a onclick="passProductID('+data[i].property_id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+picUrl+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+details[10]+'</div><div class="item-after"></div></div><div class="item-subtitle">'+details[83]+','+details[81]+' model</div><div class="item-text">'+price+' TL</div></div></a></li>';
        }
        collector += '</ul>';
        }
        $("#machine-cat-listing").html(collector);
         }   
});
}

//Get browser locale
console.log(navigator.language);

var options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  /*
  alert('Your current position is:');
  alert(`Latitude : ${crd.latitude}`);
  alert(`Longitude: ${crd.longitude}`);
  alert(`More or less ${crd.accuracy} meters.`);
*/ 
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
    alert(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

//Won't log in
function wontLogin() {
app.preloader.show();    
app.router.navigate('/');
setTimeout(function(){
    
    app.popup.close('.popup-login');
}, 300);
app.preloader.hide();
}

$("#but_upload").click(function(){
        
        var userToken = localStorage.token;
        var fd = new FormData();
        var files = $('#file')[0].files[0];
        fd.append('file',files);
        var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+nPAddress+"&property_id="+localStorage.getItem("newListingId")+"";
    
        $.ajax({
            url: url,
            type: 'post',
            data: fd,
            crossDomain: true, 
            async: false,
            contentType: false,
            cache: false,
            processData: false,
            success: function(response){
                if(response != 0){
                    $("#img").attr("src",response); 
                    $(".preview img").show(); // Display image element
                }else{
                    alert('file not uploaded');
                }
            },
        });
    });