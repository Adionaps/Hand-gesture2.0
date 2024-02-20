prediction1 = ""
prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
}
)

camera = document.getElementById("camera")
Webcam.attach(camera)

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">'
        
    })
}

console.log('ml5 version:-', ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/amENe379E/model.json', modelLoaded)

function modelLoaded(){
    console.log('modelLoaded')
}

function speak(){
    var synth=window.speechSynthesis
    speakdata1="Prediction Is"+prediction1
    

    var utterthis=new SpeechSynthesisUtterance(speakdata1)
    synth.speak(utterthis)
}

function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
        document.getElementById("result_emotion_name1").innerHTML=results[0].label
      
prediction1=results[0].label
prediction2=results[1].label
speak()
if(results[0].label=="Thumbs Up"){
    document.getElementById("update_emoji1").innerHTML="&#128077;"
}
if(results[0].label=="Nice"){
    document.getElementById("update_emoji1").innerHTML="&#128076;"
}
if(results[0].label=="Peace"){
    document.getElementById("update_emoji1").innerHTML="&#9996;"
}

    }
}
