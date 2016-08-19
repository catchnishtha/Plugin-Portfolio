(function(){
    //create window object
    this.portPlugin=function(args){
        var self=this;
        this.args=args;
        this.defaults={
            cols:4,
            elemId:"port-content"
        };
        this.options=this.defaults;
        if(arguments[0] && typeof arguments[0] === 'object'){
            this.options=this.init(arguments[0]);
        }
        this.elem=document.getElementById(this.defaults.elemId);
        this.elemsSingleArr=this.elem.getElementsByTagName('li');
        this.setColWidth();
        this.clicked();
        window.onresize = function() {
            console.log('JavaScript Function Run');
            self.setColWidth();
            self.clicked();
        };  
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
            var cols=this.options.cols;
            if (window.matchMedia('(max-width: 767px)').matches){
                cols=1;
            }
                for(var i = 0; i<this.elemsSingleArr.length; i++) { console.log(cols);
                    this.elemsSingleArr[i].style.width=(100/cols)+'%';
                }
        };
        
        //get position of the new li to be inserted
        portPlugin.prototype.getNewLiPos=function(clickedLiPos){
            var numOfCols=this.defaults.cols;
            if (window.matchMedia('(max-width: 767px)').matches) numOfCols = 1;
            var liPosition=
                Math.ceil(clickedLiPos/numOfCols)*numOfCols;
            return liPosition;
        };
        
        /*Show and Hide the required content*/
        portPlugin.prototype.clicked=function(){
            var self=this;
            for(var i = 0; i<self.elemsSingleArr.length; i++) {
                self.elemsSingleArr[i].addEventListener('click', function(e){ 
                    e.preventDefault;
                    var position=0,donot=false;
                    for(var j = 0; j < self.elemsSingleArr.length; j++){
                        if(self.elemsSingleArr[j].className.toLowerCase() == "openedli"){ 
                            if(this.getAttribute("data-link")==self.elemsSingleArr[j].getAttribute("data-link")){
                                donot=true;console.log("already opened"); 
                            }
                            removeClass(self.elemsSingleArr[j],"openedLi");
                        } 
                        if(this.getAttribute("data-link")==self.elemsSingleArr[j].getAttribute("data-link")){
                            position=j+1; 
                        }
                        if(self.elemsSingleArr[j].className.toLowerCase() == "newlicontent") { 
                            self.elemsSingleArr[j].parentNode.removeChild(self.elemsSingleArr[j]);                                          }
                    }
                    if(!donot){
                        var actualPos=self.getNewLiPos(position);
                        var newDivId=this.getAttribute("data-link");
                        var newDivContent=document.getElementById(newDivId).innerHTML; 
                        var newItem = document.createElement("li");
                        newItem.innerHTML=newDivContent; 
                        self.elem.insertBefore(newItem,self.elem.children[actualPos]);
                        addClass(self.elem.children[actualPos],"newLiContent");
                        newItem.style.opacity=0;
                        window.getComputedStyle(newItem).opacity;
                        addClass(this, "openedLi");
                        newItem.style.opacity=1;
                    }
                }, 
                false);
            }//for
        }
        
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