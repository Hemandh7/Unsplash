let galleryImages=document.querySelectorAll(".gallery-img");
let imgArr=[];
for(let i=0;i<galleryImages.length;i++){
    imgArr.push(galleryImages[i].src);
}
let getLatestOpenedImg;

localStorage.setItem("imgList",JSON.stringify(imgArr));


let windowWidth=window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image,index) {
        
        image.onclick=function(){
           getLatestOpenedImg=index;

           let container=document.body;
           let newImgWindow=document.createElement("div")
           container.appendChild(newImgWindow);
           newImgWindow.setAttribute("class","img-window");
           newImgWindow.setAttribute("onclick","closeImg()");

           let newImg=document.createElement("img");
           newImgWindow.appendChild(newImg);
           newImg.setAttribute("src",image.src);
           newImg.setAttribute("id","current-img");

           newImg.onload= function(){
            let imgWidth=this.width;
            let calcImgToEdge=(windowWidth-imgWidth)/2-80;


            let newNextBtn=document.createElement("a");
            let btnNextText=document.createTextNode(">");
            newNextBtn.appendChild(btnNextText);
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute("class","img-btn-next");
            newNextBtn.setAttribute("onclick","changeImg(1)");
            
            newNextBtn.style.cssText="right:"+calcImgToEdge+"px;";


            let newPrevBtn=document.createElement("a");
            let btnPrevText=document.createTextNode("<");
            newPrevBtn.appendChild(btnPrevText);
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute("class","img-btn-prev");
            newPrevBtn.setAttribute("onclick","changeImg(0)");
            newPrevBtn.style.cssText="left:"+calcImgToEdge+"px;";

           }
        
           

        }
    });
}
function closeImg(){
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir){
let getImageWindow=document.querySelector(".img-window");
    getImageWindow.innerHTML="";
   
let imglist=JSON.parse(localStorage.getItem("imgList"))||[];

let newImg= document.createElement("img");

let calcNewImg;
if(changeDir==1){
    calcNewImg=getLatestOpenedImg+1;
    if(calcNewImg>imglist.length){
        calcNewImg=0;
    }
}
else if(changeDir==0){
    calcNewImg=getLatestOpenedImg-1;
    if(calcNewImg<1){
        calcNewImg=imglist.length-1;
        
    }
}

newImg.setAttribute("src",imglist[calcNewImg]);
console.log(imglist[calcNewImg])
newImg.setAttribute("id","current-img");

getLatestOpenedImg=calcNewImg;

newImg.onload=function(){
    let windowWidth=window.innerWidth;
    let imgWidth=this.width;
    let calcImgToEdge=(windowWidth-imgWidth)/2-50;

    let nextBtn=document.querySelector(".img-btn-next");
    nextBtn.style.cssText="right:"+calcImgToEdge+"px;";
    
    let prevBtn=document.querySelector(".img-btn-prev");
    prevBtn.style.cssText="left:"+calcImgToEdge+"px;";
}
getImageWindow.append(newImg);
}
