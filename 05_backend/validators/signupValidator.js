const validateUsername = (username) => {
  // Validate username format: should not start with a number or special character, should not have capital letters, and should have characters between 6 and 16, alphanumeric only
  const usernameRegex = /^[a-z][a-z0-9]{5,15}$/;
  return usernameRegex.test(username);
};

const validatePassword = (password) => {
  // Validate password length: should have between 8 and 32 characters, at least one letter, one number, and a combination of uppercase and lowercase letters and special characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
  return passwordRegex.test(password);
};

module.exports = { validateUsername, validatePassword };
