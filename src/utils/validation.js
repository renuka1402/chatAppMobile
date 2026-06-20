export const validateLoginForm = ({ username, password }) => {
  const errors = {};

  if (!username.trim()) {
    errors.username = 'Username is required';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  }

  return errors;
};

export const validateRegisterForm = ({ username, password }) => {
  const errors = {};

  if (!username.trim()) {
    errors.username = 'Username is required';
  } else if (username.trim().length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (!password.trim()) {
    errors.password = 'Password is required';
  } else if (password.trim().length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

export const hasValidationErrors = (errors) => Object.keys(errors).length > 0;
