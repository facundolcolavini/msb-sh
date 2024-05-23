import EmailIcon from '@/components/preact/Icons/EmailIcon';
import { useForm } from "@/hooks/useForm";
import type { ApiResponseConsultationError } from '@/interfaces/consultation.property.interface';
import { initContactReviewForm, type ContactReviewForm } from "@/models/reviews/reviews";
import { formContactReviewValidator } from "@/models/validations/forms.validations";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import UserIcon from "../Icons/UserIcon";
import WarningAlertIcon from '../Icons/WarningAlertIcon';
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Toast } from '../ui/Toast/Toast';

const FormContact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const {
    isFormValid,
    changeFields,
    contactEmail,
    contactEmailValid,
    contactName,
    contactNameValid,
    contactLastName,
    contactLastNameValid,
    contactPhone,
    contactPhoneValid,
    contactMessage,
    contactMessageValid,
    onInputChange,
    onResetForm
  } = useForm<ContactReviewForm>(initContactReviewForm, formContactReviewValidator);

  const contact = async (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const values = Object.fromEntries(formData);
    formData.append('tipo', '');
    formData.append('desde', 'pagweb');
    formData.append('codsuc', 'MSB');
    try {

      const response = await fetch(`/api/webQuery.json?method=POST&telefono=${formData.get("contactPhone")}&comentario=${formData.get("contactMessage")}&nombre=${formData.get("contactName")}&apellido=${formData.get("contactLastName")}&email=${formData.get("contactEmail")}&tipo=${''}&codsuc=${'MSB'}&desde=${'pagweb'}}`)
      setFormSubmitted(true)
      const data = await response.json()

      if (data.hasOwnProperty('error')) {
        setFormSubmitted(false)
        setFormError(true);

        throw data
      } else {
        /*     setToastMsg((data as APIResponseConsultationProperty).resultado); */
        setTimeout(() => {
          setFormSubmitted(false);
          // navigate('/servicios/administracion');
        }, 3000)
        onResetForm();
      }
    } catch (e) {
      setToastMsg((e as ApiResponseConsultationError)?.error);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormError(false);
      }, 4000)
      onResetForm();
    }
  };

  return (
    <>
      <div className={'p-4 md:px-6 lg:px-5 h-fit'}>
        {!formError && formSubmitted
          ? (
            <div className="flex flex-col text-center gap-2 py-3 px-3 my-20">
              <h1 class={'font-gothamBold text-center tracking-normal pb-5 w-full text-base md:text-2xl lg:text-3xl'}>GRACIAS POR TU COMENTARIO</h1>
              <p class="text-primary-text-msb text-pretty font-gothamMedium font-thin  lg:text-2xl md:text-xl w-full">
                ¡Comentario enviado con éxito!
              </p>
              <IconCheckCircle className={'size-12 my-5 self-center fill-primary-hover-msb'} />
            </div>
          )
          : (
            <div>
              <h1 class={'font-gothamBold text-center tracking-normal pb-5 md:text-md text-2xl md:text-xl lg:text-3xl'}>ENVIANOS TUS COMENTARIOS</h1>
              <p
                class="text-primary-text-msb text-center text-pretty font-gotham font-bold lg:text-2xl md:text-xl w-full pb-6"
              >
                Contanos tu experiencia con nosotros
              </p>
              <form className="grid grid-cols md:grid-cols-2 gap-4  lg:grid-cols-2 font-gotham md:w-fit lg:w-3/4 mx-auto" noValidate onSubmit={contact}>
                <div className={'space-y-5 h-full'}>
                  <InputField label="Nombre" value={contactName} onChange={onInputChange} icon={contactNameValid === null
                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                    : changeFields?.contactName === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={contactNameValid === null} error={changeFields?.contactName} addStyles="h-12" name="contactName" id="contactName" type="text" />
                  {(changeFields?.contactName && contactNameValid)
                    && <label htmlFor="contactName" className="text-xs px-2 mx-2 font-thin text-red-700">{contactNameValid}</label>}
                </div>
                <div>
                  <InputField label="Apellido" type="text" value={contactLastName} onChange={onInputChange} icon={contactLastNameValid === null
                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                    : changeFields?.contactLastName === true ? <ErrorIcon addStyles="stroke-red-500" /> : <UserIcon className={'flex size-5 mx-2 justify-center items-center fill-secondary-text-msb h-100 self-center place-content-center'} />} success={contactLastNameValid === null} error={changeFields?.contactLastName} addStyles="h-12" name="contactLastName" id="contactLastName" />
                  {(changeFields?.contactLastName && contactLastNameValid)
                    && <label htmlFor="contactLastName" className="text-xs px-2  mx-2 font-thin text-red-700">{contactLastNameValid}</label>}
                </div>
                <div className={'space-y-5'}>
                  <InputField label="E-mail" type="email" value={contactEmail} onChange={onInputChange} icon={contactEmailValid === null
                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                    : changeFields?.contactEmail === true ? <ErrorIcon addStyles="stroke-red-500" /> : <EmailIcon className={'flex size-5 mx-2 justify-center fill-secondary-text-msb items-center h-100 self-center place-content-center'} />} success={contactEmailValid === null} error={changeFields?.contactEmail} addStyles="h-12" name="contactEmail" id="contactEmail" />
                  {(changeFields?.contactEmail && contactEmailValid)
                    && <label htmlFor="contactEmail" className="text-xs px-2  mx-2 font-thin text-red-700">{contactEmailValid}</label>}

                </div>
                <div>
                  <InputField label="Teléfono" type="text" value={contactPhone} onChange={onInputChange} icon={contactPhoneValid === null
                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                    : changeFields?.contactPhone === true ? <ErrorIcon addStyles="stroke-red-500" /> : <PhoneIcon className={'flex size-5 mx-2 justify-center items-center fill-secondary-text-msb h-100 self-center place-content-center'} />} success={contactPhoneValid === null} error={changeFields?.contactPhone} addStyles="h-12" name="contactPhone" id="contactPhone" />
                  {(changeFields?.contactPhone && contactPhoneValid)
                    && <label htmlFor="contactPhone" className="text-xs px-2  mx-2 font-thin text-red-700">{contactPhoneValid}</label>}
                </div>

                <div className={'md:col-span-2 lg:col-span-2'}>
                  <InputField label="Dejanos tu comentario..." type="textarea" value={contactMessage} onChange={onInputChange} icon={contactMessageValid === null
                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                    : changeFields?.contactMessage === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={contactMessageValid === null} error={changeFields?.contactMessage} addStyles="place-content-start h-[8rem]" name="contactMessage" id="contactMessage" />
                  {(changeFields?.contactMessage && contactMessageValid)
                    && <label htmlFor="contactMessage" className="text-xs px-2  mx-2 font-thin text-red-700">{contactMessageValid}</label>}
                </div>

                <div className={'md:col-start-2 lg:col-start-2'}>
                  <div className={'flex justify-end items-center gap-2 '}>
                    <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles="flex w-full py-4 text-lg  lg:px-32 md:px-32 md:w-fit lg:w-fit gap-2 justify-center text-white border border-gray-400" type="submit"><span>Enviar</span> {formSubmitted && isFormValid && <Spinner />}</Button>
                  </div>
                </div>
              </form>
              {formError && <Toast message={toastMsg} isVisible={formError} icon={<WarningAlertIcon />} customStyles="flex gap-2  z-10  border-2 border-red-500 bg-[#EFF0F2]" duration={4000} />}
            </div>
          )
        }

      </div>
    </>
  )
}

export default FormContact