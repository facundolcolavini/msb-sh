

export interface FormValidations {
  [key: string]: any;
}

export interface formCheckedValues {
  usernameValid: null | string;
  firstNameValid: null | string;
  lastNameValid: null | string;
  emailValid: null | string;
  passwordValid: null | string;
  phoneValid: null | string;
  phoneAlternativeValid: null | string;
  streetValid: null | string;
  addressNumberValid: null | string;
  locationValid: null | string;
  contactNameValid: null | string;
  contactLastNameValid: null | string;
  contactEmailValid: null | string;
  contactPhoneValid: null | string;
  contactMessageValid: null | string;
  contactFileValid: null | File;
  currentPasswordValid: null | string;
  confirmPasswordValid: null | string;
}


export const formRegisterValidator = {
  email: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  firstName: [
    (value: string): boolean => isValidName(value.trim()),
    'El nombre es requerido y debe ser de 3 a 50 caracteres'
  ],
  lastName: [
    (value: string): boolean => isValidName(value.trim()),
    'El apellido es requerido y debe ser de 3 a 50 caracteres'
  ],
  password: [(value: string): boolean => isValidPassword(value.trim()), 'La contraseña es requerida y debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial']
}

export const formLoginValidator = {
  email: [
    (value: string): boolean => isValidEmail(value.trim()),
    'El correo debe tener un formato válido y debe tener un máximo de 50 caracteres'
  ],
  password: [(value: string): boolean => isValidPassword(value.trim()), 'La contraseña es requerida y debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial']
}

export const formContactValidator = {
  contactName: [
    (value: string): boolean => isValidName(value.trim()),
    'El nombre es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactEmail: [
    (value: string): boolean => isValidEmail(value.trim()),
    'El correo debe tener un formato válido y debe tener un máximo de 50 caracteres'
  ],
  contactPhone: [
    (value: string): boolean => isValidPhone(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => isValidMessage(value.trim()),
    'El mensaje es requerido y debe  debe ser de 50 a 250 caracteres'
  ],
};


export const formContactReviewValidator = {
  contactName: [
    (value: string): boolean => isValidName(value.trim()),
    'El nombre es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactLastName: [
    (value: string): boolean => isValidName(value.trim()),
    'El apellido es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactEmail: [
    (value: string): boolean => isValidEmail(value.trim()),
    'El correo debe tener un formato válido y debe tener un máximo de 50 caracteres'
  ],
  contactPhone: [
    (value: string): boolean => isValidPhone(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => isValidMessage(value.trim()),
    'El mensaje es requerido y debe  debe ser de 50 a 250 caracteres'
  ],
};


export const formContactAppraisalsValidator = {
  contactName: [
    (value: string): boolean => isValidName(value.trim()),
    'El nombre es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactLastName: [
    (value: string): boolean => isValidName(value.trim()),
    'El apellido es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactEmail: [
    (value: string): boolean => isValidEmail(value.trim()),
    'El correo debe tener un formato válido y debe tener un máximo de 50 caracteres'
  ],
  contactPhone: [
    (value: string): boolean => isValidPhone(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => isValidMessage(value.trim()),
    'El mensaje es requerido y debe  debe ser de 50 a 250 caracteres'
  ],
};

export const formContactAdministrationValidator = {
  contactName: [
    (value: string): boolean => isValidName(value.trim()),
    'El nombre es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactLastName: [
    (value: string): boolean => isValidName(value.trim()),
    'El apellido es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactEmail: [
    (value: string): boolean => isValidEmail(value.trim()),
    'El correo debe tener un formato válido y debe tener un máximo de 50 caracteres'
  ],
  contactPhone: [
    (value: string): boolean => isValidPhone(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => isValidMessage(value.trim()),
    'El mensaje es requerido y debe  debe ser de 50 a 250 caracteres'
  ],
};

export const formContactJoinValidator = {
  contactName: [
    (value: string): boolean => isValidName(value.trim()),
    'El nombre es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactLastName: [
    (value: string): boolean => isValidName(value.trim()),
    'El apellido es requerido y debe ser de 3 a 50 caracteres'
  ],
  contactEmail: [
    (value: string): boolean => isValidEmail(value.trim()),
    'El correo debe tener un formato válido y debe tener un máximo de 50 caracteres'
  ],
  contactPhone: [
    (value: string): boolean => isValidPhone(value.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  contactMessage: [
    (value: string): boolean => isValidMessage(value.trim()),
    'El mensaje es requerido y debe  debe ser de 50 a 250 caracteres'
  ],
  contactFile: [
    (value: File | undefined): boolean => {
      if (!value) {
        return false; // o true, dependiendo de si quieres que el campo sea opcional o no
      }
      return value.type === 'application/pdf' || value.type === 'application/msword' || value.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    },
    'El archivo debe ser un PDF o un documento de Word (.doc o .docx)'
  ]
};

export const formUserValidator = {
  firstName: [
    (value: string): boolean => isValidName(value.trim()),
    'El nombre es requerido y debe ser de 3 a 50 caracteres'
  ],
  lastName: [
    (value: string): boolean => isValidName(value.trim()),
    'El apellido es requerido y debe ser de 3 a 50 caracteres'
  ],
  phone: [
    (value: string): boolean => /* value?.trim().length === 0 || */ isValidPhone(value?.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  phoneAlternative: [
    (value: string): boolean => /* value?.trim().length === 0 || */ isValidPhone(value?.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  street: [
    (value: string): boolean => /* value?.trim().length === 0 || */ isValidStreet(value?.trim()),
    'Debe ser de 3 a 50 caracteres'
  ],
  addressNumber: [
    (value: string): boolean => /* value?.trim().length === 0 || */ isValidAddressNumber(value?.trim()),
    'Debe contener entre 1 y 6 dígitos'
  ],
  location: [
    (value: string): boolean => /* value?.trim().length === 0 || */ isValidLocale(value?.trim()),
    'Debe ser de 3 a 50 caracteres'
  ],
}

export const formChangePasswordValidator = {
  currentPassword: [
    (value: string): boolean =>  isValidPassword(value.trim()),
    'Contraseña actual inválida'
  ],
  password: [
    (value: string): boolean => isValidPassword(value.trim()),
    'Contraseña inválida'
  ],
  confirmPassword: [
    (confirmPassword: string, formState: any): boolean => {
      const passwordMatch =  isValidPassword(confirmPassword);
      const passwordEqual = formState.password === confirmPassword && formState.password.length > 0;
      return passwordMatch && passwordEqual;
    },
    'Confirmación de contraseña inválida o no coincide con la contraseña'
  ]
}

export const formResetPasswordValidator = {
  email: [
    (value: string): boolean => isValidEmail(value.trim()),
    'El correo debe tener un formato válido y debe tener un máximo de 50 caracteres'
  ],

}



/* 
Validación de los campos

  Nombre/Apellido: 
    - El minimo de 3 caracteres y 50 de maximo
    
  Password:
    - La password debe ser Alfanumerica + caracter minimo 8 caracteres y maximo 50.
    - La contraseña es requerida.
    - Debe tener una letra mayúscula, una letra minúscula, un número y un carácter especial.
    
  Email:
    - El email si tiene arroba sigue considerado correcto aunque no sea un email.
    - En caso de email el maximo es de 50 caracteres.
    - Revisar el regex para que acepte estructura de mail básico.

  Calle 
    - Maximo de 50 caracteres.
    - Minimo 3 caracter.

  Localidad
    - Maximo de 50 caracteres.
    - Minimo 3 caracter.

  Altura:
    - Solo números.
    - Maximo de 6 caracteres.
    - Minimo 1 caracter.

  Comentario: 
     - Se puede enviar una letra/número.
     - Se aceptan cualquier tipo de caracter.
     - En caso de mensaje el minimo son 50 caracteres y el maximo 250.

  File: 
     - Debajo del selector de archivo, que aparezca el nombre del archivo seleccionado.
*/

export function isValidName(name: string): boolean {
  // Requisitos del regex
  //  - El minimo de 3 caracteres y 50 de maximo

  return /^[a-zA-Z]{3,50}$/.test(name);
}

export function isValidEmail(email: string): boolean {
  // Requisitos del regex 
  // - El maximo es de 50 caracteres 
  // - Debe contener un @
  // - Debe contener un punto 
  let maxLength = 50;
  let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.length > maxLength) {
    return false;
  }

  return re.test(email);
}

export function isValidPassword(password: string): boolean {
  // Requisitos del regex 
  // - La password debe ser Alfanumerica + caracter minimo 8 caracteres y maximo 50.
  // - La contraseña es requerida.
  // - Debe tener una letra mayúscula, una letra minúscula, un número y un carácter especial.
  let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,50}$/;

  return re.test(password);

}
export function isValidMessage(message: string): boolean {
  // Requisitos del regex 
  // - Se puede enviar una letra/número.
  // - Se aceptan cualquier tipo de caracter.
  // - En caso de mensaje el minimo son 50 caracteres y el maximo 250.

  let re = /^[\s\S]{50,250}$/;

  return re.test(message);
}

export function isValidPhone(phone: string): boolean {
  // Requisitos del regex 
  // Debe tener 7 caracteres como mínimo
  // Debe tener 15 caracteres como máximo
  // Debe tener solo números
  return /^\d{7,15}$/.test(phone);
}

export function isValidLocale(locale: string): boolean {
  // Requisitos del regex 
  // - Maximo de 50 caracteres.
  // - Minimo 3 caracter.
  return /^[a-zA-Z]{3,50}$/.test(locale);
}

export function isValidStreet(street: string): boolean {
  // Requisitos del regex 
  // - Maximo de 50 caracteres.
  // - Minimo 3 caracter.
  return /^[a-zA-Z]{3,50}$/.test(street);
}

export function isValidAddressNumber(addressNumber: string): boolean {
  // Requisitos del regex 
  // - Solo números.
  // - Maximo de 6 caracteres.
  // - Minimo 1 caracter.
  return /^\d{1,6}$/.test(addressNumber);
}