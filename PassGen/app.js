// Sukurkite password generatorių, kuris leistų vartotojui:
// Pasirinkit kiek simbolių norės kad būtų slaptažodyje
// Ar būtų didžiosios raidės
// Ar būtų skaičiai
// Ar būtų simboliai
// Leistų sugeneruotą slaptažodį nusikopijuoti vieno mygtuko paspaudimu

function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
  
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
    let allChars = lowercaseChars;
    if (includeUppercase) allChars += uppercaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    if (length < 3 || length > 20) {
      alert("Pasirinkite slaptažodžio ilgį nuo 3 iki 20 simbolių.");
      return;
    }
  
    let password = '';
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * allChars.length);
      password += allChars[index];
    }
  
    document.getElementById('passwordDisplay').value = password;
  }

  
  function copyPassword() {
    const passwordField = document.getElementById('passwordDisplay');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert("Slaptažodis nukopijuotas!");
  }



