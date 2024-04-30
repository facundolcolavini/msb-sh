export interface ContactReviewForm {
    contactName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    contactMessage: string;
}

export const initContactReviewForm: ContactReviewForm = {
    contactName: '',
    contactLastName: '',
    contactEmail: '',
    contactPhone: '',
    contactMessage: ''
}