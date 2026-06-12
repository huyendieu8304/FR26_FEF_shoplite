document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault(); // prevent browser to  reload

    // reset all old inputted info
    document.querySelectorAll('.error-text').forEach(el => el.textContent = '');
    document.getElementById('success-alert').classList.add('hidden');

    // get value from input fields
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gender = document.getElementById('gender').value;
    const terms = document.getElementById('terms').checked;

    let isValid = true;

    // check full name
    if (fullname === '') {
        document.getElementById('err-fullname').textContent = 'Full name is required.';
        isValid = false;
    }

    // check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('err-email').textContent = 'Email is required.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('err-email').textContent = 'Invalid email format.';
        isValid = false;
    }

    // check password, at least 6 chars
    if (password === '') {
        document.getElementById('err-password').textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('err-password').textContent = 'Password must be at least 6 characters.';
        isValid = false;
    }

    // check phone number, all numbers, 10 digits
    const phoneRegex = /^[0-9]{10}$/;
    if (phone === '') {
        document.getElementById('err-phone').textContent = 'Phone number is required.';
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        document.getElementById('err-phone').textContent = 'Phone number must be 9-11 digits.';
        isValid = false;
    }

    // check gender selection
    if (gender === '') {
        document.getElementById('err-gender').textContent = 'Please select your gender.';
        isValid = false;
    }

    // check agree to terms
    if (!terms) {
        document.getElementById('err-terms').textContent = 'You must agree to the terms.';
        isValid = false;
    }

    // pass all checks
    if (isValid) {
        document.getElementById('success-alert').classList.remove('hidden');
        document.getElementById('register-form').reset(); // Reset form
    }
});