export interface ContactJoinForm {
    contactName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactMessage: string;
    contactFile: File | null;
}

export const initContactJoinForm: ContactJoinForm = {
    contactName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    contactMessage: '',
    contactFile:  null
}