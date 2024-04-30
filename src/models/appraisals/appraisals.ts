export interface ContactAppraisalsForm {
    contactName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactMessage: string;
}

export const initContactAppraisalsForm: ContactAppraisalsForm = {
    contactName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    contactMessage: ''
}