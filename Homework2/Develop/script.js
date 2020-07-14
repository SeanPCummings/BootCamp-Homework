// Assignment Code
var generateBtn = document.querySelector("#generate");
var numCheck = document.getElementById("includeNumbers");
var symCheck = document.getElementById("includeSymbols");
var upperCheck = document.getElementById("includeUpperCase");
var length = document.getElementById("length");
let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!”#$%&’()*+,-./:;<=>?@[\]^_`{|}~1234567890";
var newChar = "";
// Write password to the #password input
function generatePassword() {
    if(upperCheck.checked == true && symCheck.checked == false && numCheck.checked == false){
      newChar = char.substr(0, 51);//Only Letters upper and lowercase//
    }
    else if(upperCheck.checked == true && symCheck.checked == true && numCheck.checked == false){
      newChar = char.substr(0, 83);//Upper Lowercase and Symbols//
    }
    else if(upperCheck.checked == true && symCheck.checked == true && numCheck.checked == true){
      newChar = char.substr(0, 93);//Everything//
    }
    else if(upperCheck.checked == false && symCheck.checked == false && numCheck.checked == false){
      newChar = char.substr(26, 26);//Only Lowercase !This confused me because I had it set to (26, 51) 
      //to include only lower but it included the symbols too, this substr works but it should be empty??//
    }
    else if(upperCheck.checked == true && symCheck.checked == false && numCheck.checked == true){
      newChar = char.substr(0, 51);
      newChar = newChar.concat(char.substr(84, 93));//Upper Lowercase and Numbers 
    }
    else if(upperCheck.checked == false && symCheck.checked == false && numCheck.checked == true){
      newChar = char.substr(26, 51);
      newChar = newChar.concat(char.substr(84, 93));//Lowercase and Numbers//
    }
    else if(upperCheck.checked == false && symCheck.checked == true && numCheck.checked == true){
      newChar = char.substr(26, 93);//Lowercase Symbols and Numbers//
    }
    else if(upperCheck.checked == false && symCheck.checked == true && numCheck.checked == false){
      newChar = char.substr(26, 83);//Lowercase and Symbols//
    }
    else if(upperCheck.checked == false && symCheck.checked == false && numCheck.checked == true){
      newChar = char.substr(0, 51);
      newChar = newChar.concat(char.substr(84, 93));//Lowercase and Numbers//
    }
    var pw = "";
    for(var i = 0; i < length.value; i++ ) {
      pwIndex = Math.floor(Math.random() * Math.floor(newChar.length - 1));//
      pw = pw.concat(newChar.charAt(pwIndex));
    }
    return pw;
}
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  
    passwordText.value = password;
  }
  

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
