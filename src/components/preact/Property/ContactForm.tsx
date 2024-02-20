import { useForm } from "@hooks/useForm";
import { useState } from "preact/hooks";
import { initContactForm, type ContactFormProperty } from "src/models/contact/contact";
import { formContactValidator } from "src/models/validations/forms.validations";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Toast } from "../ui/Toast/Toast";
import OkIcon from "../Icons/OkIcon";
import Spinner from "../Spinner";

interface ContactFormProps {
    id: string;
    codsuc: string;
    tipo?: string;
    contact_prop: string;
}
const ContactForm = ({ id, codsuc, tipo = '', contact_prop }: ContactFormProps) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const {
        isFormValid,
        formState,
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
        /*    if (!isFormValid) {
               setFormSubmitted(true);
           } else {
               setFormSubmitted(false);
               onResetForm();
               console.log(formState);
           } */

        try {

            setFormSubmitted(true);

            const response = await fetch('/api/consultationProperty', {
                method: 'POST',
                body: JSON.stringify({
                    json: 'consultas',
                    method: 'POST',
                    nombre: contactName,
                    apellido: '',
                    email: contactEmail,
                    telefono: contactPhone,
                    comentario: contactMessage,
                    id: id,
                    codsuc: codsuc,
                    tipo: tipo
                }),
            })

            if (!response.ok) {

                setFormSubmitted(false);
                return
            }

            setTimeout(() => {
                setFormSubmitted(false);
                onResetForm();
            }, 3000);


        } catch (e) {
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
                    <InputField value={contactName} onChange={onInputChange} icon={contactNameValid === null ? <OkIcon/> : <></>} addStyles="h-12" name="contactName" id="contactName" type="text" placeholder="*Nombre" />
                    {(formSubmitted && contactNameValid) && <label htmlFor="contactName" className="text-xs px-3 font-thin text-red-500">{contactNameValid}</label>}
                    <InputField value={contactEmail} onChange={onInputChange} icon={contactEmailValid === null ? <OkIcon/> : <></>} addStyles="h-12" name="contactEmail" id="contactEmail" type="email" placeholder="*Email" />
                    {(formSubmitted && contactEmailValid) && <label htmlFor="contactEmail" className="text-xs px-3 font-thin text-red-500">{contactEmailValid}</label>}
                    <InputField value={contactPhone} onChange={onInputChange} icon={contactPhoneValid === null ? <OkIcon/> : <></>} addStyles="h-12" name="contactPhone" id="contactPhone" type="phone" placeholder="*Teléfono" />
                    {(formSubmitted && contactPhoneValid) && <label htmlFor="contactPhone" className="text-xs px-3 font-thin text-red-500">{contactPhoneValid}</label>}
                    <InputField value={contactMessage} onChange={onInputChange} icon={contactMessageValid === null ? <OkIcon/> : <></>} addStyles="place-content-start h-full" name="contactMessage" id="contactMessage" type="textarea" placeholder="Me gustaría que me contacten por esta propiedad. Gracias..." />
                    {(formSubmitted && contactMessageValid) && <label htmlFor="contactMessage" className="text-xs px-3 font-thin text-red-500">{contactMessageValid}</label>}
                    <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles={`text-white transition-all h-14 text-sm md:text-md lg:text-lg border-gray-50 flex justify-center items-center gap-3`} type="submit">Enviar Consulta {formSubmitted && isFormValid && <Spinner/>}</Button>
                    <a target={'_blank'} href={contact_prop} className="bg-primary-msb transition cursor-pointer hover:bg-primary-bg-hover-msb py-3  h-fit rounded-lg px-12 lg:text-lg md:text-md text-white tracking-wide text-center">Consultar</a>
                </form>
            </div>
            {isFormValid && <Toast message="Gracias por tu consulta, te responderemos a la brevedad" isVisible={formSubmitted} icon={<WarningAlertIcon />} customStyles="flex gap-2 border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}


        </>
    );
};

export default ContactForm;
