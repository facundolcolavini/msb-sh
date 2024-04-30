import { useForm } from "@/hooks/useForm";
import { initUserChangePassword, type UserChangePassword } from "@/models/users/users";
import { formChangePasswordValidator } from "@/models/validations/forms.validations";
import type { User } from "lucia";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Toast } from "../ui/Toast/Toast";
import { navigate } from "astro:transitions/client";
interface Props {
    userData: User | null;
}

const ChangePasswordForm = ({ userData }: Props) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        password,
        passwordValid,
        confirmPassword,
        confirmPasswordValid,
        currentPassword,
        currentPasswordValid,
        onInputChange,
        onResetForm
    } = useForm<UserChangePassword>(initUserChangePassword, formChangePasswordValidator);

    const onChangePassword = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);
        try {
            setFormSubmitted(true);
            const response = await fetch(`/api/account/change-password.json/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        id: userData?.id,
                        currentPassword: values.currentPassword,
                        password: values.password,
                        confirmPassword: values.confirmPassword

                    })
                }
            )
            const data = await response.json()
            if (!data.success) {
                setFormSubmitted(true)
                setFormError(true);
                throw data
            } else {
                setToastMsg(data.message);
                setTimeout(() => {
                    setFormSubmitted(false); // Add this line
                    navigate('/cuenta');
                }, 3000)
                
                onResetForm();
            }

        } catch (e) {

            setToastMsg((e as Error).message);
            setTimeout(() => {
                setFormSubmitted(false);
            }, 3000)

            setFormError(false);
            onResetForm();

        }
    };

    const inputsValids = {
        password: passwordValid,
        confirmPassword: confirmPasswordValid,
        currentPassword: currentPasswordValid

    }
    // Recorre cada campo en changeFields
    const fieldsChangedAndValid = Object.entries(changeFields).every(([key, value]) => {
        // Verifica si el campo ha cambiado
        if (value) {
            // Si el campo ha cambiado, verifica si es válido
            return inputsValids[key as keyof typeof inputsValids] === null;
        }
        // Si el campo no ha cambiado, considera que es válido
        return true;
    });

    return (
        <>
            <form noValidate onSubmit={onChangePassword} className={'px-5'} >
                <p className={'text-primary-text-msb font-bold text-xl my-7'}>Cambiar contraseña</p>
                <div className={'grid grid-cols md:grid-cols-1 gap-4 lg:grid-cols-3'}>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Contraseña actual" value={currentPassword} onChange={onInputChange} icon={currentPasswordValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : !currentPasswordValid ? <ErrorIcon addStyles="stroke-red-500" /> :
                                <></>} success={currentPasswordValid === null} error={changeFields?.currentPassword} addStyles="h-12 w-100" name="currentPassword" id="currentPassword" type="password" />
                        {(changeFields?.currentPassword && currentPasswordValid)
                            && <label htmlFor="currentPassword" className="text-xs px-2 mx-2 font-thin text-red-700">{currentPasswordValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Contraseña" value={password} onChange={onInputChange} icon={passwordValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : !passwordValid ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={passwordValid === null} error={changeFields?.password} addStyles="h-12 w-100" name="password" id="password" type="password" />
                        {(changeFields?.password && passwordValid)
                            && <label htmlFor="password" className="text-xs px-2 mx-2 font-thin text-red-700">{passwordValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Repetir contraseña" value={confirmPassword} onChange={onInputChange} icon={confirmPasswordValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : !confirmPasswordValid ? <ErrorIcon addStyles="stroke-red-500" /> : <></>} success={confirmPasswordValid === null} error={changeFields?.confirmPassword} addStyles="h-12 w-100" name="confirmPassword" id="confirmPassword" type="password" />
                        {(changeFields?.confirmPassword && confirmPasswordValid)
                            && <label htmlFor="confirmPassword" className="text-xs px-2 mx-2 font-thin text-red-700">{confirmPasswordValid}</label>}
                    </div>
                    <div className={'flex justify-center gap-2 md:justify-end lg:justify-end font-bold h-fit w-full bg-gr px-5 text-pretty p-3 rounded border border-primary-msb'}>
                        <WarningAlertIcon addStyles={'size-8 flex items-center justify-center fill-white'} />
                        <p className="text-black  text-xs">{
                            'La contraseña actual es requerida y debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.'
                        }</p></div>
                </div>
                <div className={' lg:col-span-2  flex justify-center md:justify-end lg:justify-end h-full'}>
                    <Button
                        variant={`${fieldsChangedAndValid && !formError && !formSubmitted  && password !== '' && currentPassword !=='' && confirmPassword !== '' ? "primary" : "disabled"}`}
                        addStyles="mt-5 w-full flex text-center  text-center justify-center w-full lg:text-center md:w-fit lg:w-fit py-2 px-8 h-full gap-2 items-center  text-base  text-white border border-gray-400"
                        type="submit"
                        disabled={formSubmitted || formError || !fieldsChangedAndValid }
                    >
                        {formSubmitted && !formError ? <>{"Guardando"} <Spinner /></> : "Cambiar contraseña"}
                    </Button>
                </div>
                <hr className={' divide-y-2 divide-gray-800 my-5'} />
            </form>
            {!formError && <Toast message={toastMsg} isVisible={formSubmitted} icon={<WarningAlertIcon />} customStyles="flex   z-10 gap-2 border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}
            {formError && <Toast message={toastMsg} isVisible={formError} icon={<WarningAlertIcon />} customStyles="flex gap-2  z-10  border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}
        </>

    )
}

export default ChangePasswordForm