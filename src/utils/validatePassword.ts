export const validatePassword = (password: string): boolean => {
  // Regular expression to match the criteria
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  // Test the password against the regex
  if (!passwordRegex.test(password)) {
    return false;
  }

  return true;
};
