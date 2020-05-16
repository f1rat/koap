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
  content : '<div class="popup popup-login"><p><a style="margin-left:5%;margin-top:5%;"  onclick="javascript:wontLogin();">Vazgeç</a></p><div class="loginWarning"><p class="fading">Kullanıcı girişi yapmalısınız</p></div><form><div class="list margin-bottom-30 samosa"><ul class="no-border"><li><div class="item-content"><div class="input-icon item-media"><i class="flaticon-email"></i></div><div class="item-inner no-margin"><div class="item-input" style="width:100%"><input type="email" class="text-thiny" placeholder="E-posta" id="loginusername"  style="width:100%"></div></div></div></li><li><div class="item-content"><div class="input-icon item-media"><i class="flaticon-key"></i></div><div class="item-inner no-margin"><div class="item-input" style="width:100%"><input type="password" style="width:100%" class="text-thiny" placeholder="Şifre" id="loginuserpass"></div></div></div></li></ul><a href="/remember-password/" class="text-underline text-extrat-thiny gray-text" style="margin-left:5%;line-height:45px;">Şifrenizi mi unuttunuz?</a></div><div class="row btn-form-group margin-bottom-10" style="text-align:center"><a href="javascript:login();" class="button button-fill color-black text-thiny" id="loginbutton" style="height:50px;width:90%;margin-bottom:5px;margin-left: 5%;line-height: 40px;text-transform:none;">Giriş Yap</a><a href="#" class="button button-fill color-facebook text-thiny" style="height:50px;width:90%;margin-left: 5%;line-height: 40px; text-transform:none;">Facebook</a></div><div class="text-center margin-bottom-15" style=" margin-top: 3%;"><a href="#" onclick="javascript:popupRegister()" class="text-underline text-extrat-thiny gray-text" style="width:90%;margin-left:5%;">Hesabınız yok ise hemen kayıt olabilirsiniz</a></div></form></div>',
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
    app.router.navigate("/profile/");
}

//Image upload popup
var imagePopup = app.popup.create({
    
    content: '<div class="popup"><h1 class="addImageTitle">İlanınıza Fotoğraf Ekleyin</h1><div id="formContainerDiv"><form id="formToSend" class="fileupload" action="" method="POST" enctype="multipart/form-data"><input type="text" id="token" name="token" value="" hidden><input type="text" name="productId" id="productId" value="" hidden><div class="upload"><div class="leftUpload"><input type="file" id="fileToUpload" name="fileToUpload" multiple="" onchange="sendAway()"></div><div class="rightUpload"  onclick="noPhoto()"><input type="button" class="closeThumbPopup" id="closeThumbPopup"></div></div><ul class="files files-list-u ui-sortable" data-toggle="modal-gallery" data-target="#modal-gallery"></ul><div id="formTableContainer"><table id="thumbsTable"><tr class="thumb"></tr></table></div></form></div></div>',
    
  // Events
  on: {
    open: function (popup) {
    $('#token').val(localStorage.getItem("token"));
    $('#productId').val(localStorage.getItem("newListingId"));
    $('tr#thumbsTable').html();
    console.log('Popup open');
    },
    opened: function (popup) {
      console.log('Popup opened');
    },
  }
});

function sendAway(e){
    event.preventDefault();
    var filename = $('input[type=file]').val().split('\\').pop();      
    filename = filename.split('.').slice(0, -1).join('.');  
       $('tr.thumb').append('<td class="thumb" id="'+filename+'"><img src="img/upload-loading.gif" class="thumbLoading"></td>');

                            
       var fd = new FormData();
       var files = $('#fileToUpload')[0].files[0];
        fd.append('fileToUpload',files);
        fd.append('productId', $('input#productId').val());
        fd.append('token',$('input#token').val());
        fd.append('submit','true');
       
    var url = "https://kiralikotopark.com/uploadster.php";                         
    $.ajax({
        url: url, // point to server-side PHP script 
        type: 'POST',
        data: fd,
        dataType: 'text',
        contentType: false,
        cache: false,
        processData:false,    
        success: function(php_script_response){
            var tempProdId = $("input#productId").val();
            $('td#'+filename).html('<span class="notify-badge" onclick="Thumb(\''+php_script_response+'\',\''+tempProdId+'\')">X</span><img class="uploadPageThumb" src="https://kiralikotopark.com/files/thumbnail/'+php_script_response+'" alt="'+php_script_response+'">');
            var newResponse = php_script_response.split('.').slice(0, -1).join('.'); 
            $('td#'+filename).attr("id", newResponse);
            $("td#"+filename+" img:last-child").remove();
        }
     });
}
                
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

function Thumb(a,b) {
    var c = a.split('.').slice(0, -1).join('.');
    $("td#"+c).hide();
    var url = "https://kiralikotopark.com/deletster.php";                         
    $.ajax({
        url: url, // point to server-side PHP script 
        type: 'POST',
        data: {productId : b, imageToDel : a},
        dataType: 'json',   
        success: function(response){
            alert(response);
        }
     });
    
    
}

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
            getUserMiniAvatar();
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
    var url = "https://kiralikotopark.com/index.php/api/json/tr/48/";
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

        if (data.results[i].listing.image_filename == null || data.results[i].listing.image_filename == ""){
        data.results[i].listing.image_filename = "no_image.jpg";
        }
        collector += '<li><a onclick="passProductID('+data.results[i].listing.id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/thumbnail/'+data.results[i].listing.image_filename+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+data.results[i].listing.json_object.field_10+'</div><div class="item-after"></div></div><div class="item-subtitle">'+data.results[i].listing.json_object.field_4+'</div><div class="item-text">'+data.results[i].listing.field_37_int+' TL / ay</div></div></a></li>';
        }
        var height = $(document).height();
        var mHeight = height - 160;
        $("#frontlisting").append('<ul style="height:'+mHeight+'px;overflow:scroll">'+collector+'</ul>');              
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
        if (images.length < 4) {
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
            
            
        var seven = w.indexOf("Güvenlik Personeli");   
            if(w[seven] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[seven]+'</div><div class="item-after link-deeporange">Evet</div></div></div></li>'; }
            
        var sevenOne = w.indexOf("Güvenlik Kamerası");   
            if(w[sevenOne] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[sevenOne]+'</div><div class="item-after link-deeporange">Evet</div></div></div></li>'; }
            
            
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
        if (picUrl.length < 4) {
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
var kamera = $("#kamera").val();
var guvenlik = $("#guvenlik").val();
var engelli = $("#engelli").val();
var aylikKira = $("input#aylikKira").val();
var yillikKira = $("input#yillikKira").val();
var userToken = localStorage.token;
    
localStorage.setItem('tempApddress', nPAddress);
localStorage.setItem('tempTitle', nPTitle);
localStorage.setItem('tempI4', 'Kiralık');
localStorage.setItem('tempDesc', nPShortDesc);
localStorage.setItem('tempI11', elektrik);
    
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+nPAddress+"&input_title="+nPTitle+"&input_description="+nPShortDesc+"&input_79="+nPCat+"&input_4=Kiralık&input_17="+nPLongDesc+"&input_54="+listingOwner+"&input_2="+nPType+"&input_106="+door+"&input_108="+vehicleCapacity+"&input_30="+asansor+"&input_111="+kamera+"&input_3="+vehicleSize+"&input_11="+elektrik+"&input_33="+isitma+"&input_28="+guvenlik+"&input_29="+engelli+"&input_37="+aylikKira+"&input_55="+yillikKira+"";

    	$.ajax({
        type: "post",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
            //alert(data.message);
        if (data.message == '"Please populate all fields!"') {
            $("p#submitReport").append("<p>Lütfen tüm alanları, eksiksiz doldurunuz</p>");
            return 0;
        } else {
            localStorage.removeItem("newListingId");
            localStorage.setItem('newListingId', data.estate.id);
        }
        if (data.token_available == false) {
		$("p#submitReport").html("Lütfen önce kullanıcı girişi yapın");
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
		if (typeof data.results.image_user_filename !== 'undefined' && data.results.image_user_filename !== null && data.results.image_user_filename !== "")   {
    	$('#profileHeaderPic').html('<img class="profilePic" src="https://kiralikotopark.com/files/'+data.results.image_user_filename+'" alt="'+data.results.name_surname+'" width="120" height="120">');}
		else {
		$('#profileHeaderPic').html('<img class="profilePic" src="../img/default-avatar.png" alt="user" width="120" height="120">');
        }
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
    //alert("getting mini");
if (localStorage.email !== undefined) {
var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getUserMiniAvatar&user="+localStorage.email;
var userminiavatar;
    $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        success: function(data){
            alert("got mini av");
		if(data.image_user_filename == "") {
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
        if (imgUrl == null || imgUrl == "") {
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
        var docArticle = doc.querySelector('#form').innerHTML;
        
        $('#inqContent').append(docArticle);
        $("input.hidden").css("display","none");
        $("div.panel-heading").html("<h2>İletişim Formu</h2><p style='text-align:center;margin-left:10%;margin-right:10%;'>Lütfen tüm alanları eksiksiz doldurduğunuzdan emin olunuz.</p><p id='messageDisplay' style='margin-left:10%;margin-right:10%;font-weight:bold;color:red;'></p>");
        $("h2").css("text-align","center");
        $("input.form-control").css({"line-height":"24px","font-size":"16px","margin":"5%","border-bottom":"1px dotted black","padding-left":"10px","width":"90%"});
        $("textarea#message").css({"height":"6em","font-size":"16px","margin":"5%","border-bottom":"1px dotted black","padding-left":"10px","width":"90%"});
        $('img').css("margin-left","15%");
        $('button').css({"height":"3em","width":"60%","margin-left":"20%","margin-top":"5%","background-color":"#f1c40f","color":"white","font-weight":"bold","font-size":"1.1em"});
//       $('#inqContent').append("<input type='button' value='hele' onclick='javascript:sendInquiryForm()'/>");
    })
    .catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
    
}

//Send Inquiry Form
    $(document).on('submit','form.property-form',function(){ 
    var url = $('form.property-form').attr('action')+'?';
    var data = $(this).serialize();
    var namecheck = $('#firstname').val();
    var mailcheck = $('#email').val();
    var telcheck = $('#phone').val();        
    var messagecheck = $('#message').val();        
    var vericheck = $('.captcha').val();
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var emailaddressVal = mailcheck;
        
        
    if (namecheck.length < 2) {
        $('#messageDisplay').css({'color':'red','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Lütfen isminizi yazın</p>');
        return false;
     } else if (mailcheck.length < 2) {
        $('#messageDisplay').css({'color':'red','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Lütfen e-postanızı yazın</p>');
        return false;
    } else if(!emailReg.test(emailaddressVal)) {
        $('#messageDisplay').css({'color':'red','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Lütfen geçerli bir e-posta adresi yazın</p>');
        return false;
    }
      else if (telcheck.length < 2) {
        $('#messageDisplay').css({'color':'red','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Lütfen telefon numaranızı yazın</p>');
        return false;
    } else if (messagecheck.length < 2) {
        $('#messageDisplay').css({'color':'red','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Lütfen mesajınızı yazın</p>');
        return false;
    } else if (vericheck.length < 5) {
        $('#messageDisplay').css({'color':'red','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Lütfen doğrulama kodunu girin</p>');
        return false;
    }else {
    
        
        console.log("yolluyorum artık");
    $.ajax({
      url: url,
      type: 'POST',
      data : data,
      success: function(data){
        var parser = new DOMParser();
        // Parse the text
        var doc = parser.parseFromString(data, "text/html");
        var docArti = doc.getElementsByClassName('alert-danger');

        var hami = new XMLSerializer().serializeToString(doc);
        var n = hami.search("Doğrulama");

          
          if (n == -1) {              
            $('#messageDisplay').css({'color':'green','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Mesajınız İletildi.</p>');
              $('#firstname').val('');
              $('#firstname').attr("disabled", true);
              $('#email').val('');
              $('#email').attr("disabled", true);
              $('#phone').val('');
              $('#phone').attr("disabled", true);
              $('#datetimepicker1').val('');
              $('#datetimepicker1').attr("disabled", true);
              $('#datetimepicker2').val('');
              $('#datetimepicker2').attr("disabled", true);
              $('#address').val('');
              $('#address').attr("disabled", true);
              $('#message').val('');
              $('#message').attr("disabled", true);
              $('.captcha').val('');
              $('.captcha').attr("disabled", true);
              $('form.property-form button').attr("disabled", true);
          } else {
              $('#messageDisplay').css({'color':'red','font-size':'20px','text-align':'center'});
              $('#messageDisplay').html('<p>Doğrulama kodu hatalı</p>');
              return false;
              
              }
      }
    });
        }
    return false;

 });

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
        collector += '<li><a onclick="passProductID('+data.results[i].listing.id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/'+data.results[i].listing.image_filename+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+data.results[i].listing.json_object.field_10+'</div><div class="item-after"></div></div><div class="item-text">'+data.results[i].listing.field_37_int+' TL</div></div></a></li>';
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
    
    /*
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
*/
    
    
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
    "max-width": "100%",
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
                collector = "<p id='noLisintgyet'>Henüz ilanınız yok</p>";
            } else {
        collector = '<ul id="userListingUl"><li class="editListings"><a class="editLink" onclick="editSelectedListing();"><img class="editMenuButton" src="img/edit-interface-symbol.png"></a><a class="delLink" onclick="deleteSelectedListing();"><img src="img/delete-button.png" class="deleteMenuButton"></a></li>';
        for(var i=0;i<data.length;i++){
        var details = data[i].json_object;
        var monthPrice = data[i].field_37_int;
        details = details.replace(/field_/g,'');
        details = $.parseJSON(details);	
        if (details[36] != "") {
        var price = details[36];
        } else {
        var price = details[37];
        }
        var picUrl = data[i].image_filename;
        if (!picUrl) {
            picUrl = "no_image.jpg";
        }
        collector += '<li class="usersOwnListing" id="userList'+data[i].property_id+'"><a onclick="editRSelectedListing('+data[i].property_id+');" href="#" class="editButton"><img src="img/edit-interface-symbol.png"></a><a onclick="deleteRSelectedListing('+data[i].property_id+');" href="#" class="delButton"><img src="img/delete-button.png"></a><a onclick="passProductID('+data[i].property_id+');" href="#" class="item-link item-content"><div class="item-media"><img src="https://kiralikotopark.com/files/thumbnail/'+picUrl+'" width="80"></div><div class="item-inner"><div class="item-title-row"><div class="item-title">'+details[10]+'</div></div><div class="item-text">'+monthPrice+' TL</div></div></a></li>';
        }
        collector += '</ul>';
        }
        $("#machine-cat-listing").html(collector);
         }   
});
}

function editSelectedListing(j) {
if ($("a.editButton img").css("display").toLowerCase() == "inline-block") {
    $("a.editButton img").css("display","none");
    return 0;
}
$("a.delButton img").css("display","none");    
$("li.usersOwnListing a.item-link").css("width","calc(100% - 20px)");
$("li.usersOwnListing a.item-link").css("margin-right","-20px");
$("li.usersOwnListing a.item-link").css("float","left");
$("a.editButton img").css("display","inline-block");
}

function deleteSelectedListing(j) {
if ($("a.delButton img").is(":visible")) {
    $("a.delButton img").css("display","none");
    return 0;    
}
$("a.editButton img").css("display","none");    
$("li.usersOwnListing a.item-link").css("width","calc(100% - 20px)");
$("li.usersOwnListing a.item-link").css("margin-right","-20px");
$("li.usersOwnListing a.item-link").css("float","left");
$("a.delButton img").css("display","inline-block");
}

function editRSelectedListing(g) {
    localStorage.setItem("listingToEdit", g);
    app.router.navigate("/editListing/");
}

function deleteRSelectedListing(w) {
    logChk();
    app.dialog.confirm('Bu işlem geri alınamaz!', 'Silmek İstediğinize Emin Misiniz?',
       function () {
        
        var loginString = "token="+localStorage.token+"&property_id="+w;
        var url = "https://www.kiralikotopark.com/index.php/tokenapi/listings/DELETE/?"+loginString;
        $.ajax({
        type: "GET",
        dataType : "json",
        crossDomain: true, 
        cache: false,
        url: url,
        data: loginString,
        async: false,
        success: function(data){
            $("li#userList"+w).css("display","none");
            $("a.delButton img").css("display","none");
            app.dialog.alert('İlan silindi.');
        }        
    });           
               },
               function () {
                  return 0;
               }
            );    
}

function getEditListing() {
        var fr = localStorage.getItem("listingToEdit");
        var url = "https://www.kiralikotopark.com/mobile-functions.php?action=getSinglePropertyData&propertyID="+fr+"&language=2";
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
        if (images.length < 4) {
          $("tr.thumb").html("<td class='thumb'><img src='https://www.kiralikotopark.com/files/no_image.jpg' alt='fotoğrafsız' /></td>");
        } 
            else {
		images = images.substring(1, images.length - 1);
		images = images.replace(/"/g,'');
		images = images.split(',');
		//var collector = "<div data-pagination='{\"el\": \".swiper-pagination\"}' data-space-between=\"0\" class=\"swiper-container swiper-init loop\"><div class=\"swiper-wrapper\" id=\"mainsliderhost\">";
		var i = 0;
		$.each(images, function(){
            
            
            
         
            
            
       var filename = images[i].split('.').slice(0, -1).join('.');  
       $('tr.thumb').append('<td class="thumb" id="'+filename+'"><img src="img/upload-loading.gif" class="thumbLoading"></td>');

        
        $('td#'+filename).html('<span class="notify-badge" onclick="Thumb(\''+images[i]+'\',\''+fr+'\')">X</span><img class="uploadPageThumb" src="https://kiralikotopark.com/files/thumbnail/'+images[i]+'" alt="'+images[i]+'">');
            
            
            
            
            
            
		//collector += "<div class=\"swiper-slide\"><img src=\"https://www.kiralikotopark.com/files/"+images[i]+"\" class=\"productSlideShowImg\"></div>";
		i=i+1;
		});
		//collector += "</div><div class=\"swiper-pagination\"></div></div>";
		//$(".restaurant-img").html(collector);
        }
		
            
            
        var reArray = [];
		//Display property general info
        var preinfo = '';
		var propgeninfo = '<ul class="listingul"><li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">İlan Numarası</div><div class="item-after link-deeporange">'+fr+'</div></div></div></li>';
		var longdescription = "<p style='text-align:justify !important'>";
         
            
            
        if (exclude.includes(r)) {} else {
            
            
        /*    
        var one = w.indexOf("İlan Tipi");
            if(w[one] != undefined){
		propgeninfo += '<li><div class="item-inner"><div class="item-title-row"><div class="item-title margin-left">'+w[one]+'</div><div class="item-after link-deeporange">'+arry[one]+'</div></div></div></li>'; }
        */
        $('#productId').val(fr);    
        $('#newProductAddress').val(data[0]["address"]);
        $('#newProductTitle').val(data[0]["json_data"]);
        $('input#newProductTitle.cFormsInput').val(arry[4]);
        $('li#lemur').html('<a href="#" onclick="javascript:saveEditedListing('+fr+');"class="formSendButton">İlanı Kaydet</a>');
        
        var two = w.indexOf("İlan Sahibi");   
            if(w[two] != undefined){
                $("select#listingOwner option[value='"+arry[two]+"']").attr("selected","selected");
            }
        
        var three = w.indexOf("Otopark Tipi");   
            if(w[three] != undefined){
                $("select#nPType option[value='"+arry[three]+"']").attr("selected","selected");
       }
        
        
        var four = w.indexOf("Park Alanı Boyutu");   
            if(w[four] != undefined){
		 $("select#vehicleSize option[value='"+arry[four]+"']").attr("selected","selected"); 
            }
        
        
        var five = w.indexOf("Araç Kapasitesi");   
            if(w[five] != undefined){
		 $("select#vehicleCapacity option[value='"+arry[five]+"']").attr("selected","selected"); 
            }
        
        
        var six = w.indexOf("Kapı");   
            if(w[six] != undefined){
		$("select#door option[value='"+arry[six]+"']").attr("selected","selected");
            }
            
            
        var seven = w.indexOf("Güvenlik Personeli");   
            if(w[seven] != undefined){
		$('input#guvenlik').prop('checked', true); }
            
            
        var eight = w.indexOf("Engelli otoparkı");   
            if(w[eight] != undefined){
		$('input#engelli').prop('checked', true); }
            
            
        var nine = w.indexOf("Asansör");   
            if(w[nine] != undefined){
		$('input#asansor').prop('checked', true); }
            
            
        var ten = w.indexOf("Elektrik");   
            if(w[ten] != undefined){
		$('input#elektrik').prop('checked', true); }
        
            
        var eleven = w.indexOf("Isıtma");  
            if(w[eleven] != undefined){
		$('input#isitma').prop('checked', true); }
        
            
        var twelve = w.indexOf("Aylık Kira");   
            if(w[twelve] != undefined){
		$('#aylikKira').val(arry[twelve]);  }
            
        
        var thirteen = w.indexOf("Yıllık Kira");   
            if(w[thirteen] != undefined){
        $('#yillikKira').val(arry[thirteen]); }
            
            
        var fourteen = w.indexOf("Güvenlik Kamerası");   
            if(w[fourteen] != undefined){
		$('input#kamera').prop('checked', true); }
        
        }
               
        for (var r = 0; r<arry.length; r++) { 
		
		if (r == 3) { preinfo = arry[r]; } else {
		
		
		}
        }
		propgeninfo += '</ul>'
        longdescription += details[17];
		longdescription += '</p>'
		$("#nPShortDesc").html(preinfo);
		$("#t1").html($(propgeninfo).text());
		$("#nPLongDesc").html($(longdescription).text());
		$("#t3").html('<script>function initMap() {  var uluru = {lat: '+coordinates[0]+', lng: '+coordinates[1]+'};  var map = new google.maps.Map(document.getElementById("map"), {zoom: 17, center: uluru});  var marker = new google.maps.Marker({position: uluru, map: map}); } </script>   <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAiBBcAFK3mcRZPcE_rgzN9TKEowrsonXg&callback=initMap"> </script>');		
		
		}
});
}


//Submit Edited Listing
function saveEditedListing(ha) {

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
var kamera = $("#kamera").val();
var isitma = $("#isitma").val();
var guvenlik = $("#guvenlik").val();
var engelli = $("#engelli").val();
var aylikKira = $("input#aylikKira").val();
var yillikKira = $("input#yillikKira").val();
var userToken = localStorage.token;
    
localStorage.setItem('tempApddress', nPAddress);
localStorage.setItem('tempTitle', nPTitle);
localStorage.setItem('tempI4', 'Kiralık');
localStorage.setItem('tempDesc', nPShortDesc);
localStorage.setItem('tempI11', elektrik);
    
var url = "https://www.kiralikotopark.com/index.php/tokenapi/submission/?token="+userToken+"&lang_code=tr&input_address="+nPAddress+"&input_title="+nPTitle+"&input_description="+nPShortDesc+"&input_79="+nPCat+"&input_4=Kiralık&input_17="+nPLongDesc+"&input_54="+listingOwner+"&input_2="+nPType+"&input_106="+door+"&input_108="+vehicleCapacity+"&input_30="+asansor+"&input_3="+vehicleSize+"&input_11="+elektrik+"&input_33="+isitma+"&input_28="+guvenlik+"&input_111="+kamera+"&input_29="+engelli+"&input_37="+aylikKira+"&input_55="+yillikKira+"&property_id="+ha+"";
    
    alert(url);

    	$.ajax({
        type: "post",
        dataType: "json",
        crossDomain: true, 
        cache: false,
        url: url,
        async: false,
        success: function(data){
            //alert(data.message);
        if (data.message == '"Please populate all fields!"') {
            $("p#submitReport").append("<p>Lütfen tüm alanları, eksiksiz doldurunuz</p>");
            return 0;
        } else {
            localStorage.removeItem("newListingId");
            localStorage.setItem('newListingId', data.estate.id);
        }
        if (data.token_available == false) {
		$("p#submitReport").html("Lütfen önce kullanıcı girişi yapın");
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
  localStorage.setItem('currentlat', `${crd.latitude}`);
  localStorage.setItem('currentlong', `${crd.longitude}`);
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




//Prep the map
function prepTheMap() {
  var clat = localStorage.getItem('currentlat');
  var clon = localStorage.getItem('currentlong');

var mymap = L.map('homemap').setView([clat, clon], 16);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    attribution :'',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZjFyYXQiLCJhIjoiY2thMTh1NjB2MWN3NDNmbGliMXFvYXM4NyJ9.0Z4yniB9NEFrdkN_zIkhnA'
}).addTo(mymap);
var marker = L.marker([clat, clon]).addTo(mymap);


mymap.on('moveend', function() { 
     console.log(mymap.getBounds());
});


    var greenIcon = L.icon({
    iconUrl: 'parking.png',
//    shadowUrl: 'parking-shadow.png',

    iconSize:     [38, 55], // size of the icon
//    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 54], // point of the icon which will correspond to marker's location
//    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
    //var url = "https://kiralikotopark.com/index.php/api/json/tr/48/";
    var url = "https://kiralikotopark.com/mobile-functions.php?action=getLocations";
	$.ajax({
        type: "POST",
        crossDomain: true, 
        cache: false,
        draggable: true,
        url: url,
        dataType: 'json',
        async: false,
        success: function(data){  
            console.log(data);
    var vi = data.length;
    for (i = 0; i < vi; i++) {
        var gps = data[i].gps;
        var gpsarr = gps.split(',');
        //alert(data.results[i].url);
        //alert(data.results[i].listing.id);
        if (gpsarr[0] != "") {
        L.marker([gpsarr[0], gpsarr[1]], {icon: greenIcon}).addTo(mymap)
        .bindPopup('<a onclick="passProductID('+data[i].id+');">'+data[i].address+'</a>');
        }
    }
        }      
    });
}