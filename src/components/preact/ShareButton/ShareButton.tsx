import { useEffect, useRef, useState } from 'preact/hooks';

import EmailIcon from '@/components/preact/Icons/EmailIcon';
import FacebookIcon from '@/components/preact/Icons/FacebookIcon';
import LinkedInIcon from '@/components/preact/Icons/LinkedInIcon';
import ShareIcon from '@/components/preact/Icons/ShareIcon';
import WhatsAppIcon from '@/components/preact/Icons/WhatsAppIcon';
import PrintIcon from '../Icons/PrintIcon';
import Button from '../ui/Buttons/Button';

interface Props { }

const ShareButton = () => {
  const [showIcons, setShowIcons] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, []);

  // Función para imprimir la página
  const handlePrint = () => {
    window.print();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setShowIcons(false);
    }
  };

  const toggleIcons = (e: Event) => {
    e.stopPropagation();
    console.log(buttonRef.current);
    setShowIcons(!showIcons);
  };

  return (
    <>
      {/* Desktop */}
      <div className="relative hidden lg:flex gap-2 justify-center items-center">
        <button
          className="cursor-pointer hidden lg:flex items-center  animate-duration-500 animate-fade-up transition-all"
          onClick={toggleIcons}
          ref={buttonRef}
        >
          <span className={'font-gothamMedium flex gap-1 items-center'}>
            Compartir <ShareIcon className={'size-5'} />
          </span>
        </button>
        <nav
          ref={menuRef}
          className={showIcons ? 'absolute left-[75px] top-full bg-white p-2 rounded-lg shadow-lg z-10 mt-1 animate-fade-down animate-duration-200' : ` animate-fade-down animate-duration-500 hidden`}
        >
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=&text=Hola%2C%20te%20comparto%20esta%20ficha%3A%20${encodeURIComponent(window.location.href)}&source=&data=`}
            className=" flex justify-center items-center p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
            title="Compartir en WhatsApp"
          >
            <WhatsAppIcon className={'h-5 w-5'} />
          </a>
          <a
            target="_blank"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
            className=" p-1 rounded-full hover:bg-gray-200 transition-colors duration-300 flex justify-center items-center"
            title="Compartir en LinkedIn"
          >
            <LinkedInIcon className={'h-5 w-5'} />
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&source=&data=&fbclid=`}
            className=" flex justify-center items-center p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
            title="Compartir en Facebook"
          >
            <FacebookIcon className={'h-5 w-5'} />
          </a>
          <a
            target="_blank"
            href={`mailto:?subject=Te comparto este articulo&body=Hola, te comparto este articulo que me parecio interesante ${encodeURIComponent(window.location.href)}`}
            className=" flex justify-center items-center p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
            title="Compartir por Email"
          >
            <EmailIcon className={'h-5 w-5'} />
          </a>
        </nav>
        <button onClick={handlePrint} className="hidden lg:flex items-center gap-1 cursor-pointer">

          <span className={'font-gothamMedium flex gap-1 items-center'}>
            Imprimir <PrintIcon className={'size-5'} />
          </span>
        </button>
      </div>
      {/* Responsive */}
      <div className={'flex lg:hidden'}>
        <div className="flex w-full gap-5">
          <Button variant='tertiary' ref={buttonRef} onClick={toggleIcons} addStyles='lg:hidden flex w-full justify-center items-center'>
            <span className={'font-gotham flex  gap-1 items-center'}>
              Compartir <ShareIcon className={'w-full h-full size-5 fill-tertiary-bg-msb'} />
            </span>
          </Button>
          <Button variant='tertiary' onClick={handlePrint} addStyles='lg:hidden flex w-full justify-center items-center'>
            <span className={'font-gotham flex gap-1 items-center '}>
              Imprimir <PrintIcon className={'size-4  w-full h-full fill-tertiary-bg-msb'} />
            </span>
          </Button>
        </div>

        <nav
          ref={menuRef}
          className={showIcons ? 'absolute bg-tertiary-bg-msb p-2 rounded-lg shadow-lg z-10 mt-10 animate-fade-down animate-duration-200' : ` px-100 w-[250px] animate-fade-down animate-duration-500 hidden`}
        >
          <a
            target="_blank"
            href={`https://api.whatsapp.com/send?phone=&text=Hola%2C%20te%20comparto%20esta%20ficha%3A%20${encodeURIComponent(window.location.href)}&source=&data=`}
            className="p-2 rounded-full hover:bg-gray-200 text-white transition-colors duration-300 flex justify-center items-center"
            title="Compartir en WhatsApp"
          >
            <WhatsAppIcon className={'h-5 w-5 hover:fill-black'} />
          </a>
          <a
            target="_blank"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
            className="p-2 rounded-full hover:bg-gray-200 text-white transition-colors duration-300 flex justify-center items-center"
            title="Compartir en LinkedIn"
          >
            <LinkedInIcon className={'h-5 w-5 hover:fill-black'} />
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&source=&data=&fbclid=`}
            className="p-2 rounded-full hover:bg-gray-200 text-white transition-colors duration-300 flex justify-center items-center"
            title="Compartir en Facebook"
          >
            <FacebookIcon className={'h-5 w-5 hover:fill-black'} />
          </a>
          <a
            target="_blank"
            href={`mailto:?subject=Te comparto este articulo&body=Hola, te comparto este articulo que me parecio interesante ${encodeURIComponent(window.location.href)}`}
            className=" p-2 rounded-full hover:bg-gray-200 text-white transition-colors duration-300 flex justify-center items-center"
            title="Compartir por Email"
          >
            <EmailIcon className={'h-5 w-5 hover:fill-black'} />
          </a>
        </nav>

      </div>
    </>
  );
};

export default ShareButton;
