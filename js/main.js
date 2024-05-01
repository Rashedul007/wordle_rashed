document.addEventListener("DOMContentLoaded", function(event) { 
 
    const str_todaysWord = "worlD".toUpperCase();

    const el_userInput = document.getElementById("user_input");
    const el_userResult = document.getElementById("user_result");
    const el_editableDiv = document.getElementById("editableDiv");

    el_editableDiv.style.display = "none";

  
   // el_userInput.addEventListener("keypress", myFunction);
   el_userInput.addEventListener("keydown", myFunction);
    

    function myFunction(e) {
        el_userResult.textContent = "";
        el_editableDiv.style.display = "none";  // hide the el_editableDiv when editing input text after Enter press

        

        var pressedKeycode = (e.which) ? e.which : e.keyCode;


        var isValidAlphabet = takeOnlyAlphabet(e, pressedKeycode);

        if (!isValidAlphabet) {
            e.preventDefault();
        }


        // if enter key pressed
        if(pressedKeycode === 13)  
            { 
             var str_userInput   = el_userInput.value.toUpperCase();

            if(str_userInput.length != 5){
                alert("Word needs to be 5 letters!");
            }
            else{
                el_editableDiv.style.display = "block";
            }

            if(str_userInput === str_todaysWord){
                el_userResult.textContent = "Congratulations, You guessed the correct word";
            }


            var arr_userInput = str_userInput.split('');
            var currentValue = '';

            arr_userInput.forEach((chr,indx) => {
                // console.log(`${chr} is in index - ${indx}`);
               var isLetterMatch =  checkLetterMatch(chr, indx , str_todaysWord);
               

                if(isLetterMatch === 1){
                    el_userInput.textContent = chr;

                    currentValue = currentValue + `<span style="background-color:rgb(106, 170, 100);">${chr}</span>`;
                }
                else if(isLetterMatch === 2){
                    currentValue = currentValue + `<span style="background-color:rgb(201, 180, 88);">${chr}</span>`;
                }
                else if(isLetterMatch === 0){
                    currentValue = currentValue + chr;
                }



                    el_editableDiv.innerHTML = currentValue ;
            

            });
              
            } 

        }
  
});


// function to restric input keys to only alphabet 
function takeOnlyAlphabet(ev,ky) {
    if ((ky > 64 && ky < 91) || (ky > 96 && ky < 123) || ky === 8 || ky === 37 || ky === 39  ) {     
        return true;    
    } else {
        return false;
    }
}

// check if letter matches 
function  checkLetterMatch(chr, indx, str_originalWorld){

    if(str_originalWorld.includes(chr)){
        const letterInTodaysWord = str_originalWorld.charAt(indx);
    
        if(chr === letterInTodaysWord){
            return 1; 
        }
        else{
            return 2; // letter is present in original word but not in right position
        }
    }
    
    return 0;
}



