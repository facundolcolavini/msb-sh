import { useForm } from "@/hooks/useForm";
import { formUserValidator } from "@/models/validations/forms.validations";
import { navigate } from "astro:transitions/client";
import type { User } from "lucia";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import EmailIcon from "../Icons/EmailIcon";
import ErrorIcon from "../Icons/ErrorIcon";
import MapLocationIcon from "../Icons/MapLocationIcon";
import PhoneIcon from "../Icons/PhoneIcon";
import UserIcon from "../Icons/UserIcon";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import Spinner from "../Spinner";
import Button from "../ui/Buttons/Button";
import InputField from "../ui/Inputs/InputField";
import { Toast } from "../ui/Toast/Toast";

interface Props {
    userData: User | null;
}
const AccountForm = ({ userData }: Props) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const {
        isFormValid,
        changeFields,
        firstName,
        firstNameValid,
        lastName,
        lastNameValid,
        email,
        emailValid,
        phone,
        phoneValid,
        phoneAlternative,
        phoneAlternativeValid,
        addressNumber,
        addressNumberValid,
        street,
        streetValid,
        location,
        locationValid,
        formState,
        onInputChange,
        onResetForm
    } = useForm<User | null>(userData, formUserValidator);

    const updateUser = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);
        console.log(values)
        try {
            setFormSubmitted(true);
            const response = await fetch(`/api/account/${userData?.id}.json/`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(values)
                }
            )
            const data = await response.json()
            console.log(data)
            if (!data.success) {
                setFormSubmitted(false)
                setFormError(true);
                throw data
            } else {    
                setToastMsg(data.message);
                setTimeout(() => {
                    setFormSubmitted(false); // Add this line
                    navigate('/cuenta');
                }, 3000)
                
                onResetForm();
                /*  setModalAuth({ changeToLogin: false, changeToRegister: false }); */
            }

        } catch (e) {
            setToastMsg((e as Error).message);
            setFormSubmitted(false);
        }
    };
    const inputsValids = {
        firstName: firstNameValid,
        lastName: lastNameValid,
        email: emailValid,
        phone: phoneValid,
        phoneAlternative: phoneAlternativeValid,
        addressNumber: addressNumberValid,
        street: streetValid,
        location: locationValid

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
        <div className={'px-5'}>
            <form className="font-gotham mx-auto" noValidate onSubmit={updateUser}>
                <p className={'text-primary-text-msb font-bold text-xl mb-7'}>Datos personales</p>
                <div className={'grid grid-cols md:grid-cols-2 gap-4 lg:grid-cols-3'}>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Nombre" value={firstName} onChange={onInputChange} icon={firstNameValid === null && firstName !== userData?.firstName
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            :  <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={firstNameValid === null} error={changeFields?.firstName} addStyles="h-12 w-100" name="firstName" id="firstName" type="text" />
                        {(changeFields?.firstName && firstNameValid)
                            && <label htmlFor="firstName" className="text-xs px-2 mx-2 font-thin text-red-700">{firstNameValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Apellido" value={lastName} onChange={onInputChange} icon={lastNameValid === null && lastName !== userData?.lastName
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : <UserIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={lastNameValid === null} error={changeFields?.lastName} addStyles="h-12 w-100" name="lastName" id="lastName" type="text" />
                        {(changeFields?.lastName && lastNameValid)
                            && <label htmlFor="lastName" className="text-xs px-2 mx-2 font-thin text-red-700">{lastNameValid}</label>}
                    </div>
                </div>
                <hr className={' divide-y-2 divide-gray-800 my-5'} />
                <p className={'text-primary-text-msb font-bold text-xl my-7'}>Datos de Contacto</p>
                <div className={'grid grid-cols md:grid-cols-2 gap-4 lg:grid-cols-3'}>
                    <div className={'space-y-5 h-full'}>
                        <InputField disabled={true} label="E-mail" value={email} onChange={onInputChange}
                            icon={
                                email !== userData?.email
                                    ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                                    : <EmailIcon className={'size-5  mr-2 justify-center items-center fill-secondary-text-msb self-center place-content-center'} />}
                            success={changeFields?.email}
                            error={false}
                            addStyles="h-12 w-100" name="email" id="email" type="text"
                        />
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Teléfono" value={phone} onChange={onInputChange} icon={phoneValid === null && phone !== userData?.phone
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : <PhoneIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={phoneValid === null} error={changeFields?.phone} addStyles="h-12 w-100" name="phone" id="phone" type="text" />
                        {(changeFields?.phone && phoneValid)
                            && <label htmlFor="phone" className="text-xs px-2 mx-2 font-thin text-red-700">{phoneValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Teléfono Alternativo" value={phoneAlternative} onChange={onInputChange} icon={phoneAlternativeValid === null
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : <PhoneIcon className={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={phoneAlternativeValid === null} error={changeFields?.phoneAlternative} addStyles="h-12 w-100" name="phoneAlternative" id="phoneAlternative" type="text" />
                        {(changeFields?.phoneAlternative && phoneAlternativeValid)
                            && <label htmlFor="phoneAlternative" className="text-xs px-2 mx-2 font-thin text-red-700">{phoneAlternativeValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Calle" value={street} onChange={onInputChange} icon={streetValid === null && street !== userData?.street
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : <MapLocationIcon addStyles={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={streetValid === null} error={changeFields?.street} addStyles="h-12 w-100" name="street" id="street" type="text" />
                        {(changeFields?.street && streetValid)
                            && <label htmlFor="street" className="text-xs px-2 mx-2 font-thin text-red-700">{streetValid}</label>}
                    </div>

                    <div className={'space-y-5 h-full'}>
                        <InputField label="Altura" value={addressNumber} onChange={onInputChange} icon={addressNumberValid === null && addressNumber !== userData?.addressNumber
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            :  <MapLocationIcon addStyles={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={addressNumberValid === null} error={changeFields?.addressNumber} addStyles="h-12 w-100" name="addressNumber" id="addressNumber" type="text" />
                        {(changeFields?.addressNumber && addressNumberValid)
                            && <label htmlFor="addressNumber" className="text-xs px-2 mx-2 font-thin text-red-700">{addressNumberValid}</label>}
                    </div>
                    <div className={'space-y-5 h-full'}>
                        <InputField label="Localidad" value={location} onChange={onInputChange} icon={locationValid === null && location !== userData?.location
                            ? <IconCheckCircle className={'size-5 flex items-center justify-center fill-primary-msb'} />
                            : <MapLocationIcon addStyles={'flex size-5 mx-2 justify-center items-center h-100 fill-secondary-text-msb self-center place-content-center'} />} success={locationValid === null} error={changeFields?.location} addStyles="h-12 w-100" name="location" id="location" type="text" />
                        {(changeFields?.location && locationValid)
                            && <label htmlFor="location" className="text-xs px-2 mx-2 font-thin text-red-700">{locationValid}</label>}
                    </div>


                </div>
                <div className={' lg:col-span-3  flex justify-center md:justify-end lg:justify-end h-full'}>
                    <Button variant={`${fieldsChangedAndValid && !formSubmitted ? "primary" : "disabled"}`} addStyles="mt-5 w-full flex text-center  text-center justify-center w-full lg:text-center md:w-fit lg:w-fit py-2 px-8 h-full gap-2 items-center  text-base  text-white border border-gray-400" type="submit">{formSubmitted  ? <>{"Guardando"} <Spinner /></> : "Guardar Cambios"}</Button>
                </div>
                <hr className={' divide-y-2 divide-gray-800 my-5'} />
            </form>


            {!formError && <Toast message={toastMsg} isVisible={formSubmitted} icon={<WarningAlertIcon />} customStyles="flex   z-10 gap-2 border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}
            {formError && <Toast message={toastMsg} isVisible={formError} icon={<WarningAlertIcon />} customStyles="flex gap-2  z-10  border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}
        </div>
    )
}

export default AccountForm
