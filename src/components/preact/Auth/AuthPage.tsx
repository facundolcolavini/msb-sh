import { modalAuthPropertyStore, setModalAuth } from "@/store/modalsAuthStore";

import type { JSX } from "astro/jsx-runtime";
import { useCallback, useEffect, useState } from 'preact/hooks';
import ResetPasswordForm from "../ResetPassword/ResetPasswordForm";
import { Modal } from "../ui/Modals/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthProps {
    children?: JSX.Element | JSX.Element[]
}

const AuthPage = ({ children }: AuthProps) => {
    const [modalType, setModalType] = useState(modalAuthPropertyStore.get());
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        const unsubscribe = modalAuthPropertyStore.subscribe(setModalType);
        return unsubscribe;
    }, []);

    const toggleModal = () => {
        setModalAuth({ changeToLogin: false, changeToRegister: false, changeToForgetPassword: false });
        setIsOpenModal((prev) =>
            !prev
        );
    };

    const handleSwitchToRegister = useCallback((event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        setModalAuth({ changeToLogin: false, changeToRegister: true, changeToForgetPassword: false });
    }, [modalType.changeToRegister]);

    const handleSwitchToLogin = useCallback((event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        setModalAuth({ changeToLogin: true, changeToRegister: false, changeToForgetPassword: false });
    }, [modalType.changeToLogin]);

    const handleSwitchToForgetPassword = useCallback((event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        setModalAuth({ changeToLogin: false, changeToRegister: false, changeToForgetPassword: true });
    }, [modalType.changeToLogin]);
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
                            modalType.changeToRegister
                                ? (
                                    <RegisterForm onSwitchToLogin={handleSwitchToLogin} />

                                )
                                : (
                                    /* Si esta en el login o en olvide mi contraseia */
                                    modalType.changeToForgetPassword
                                        ? (
                                            <ResetPasswordForm onSwitchToLogin={handleSwitchToLogin} />
                                        ) : (
                                            <LoginForm onSwitchToRegister={handleSwitchToRegister} onSwitchToForgetPassword={handleSwitchToForgetPassword} />
                                        )

                                )
                        }
                    </Modal>
                )
            }
            <button onClick={toggleModal}>
                {children}
            </button>
        </>


    )
}

export default AuthPage;