Webcam.set({
width: 350,
height: 300,
image_format:'png',
png_quality:100
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function TakeSnapshot(){
    Webcam.snap(function(data_url){
        document.getElementById("camera_result").innerHTML = "<img id= 'captured_image' src='"+data_url+"'>";
    })
}
console.log("ml5 version "+ ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/2HtdgfpUs/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded Successfully!');
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is " + prediction1;
    speak_data2 = "The second prediction is " + prediction2;
    var utter_this = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utter_this);
}
function observe(){
    img = document.getElementById("captured_image");
    classifier.classify(img, GotResult);
}
function GotResult(error, results){
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        document.getElementById("result_emotion").innerHTML = results[0].label;
        document.getElementById("result_emotion2").innerHTML = results[1].label;
        speak();
        if(results[0].label == "Happy")
        {
            document.getElementById("result_emoji").innerHTML = "&#128522;";
        }
        if(results[0].label == "Sad")
        {
            document.getElementById("result_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "Angry")
        {
            document.getElementById("result_emoji").innerHTML = "&#128545;";
        }
        if(results[1].label == "Happy")
        {
            document.getElementById("result_emoji2").innerHTML = "&#128522;";
        }
        if(results[1].label == "Sad")
        {
            document.getElementById("result_emoji2").innerHTML = "&#128532;";
        }
        if(results[1].label == "Angry")
        {
            document.getElementById("result_emoji2").innerHTML = "&#128545;";
        }
    }
}