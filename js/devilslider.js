let DevilGallery = function(sel){

    this.init(sel);
    this.setLargeImage();
    this.setEvent();
    this.setThumbnailIndex();
    this.setTitle();
    this.setCurrentSlide();
}
DevilGallery.prototype.gallery;
DevilGallery.prototype.nextBtn;
DevilGallery.prototype.prevBtn;
DevilGallery.prototype.ele;
DevilGallery.prototype.tot;
DevilGallery.prototype.thumbnail;
DevilGallery.prototype.thumbnailGap=15;
DevilGallery.prototype.thumbnailItemNo;
DevilGallery.prototype.thumbnailItemWidth;
DevilGallery.prototype.thumbnailUL;
DevilGallery.prototype.thumbnailPos=0;
DevilGallery.prototype.thumbnailImgHeight=141;
DevilGallery.prototype.thumbnailImgWidth=240;
DevilGallery.prototype.largeImg;
DevilGallery.prototype.sliderIndex=0;
DevilGallery.prototype.slideTitle;
DevilGallery.prototype.thumbnailToggle;
DevilGallery.prototype.thumbnailCounter=false;
DevilGallery.prototype.lightBox;
DevilGallery.prototype.lightBoxToggle=false;
DevilGallery.prototype.closeBtn;
DevilGallery.prototype.maxScrollY;
DevilGallery.prototype.eachScrollY;
DevilGallery.prototype.currentSlideEle;



DevilGallery.prototype.setThumbnailIndex=function(){
    var allLi=this.thumbnail.querySelectorAll('ul li');

    var i=0;
    while(i<allLi.length){
        allLi[i].setAttribute('data-index',i);
        i++;
    }
}
DevilGallery.prototype.setCurrentSlide=function(myindex){

    //In Default Setting for Current Slide
    console.log
    if(myindex==undefined){
        myindex=this.sliderIndex;
    }
    console.log("Method : setCurrentSlide");
    console.log("Slide Index : "+myindex);
    //If User Click on thumbnail

    //index++;
    console.log("Index :" +parseInt(myindex));
    console.log(myindex);
    let allLi = this.thumbnail.querySelectorAll('ul li');

    let i=0;
    let nextSlide=0;
    while(i<allLi.length){

        if(myindex==i){
            nextSlide=parseInt(myindex)+1;
            console.log("Current LI :"+nextSlide);
            allLi[myindex].classList.add('current');
            console.log("I found on "+i);
        }else{
            allLi[i].classList.remove('current');
        }
        i++;
    }


}
DevilGallery.prototype.init=function(sel){

    this.ele=document.querySelector(sel);
    this.tot=this.ele.querySelectorAll('.thumbnail li').length;

    this.ele.querySelector('.totalSlide').innerHTML=this.tot;
    this.currentSlideEle=this.ele.querySelector('.currentSlide');
     this.currentSlideEle.innerHTML=this.sliderIndex+1;

    this.nextBtn=this.ele.querySelector('.next');
    this.prevBtn=this.ele.querySelector('.prev');
    if(this.sliderIndex==0){
        this.prevBtn.classList.add('hide');
    }
    this.thumbnail=this.ele.querySelector('.thumbnail');
    this.thumbnailUL=this.thumbnail.querySelector('UL');
    this.thumbnailItemNo=4;
    this.thumbnailItemWidth=240;

    this.maxScrollY=this.thumbnail.scrollTopMax;
    this.eachScrollY=(this.maxScrollY/this.tot)+this.thumbnailGap;

    // Thumbnail Toggle
    this.thumbnailToggle=this.ele.querySelector('a#extract');

    // lightBox
    this.lightBox=this.ele.querySelector("#lightBox");

    // Close Button of Light Box
    this.closeBtn=this.ele.querySelector('.closeSlider');

    window.addEventListener('keydown', this.setKeyBoardAction.bind(this));
    
}
DevilGallery.prototype.setKeyBoardAction=function(e){
    //console.log(e.key);
    console.log(e.key);
    if(e.key=="ArrowRight"){
        this.setNext(e);
    }
    if(e.key=="ArrowLeft"){
        //console.log("Called method setPrev");
        this.setPrev(e);
    }
    if(e.key=="Escape"){
        console.log(this.ele);
        this.ele.classList.remove('lightBox');
    }
    //

}
DevilGallery.prototype.setTitle=function(title){

    this.slideTitle=document.getElementById("title");
    if(title != undefined){
        this.slideTitle.innerHTML=title;
    }else{

        let firstEle=this.thumbnail.querySelector('ul li:first-child img');
        this.slideTitle.innerHTML=firstEle.title;
    }


}
DevilGallery.prototype.setNext=function(e){

    console.log("Slide Index :" + this.sliderIndex + " and Total Index :"+this.tot);
    if(this.sliderIndex<this.tot-1){
        this.thumbnailPos-=this.thumbnailImgHeight;
        //this.thumbnailUL.style.transform="translateY("+this.thumbnailPos+"px)";
        this.thumbnail.scrollTop+=this.eachScrollY;
        this.sliderIndex++;
        this.currentSlideEle.innerHTML=this.sliderIndex+1;
        //alert(this.currentSlideEle.innerHTML);
        this.setBigImg(e);
    }

}
DevilGallery.prototype.setPrev=function(e){

    if(this.sliderIndex>0){
        console.log(this.thumbnail);
        this.thumbnailPos+=this.thumbnailImgHeight;
        //this.thumbnailUL.style.transform="translateY("+this.thumbnailPos+"px)";
        this.thumbnail.scrollTop-=this.eachScrollY;
        this.sliderIndex--;
         this.currentSlideEle.innerHTML=this.sliderIndex+1;
        this.setBigImg(e);

    }
}

DevilGallery.prototype.setLargeImage=function(){
    this.largeImg =this.ele.querySelector('.largeImage');
    // this.ele.querySelector('li img');
    if(this.largeImg.children.length<1){
        let firstEle=this.thumbnail.querySelector('li:first-child a');

        let img = document.createElement('IMG');
        console.log(firstEle);
        img.src=firstEle.href;
        this.largeImg.appendChild(img);


    }

}

DevilGallery.prototype.setEvent=function(){
    for(index of this.ele.querySelectorAll('.thumbnail li img')){
        index.addEventListener("click",this.setBigImg.bind(this),false);
    }
    this.nextBtn.addEventListener("click",this.setNext.bind(this),false);
    this.prevBtn.addEventListener("click",this.setPrev.bind(this),false);
    this.thumbnailToggle.addEventListener("click",this.setThumbNailToggle.bind(this),false);
    this.lightBox.addEventListener("click",this.setLightBoxToggle.bind(this),false);
    this.closeBtn.addEventListener("click",this.closeLightBox.bind(this),false);

}
DevilGallery.prototype.closeLightBox=function(){
    this.ele.classList.remove('lightBox');
    document.querySelector('body').classList.remove('lightBoxActive');
}
DevilGallery.prototype.setLightBoxToggle=function(){
    console.log("Light Box "+ this.lightBoxToggle);

    if(this.lightBoxToggle == false){

        document.querySelector('body').classList.add('lightBoxActive');
        this.ele.classList.add('lightBox');
        this.lightBoxToggle=true;
    }else if(this.lightBoxToggle == true){

        //sthis.ele.classList.remove('lightBox');
        document.querySelector('body').classList.remove('lightBoxActive');

        this.lightBoxToggle=false;
    }

}
DevilGallery.prototype.setThumbNailToggle=function(e){
    console.log("Set Extract Toggle");
    console.log(this.ele);
    console.log(e.target);
    if(this.thumbnailCounter==false){
        this.ele.classList.add('extract');
        this.thumbnailCounter=true;
        e.target.classList.add('deactive');
    }else{
        this.ele.classList.remove('extract');
        this.thumbnailCounter=false;
        e.target.classList.remove('deactive');
    }
}
DevilGallery.prototype.setClassPrevNext=function(){
    // console.log(this.sliderIndex);
    if(this.sliderIndex==this.tot-1){
        this.nextBtn.classList.add('hide');
        this.prevBtn.classList.remove('hide');
    }else if(this.sliderIndex==0){
        this.nextBtn.classList.remove('hide');
        this.prevBtn.classList.add('hide');
    }else{
        this.nextBtn.classList.remove('hide');
        this.prevBtn.classList.remove('hide');
    }
}
DevilGallery.prototype.setBigImg=function(e){
    //console.log(e.currentTarget.title);
    //console.log(e);

    console.log(e.target);
    if(e.target.tagName=="IMG") {

        let parentEle=e.target.parentElement;
        console.log(this.largeImg.firstChild);
        console.log(e.target.parentElement.href);

        this.largeImg.querySelector('img').src=e.target.parentElement.href;

        this.sliderIndex=parseInt(parentEle.parentElement.dataset.index);
        this.setTitle(e.target.title);
        this.setCurrentSlide(e.target.parentElement.parentElement.dataset.index);
        this.setClassPrevNext(this.sliderIndex);

        e.preventDefault();
    }else if(e.currentTarget.tagName=="A"){
        //console.log(e.target);

        // If user click on Next/Previous Button to change Large Image
        let thumbnailChild=this.sliderIndex+1;

        /* Set Title if user click on Next and Previous Btn */
        let titleTxt=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') img').title;
        this.setTitle(titleTxt);
        this.setCurrentSlide(this.sliderIndex);
        this.setClassPrevNext(this.sliderIndex);

        let prevPatt=/prev/g;
        let nextPatt=/next/g;


        if(prevPatt.test(e.target.className)){
            // If User click on Previous Button
            console.log("Current Index :"+this.sliderIndex);

            let prevImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
            this.largeImg.querySelector('img').src=prevImg.href;
        }else if(nextPatt.test(e.target.className)){
            // If User click on Next Button
            let nextImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
            this.largeImg.querySelector('img').src=nextImg.href;

        }
    }else if(e.type=="keydown"){
        //console.log("I am from keyboard");
        //console.log(e.code);
        //console.log("Slide Index :" + this.sliderIndex);
        let thumbnailChild=this.sliderIndex+1;
        console.log(this.sliderIndex);
        if(this.sliderIndex<this.tot && this.sliderIndex>-1){
            let titleTxt=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') img').title;
            this.setTitle(titleTxt);
            this.setCurrentSlide(this.sliderIndex);
            this.setClassPrevNext(this.sliderIndex);

            //console.log("Keypressed : "+e.code);

            if(e.code=="ArrowRight"){
                if(this.sliderIndex<this.tot){
                    let nextImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
                    this.largeImg.querySelector('img').src=nextImg.href;
                }else{
                    console.log("You can not see next");
                }

            }else if(e.code=="ArrowLeft"){
                console.log("Keyboard Key Arrow LEft is pressed");
                if(this.sliderIndex>=0){
                    let prevImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
                    this.largeImg.querySelector('img').src=prevImg.href;
                }else{
                    console.log("You can not see previous");
                }
            }
        }
    }

}