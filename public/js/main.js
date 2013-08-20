var TEXTVALUE;

$(function(){
  initializeSpeakButton();
});

function initializeSpeakButton(){
  $("input[value='Speak']").click(function(){
    var currentTextValue = $('#speaktext').val();
    playTextAsAudio();
    return false;
  });
}

function playTextAsAudio(){
  var text = $('#speaktext').val();
  $.ajax({
    type: "POST",
    url: "get-speech",
    data: { text: text }
  }).done(function( res ) {
    console.log( "Response: " + res );
    createAudioElement(res);
  });
}

function createAudioElement(url){
  var audio_element = "<audio id=\"player\"><source src=\""+url+"\" type=\"audio/mpeg\" />Your browser does not support the audio element.</audio>"
  $('#audio_container').html(audio_element);
  $('#player')[0].play();
}
