export interface ContactAdministrationForm {
    contactName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactMessage: string;
}

export const initContactAdministrationForm: ContactAdministrationForm = {
    contactName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    contactMessage: ''
}