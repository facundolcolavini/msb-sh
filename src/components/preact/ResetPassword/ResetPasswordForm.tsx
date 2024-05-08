import EmailIcon from '@/components/preact/Icons/EmailIcon';
import { useForm } from "@/hooks/useForm";
import { initForgetPassword, type ForgetPassword } from '@/models/users/users';
import { formResetPasswordValidator } from "@/models/validations/forms.validations";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";

const ResetPasswordForm = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        email,
        emailValid,
        onInputChange,
        onResetForm
    } = useForm<ForgetPassword>(initForgetPassword, formResetPasswordValidator);

    const contact = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);

        try {
            setFormSubmitted(true);
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
            if (!data.success) {
                setFormSubmitted(false)
                setFormError(true);
                throw data
            } else {
                setTimeout(() => {
                    /*    navigate('/servicios/tasaciones'); */
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
            <div className={'p-4 md:px-6 lg:px-5 h-fit'}>
                {isFormValid && !formError && formSubmitted
                    ? (
                        <div className="flex flex-col text-center gap-2 py-3 px-3 my-20">
                            <h1 class={'font-bold text-center tracking-normal transition-opacity animate-fadeIn duration-200 pb-5 md:text-md text-2xl md:text-xl lg:text-3xl'}>
                                ¡GRACIAS!
                            </h1>
                            <p class="text-primary-text-msb text-pretty font-gotham font-normal  lg:text-2xl md:text-xl w-full">
                                Te hemos enviado un correo con los pasos a seguir
                            </p>
                            <IconCheckCircle className={'size-12 my-5 self-center fill-primary-hover-msb'} />
                        </div>
                    )
                    : (
                        <div>
                            <h1 class={'font-bold text-center tracking-normal pb-5 md:text-md text-2xl md:text-xl lg:text-3xl'}>
                                OLVIDE MI CONTRASEÑA
                            </h1>
                            <p
                                class="text-primary-text-msb text-center text-pretty font-gotham font-normal lg:text-2xl md:text-xl w-full pb-6"
                            >
                                Ingresa tu correo electrónico y te enviaremos un correo con los pasos a seguir
                            </p>
                            <form className="flex flex-col w-3/4 mx-auto" noValidate onSubmit={contact}>


                                <div className={'block md:flex lg:flex my-5 gap-2 justify-center items-center'}>
                                    <InputField label="E-mail" type="email" value={email} onChange={onInputChange} icon={emailValid === null
                                        ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                                        : changeFields?.email === true ? <ErrorIcon addStyles="stroke-red-500" /> : <EmailIcon className={'flex size-5 justify-center fill-secondary-text-msb items-center h-100 self-center place-content-center'} />} success={emailValid === null} error={changeFields?.password} addStyles="h-12" name="email" id="email" />

                                    <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles="flex mt-2 lg:mt-0 md:mt-0 items-center w-full text-lg lg:w-fit md:w-fit lg:w-fit justify-center text-white border border-gray-400" type="submit"><span>Enviar</span> {formSubmitted && isFormValid && <Spinner />}</Button>

                                </div>
                                {(changeFields?.email && emailValid)
                                    && <label htmlFor="E-mail" className="text-xs text-start font-thin text-red-700">{emailValid}</label>}
                                {formError && <div className="flex gap-2  py-3 px-3 text-sm z-10 h-fit border border-red-500 rounded bg-red-200 ">{toastMsg}</div>}


                            </form>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default ResetPasswordForm