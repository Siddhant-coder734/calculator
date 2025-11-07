let string = "";
let buttons = document.querySelectorAll(".button");
let resultArea = document.querySelector(".result");

// --- Existing logic for button clicks remains the same ---
buttons.forEach((btn)=>{
   btn.addEventListener("click", (e) => {
      // Logic for '=', 'c', and normal input (as you had it)
      handleInput(e.target.innerText);
   })
})

// --- NEW Function to process all input (button OR keyboard) ---
function handleInput(key) {
   // Use a switch statement for cleaner handling of different inputs
   switch(key) {
      case '=':
      case 'Enter': // Map 'Enter' key to the '=' action
         try{
            // IMPORTANT: Check if the string is empty before evaluating
            if (string.trim() !== "") {
               string = eval(string);
               resultArea.value = string;
            }
         }catch(err) {
            resultArea.value = "Error"; // Display error to the user
            console.log(err, "in =");
            string = ""; // Reset string after error
         }
         break;

      case 'c':
      case 'C':
      case 'Escape': // Map 'Escape' key to the 'c' (Clear) action
         try{
            string = "";
            resultArea.value = string;
         }catch(err){
            console.log(err,"in clear" );
         }
         break;
      case 'Del':
      case 'Backspace': // Map 'Backspace' key for deleting last character
         try {
             string = string.substring(0, string.length - 1);
             resultArea.value = string;
         } catch(err) {
             console.log(err, "in backspace");
         }
         break;

      default:
         // This block handles numbers and operators
         // Use a regular expression to only allow valid calculator inputs
         if (/[0-9+\-*/.]/.test(key)) {
             try{
                 string = string + key;
                 resultArea.value = string;
             }catch(err){
                 console.log(err,"in normal");
             }
         }
         break;
   }
}

// --- NEW Logic for Keyboard Input ---
document.addEventListener("keydown", (e) => {
    // Prevent the default browser actions for these keys (e.g., submitting a form on Enter)
    e.preventDefault(); 
    
    // Call the unified input handler with the pressed key
    handleInput(e.key);
    
});




