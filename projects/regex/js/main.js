var maxWords = 10;
var wordCountOutput = document.getElementById('wordCountOutput');
var essay = document.getElementById('essayDesc');

function wordCounter() {
  var essay_val = essay.value;
  var leftTrim = /^\s+/;
  var trimmed = essay_val.replace(leftTrim, "");
  var splitString = trimmed.split(/\s+|[\w\d]$|[.?!"]$/);
  var wordCount = (navigator.userAgent.indexOf('MSIE') > 0 ) ? (splitString.length+1) : splitString.length;
  
  return wordCount;
}

function liveCount(){
  var curCount = wordCounter();

  wordCountOutput.style.color = "#333";
  wordCountOutput.innerHTML = (curCount -1) + " of " + maxWords + " words";
  
  if (curCount > maxWords+1){
    wordCountOutput.style.color = "red";
    wordCountOutput.innerHTML = "You've gone over " + maxWords + " words by " + (curCount-(maxWords+1)) + " word(s).";
  }
}

function wordLimit(){
  if (wordCounter() > maxWords + 1){
    return false;
  }else{
    return true;
  }
}