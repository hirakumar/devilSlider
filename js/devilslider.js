const DevilGallery = function(sel){

    DevilGallery.init(sel);
    DevilGallery.setLargeImage();
    DevilGallery.setEvent();
    DevilGallery.setThumbnailIndex();
    DevilGallery.setTitle();
    DevilGallery.setCurrentSlide();
}
DevilGallery.gallery;
DevilGallery.nextBtn;
DevilGallery.prevBtn;
DevilGallery.ele;
DevilGallery.tot;
DevilGallery.thumbnail;
DevilGallery.thumbnailGap=15;
DevilGallery.thumbnailItemNo;
DevilGallery.thumbnailItemWidth;
DevilGallery.thumbnailUL;
DevilGallery.thumbnailPos=0;
DevilGallery.thumbnailImgHeight=141;
DevilGallery.thumbnailImgWidth=240;
DevilGallery.largeImg;
DevilGallery.sliderIndex=0;
DevilGallery.slideTitle;
DevilGallery.thumbnailToggle;
DevilGallery.thumbnailCounter=false;
DevilGallery.lightBox;
DevilGallery.lightBoxToggle=false;
DevilGallery.closeBtn;
DevilGallery.maxScrollY;
DevilGallery.eachScrollY;
DevilGallery.currentSlideEle;
DevilGallery.animationStatus;



DevilGallery.setThumbnailIndex=function(){
    var allLi=this.thumbnail.querySelectorAll('ul li');

    var i=0;
    while(i<allLi.length){
        allLi[i].setAttribute('data-index',i);
        i++;
    }
}
DevilGallery.setCurrentSlide=function(myindex){

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
DevilGallery.init=function(sel){

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

   
    
}
DevilGallery.setKeyBoardAction=function(e){
    //console.log(e.key);
    console.log(e.key);
    if(e.key=="ArrowRight"){
        DevilGallery.setNext(e);
    }
    if(e.key=="ArrowLeft"){
        //console.log("Called method setPrev");
        DevilGallery.setPrev(e);
    }
    if(e.key=="Escape"){
        console.log(this.ele);
        DevilGallery.ele.classList.remove('lightBox');
    }
    //

}
DevilGallery.setTitle=function(title){

    this.slideTitle=document.getElementById("title");
    if(title != undefined){
        this.slideTitle.innerHTML=title;
    }else{

        let firstEle=this.thumbnail.querySelector('ul li:first-child img');
        this.slideTitle.innerHTML=firstEle.title;
    }


}
DevilGallery.setNext=function(e){

    console.log("Slide Index :" + DevilGallery.sliderIndex + " and Total Index :"+DevilGallery.tot);
    if(DevilGallery.sliderIndex<DevilGallery.tot-1){
        DevilGallery.thumbnailPos-=DevilGallery.thumbnailImgHeight;
        DevilGallery.thumbnail.scrollTop+=DevilGallery.eachScrollY;
        DevilGallery.sliderIndex++;
        DevilGallery.currentSlideEle.innerHTML=DevilGallery.sliderIndex+1;
        DevilGallery.setBigImg(e);
    }

}
DevilGallery.setPrev=function(e){

    if(DevilGallery.sliderIndex>0){
        console.log(DevilGallery.thumbnail);
        DevilGallery.thumbnailPos+=DevilGallery.thumbnailImgHeight;
        //this.thumbnailUL.style.transform="translateY("+this.thumbnailPos+"px)";
        DevilGallery.thumbnail.scrollTop-=DevilGallery.eachScrollY;
        DevilGallery.sliderIndex--;
         DevilGallery.currentSlideEle.innerHTML=DevilGallery.sliderIndex+1;
        DevilGallery.setBigImg(e);

    }
}

DevilGallery.setLargeImage=function(){
    this.largeImg =this.ele.querySelector('.largeImage');
    // this.ele.querySelector('li img');
    if(this.largeImg.children.length<1){
        let firstEle=this.thumbnail.querySelector('li:first-child a');
		let secondEle=this.thumbnail.querySelector('li:nth-child(2) a');
		
		// First Image
        let img1 = document.createElement('IMG');
        console.log(firstEle);
        img1.src=firstEle.href;
		this.largeImg.appendChild(img1);
		 


    }

}

DevilGallery.setEvent=function(){
    for(index of this.ele.querySelectorAll('.thumbnail li img')){
        index.addEventListener("click",this.setBigImg);
    }
    this.nextBtn.addEventListener("click",this.setNext);
    this.prevBtn.addEventListener("click",this.setPrev);
    this.thumbnailToggle.addEventListener("click",this.setThumbNailToggle);
    this.lightBox.addEventListener("click",this.setLightBoxToggle);
    this.closeBtn.addEventListener("click",this.closeLightBox);
	window.addEventListener('keydown', this.setKeyBoardAction);

}
DevilGallery.destroy=function(){
	/* Remove EventListener */
    for(index of this.ele.querySelectorAll('.thumbnail li img')){
        index.removeEventListener("click",this.setBigImg);
    }
    this.nextBtn.removeEventListener("click",this.setNext);
    this.prevBtn.removeEventListener("click",this.setPrev);
    this.thumbnailToggle.removeEventListener("click",this.setThumbNailToggle);
    this.lightBox.removeEventListener("click",this.setLightBoxToggle);
    this.closeBtn.removeEventListener("click",this.closeLightBox);
	window.removeEventListener('keydown', this.setKeyBoardAction);
	
	/* Remove Child of DevilGallery */
	this.ele.innerHTML='';
	
	/* Delete propery */
	delete DevilGallery.gallery;
	delete DevilGallery.nextBtn;
	delete DevilGallery.prevBtn;
	delete DevilGallery.ele;
	delete DevilGallery.tot;
	delete DevilGallery.thumbnail;
	delete DevilGallery.thumbnailGap;
	delete DevilGallery.thumbnailItemNo;
	delete DevilGallery.thumbnailItemWidth;
	delete DevilGallery.thumbnailUL;
	delete DevilGallery.thumbnailPos;
	delete DevilGallery.thumbnailImgHeight;
	delete DevilGallery.thumbnailImgWidth;
	delete DevilGallery.largeImg;
	delete DevilGallery.sliderIndex;
	delete DevilGallery.slideTitle;
	delete DevilGallery.thumbnailToggle;
	delete DevilGallery.thumbnailCounter;
	delete DevilGallery.lightBox;
	delete DevilGallery.lightBoxToggle;
	delete DevilGallery.closeBtn;
	delete DevilGallery.maxScrollY;
	delete DevilGallery.eachScrollY;
	delete DevilGallery.currentSlideEle;
	delete DevilGallery.animationStatus;
}

DevilGallery.closeLightBox=function(){
    DevilGallery.ele.classList.remove('lightBox');
    document.querySelector('body').classList.remove('lightBoxActive');
}
DevilGallery.setLightBoxToggle=function(){
    console.log("Light Box "+ DevilGallery.lightBoxToggle);

    if(DevilGallery.lightBoxToggle == false){

        document.querySelector('body').classList.add('lightBoxActive');
        DevilGallery.ele.classList.add('lightBox');
        DevilGallery.lightBoxToggle=true;
    }else if(DevilGallery.lightBoxToggle == true){

        //sthis.ele.classList.remove('lightBox');
        document.querySelector('body').classList.remove('lightBoxActive');

        DevilGallery.lightBoxToggle=false;
    }

}
DevilGallery.setThumbNailToggle=function(e){
    console.log("Set Extract Toggle");
    console.log(DevilGallery.ele);
    console.log(e.target);
    if(DevilGallery.thumbnailCounter==false){
        DevilGallery.ele.classList.add('extract');
        DevilGallery.thumbnailCounter=true;
        e.target.classList.add('deactive');
    }else{
        DevilGallery.ele.classList.remove('extract');
        DevilGallery.thumbnailCounter=false;
        e.target.classList.remove('deactive');
    }
}
DevilGallery.setClassPrevNext=function(){
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
DevilGallery.nextSlideAnimation=function(href){
	console.log(this.largeImg.childElementCount);
	
		// 
		
		// First Image
		let firstImg=this.largeImg.querySelector('img:first-child');
		firstImg.style.WebkitAnimation = "fadeOut 1s";
		firstImg.style.animation = "fadeOut 1s";   
		firstImg.addEventListener("webkitAnimationEnd", function(){
		this.parentElement.removeChild(this);
		console.log(DevilGallery.sliderIndex);
		});

		// Last Image
		let img=document.createElement('IMG');
		img.src=href;
		this.largeImg.appendChild(img);
		let lastImg=this.largeImg.querySelector('img:last-child');
		lastImg.style.WebkitAnimation = "fadeIn 1s";
		lastImg.style.animation = "fadeIn 1s"; 
	
}

DevilGallery.setBigImg=function(e){
    //console.log(e.currentTarget.title);
    //console.log(e);

    console.log(e.target);
    if(e.target.tagName=="IMG") {
		console.log(DevilGallery.sliderIndex);
        let parentEle=e.target.parentElement;
        
		 
		DevilGallery.nextSlideAnimation(e.target.parentElement.href);
		
        DevilGallery.sliderIndex=parseInt(parentEle.parentElement.dataset.index);
        DevilGallery.setTitle(e.target.title);
        DevilGallery.setCurrentSlide(e.target.parentElement.parentElement.dataset.index);
        DevilGallery.setClassPrevNext(DevilGallery.sliderIndex);
		console.log(DevilGallery.sliderIndex);

        e.preventDefault();
    }else if(e.currentTarget.tagName=="A"){
        //console.log(e.target);

        // If user click on Next/Previous Button to change Large Image
        let thumbnailChild=DevilGallery.sliderIndex+1;

        /* Set Title if user click on Next and Previous Btn */
        let titleTxt=DevilGallery.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') img').title;
        DevilGallery.setTitle(titleTxt);
        DevilGallery.setCurrentSlide(DevilGallery.sliderIndex);
        DevilGallery.setClassPrevNext(DevilGallery.sliderIndex);

        let prevPatt=/prev/g;
        let nextPatt=/next/g;


        if(prevPatt.test(e.target.className)){
            // If User click on Previous Button
            console.log("Current Index :"+DevilGallery.sliderIndex);

            let prevImg=DevilGallery.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
            //this.largeImg.querySelector('img').src=prevImg.href;
			DevilGallery.nextSlideAnimation(prevImg.href);
        }else if(nextPatt.test(e.target.className)){
            // If User click on Next Button
            let nextImg=DevilGallery.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
            //this.largeImg.querySelector('img').src=nextImg.href;
			DevilGallery.nextSlideAnimation(nextImg.href);

        }
    }else if(e.type=="keydown"){
        
        let thumbnailChild=DevilGallery.sliderIndex+1;
        
        if(DevilGallery.sliderIndex<DevilGallery.tot && DevilGallery.sliderIndex>-1){
            let titleTxt=DevilGallery.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') img').title;
            DevilGallery.setTitle(titleTxt);
            DevilGallery.setCurrentSlide(DevilGallery.sliderIndex);
            DevilGallery.setClassPrevNext(DevilGallery.sliderIndex);

            if(e.code=="ArrowRight"){
                if(DevilGallery.sliderIndex<DevilGallery.tot){
                    let nextImg=DevilGallery.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
                   // this.largeImg.querySelector('img').src=nextImg.href;
				   DevilGallery.nextSlideAnimation(nextImg.href);
                }else{
                    console.log("You can not see next");
                }

            }else if(e.code=="ArrowLeft"){
                console.log("Keyboard Key Arrow LEft is pressed");
                if(DevilGallery.sliderIndex>=0){
                    let prevImg=DevilGallery.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') a');
                   // this.largeImg.querySelector('img').src=prevImg.href;
					DevilGallery.nextSlideAnimation(prevImg.href);
                }else{
                    console.log("You can not see previous");
                }
            }
        }
    }

}