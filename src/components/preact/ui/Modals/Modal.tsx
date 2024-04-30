import clsx from "clsx";
import { createPortal, type FunctionComponent, type ReactNode } from "preact/compat";
import { useEffect, useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import CloseIcon from "../../Icons/CloseIcon";

interface ModalProps {
  header: string | ReactNode;
  footer: string;
  addStyles?: string;
  onHeaderCloseClick: () => void;
  onBackdropClick: () => void;
  children: ReactNode;
}

interface ModalBackdropProps {
  onClick: () => void;
}

interface ModalHeaderProps {
  children: ReactNode;
  onClose: () => void;
}

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalFooterProps {
  children: ReactNode;
}

export const ModalBackdrop: FunctionComponent<ModalBackdropProps> = ({ onClick }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={onClick} />,
    document.body
  );
};

export const Modal: FunctionComponent<ModalProps> = ({
  children,
  header,
  footer,
  addStyles,
  onHeaderCloseClick,
  onBackdropClick
}) => {
  let clickListener: (e: MouseEvent) => void;
  const [isOpen, setIsOpen] = useState(true);
  const modalBgStyles = twMerge(clsx(" relative bg-inherit w-11/12 md:max-w-md mx-auto transform transition-transform duration-300 bg-[#D9D9D9]", addStyles));
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    clickListener = initClickBackdropListener();
    return () => {
      document.body.classList.remove("overflow-hidden");
      removeClickListener();
    };
  }, []);

  const initClickBackdropListener = () => {
    const listener = (e: MouseEvent) => {
      const modalDialog = document.getElementById("modal-dialog");
      const clickedOutside = modalDialog && !modalDialog.contains(e.target as Node);
      if (clickedOutside) {
        removeClickListener();
        onBackdropClick && onBackdropClick();
      }
    };
    document.addEventListener("click", listener);
    return listener;
  };

  const removeClickListener = () => {
    if (clickListener) {
      document.removeEventListener("click", clickListener);
    }
  };
  const handleModalClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      onBackdropClick && onBackdropClick();
    }, 300); // Wait for the closing animation to finish
  };

  return (
    <div onClick={handleModalClick}>
      {createPortal(
        <div
          className={`fixed inset-0  flex items-center justify-center z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <div
            id="modal-dialog"
            className={`${modalBgStyles} ${isOpen ? "scale-100 animate-fadeIn" : "scale-95"
              }`}
          >
            <div>

              <ModalHeader onClose={closeModal}>
                {header}
              </ModalHeader>

              <ModalBody>{children}</ModalBody>
              {footer && <ModalFooter>{footer}</ModalFooter>}
            </div>
          </div>
        </div>,
        document.body
      )}
      <ModalBackdrop onClick={closeModal} />
    </div>
  );
};

export const ModalHeader: FunctionComponent<ModalHeaderProps> = ({ children, onClose }) => {
  const handleClick = () => {
    onClose && onClose();
  };

  return (
    <div className="container relative">
      <p className="text-2xl font-bold mx-auto ">{children}</p>
      <div className="absolute cursor-pointer right-5 top-5 z-50 w-fit" onClick={handleClick}>
        <CloseIcon />
      </div>
    </div>
  );
};

export const ModalBody: FunctionComponent<ModalBodyProps> = ({ children }) => {
  return <div>{children}</div>;
};

export const ModalFooter: FunctionComponent<ModalFooterProps> = ({ children }) => {
  return <div className="pt-2">{children}</div>;
};
