import generator from 'generate-password';

export function generatePassword(): string {
    let password = '';
    while (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
        password = generator.generate({
            length: 10,
            numbers: true,
            symbols: true,
            uppercase: true,
            lowercase: true,
            strict: true
        });
    }
    return password;
}

