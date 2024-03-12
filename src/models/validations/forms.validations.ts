

export interface FormValidations {
    [key: string]:  any;
} 

export interface formCheckedValues {
    displayNameValid: null | string;
    emailValid: null | string;
    passwordValid: null | string;
    contactNameValid: null | string;
    contactEmailValid: null | string;
    contactPhoneValid: null | string;
    contactMessageValid: null | string;
}


export const formRegisterValidator = {
    email: [(value: string): boolean => value.includes('@'), 'El correo debe de tener una @'],
    displayName: [(value: string): boolean => value.length >= 1, 'El nombre es requerido'],
    password: [(value: string): boolean => value.length >= 6, 'El password debe de tener mas de 6 letras'],
} 

export const formLoginValidator = {
    email: [(value: string): boolean => value.length >= 1, 'El correo es requerido'],
    password: [(value: string): boolean => value.length >= 1, 'El password es requerido'],
}

export const formContactValidator = {
    contactName: [
      (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()), 
      'El nombre es requerido y solo puede contener letras y espacios'
    ],
    contactEmail: [
      (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
      'El correo debe tener un formato válido'
    ],
    contactPhone: [
      (value: string): boolean => /^\d{7,15}$/.test(value.trim()), 
      'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
    ],
    contactMessage: [
      (value: string): boolean => value.trim().length >= 1, 
      'El mensaje es requerido'
    ],
  };