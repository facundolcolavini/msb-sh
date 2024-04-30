import { navigate } from "astro:transitions/client";
import type { User } from "lucia";
import { useState } from "preact/hooks";
import IconCheckCircle from "../Icons/CheckIcon";
import WarningAlertIcon from "../Icons/WarningAlertIcon";
import Button from "../ui/Buttons/Button";
import { Modal } from "../ui/Modals/Modal";
import { Toast } from "../ui/Toast/Toast";

interface Props {
    userData: User | null;
}
const DangeForm = ({ userData }: Props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [toastMsg, setToastMsg] = useState('');

    const toggleModal = () => {
        setIsOpenModal((prev) =>
            !prev
        );
    };

    const deleteAccount = async (e: SubmitEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);
        console.log(values)
        try {
            setFormSubmitted(false);
            const response = await fetch(`/api/account/${userData?.id}.json/`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                }
            )
            const data = await response.json() 
       
            if (!data.success) {
                setFormSubmitted(false)
                setFormError(true);
                throw data
            } else {
                setFormSubmitted(true);
                setTimeout(() => {
                    setToastMsg(data.message);
                    setFormSubmitted(false);
                    toggleModal();
                    navigate('/');
                }, 6000)

            }

        } catch (e) {
            setToastMsg((e as Error).message);
            setFormSubmitted(false);
        }
    };

    const confirmationMessage = () => {
        return (
            <div className={'w-full '}>
                <IconCheckCircle className={'size-14 mt-10 mb-6  flex mx-auto items-center justify-center fill-primary-msb'} />

                <p
                    class="font-extralight py-5 text-primary-text-msb text-center text-md md:text-lg lg:text-lg"
                >
                    Tu cuenta fue eliminada con éxito
                </p>

            </div>
        )
    }

    return (
        <>
            {
                isOpenModal && (
                    <Modal
                        header={<div className={'flex justify-center  text-center items-center place-content-center p-3 relative'}><img src={`/images/logo.png`} className={'w-100 text-center self-center place-items-middle'} width={140} height={40} /></div>}
                        footer=""
                        addStyles="bg-secondary-bg-msb shadow-lg  rounded w-11/12 md:max-w-md mx-auto transform transition-transform duration-300"
                        onHeaderCloseClick={toggleModal}
                        onBackdropClick={toggleModal}
                    >
                        {
                            formSubmitted /* && !formError */
                                ? (
                                    confirmationMessage()
                                )
                                : (
                                    <form className={'px-5'} noValidate onSubmit={deleteAccount} >
                                        <p className={'text-primary-text-msb font-bold text-xl my-3 text-center'}>Eliminar Cuenta</p>
                                        <div className={'w-full'}>
                                            <p
                                                class="font-extralight py-5 text-primary-text-msb text-center text-balance text-md md:text-lg lg:text-lg"
                                            >
                                                Tu cuenta será eliminada
                                                de forma permanente.
                                            </p>
                                            <p class="text-lg text-primary-text-msb text-center font-bold mb-2">
                                                ¿Querés eliminarla?
                                            </p>
                                        </div>
                                        <div className={'flex justify-center items-center gap-2 p-2 font-gotham'}>
                                            <Button variant="outline" type="button" onClick={toggleModal} addStyles="text-center font-medium  text-base w-full py-2 md:px-10 hover:bg-bg-2-msb hover:text-white">Cancelar</Button>
                                            <Button variant="primary" type="submit" addStyles="w-full py-1 py-2 md:px-10 text-base bg-secondary-bg-hover-msb hover:bg-bg-2-msb hover:text-white font-medium">Sí, eliminar</Button>
                                        </div>
                                    </form>
                                )
                        }

                    </Modal>)
            }
            <div className={'px-5 font-gotham mx-auto '}>
                <p className={'text-primary-text-msb font-bold text-xl mb-7'}>Zona de peligro</p>
                <div className="grid grid-cols md:grid-cols lg:grid-cols-2 gap-2  border border-red-500 rounded p-5 py-3" >
                    <div className={'w-full'}>
                        <h2 className=" text-base font-medium text-gray-800">Eliminar cuenta</h2>
                        <span className=" text-sm font-medium text-gray-600 ">Una vez que eliminas la cuenta, no hay vuelta atrás. Por favor, asegúrese.</span>
                    </div>
                    <div className={'flex justify-end items-center'}>
                        <Button variant="primary" type="button" onClick={toggleModal} addStyles="  text-base bg-red-500 text-white hover:bg-red-700 text-ellipsis   py-2 px-10">Eliminar cuenta</Button>
                    </div>
                </div>
            </div>
            {/*  {!formError && <Toast message={toastMsg} isVisible={formSubmitted} icon={<WarningAlertIcon />} customStyles="flex   z-10 gap-2 border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />} */}
            {formError && <Toast message={toastMsg} isVisible={formError} icon={<WarningAlertIcon />} customStyles="flex gap-2  z-100  border-2 border-primary-border-msb bg-[#EFF0F2]" duration={3000} />}
        </>
    )
}

export default DangeForm