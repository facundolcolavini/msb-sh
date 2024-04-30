export interface ContactFormProperty {
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    contactMessage: string;
}

export const initContactForm: ContactFormProperty = {
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactMessage: ''
}