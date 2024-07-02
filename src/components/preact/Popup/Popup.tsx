import { modalAuthPropertyStore, setModalAuth } from '@/store/modalsAuthStore';
import { useCallback, useEffect, useState } from 'preact/hooks';
import RegisterForm from '../Auth/RegisterForm';
import CloseIcon from '../Icons/CloseIcon';
import Button from '../ui/Buttons/Button';
import { Modal } from '../ui/Modals/Modal';

interface PopupProps {
    message: string;

}

const Popup = ({ message }: PopupProps) => {
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
            <div className="fixed right-3 bottom-20 m-2 md:m-5 lg:m-5 z-50 transition-opacity animate-slide">
                <div className="bg-secondary-msb/90 p-6 pb-4 py-7 rounded-lg shadow-lg max-w-md mx-auto">
                    <div className="absolute cursor-pointer right-5 top-2 z-50" onClick={handleClose}>
                        <CloseIcon />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <p className="text-black font-ghotam text-sm mb-4 md:mb-0 md:mr-4">{message}</p>
                        <Button
                            variant='primary'
                            className='bg-primary-msb text-white font-ghotam text-xs  rounded-lg w-full md:w-auto'
                            onClick={handleSwitchToRegister}
                        >
                            Registrarse
                        </Button>
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
