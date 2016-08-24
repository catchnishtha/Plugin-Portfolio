;(function(){
    //create window object
    this.portPlugin=function(){
        var self=this;
        this.defaults={
            cols:3,
            colsSm:2,
            colsXs:1,
            elemId:"port-content"
        }; 
        if(arguments[0] && typeof arguments[0] === 'object'){
            this.options=this.init(arguments[0]);
        } else {
            this.options=this.defaults;
        }
        this.elem=document.getElementById(this.defaults.elemId);
        this.elemsSingleArr=this.elem.getElementsByTagName('li');
        this.setColWidth();
        this.displayOnClick();
        window.onresize = function() { 
            self.setColWidth(); 
            if(self.elem.querySelector(".newLiContent")){
                self.resetLiposition();
            }
        };  
    } 
        portPlugin.prototype.resetLiposition= function(){
            var newContentLi={},position=0,newContentLiPos=0;
            for(var j = 0; j < this.elemsSingleArr.length; j++){ 
                if(this.elemsSingleArr[j].classList.contains("openedLi")){ 
                    position=j+1;  
                }
                if(this.elemsSingleArr[j].classList.contains("newLiContent")){ 
                    newContentLi=this.elemsSingleArr[j];
                    newContentLiPos=j;
                }
            }
            var actualPos=this.getNewLiPos(position);
            if(newContentLiPos<actualPos)actualPos++;//+1 as newLiContent is already included;
            this.elem.insertBefore(newContentLi,this.elem.children[actualPos]);
        }
        
        /*Extend options entered by the user*/
        portPlugin.prototype.init = function(newOptions){
            var defaultOptions=this.defaults;
            for(var property in newOptions){
                if(newOptions.hasOwnProperty(property)){
                    defaultOptions[property]=newOptions[property];
                }
            }
            return defaultOptions;
        };
      
        /*Set the width of each 'li' based on the default.cols property*/
        portPlugin.prototype.setColWidth=function(){
            var numOfCols=this.options.cols; 
            if (window.matchMedia('(max-width: 991px)').matches) numOfCols=this.options.colsSm;
            if (window.matchMedia('(max-width: 767px)').matches) numOfCols=this.options.colsXs;
                for(var i = 0; i<this.elemsSingleArr.length; i++) {
                    if(this.elemsSingleArr[i].classList.contains("newLiContent"))
                        this.elemsSingleArr[i].style.width='100%';
                     else this.elemsSingleArr[i].style.width=(100/numOfCols)+'%';
                }
        };
        
        //get position of the new li to be inserted
        portPlugin.prototype.getNewLiPos=function(clickedLiPos){
            var numOfCols=this.defaults.cols; 
            if (window.matchMedia('(max-width: 991px)').matches) numOfCols=this.options.colsSm;
            if (window.matchMedia('(max-width: 767px)').matches) numOfCols=this.options.colsXs;
            var liPosition=Math.ceil(clickedLiPos/numOfCols)*numOfCols;
            return liPosition;
        };
        
        /*Show and Hide the required content*/
        portPlugin.prototype.displayOnClick=function(){ 
            var self=this;
            for(var i = 0; i<self.elemsSingleArr.length; i++) {
                self.elemsSingleArr[i].addEventListener('click', function(e){  
                    e.preventDefault; 
                    var position=0,donot=false;
                    //remove any 'li' already open 
                    for(var j = 0; j < self.elemsSingleArr.length; j++){
                        if(self.elemsSingleArr[j].classList.contains("newLiContent")) {  
                            self.elemsSingleArr[j].parentNode.removeChild(self.elemsSingleArr[j]);                                                      }
                    } 
                    //remove class "openedLi" from the 'li' already expanded
                    for(var j = 0; j < self.elemsSingleArr.length; j++){ 
                        if(self.elemsSingleArr[j].classList.contains("openedLi")){ 
                            if(this.getAttribute("data-link")==self.elemsSingleArr[j].getAttribute("data-link")){
                                donot=true; 
                            }
                            removeClass(self.elemsSingleArr[j],"openedLi");
                        } 
                        if(this.getAttribute("data-link")==self.elemsSingleArr[j].getAttribute("data-link")){
                            position=j+1;  
                        }
                    }
                    if(!donot){
                        var actualPos=self.getNewLiPos(position);
                        var newDivId=this.getAttribute("data-link");
                        var newItem = document.createElement("li");
                        newItem.innerHTML=document.getElementById(newDivId).innerHTML;
                        self.elem.insertBefore(newItem,self.elem.children[actualPos]);
                        addClass(self.elem.children[actualPos],"newLiContent");
                        newItem.style.opacity=0;
                        window.getComputedStyle(newItem).opacity;
                        addClass(this, "openedLi");
                        newItem.style.opacity=1;
                        scrollTo(newItem.offsetTop);
                    }
                }, 
                false);
            }//for
        }
        
        
            // Animate newLiContent to window top - http://goo.gl/sx5sts http://goo.gl/5HLl8
            Math.easeInOutQuad = function (t, b, c, d) {
              t /= d/2;
              if (t < 1) {
                return c/2*t*t + b
              }
              t--;
              return -c/2 * (t*(t-2) - 1) + b;
            };
            var requestAnimFrame = (function(){
               return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;
            })();
            function scrollTo(to) {
                var start=document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop,
                change = to - start -70, currentTime = 0, increment = 25,  duration = 1000;
                var animateScroll = function(){ 
                    currentTime += increment;// increment the time
                    // find the value with the quadratic in-out easing function
                    var val = Math.easeInOutQuad(currentTime, start, change, duration);
                    // move the document body
                    document.documentElement.scrollTop = val;
                    document.body.parentNode.scrollTop = val;
                    document.body.scrollTop = val; 
                    if (currentTime < duration) {
                      requestAnimFrame(animateScroll);
                    } 
              };
              animateScroll();
            }
        /************************************************/
        /*START javascript basic functions*/
        function hasClass(el, className) {
          if (el.classList)
            return el.classList.contains(className)
          else
            return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
        }

        function addClass(el, className) {
          if (el.classList)
            el.classList.add(className)
          else if (!hasClass(el, className)) el.className += " " + className
        }
        
        function removeClass(el, className) {
          if (el.classList)
            el.classList.remove(className)
          else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
            el.className=el.className.replace(reg, ' ')
          }
        }
        /*END javascript basic functions*/
}());