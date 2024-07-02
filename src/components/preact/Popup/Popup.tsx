import { modalAuthPropertyStore, setModalAuth } from '@/store/modalsAuthStore';
import { useCallback, useEffect, useState } from 'preact/hooks';
import RegisterForm from '../Auth/RegisterForm';
import CloseIcon from '../Icons/CloseIcon';
import Button from '../ui/Buttons/Button';
import { Modal } from '../ui/Modals/Modal';

interface PopupProps {
    message: string;
    title: string;
}

const Popup = ({ message,title }: PopupProps) => {
    const [isVisible, setIsVisible] = useState(true);
    const [modalType, setModalType] = useState(modalAuthPropertyStore.get());

    useEffect(() => {
        const unsubscribe = modalAuthPropertyStore.subscribe(setModalType);
        // Set to view the register form 

        return unsubscribe;
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setModalAuth({ changeToLogin: false, changeToRegister: false, changeToForgetPassword: false });
    };

    const handleSwitchToRegister = useCallback((event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        setModalAuth({ changeToLogin: false, changeToRegister: true, changeToForgetPassword: false });
        // When the user clicks on the button, the popup will close but the register form will be displayed

    }, [modalType.changeToRegister]);

    if (!isVisible) {
        return null;
    }


    return (
        <>
        <div className="fixed top-20 right-0 md:top-20  md:right-5 bottom-20 m-2 md:m-5  lg:m-5 z-10 transition-opacity animate-slide">
            <div className="bg-gray-100  p-6 pb-4 pt-8 md:pt-8 lg:pt-8 rounded-lg shadow-xl max-w-md mx-auto">
                <div className="absolute top-5 right-5 cursor-pointer z-50" onClick={handleClose}>
                    <CloseIcon />
                </div>

                 {/* Popup */}
                
                    <h1 className="text-black text-xl md:text-2xl font-gothamBold mb-4">{title}</h1>
                    <div>
                    <div className="text-black mb-10 font-ghotam text-sm md:text-base">{message}</div>

                    <button
                        className="bg-primary-msb text-white font-ghotam flex justify-end text-sm md:text-base ml-auto px-6 py-2 rounded-lg mt-4 md:mt-0 "
                        onClick={handleSwitchToRegister}
                    >
                        Registrarse
                    </button>
                    </div>
               
            </div>
        </div>

        {modalType.changeToRegister && (
            <Modal
                header={<div className="flex justify-center items-center p-3 relative"><img src="/images/logo.png" className="w-100 self-center" width={140} height={40} /></div>}
                footer=""
                addStyles="bg-secondary-bg-msb shadow-lg rounded w-11/12 md:max-w-md mx-auto transform transition-transform duration-300"
                onHeaderCloseClick={handleClose}
                onBackdropClick={handleClose}
            >
                <RegisterForm onSwitchToLogin={() => handleClose()} />
            </Modal>
        )}
    </>
    );

};

export default Popup;
