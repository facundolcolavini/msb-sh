import type { UserChangePassword } from "../users/users";


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
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  lastName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El apellido es requerido y solo puede contener letras y espacios'
  ],
  password: [(value: string): boolean =>  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/ .test(value), 'La contraseña es requerida y debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial']
  /*   confirmPassword: [(value: string): boolean => value.length >= 1, 'La confirmación de password es requerida'], */
}

export const formLoginValidator = {
  email: [
    (value: string): boolean => /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
    'El correo debe tener un formato válido'
  ],
  password: [(value: string): boolean =>  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/ .test(value), 'La contraseña es requerida y debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial']
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
  ],
};


export const formContactReviewValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
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
  ],
};


export const formContactAppraisalsValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
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
  ],
};

export const formContactAdministrationValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
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
  ],
};

export const formContactJoinValidator = {
  contactName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value.trim()),
    'El nombre es requerido y solo puede contener letras y espacios'
  ],
  contactLastName: [
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
    (value: string): boolean =>   /^[a-zA-Z\s]+$/.test(value!.trim()),
    'El nombre es requerido '
  ],
  lastName: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value!.trim()),
    'El apellido es requerido '
  ],
  phone: [
    (value: string): boolean => /^\d{7,15}$/.test(value?.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  phoneAlternative: [
    (value: string): boolean => /^\d{7,15}$/.test(value?.trim()),
    'El teléfono es requerido y debe contener entre 7 y 15 dígitos'
  ],
  street: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value?.trim()),
    'La calle es requerida '
  ],
  addressNumber: [
    (value: string): boolean => /^\d{1,5}$/.test(value?.trim()),
    'El número de dirección es requerido '
  ],
  location: [
    (value: string): boolean => /^[a-zA-Z\s]+$/.test(value?.trim()),
    'La localidad es requerida '
  ],
} 

export const formChangePasswordValidator = {
  currentPassword: [
    (value: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    'Contraseña actual inválida'
  ],
  password: [
    (value: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
    'Contraseña inválida'
  ],
  confirmPassword: [
    (confirmPassword: string, formState: any): boolean => {
      const passwordMatch = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!@#$%^&*()_+<>?])[A-Za-z\d@$!%*?&]{8,}$/.test(confirmPassword);
      const passwordEqual = formState.password === confirmPassword && formState.password.length > 0;
      return passwordMatch && passwordEqual;
    },
    'Confirmación de contraseña inválida o no coincide con la contraseña'
  ]
}


export function isValidEmail(email: string): boolean {
	return /.+@.+/.test(email);
}