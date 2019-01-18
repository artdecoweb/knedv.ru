/*--------------------------------------------------------------
# Copyright (C) joomla-monster.com
# License: http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
# Website: http://www.joomla-monster.com
# Support: info@joomla-monster.com
---------------------------------------------------------------*/

var style_1, style_2, style_3, Asset = {

	javascript: function(source, properties){
		if (!properties) properties = {};

		var script = new Element('script', {src: source, type: 'text/javascript'}),
			doc = properties.document || document,
			loaded = 0,
			loadEvent = properties.onload || properties.onLoad;

		var load = loadEvent ? function(){ // make sure we only call the event once
			if (++loaded == 1) loadEvent.call(this);
		} : function(){};

		delete properties.onload;
		delete properties.onLoad;
		delete properties.document;

		return script.addEvents({
			load: load,
			readystatechange: function(){
				if (['loaded', 'complete'].contains(this.readyState)) load.call(this);
			}
		}).set(properties).inject(doc.head);
	},

	css: function(source, properties){
		if (!properties) properties = {};

		var link = new Element('link', {
			rel: 'stylesheet',
			media: 'screen',
			type: 'text/css',
			href: source
		});

		var load = properties.onload || properties.onLoad,
			doc = properties.document || document;

		delete properties.onload;
		delete properties.onLoad;
		delete properties.document;

		if (load) link.addEvent('load', load);
		return link.set(properties).inject(doc.head);
	},

	image: function(source, properties){
		if (!properties) properties = {};

		var image = new Image(),
			element = document.id(image) || new Element('img');

		['load', 'abort', 'error'].each(function(name){
			var type = 'on' + name,
				cap = 'on' + name.capitalize(),
				event = properties[type] || properties[cap] || function(){};

			delete properties[cap];
			delete properties[type];

			image[type] = function(){
				if (!image) return;
				if (!element.parentNode){
					element.width = image.width;
					element.height = image.height;
				}
				image = image.onload = image.onabort = image.onerror = null;
				event.delay(1, element, element);
				element.fireEvent(name, element, 1);
			};
		});

		image.src = element.src = source;
		if (image && image.complete) image.onload.delay(1);
		return element.set(properties);
	},

	images: function(sources, options){
		sources = Array.from(sources);

		var fn = function(){},
			counter = 0;

		options = Object.merge({
			onComplete: fn,
			onProgress: fn,
			onError: fn,
			properties: {}
		}, options);

		return new Elements(sources.map(function(source, index){
			return Asset.image(source, Object.append(options.properties, {
				onload: function(){
					counter++;
					options.onProgress.call(this, counter, index, source);
					if (counter == sources.length) options.onComplete();
				},
				onerror: function(){
					counter++;
					options.onError.call(this, counter, index, source);
					if (counter == sources.length) options.onComplete();
				}
			}));
		}));
	}

};;

window.addEvent("domready",function(){
 if(document.id('jm-stylearea')){	
	document.id('style_icon-1').addEvent('click', function(e) {
		e = new Event(e).stop();
 
	if (style_1) style_1.dispose();
		var file = $template_path+'/css/style1.css';
		new Asset.css(file, {id: 'style1'});
		style_1 = document.id('style1');
		new Cookie.write('dj_real_estate02','1',{duration: 200,path: "/"});
		
	});

	document.id('style_icon-2').addEvent('click', function(e) {
		e = new Event(e).stop();
 
	if (style_2) style_2.dispose();
		var file = $template_path+'/css/style2.css';
		new Asset.css(file, {id: 'style2'});
		style_2 = document.id('style2');
		new Cookie.write('dj_real_estate02','2',{duration: 200,path: "/"});
		
	});
	
	document.id('style_icon-3').addEvent('click', function(e) {
		e = new Event(e).stop();
 
	if (style_3) style_3.dispose();
		var file = $template_path+'/css/style3.css';
		new Asset.css(file, {id: 'style3'});
		style_3 = document.id('style3');
		new Cookie.write('dj_real_estate02','3',{duration: 200,path: "/"});
		
	});
	
 }

});

// Function to change backgrouns
function changeStyle(style){
	var file = $template_path+'/css/style'+style+'.css';
	var neww = new Asset.css(file);
	new Cookie.write('dj_real_estate02',style,{duration: 200,path: "/"});
}
/*
     FILE ARCHIVED ON 02:56:20 Mar 09, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:57:36 Jan 18, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 411.704 (3)
  esindex: 0.007
  captures_list: 429.41
  CDXLines.iter: 13.138 (3)
  PetaboxLoader3.datanode: 433.352 (5)
  exclusion.robots: 0.155
  exclusion.robots.policy: 0.144
  RedisCDXSource: 1.728
  PetaboxLoader3.resolve: 53.298 (2)
  load_resource: 144.158
*/