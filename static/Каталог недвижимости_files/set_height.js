/*--------------------------------------------------------------
# Copyright (C) joomla-monster.com
# License: http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
# Website: http://www.joomla-monster.com
# Support: info@joomla-monster.com
---------------------------------------------------------------*/

function setFrontBottomModulesHeight() {
	var regexp = new RegExp("_mod([0-9]+)$");
	
	if ($$('.jm-module')) {
		var modules = $$('.jm-module');
		modules.each(function(element){
			var match = regexp.exec(element.className);
			if (match) {
				var modHeight = parseInt(match[1]);
				var module_in = element.getElement('.jm-module-in');
				if (module_in) {
					module_in.setStyle('height', modHeight);
				}
			}	
		});
	}
	
}

window.addEvent('domready', function(){
	setFrontBottomModulesHeight();
});

/*
     FILE ARCHIVED ON 04:43:21 Mar 09, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:57:37 Jan 18, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 351.99 (3)
  esindex: 0.01
  captures_list: 368.142
  CDXLines.iter: 10.933 (3)
  PetaboxLoader3.datanode: 395.853 (5)
  exclusion.robots: 0.219
  exclusion.robots.policy: 0.202
  RedisCDXSource: 1.853
  PetaboxLoader3.resolve: 81.838 (3)
  load_resource: 150.546
*/