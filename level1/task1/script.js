document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const inputs = form.querySelectorAll('input, select');
    const successMessage = document.getElementById('successMessage');
    const countryCodeInput = document.getElementById('countryCode');
    const phoneNumberInput = document.getElementById('phoneNumber');
    
    const validateEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
  
    const validatePassword = (password) => {
      return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    };
  
    const validatePhone = (countryCode, phoneNumber) => {
      // Combine country code and phone number for validation
      const fullPhone = countryCode + phoneNumber;
      return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(fullPhone);
    };
  
    const showError = (input, message) => {
      const errorElement = document.getElementById(input.id + 'Error') || 
                           document.getElementById('phoneError');
      errorElement.style.display = 'block';
      errorElement.textContent = message;
      input.style.borderColor = '#EF4444';
    };
  
    const hideError = (input) => {
      const errorElement = document.getElementById(input.id + 'Error') || 
                           document.getElementById('phoneError');
      errorElement.style.display = 'none';
      input.style.borderColor = '#D1D5DB';
    };
  
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        validateInput(this);
      });
    });
  
    const validateInput = (input) => {
      switch(input.id) {
        case 'name':
          if (!input.value.trim()) {
            showError(input, 'Name is required');
            return false;
          }
          break;
        case 'email':
          if (!validateEmail(input.value)) {
            showError(input, 'Please enter a valid email');
            return false;
          }
          break;
        case 'password':
          if (!validatePassword(input.value)) {
            showError(input, 'Password must be at least 8 characters with 1 uppercase and 1 number');
            return false;
          }
          break;
        case 'phoneNumber':
          if (!validatePhone(countryCodeInput.value, input.value)) {
            showError(input, 'Please enter a valid phone number');
            return false;
          }
          break;
        case 'countryCode':
          if (!input.value.startsWith('+')) {
            showError(input, 'Country code must start with +');
            return false;
          }
          break;
        case 'gender':
          if (!input.value) {
            showError(input, 'Please select a gender');
            return false;
          }
          break;
      }
      hideError(input);
      return true;
    };
  
    countryCodeInput.addEventListener('input', function(e) {
      // Ensure country code starts with + and only contains numbers after
      if (this.value.length === 0) {
        this.value = '+';
      } else if (this.value.length === 1 && this.value !== '+') {
        this.value = '+' + this.value;
      } else if (this.value.length > 1) {
        this.value = '+' + this.value.substring(1).replace(/[^0-9]/g, '');
      }
    });
  
    phoneNumberInput.addEventListener('input', function(e) {
      // Only allow numbers in phone number field
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
  
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });
  
      // Validate phone number combination
      if (!validatePhone(countryCodeInput.value, phoneNumberInput.value)) {
        showError(phoneNumberInput, 'Please enter a valid phone number');
        isValid = false;
      }
  
      if (isValid) {
        const submitButton = document.getElementById('submitButton');
        submitButton.disabled = true;
        submitButton.textContent = 'Processing...';
  
        // Simulate form submission
        setTimeout(() => {
          submitButton.style.display = 'none';
          successMessage.style.display = 'block';
          form.reset();
          countryCodeInput.value = '+1'; // Reset to default country code
          setTimeout(() => {
            submitButton.style.display = 'block';
            submitButton.disabled = false;
            submitButton.textContent = 'Create Account';
            successMessage.style.display = 'none';
          }, 3000);
        }, 1000);
      }
    });
  });