image_ofDC = "";
status = "";

objects = "";

function preload(){

}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetection = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting objects....";
    
}

function modelLoaded(){
    console.log("cocossd is initialized!");

    status = 'true';

    
}

function draw(){
image(video, 0, 0, 380, 380);



if(status != ""){
   
    document.getElementById('status').innerHTML = "Object(s) Identified!!";
    document.getElementById('no_of_objects').innerHTML = "Number of object(s) identified : " + objects.length;
    objectDetection.detect(video, gotResults);

    for(i = 0; i < objects.length; i++){

        r = random(255);
        g = random(255);
        b = random(255);

        fill(r,g,b);
        confidence = floor(objects[i].confidence * 100);
        text(objects[i].label +" "+ confidence + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    
}





}

function gotResults(error, results){

    if(error){
        console.log(error);
    }
    else{

        console.log(results);
        objects = results

                
    }

}

