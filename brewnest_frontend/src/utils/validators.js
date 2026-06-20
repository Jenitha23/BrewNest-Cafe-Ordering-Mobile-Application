export const validators = {
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  },

  validatePassword: (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,}$/;
    if (!passwordRegex.test(password)) {
      return 'Password must contain uppercase, lowercase, number, and special character';
    }
    return null;
  },

  validateFullName: (name) => {
    if (!name) return 'Full name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    if (name.length > 100) return 'Name must not exceed 100 characters';
    return null;
  },

  validatePhoneNumber: (phone) => {
    if (phone && !phone.match(/^[0-9]{10,15}$/)) {
      return 'Phone number must be 10-15 digits';
    }
    return null;
  },
};

export default validators;