import { useEffect, useState } from "preact/hooks";
import { createPortal, type FunctionComponent, type ReactNode } from "preact/compat";

interface ModalProps {
  header: string;
  footer: string;
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
  onHeaderCloseClick,
  onBackdropClick
}) => {
  let clickListener: (e: MouseEvent) => void;
  const [isOpen, setIsOpen] = useState(true);

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
          className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            id="modal-dialog"
            className={`relative bg-white rounded-lg w-11/12 md:max-w-md mx-auto transform transition-transform duration-300 ${
              isOpen ? "scale-100 animate-fadeIn" : "scale-95"
            }`}
          >
            <div className="">
        
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
    <div className="flex justify-between items-center absolute right-0 p-3">
      <p className="text-2xl font-bold">{children}</p>
      <div className="cursor-pointer z-50" onClick={handleClick}>
        <svg
          className="fill-current text-black"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M11.59 9l5.58-5.59L16 2l-6 6-6-6L1.41 3.41 7 9l-5.59 5.58L2 16l6-6 6 6 1.41-1.41L11.59 9z"></path>
        </svg>
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
