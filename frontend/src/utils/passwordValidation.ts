
interface PasswordRequirement {
  id: string;
  label: string;
  test: (pass: string) => boolean;
}

export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { id: 'length', label: '8-100 characters', test: (p) => p.length >= 8 && p.length <= 100 },
  { id: 'uppercase', label: 'At least one uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { id: 'lowercase', label: 'At least one lowercase letter', test: (p) => /[a-z]/.test(p) },
  { id: 'number', label: 'At least one number', test: (p) => /[0-9]/.test(p) },
  { id: 'special', label: 'At least one special character (@#$%^&*)', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
  { id: 'no-space', label: 'No spaces allowed', test: (p) => !p.includes(' ') },
];

export const validatePassword = (password: string, email?: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  PASSWORD_REQUIREMENTS.forEach(req => {
    if (!req.test(password)) {
      errors.push(req.label);
    }
  });

  if (email && password.toLowerCase() === email.toLowerCase()) {
    errors.push('Password cannot be same as email');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
