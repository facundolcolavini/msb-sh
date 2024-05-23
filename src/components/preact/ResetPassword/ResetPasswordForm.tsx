import EmailIcon from '@/components/preact/Icons/EmailIcon';

import { useForm } from "@/hooks/useForm";
import { initForgetPassword, type ForgetPassword } from '@/models/users/users';
import { formResetPasswordValidator } from "@/models/validations/forms.validations";
import { setModalAuth } from "@/store/modalsAuthStore";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import WarningAlertIcon from '../Icons/WarningAlertIcon';
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Toast } from '../ui/Toast/Toast';
interface Props {
    onSwitchToLogin: (event: Event) => void
}

const ResetPasswordForm = ({ onSwitchToLogin }: Props) => {
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
            const response = await fetch(`/api/send/reset-password.json/`,
                {
                    method: 'PATCH',
                    redirect: 'follow',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }
            )
            setFormSubmitted(true);
            const data = await response.json()
            if (!data.success) {

                setFormSubmitted(false)
                setFormError(true);
                throw data
            } else {

                setToastMsg(data.message);
                setTimeout(() => {
                    setModalAuth({ changeToLogin: true, changeToRegister: false, changeToForgetPassword: false });
                    setFormSubmitted(false);

                    onResetForm();
                }, 4000)
            }

        } catch (e) {
            setToastMsg((e as Error).message);
            setTimeout(() => {
                setFormSubmitted(false);
                setFormError(false)
                onResetForm();
            }, 4000)
        }
    };

    return (
        <>
            <div className={'p-4 md:px-6 lg:px-5 h-fit animate-fadeIn transition-opacity duration-400'}>
                {isFormValid && formSubmitted
                    ? (
                        <div className="flex flex-col text-center gap-2 py-3 px-3 ">
                            <h1 className={'font-thin font-gothamMedium text-center tracking-normal transition-opacity animate-fadeIn duration-200 pb-5 md:text-md text-2xl md:text-xl lg:text-3xl'}>
                                ¡GRACIAS!
                            </h1>
                            <p className="text-primary-text-msb text-pretty font-gotham font-normal  lg:text-lg md:text-md w-full">
                                Te hemos enviado un correo con los pasos a seguir
                            </p>
                            <IconCheckCircle className={'size-12 my-5 self-center fill-primary-hover-msb'} />
                        </div>
                    )
                    : (
                        <div>
                            <h1 className={'font-extralight text-center font-gothamMedium tracking-normal pb-5 md:text-md text-base'}>
                                OLVIDE MI CONTRASEÑA
                            </h1>
                            <p
                                className="text-primary-text-msb text-center text-pretty font-gotham font-normal text-base w-full pb-6"
                            >
                                Ingresa tu correo electrónico y te enviaremos un correo con los pasos a seguir
                            </p>
                            <form className=" grid grid-cols h-fit  mx-auto" noValidate onSubmit={contact}>


                                <div className={'flex md:flex lg:flex my-3 gap-2 justify-center items-center'}>
                                    <InputField label="E-mail" type="email" value={email} onChange={onInputChange} icon={emailValid === null
                                        ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                                        : changeFields?.email === true ? <ErrorIcon addStyles="stroke-red-500" /> : <EmailIcon className={'flex size-5 w-fit justify-center fill-secondary-text-msb items-center h-100 self-center place-content-center'} />} success={emailValid === null} error={changeFields?.password} addStyles="h-12 w-full" name="email" id="email" />

                                    <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles="flex  items-center h-full justify-center  text-white border border-gray-400" type="submit">Enviar {formSubmitted && isFormValid && <Spinner />}</Button>

                                </div>
                                {(changeFields?.email && emailValid)
                                    && <label htmlFor="E-mail" className="flex text-xs text-start font-thin text-red-700">{emailValid}</label>}
                                {formError && <Toast message={toastMsg} isVisible={formError} icon={<WarningAlertIcon />} customStyles={`flex gap-2 relative animate-fadeIn transition-opacity duration-300 m-0 transition  border-2 border-primary-border-msb bg-[#EFF0F2]`} duration={4000} />}
                                <hr className={'divide-x-2 divide-slate-800 mx-2 my-2'} />
                                <div className={'md:grid w-full flex md:grid-cols-2 justify-end items-center'}>

                                    <Button onClick={onSwitchToLogin} variant={"primary"} addStyles=" w-full py-1 md:w-fit px-5 col-span-2 md:col-start-2 md:col-span-4 md:w-full gap-2 justify-center text-white border border-gray-400" type="submit"><span>Volver</span> {formSubmitted && isFormValid && <Spinner />}</Button>
                                </div>
                            </form>
                        </div>
                    )
                }

            </div>
        </>
    )
}

export default ResetPasswordForm