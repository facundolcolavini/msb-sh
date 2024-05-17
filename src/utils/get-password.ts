import generator from 'generate-password';

export function generatePassword(): string {
    let password = '';
    // La contraseña debe tener entre 8 y 50 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial.
    while (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,50}$/.test(password)) {
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

