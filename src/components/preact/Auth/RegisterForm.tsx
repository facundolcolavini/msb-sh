import { useForm } from "@/hooks/useForm";
import { initRegisterForm, type UserRegister, type UserChangePassword } from '@/models/users/users';
import { formLoginValidator, formRegisterValidator } from "@/models/validations/forms.validations";
import { setModalAuth } from "@/store/modalsAuthStore";
import { navigate } from "astro:transitions/client";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";

interface Props {
    onSwitchToLogin: (event: Event) => void;
}

const RegisterForm = ({ onSwitchToLogin }: Props) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        email,
        firstName,
        firstNameValid,
        lastName,
        lastNameValid,
        password,
        emailValid,
        passwordValid,
        onInputChange,
        onResetForm
    } = useForm<UserRegister>(initRegisterForm, formRegisterValidator);

    const register = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        // Add create and update date user to the form 
        formData.append('creationDate', Date.now().toString());
        formData.append('lastUpdate', Date.now().toString());
        const values = Object.fromEntries(formData);

        try {
            setFormSubmitted(true);

            const response = await fetch(`/api/auth/register.json/`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(values)
                }
            )
            const data = await response.json()

            if (!data.success) {
                setFormSubmitted(false)
                setFormError(true);
                throw data
            } else {

                setFormSubmitted(false);
                setToastMsg(data.message);

                navigate(window.location.pathname);
                onResetForm();
                setModalAuth({ changeToLogin: false, changeToRegister: false });
            }

        } catch (e) {
            setToastMsg((e as Error).message);
            setFormSubmitted(false);
        }
    };

    return (
        <>

            <h1 className={'font-bold  text-center mx-auto px-6 pt-5'}>CREAR CUENTA</h1>
            <div className={'p-4 md:px-6 lg:px-5 h-fit'}>
                <form className="grid grid-cols text-start gap-3 h-fit font-thin font-gotham" noValidate onSubmit={register}>
                    <div className="flex gap-2">
                        <InputField label="Nombre" value={firstName} onChange={onInputChange} icon={firstNameValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.firstName === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={firstNameValid === null} error={changeFields?.firstName} addStyles="h-12" name="firstName" id="firstName" type="text" />

                              <InputField label="Apellido" value={lastName} onChange={onInputChange} icon={lastNameValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : changeFields?.lastName === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={lastNameValid === null} error={changeFields?.lastName} addStyles="h-12" name="lastName" id="lastName" type="text" />
                    </div>
                 
                    {(changeFields?.firstName && firstNameValid ) 
                        ? <label htmlFor="firstName" className="text-xs px-2 mx-2 font-thin text-red-700">{firstNameValid}</label>
                        :   lastNameValid && changeFields?.lastName 
                        ? <label htmlFor="lastName" className="text-xs px-2 mx-2 font-thin text-red-700">{lastNameValid}</label> 
                        :  null}

                    <InputField label="Email" value={email} onChange={onInputChange} icon={emailValid === null
                        ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                        : changeFields?.email === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={emailValid === null} error={changeFields?.email} addStyles="h-12" name="email" id="email" type="email" />
                    {(changeFields?.email && emailValid)
                        ? <label htmlFor="email" className="text-xs px-2 mx-2 font-thin text-red-700">{emailValid}</label>
                        : <label htmlFor="email" className="text-xs px-2 mx-2 text-gray-400">Ingresá tu email</label>}
                    <InputField label="Contraseña" type="password" value={password} onChange={onInputChange} icon={passwordValid === null ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} /> : changeFields?.password === true ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={passwordValid === null} error={changeFields?.password} addStyles="h-12" name="password" id="password" />
                    {(changeFields?.password && passwordValid)
                        ? <label htmlFor="password" className="text-xs px-2  mx-2 font-thin text-red-700">{passwordValid}</label>
                        : <label htmlFor="password" className="text-xs px-2 mx-2 text-gray-400">Ingresá tu contraseña</label>}
                    <hr className={'divide-x-2 divide-slate-800 mx-2'} />
                    {formError && <div className="flex gap-2  py-3 px-3 text-sm z-10 border border-red-500 rounded bg-red-200 ">{toastMsg}</div>}
                    <div className={'flex justify-center items-center gap-2'}>
                        <Button variant="outline" type="button" addStyles="w-full py-1 px-5  hover:bg-bg-2-msb hover:text-white" onClick={onSwitchToLogin}> Ya tengo cuenta</Button>
                        <Button variant={`${isFormValid ? "primary" : "disabled"}`} addStyles="flex w-full py-1 px-5  gap-2 justify-center text-white border border-gray-400" type="submit"><span>Crear cuenta</span> {formSubmitted && isFormValid && <Spinner />}</Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default RegisterForm