import { useForm } from "@/hooks/useForm";
import type { ApiResponseConsultationError } from "@/interfaces/consultation.property.interface";
import { useState } from "preact/hooks";
import { initContactForm, type ContactFormProperty } from "src/models/contact/contact";
import { formContactValidator } from "src/models/validations/forms.validations";
import ErrorIcon from "../Icons/ErrorIcon";
import OkIcon from "../Icons/OkIcon";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import { WhatsAppIcon } from "../Icons/WhatsAppIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Toast } from "../ui/Toast/Toast";

interface ContactFormProps {
    id: string;
    codsuc: string;
    tipo?: string;
    contact_prop: string;
    desde?: string;
    toggleModal?: () => void;
}
const ContactForm = ({ id, codsuc, tipo = '', contact_prop, desde = 'pagweb', toggleModal }: ContactFormProps) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [erroMsg, setErroMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        contactEmail,
        contactMessage,
        contactPhone,
        contactName,
        contactNameValid,
        contactEmailValid,
        contactPhoneValid,
        contactMessageValid,
        onInputChange,
        onResetForm
    } = useForm<ContactFormProperty>(initContactForm, formContactValidator);

    const sendContactForm = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        // agregar al formData el id el tipo desde y codsud
        formData.append('id', id);
        formData.append('tipo', tipo);
        formData.append('desde', desde);
        formData.append('codsuc', codsuc.toUpperCase());
        formData.append('ip', `${desde}_${codsuc.toUpperCase()}${id}`);

        try {
            setFormSubmitted(true);
            const response = await fetch(`/api/consultationProperty.json?method=POST&telefono=${formData.get("contactPhone")}&comentario=${formData.get("contactMessage")}&nombre=${formData.get("contactName")}&email=${formData.get("contactEmail")}&id=${id}&tipo=${tipo}&codsuc=${codsuc}&desde=${desde}&ip=${desde}_${codsuc.toUpperCase()}${id}`)
            const data = await response.json()
            if (data.hasOwnProperty('error')) {
                setFormSubmitted(false)
                setFormError(true);
                throw data
            } else {
                setFormSubmitted(false);
                onResetForm();
                toggleModal && toggleModal();
            }

        } catch (e) {
            setErroMsg((e as ApiResponseConsultationError)?.error);
            setFormSubmitted(false);
        }
    };

    return (
        <>
            <div className={'p-10 md:px-14 lg:px-16 h-fit'}>
                <header>
                    <h1 className={'font-bold text-center tracking-normal pb-5 text-base md:text-md lg:text-lg'}>CONTACTANOS</h1>
                    <p className={'text-center font-thin pb-5 text-secondary-text-msb'}>Envianos tu consulta y te responderemos a la brevedad</p>
                </header>
                <form className="grid grid-cols text-start gap-3 h-fit" noValidate onSubmit={sendContactForm}>
                    <InputField value={contactName} onChange={onInputChange} icon={contactNameValid === null ? <OkIcon /> : changeFields?.contactName === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={contactNameValid === null} error={changeFields?.contactName} addStyles="h-12" name="contactName" id="contactName" type="text" placeholder="*Nombre" />
                    {(changeFields?.contactName && contactNameValid) && <label htmlFor="contactName" className="text-xs px-2 font-thin text-red-700">{contactNameValid}</label>}
                    <InputField value={contactEmail} onChange={onInputChange} icon={contactEmailValid === null ? <OkIcon /> : changeFields?.contactEmail === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={contactEmailValid === null} error={changeFields?.contactEmail} addStyles="h-12" name="contactEmail" id="contactEmail" type="email" placeholder="*Email" />
                    {(changeFields?.contactEmail && contactNameValid) && <label htmlFor="contactEmail" className="text-xs px-2 font-thin text-red-700">{contactEmailValid}</label>}
                    <InputField value={contactPhone} onChange={onInputChange} icon={contactPhoneValid === null ? <OkIcon /> : changeFields?.contactPhone === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={contactPhoneValid === null} error={changeFields?.contactPhone} addStyles="h-12" name="contactPhone" id="contactPhone" type="phone" placeholder="*Teléfono" />
                    {(changeFields?.contactPhone && contactPhoneValid) && <label htmlFor="contactPhone" className="text-xs px-2 font-thin text-red-700">{contactPhoneValid}</label>}
                    <InputField value={contactMessage} onChange={onInputChange} icon={contactMessageValid === null ? <OkIcon /> : changeFields?.contactMessage === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={contactMessageValid === null} error={changeFields?.contactMessage} addStyles="place-content-start h-full" name="contactMessage" id="contactMessage" type="textarea" placeholder="Me gustaría que me contacten por esta propiedad. Gracias..." />
                    {(changeFields?.contactMessage && contactMessageValid) && <label htmlFor="contactMessage" className="text-xs px-2 font-thin text-red-700">{contactMessageValid}</label>}
                    <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles={`text-white transition-all h-14 text-sm md:text-md lg:text-lg border-gray-50 flex justify-center items-center gap-3`} type="submit">Enviar Consulta {formSubmitted && isFormValid && <Spinner />}</Button>
                    <h2 className={'font-bold text-center tracking-normal pb-1 text-base md:text-md lg:text-lg'}>OTRA VÍA DE CONTACTO</h2>
                    {contact_prop !== "" && <a target={'_blank'} href={contact_prop} className={'mx-auto '}>
                        <WhatsAppIcon addStyles="" h="30" w="30" />
                    </a>}
                    <span className={'text-sm font-medium text-center'}>ESCRIBINOS POR WHATSAPP</span>
                </form>
            </div>

            {isFormValid && !formError && <Toast message="Gracias por tu consulta, te responderemos a la brevedad" isVisible={formSubmitted} icon={<WarningAlertIcon />} customStyles="flex gap-2 border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}
            {formError && <Toast message={erroMsg} isVisible={formError} icon={<WarningAlertIcon />} customStyles="flex gap-2 border-2 border-red-500 bg-[#EFF0F2]" duration={3000} />}
        </>
    );
};

export default ContactForm;
