function measureStrength() {
    let passwordElem = document.getElementById('password-input');
    let strengthElem = document.getElementById('strength-level');

    const password = passwordElem.value;
    const numberRegex = /\d/;

    let strengthLevel = 'Weak';

    if (numberRegex.test(password)) {
        if((password.length >= 8) && (password.length < 12)) {
            strengthLevel = 'Strong'
        } else if (password.length >= 12) {
            strengthLevel = 'Very Strong'
        }
    }

    strengthElem.className = strengthLevel.toLocaleLowerCase().replace(' ', '-');
    strengthElem.innerText = strengthLevel
}



