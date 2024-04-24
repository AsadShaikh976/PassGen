// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the generate button, copy button, and strength bar element
    const generateBtn = document.querySelector('.generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const strengthBar = document.querySelector('.strength-bar'); 

    // Add event listener to the generate button
    generateBtn.addEventListener('click', function() {
        // Get values of user inputs and options
        const favoritePlace = document.getElementById('favorite-place').value;
        const favoriteFood = document.getElementById('favorite-food').value;
        const memorableWord = document.getElementById('memorable-word').value;
        const passwordLength = parseInt(document.getElementById('password-length').value);
        const includeNumbers = document.getElementById('include-numbers').checked;
        const includeSymbols = document.getElementById('include-symbols').checked;
        const includeFavoritePlace = document.getElementById('include-favorite-place').checked;
        const includeFavoriteFood = document.getElementById('include-favorite-food').checked;
        const includeMemorableWord = document.getElementById('include-memorable-word').checked;

        // Check if at least one option is selected
        if (!includeNumbers && !includeSymbols && !includeFavoritePlace && !includeFavoriteFood && !includeMemorableWord) {
            alert('Please check at least one option before generating the password.');
            return; // Exit the function if no option is selected
        }
        
        // Combine user inputs
        let userInput = '';
        if (includeFavoritePlace && favoritePlace) {
            userInput += favoritePlace;
        }
        if (includeFavoriteFood && favoriteFood) {
            userInput += favoriteFood;
        }
        if (includeMemorableWord && memorableWord) {
            userInput += memorableWord;
        }

        // Generate password based on user inputs
        let password = generatePassword(userInput, passwordLength, includeNumbers, includeSymbols);

        // Display generated password
        const generatedPasswordInput = document.getElementById('generated-password');
        generatedPasswordInput.value = password;

        // Show the outcome section
        const generatedPasswordSection = document.querySelector('.outcome');
        generatedPasswordSection.style.display = 'block';

        // Change color of the strength bar based on password length
        if (passwordLength < 8) {
            strengthBar.style.backgroundColor = 'red';
        } else if (passwordLength >= 8 && passwordLength <= 16) {
            strengthBar.style.backgroundColor = 'orange';
        } else {
            strengthBar.style.backgroundColor = 'green';
        }
    });

    // Add event listener to the copy button
    copyBtn.addEventListener('click', function() {
        const generatedPasswordInput = document.getElementById('generated-password');
        generatedPasswordInput.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    });

    // Add event listener to the password length slider
    const passwordLengthSlider = document.getElementById('password-length');
    const passwordLengthDisplay = document.getElementById('password-length-display');
    passwordLengthSlider.addEventListener('input', function() {
        passwordLengthDisplay.textContent = this.value;
        
        // Change color of the strength bar dynamically as password length changes
        const passwordLength = parseInt(this.value);
        if (passwordLength < 8) {
            strengthBar.style.backgroundColor = 'red';
        } else if (passwordLength >= 8 && passwordLength <= 16) {
            strengthBar.style.backgroundColor = 'orange';
        } else {
            strengthBar.style.backgroundColor = 'green';
        }
    });
});

// Function to generate a password
function generatePassword(userInput, length, includeNumbers, includeSymbols) {
    const symbols = '!@#$%^&*';
    let password = '';
    const charSet = [];

    // Add user input characters to the character set
    if (userInput && userInput.length > 0) {
        charSet.push(...userInput.split(''));
    }

    // Add numbers to the character set if selected
    if (includeNumbers) {
        for (let i = 0; i <= 9; i++) {
            charSet.push(i.toString());
        }
    }

    // Add symbols to the character set if selected
    if (includeSymbols) {
        charSet.push(...symbols.split(''));
    }

    // Generate password characters randomly from the character set
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
    }

    return password;
}
