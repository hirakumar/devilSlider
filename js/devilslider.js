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
	
	DevilGallery.prototype.setThumbnailIndex=function(){
		var allLi=this.thumbnail.querySelectorAll('ul li');
		
		var i=0;
		while(i<allLi.length){
			allLi[i].setAttribute('data-index',i);
			i++;
		}
	}
	DevilGallery.prototype.setCurrentSlide=function(index){
		parseInt(index);
		//In Default Setting for Current Slide
		
		if(index==undefined){
			this.thumbnail.querySelector('ul li:first-child').classList.add('current');
		}
		
		//If User Click on thumbnail
		if(index!=undefined){
			//index++;
			console.log("Index :" +parseInt(index));
			console.log(index);
			let allLi = this.thumbnail.querySelectorAll('ul li');
			
			let i=0;
			let nextSlide=0;
			while(i<allLi.length){
				
				if(index==i){
					nextSlide=parseInt(index)+1;
					console.log("Current LI :"+nextSlide);
					allLi[index].classList.add('current');
					console.log("I found on "+i);
				}else{
					allLi[i].classList.remove('current');
				}
				i++;
			}
			
		}
	}
	DevilGallery.prototype.init=function(sel){
		
		this.ele=document.querySelector(sel);
		this.tot=this.ele.querySelectorAll('.thumnail li').length;
		
		
		this.nextBtn=this.ele.querySelector('.pagination .next');
		this.prevBtn=this.ele.querySelector('.pagination .prev');
		if(this.sliderIndex==0){
			this.prevBtn.classList.add('hide');
		}
		this.thumbnail=this.ele.querySelector('.thumnail');
		this.thumbnailUL=this.thumbnail.querySelector('UL');
		this.thumbnailItemNo=4;
		this.thumbnailItemWidth=240;
		
		// Thumbnail Toggle
		this.thumbnailToggle=this.ele.querySelector('a#extract');
		
		// lightBox
		this.lightBox=this.ele.querySelector("#lightBox");
		
		// Close Button of Light Box
		this.closeBtn=this.ele.querySelector('.closeSlider');
		
		window.addEventListener('keydown', this.setKeyBoardAction.bind(this));
		
	}
	DevilGallery.prototype.setKeyBoardAction=function(e){
		//console.log(e.keyCode);
		
		
		
			//this.setNext(e);
		
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
		console.log(e);
		console.log(this.thumbnail);
		//var siftWidth=this.thumbnailItemNo*this.thumbnailItemWidth;
		if(this.sliderIndex<this.tot){
			this.thumbnailPos-=this.thumbnailImgHeight;
			this.thumbnailUL.style.transform="translateY("+this.thumbnailPos+"px)";
			this.sliderIndex++;
			this.setBigImg(e);
		}
		
		//console.log("Thumbnail Pos : " + this.thumbnailPos);
	}
	DevilGallery.prototype.setPrev=function(e){
		console.log(e);
		console.log(this.thumbnail);
		//var siftWidth=this.thumbnailItemNo*this.thumbnailItemWidth;
		this.thumbnailPos+=this.thumbnailImgHeight;
		this.thumbnailUL.style.transform="translateY("+this.thumbnailPos+"px)";
		this.sliderIndex--;
		this.setBigImg(e);
		//console.log("Thumbnail Pos : " + this.thumbnailPos);
	}
	
	DevilGallery.prototype.setLargeImage=function(){
		this.largeImg =this.ele.querySelector('.largeImage');
		// this.ele.querySelector('li img');
		if(this.largeImg.children.length<1){
			let firstEle=document.querySelector('.thumnail li');
			this.largeImg.innerHTML=firstEle.innerHTML;
		}
		
	}
	
	DevilGallery.prototype.setEvent=function(){
		for(index of this.ele.querySelectorAll('.thumnail li img')){
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
	}
	DevilGallery.prototype.setLightBoxToggle=function(){
		console.log("Light Box "+ this.lightBoxToggle);
		if(this.lightBoxToggle==false){
			this.ele.classList.add('lightBox');
			this.lightBoxToggle=true;
		}else{
			this.ele.classList.remove('lightBox');
			this.lightBoxToggle=false;
		}
	}
	DevilGallery.prototype.setThumbNailToggle=function(){
		console.log("Set Extract Toggle");
		console.log(this.ele);
		
		if(this.thumbnailCounter==false){
			this.ele.classList.add('extract');
			this.thumbnailCounter=true;
		}else{
			this.ele.classList.remove('extract');
			this.thumbnailCounter=false;
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
		
		if(e.currentTarget.tagName=="IMG") {
			let parentEle=e.currentTarget.parentElement;
			this.largeImg.innerHTML=e.target.parentElement.innerHTML;
			this.sliderIndex=parseInt(parentEle.dataset.index);
			this.setTitle(e.currentTarget.title);
			this.setCurrentSlide(e.currentTarget.parentElement.dataset.index);
			this.setClassPrevNext(this.sliderIndex);
			
		}else if(e.currentTarget.tagName=="A"){
			//console.log(e.currentTarget);
			
			// If user click on Next/Previous Button to change Large Image
			let thumbnailChild=this.sliderIndex+1;
			
			/* Set Title if user click on Next and Previous Btn */
			let titleTxt=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') img').title;
			this.setTitle(titleTxt);
			this.setCurrentSlide(this.sliderIndex);
			this.setClassPrevNext(this.sliderIndex);
			
			let prevPatt=/prev/g;
			let nextPatt=/next/g;
			
			
			if(prevPatt.test(e.currentTarget.className)){
				// If User click on Previous Button
				console.log("Current Index :"+this.sliderIndex);
				
				let prevImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+')');
				this.largeImg.innerHTML=prevImg.innerHTML;
			}else if(nextPatt.test(e.currentTarget.className)){
				// If User click on Next Button
				let nextImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+')');
				this.largeImg.innerHTML=nextImg.innerHTML;
				
			}
		}else if(e.type=="keydown"){
			console.log("I am from keyboard");
			console.log(e.code);
			console.log("Slide Index :" + this.sliderIndex);
			let thumbnailChild=this.sliderIndex+1;
			
			if(this.sliderIndex<this.tot && this.sliderIndex>0){
			let titleTxt=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+') img').title;
			this.setTitle(titleTxt);
			this.setCurrentSlide(this.sliderIndex);
			this.setClassPrevNext(this.sliderIndex);
			
			
			
			if(e.code=="ArrowRight"){
				if(this.sliderIndex<this.tot){
					let nextImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+')');
					this.largeImg.innerHTML=nextImg.innerHTML;
				}else{
					console.log("You can not see next");
				}
				
			}else if(e.code=="ArrowLeft"){
				if(this.sliderIndex>1){
					let prevImg=this.thumbnail.querySelector('ul li:nth-child('+thumbnailChild+')');
					this.largeImg.innerHTML=prevImg.innerHTML;
				}else{
					console.log("You can not see previous");
				}
			}
			}
		}
		
	}