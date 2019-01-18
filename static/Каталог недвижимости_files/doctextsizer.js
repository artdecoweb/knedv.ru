//Document Text Resizer script (May 14th, 08'): By JavaScript Kit: http://www.javascriptkit.com

var documenttextsizer={

prevcontrol: '', //remember last control clicked on/ selected
existingclasses: '',

setpageclass:function(control, newclass){
	if (this.prevcontrol!='')
			this.css(this.prevcontrol, 'selectedtoggler', 'remove') //de-select previous control, by removing 'selectedtoggler' from it
	document.documentElement.className=this.existingclasses+' '+newclass //apply new class to document
	this.css(control, 'selectedtoggler', 'add') //select current control
	this.setCookie('pagesetting', newclass, 5) //remember new class added to document for 5 days
	this.prevcontrol=control
},

css:function(el, targetclass, action){
	var needle=new RegExp("(^|\\s+)"+targetclass+"($|\\s+)", "ig")
	if (action=="check")
		return needle.test(el.className)
	else if (action=="remove")
		el.className=el.className.replace(needle, "")
	else if (action=="add")
		el.className+=" "+targetclass
},

getCookie:function(Name){ 
	var re=new RegExp(Name+"=[^;]+", "i"); //construct RE to search for target name/value pair
	if (document.cookie.match(re)) //if cookie found
		return document.cookie.match(re)[0].split("=")[1] //return its value
	return null
},

setCookie:function(name, value, days){
	if (typeof days!="undefined"){ //if set persistent cookie
		var expireDate = new Date()
		var expstring=expireDate.setDate(expireDate.getDate()+days)
		document.cookie = name+"="+value+"; path=/; expires="+expireDate.toGMTString()
	}
	else //else if this is a session only cookie
		document.cookie = name+"="+value
},

setup:function(targetclass){
	this.existingclasses=document.documentElement.className //store existing CSS classes on HTML element, if any
	var persistedsetting=this.getCookie('pagesetting')
	var alllinks=document.getElementsByTagName("a")
	for (var i=0; i<alllinks.length; i++){
		if (this.css(alllinks[i], targetclass, "check")){
			if (alllinks[i].getAttribute("rel")==persistedsetting) //if this control's rel attribute matches persisted doc CSS class name
				this.setpageclass(alllinks[i], alllinks[i].getAttribute("rel")) //apply persisted class to document
			alllinks[i].onclick=function(){
				documenttextsizer.setpageclass(this, this.getAttribute("rel"))
				return false
			}
		}
	}
}

}
/*
     FILE ARCHIVED ON 03:27:38 Mar 09, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:57:36 Jan 18, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 312.458 (3)
  esindex: 0.026
  captures_list: 365.881
  CDXLines.iter: 20.406 (3)
  PetaboxLoader3.datanode: 433.764 (5)
  exclusion.robots: 0.366
  exclusion.robots.policy: 0.342
  RedisCDXSource: 24.919
  PetaboxLoader3.resolve: 147.107 (2)
  load_resource: 345.113
*/