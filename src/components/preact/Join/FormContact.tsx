import EmailIcon from '@/components/preact/Icons/EmailIcon';
import { useForm } from "@/hooks/useForm";
import { initContactJoinForm, type ContactJoinForm } from '@/models/join/join';
import { formContactJoinValidator } from "@/models/validations/forms.validations";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import UserIcon from "../Icons/UserIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import AttachmentIcon from '../Icons/AttachmentIcon';


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
    contactFile,
    
    contactFileValid,
    onInputChange,
    onUploadFile,
    onResetForm
  } = useForm<ContactJoinForm>(initContactJoinForm, formContactJoinValidator);

  const contact = async (e: SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
  /*   formData.append('contactFile', contactFile as File); */
    const values = Object.fromEntries(formData);

    try {
   
      const response = true /* await fetch(`/api/signin.json/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(values)
        }
      ) */
      const data = { success: true, message: 'Comentario enviado' } /* await response.json() */
      setFormSubmitted(true);
      if (!data.success) {
        setFormSubmitted(false)
        setFormError(true);
        throw data
      } else {
        setTimeout(() => {
          navigate('/sumate');
          onResetForm();
          setFormSubmitted(false);
        }, 3000)
      }

    } catch (e) {
      setToastMsg((e as Error).message);
      setFormSubmitted(false);
    }
  };

  return (
    <>
      <div className={'md:px-6 lg:px-5 h-fit'}>
        {isFormValid && !formError && formSubmitted 
          ? (
            <div className="flex flex-col text-center gap-2 py-3 px-3 my-20">
              <h1 class={'font-gothamBold text-center tracking-normal pb-5 md:text-md w-full text-base md:text-2xl lg:text-3xl'}>GRACIAS POR QUERER FORMAR PARTE</h1>
              <p class="text-primary-text-msb text-pretty font-gothamMedium font-thin  lg:text-2xl md:text-xl w-full">
              ¡Tu CV fue enviado con éxito!
              </p>
              <IconCheckCircle className={'size-12 my-5 self-center fill-primary-hover-msb'} />
            </div>
          )
          : (
            <div>
              <h1 class={'font-gothamBold text-center tracking-normal pb-5 text-base md:text-xl lg:text-3xl'}>Potenciá tu desarrollo profesional con nosotros</h1>
              <p
                class="text-primary-text-msb text-center text-pretty font-gotham font-bold lg:text-2xl md:text-xl w-full pb-6"
              >
                Dejanos tu mensaje y nos contactamos a la brevedad
              </p>
              <form className="grid grid-cols md:grid-cols-2 gap-4 lg:grid-cols-2 font-gotham md:w-fit lg:w-3/4 mx-auto" noValidate onSubmit={contact} enctype="multipart/form-data">
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
                  <InputField label="Dejanos tu mensaje..." type="textarea" value={contactMessage} onChange={onInputChange} icon={contactMessageValid === null
                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                    : changeFields?.contactMessage === true 
                    ? <ErrorIcon addStyles="stroke-red-500" /> 
                    : <></>} 
                    success={contactMessageValid === null} error={changeFields?.contactMessage} addStyles="place-content-start h-[8rem]" name="contactMessage" id="contactMessage" />
                  {(changeFields?.contactMessage && contactMessageValid)
                    && <label htmlFor="contactMessage" className="text-xs px-2  mx-2 font-thin text-red-700">{contactMessageValid}</label>}
                </div>
                <div>
                  <InputField label={  contactFile?.name!?.length > 20 ? `${contactFile?.name.slice(0, 25)}...` : contactFile?.name ?? "Adjuntar CV (.doc,.docx, .pdf)"}  type="file" accept={'.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf'} onChange={onUploadFile} icon={contactFileValid === null
                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                    : changeFields?.contactFile === true ? <ErrorIcon addStyles="stroke-red-500" /> :<AttachmentIcon className={'flex size-5 mx-2 justify-center items-center fill-secondary-text-msb h-100 self-center place-content-center'}/>} success={contactFileValid === null} error={changeFields?.contactFile} addStyles="h-12" name="contactFile" id="contactFile" />
                  {(changeFields?.contactFile && contactFileValid)
                    && <label htmlFor="contactFile" className="text-xs px-2  mx-2 font-thin text-red-700">{contactFileValid}</label>}
                </div> 
                <div className={'md:col-start-2 lg:col-start-2'}>
                  <div className={'flex justify-end items-center gap-2 '}>
                    <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles="flex w-full py-4 text-lg  lg:px-32 md:px-32 md:w-fit lg:w-fit gap-2 justify-center text-white border border-gray-400" type="submit"><span>Enviar</span> {formSubmitted && isFormValid && <Spinner />}</Button>
                  </div>
                </div>

              </form>
            </div>
          )
        }

      </div>
    </>
  )
}

export default FormContact