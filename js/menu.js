function handle(e){
	address=document.getElementById("leftMenuSearch").value;
    if(e.keyCode === 13){
   	searchBox(address);
    }
	return false;
}
function searchMenuN(){
	address=document.getElementById("leftMenuSearch").value;
   	searchBox(address);
	return false;
}
function topmenufill(){
var topmenudv = document.getElementById("leftmenu");
topmenudv.innerHTML = '<div class="row"><div class="col-15"><a href="#"><i class="f7-icons">car</i></a></div></div><div class="margin-top-30" style="text-align:center" id="miniavatardiv"></div><div class="text-small text-capitalize" id="userGreeting"></div><div class="text-extrat-thiny gray-text text-capitalize icon-location" id="loginText"></div><ul class="menul"><li class="menuli"><div class="item-content"><i class="f7-icons menuicon">home</i><a style="color:black;" href="/">Ana Ekran</a></div></li><li class="menuli"><i class="f7-icons menuicon">add</i>      <a style="color:black;" href="/add-product/" class="panel-close no-animation">Yeni İlan Ekle</a></div></li><li class="menuli"><i class="f7-icons menuicon">book</i><a style="color:black;" href="/faqs/" class="panel-close no-animation">Sık Sorulan Sorular</a></div></li><li class="menuli"><i class="f7-icons menuicon">phone_round</i>      <a style="color:black;" href="/contact/" class="panel-close no-animation">Yardım & İletişim</a></div></li></ul>';}
topmenufill();
getUserData();
getUserMiniAvatar();