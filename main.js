statuscheck="";
img="";
objects=[];
song="";
function preload(){
    img=loadImage("dog_cat.jpg");
    song=loadSound("god_we_need_you_now.mp3");

}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting objects";
}
function modelLoaded(){
    console.log("model loaded");
    statuscheck=true;
} 
function gotresult(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}

function draw(){
   image(video,0,0,380,380);
   if(statuscheck!==""){
       r=random(255);
       g=random(255);
       b=random(255);
    objectdetector.detect(video,gotresult);
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="status: object detected";
    document.getElementById("numberofobjects").innerHTML="Number Of Objects Detected Are:"+objects.length;
    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects="person"){
        document.getElementById("status").innerHTML="BABY DETECTED";
        song.stop();
    }
    if(objects!="person"){
        document.getElementById("status").innerHTML="BABY NOT DETECTED";
        song.play();
    }
}
   }
/**fill("#42cef5");
text("dog",45,75);
noFill();
stroke("#1bcca6");
rect(30,60,450,350);
fill("#42cef5");
text("cat",320,120);
noFill();
stroke("#1bcca6");
rect(300,90,270,320);**/
}