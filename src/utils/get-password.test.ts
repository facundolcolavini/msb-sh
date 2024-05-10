const generator = require('generate-password');
const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/;
describe('generatePassword', () => {
  it('should generate a password that meets the requirements', () => {
    function gp(): string {
      let password = '';
      // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial.
      while (!regex.test(password)) {
          // Debe tener al menos 8 caracteres de largo 
          password = generator.generate({
              length: 20,
              numbers: true,
              symbols: true,
              uppercase: true,
              lowercase: true,
          });
          
      }
      return password;
  }
    const password = gp();
    expect(regex.test(password)).toBe(true);
  });
});

describe('Must be match the password requirements of  my array of passwords', () => {
  test.each([
    'Password1!',
    'AnotherPassword2@',
    'YetAnotherPassword3!',
  ])('should validate password', (password) => {

    expect(regex.test(password)).toBe(true);
  });
});


/* Testing generatePassword function */
describe('generatePassword', () => {
  it('should not generate a password containing #', () => {
    function gp(): string {
      let password = '';
      // La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial.
      while (!regex.test(password)) {
          // Debe tener al menos 8 caracteres de largo 
          password = generator.generate({
              length: 20,
              numbers: true,
              symbols: true,
              uppercase: true,
              lowercase: true,
          });
          
      }
      return password;
  }
    const password = gp();
    expect(password.includes('#')).toBe(false);
  });
});

describe('Must not match the password requirements of my array of passwords', () => {
  test.each([
    'Password1#',
    'AnotherPassword2#',
    'YetAnotherPassword3#',
    // Agrega más contraseñas aquí
  ])('should not validate password %s', (password) => {
    expect(regex.test(password)).toBe(false);
  });
});