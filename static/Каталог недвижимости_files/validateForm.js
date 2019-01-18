// Class validateForm ver 1.0.3
// marketing@maxx-marketing.net
/*
  num = number (from 1 digit to 2 digit, when 1 digit - to tochne spivpadinnya)
  nem = not empty
  eq = equal - 2 polya vkazuvaty
  em = email
  nat = natural digit (>0)
  reg = regular expression
  chk - is checkbox checked
  fl  = is float and>0
  fl|em  = (is float and>0) or empty
  notn = not null (for select)
  eqne = value must equal and not empty
  less = length muss less then %s symbols
  more = length muss more then %s symbols
  date = check is date
  date|em = check is date or empty
*/

function validateForm(nameForm, arrayId, arrayType, arrayParams, arrayErrorMessages, typeShowError, css_class_error){
   this.idEl = arrayId;
   this.type = arrayType;
   this.params = arrayParams;
   this.messages = arrayErrorMessages;
   this.errorsMsg = new Array();
   this.errorId = new Array();
   this.current = 0;
   this.end = this.idEl.length;
   this.errorMsg = '';
   this.typeShowError = typeShowError; //1 = showErrors 2 = highlightFields 3 = 1 + 2
   this.nameForm = nameForm;
   if (css_class_error){
    this.css_class_error = css_class_error;
   }else{
    this.css_class_error = 'fielderror';
   }

   this.addError = function(){
      if (this.getType() == 'eqne' || this.getType() == 'eq'){
        this.errorId[this.errorId.length] = this.getParam();
      }
      this.errorId[this.errorId.length] = this.getId();
      this.errorsMsg[this.errorsMsg.length] = this.getMessage();
   }

   this.parseNumber = function(){
      var reg = /^(\d*),(\d*)$/;
      var pattern = (reg.test(this.getParam())) ?  (new RegExp('^(\\d){' + RegExp.$1 + ',' + RegExp.$2 + '}$')) : (new RegExp('^(\\d){' + this.getParam() + '}$'));
      if (!pattern.test(this.getValue(0))){
         this.addError();
      }
   }

   this.checkNumber = function(pattern){
	  this.parseNumber();
   }

   this.checkFloat = function(){
      var value = parseFloat(this.getValue(0));
      if (isNaN(value) || value<=0) this.addError();
   }

   this.checkRegular = function(){
     var pattern = new RegExp(this.getParam());
     if (!pattern.test(this.getValue(0))) this.addError();
   }

   this.checkFloatOrEmpty = function(){
      var value = parseFloat(this.getValue(0));
      if (!this.checkNotEmptyFunc(this.getValue())) return true; else this.checkFloat();
   }
   
   this.checkFloatOrEmptyOrZero = function(){
       if (this.getValue(0)==0) return true; else this.checkFloatOrEmpty();
   }

   this.checkNotNull = function(){
      if (this.getValue(0)==0) this.addError();
   }

   this.checkMoreLength = function(){
   	if (this.getValue(0).length<this.getParam()) this.addError();
   }

   this.checkLessLength = function(){
   	if (this.getValue(0).length>this.getParam()) this.addError();
   }

   this.checkEqualNotEmpty = function(notEmpty){
      var element2 = this.getValue(0);
      var element1 = this.getValue(this.getParam());
      if (element1 != element2){
      	 this.addError();
      } else if (notEmpty) {
      	 if (!this.checkNotEmptyFunc(element1)){
            this.addError();
         }
      }
   }

   this.checkNotEmptyFunc = function(value){
      var pattern = /\S/;
      return (value) ? (pattern.test(value)) : (pattern.test(this.getValue(0)));
   }

   this.checkNotEmpty = function(){
    if (!this.checkNotEmptyFunc()){
     	this.addError();
     }
   }

   this.checkMail = function(){
      var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  if (!pattern.test(this.getValue(0))){
	  	this.addError();
	  }
   }

   this.checkZipCode = function(){
      var pattern = /\S/;
      if (!pattern.test(this.getValue(0)) ){
          this.addError();
      }
   }

   this.checkDate = function(){
      var tempDate = this.getValue(0);
      var pattern = new RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$");
      if (pattern.test(tempDate)){
         var year = RegExp.$1;
         var month = RegExp.$2;
         var day = RegExp.$3;
         if (month<1 || month>12){
         	this.addError();
         } else if (year>2099 || year<1900){
            this.addError();
         } else if (day<1 || day>31){
         	this.addError();
         }
      }else{
      	 this.addError();
      }
   }

   this.checkDateOrEmpty = function(){
      if (!this.checkNotEmptyFunc(this.getValue())) return true; else this.checkDate();
   }

   this.naturalNumber = function(){
      var value = parseInt(this.getValue(0));
      if (isNaN(value) || value<=0) this.addError();
   }

   this.checked = function(){
   	 if (!this.$().checked) this.addError();
   }

   this.getType = function(){
   	return this.type[this.current];
   }

   this.getForm = function(){
   	return document.forms[nameForm];
   }

   this.getId = function(){
   	return this.idEl[this.current];
   }

   this.getParam = function(){
   	   return this.params[this.current];
   }

   this.getMessage = function(){
   	   return this.messages[this.current];
   }

   this.getCurrent = function(){
   	   return this.idEl[this.current];
   }

   this.next = function(){
   	   this.current++;
   }

   this.notEnd = function(){
   	   return (this.current < this.end);
   }

   this.$ = function(idElement){
       return (idElement) ? (document.getElementById(idElement)) : (document.getElementById(this.getCurrent()));
   }

   this.getValue = function(idElement){
	   if (!idElement){
	   	  var element = this.$(this.getCurrent());
	   } else {
	      var element = this.$(idElement);
	   }
	   switch(element.type){
	   	 case 'select-one':
	       return element.options[element.selectedIndex].value;
	     break;
	     case 'radio':
	     case 'checkbox':
	       return element.checked;
	     break;
	     case 'text':
	     case 'password':
	     case 'textarea':
	       return element.value;
	     break;
	   }
   }

   this.validate = function(){
     this.unhighlightFields();
     while(this.notEnd()){
     	if (this.$(0)){
          switch(this.getType()){
        	  case 'num':
        	    this.checkNumber();
                break;
              case 'nem':
                this.checkNotEmpty();
                break;
              case 'em':
                this.checkMail();
                break;
              case 'nat':
                this.naturalNumber();
                break;
              case 'chk':
                this.checked();
                break;
              case 'fl':
                this.checkFloat();
                break;
              case 'fl|em':
                this.checkFloatOrEmpty();
              break;
              case 'fl|em|0':
                this.checkFloatOrEmptyOrZero();
              break;
              case 'notn':
                this.checkNotNull();
              break;
              case 'eq':
                this.checkEqualNotEmpty(0);
              break;
              case 'eqne':
                this.checkEqualNotEmpty(1);
              break;
              case 'more':
                this.checkMoreLength();
              break;
              case 'less':
                this.checkLessLength();
              break;
              case 'date':
                this.checkDate(this.getParam());
              break;
              case 'reg':
                this.checkRegular();
              break;
              case 'date|em':
                this.checkDateOrEmpty(this.getParam());
              break;
              case 'zip':
                this.checkZipCode();
              break;
         }
     	}
     	this.next();
     }

     if (this.errorsMsg.length){
        this.$(this.errorId[0]).focus();
        switch(this.typeShowError){
        	case 1:
                this.showErrors();
        	break;
            case 2:
                this.highlightFields();
            break;
            case 3:   
                this.showErrors();
            	this.highlightFields();
            break;
        }
        return false;
     }else{
     	return true;
     }
   }

   this.showErrors = function(){
     var countErrors = this.errorsMsg.length;
     for(var i=0;i<countErrors;i++){
        this.errorMsg += this.errorsMsg[i]+"\n";
     }
     alert(this.errorMsg);
   }

   this.unhighlightFields = function(){
     var form = this.getForm();
     var countElements = form.length;
     for(i=0;i<countElements;i++){
       	if (form.elements[i].type == 'button' || form.elements[i].type == 'submit' || form.elements[i].type == 'hidden')
       	  continue;
       	else if (form.elements[i].type == 'checkbox'){
          jQuery(form.elements[i].parentNode).removeClass(this.css_class_error);
       	}else{
          jQuery(form.elements[i]).removeClass(this.css_class_error);
        }
     }
   }

   this.highlightFields = function(){
     var countErrors = this.errorId.length;
     for(var i=0;i<countErrors;i++){
		 if (this.$(this.errorId[i]).type == 'checkbox'){
            jQuery(this.$(this.errorId[i]).parentNode).addClass(this.css_class_error);
		 }else{
            jQuery(this.$(this.errorId[i])).addClass(this.css_class_error);
		 }
     }
   }
}
/*
     FILE ARCHIVED ON 03:28:16 Mar 09, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 11:57:33 Jan 18, 2019.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 432.888 (3)
  esindex: 0.007
  captures_list: 458.56
  CDXLines.iter: 20.618 (3)
  PetaboxLoader3.datanode: 407.44 (5)
  exclusion.robots: 0.184
  exclusion.robots.policy: 0.173
  RedisCDXSource: 0.874
  PetaboxLoader3.resolve: 109.175 (3)
  load_resource: 118.953
*/