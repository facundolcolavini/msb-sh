import { useEffect, useRef, useState } from 'preact/hooks';

import EmailIcon from '../Icons/EmailIcon';
import FacebookIcon from '../Icons/FacebookIcon';
import LinkedInIcon from '../Icons/LinkedInIcon';
import ShareIcon from '../Icons/SharaIcon';
import { WhatsAppIcon } from '../Icons/WhatsAppIcon';

interface Props { }

const ShareButton = () => {
  const [showIcons, setShowIcons] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };

  }, []);

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

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  return (
    <div className="relative inline-block">
      <div
        className="compartir-title cursor-pointer flex items-center  animate-duration-500 animate-fade-up transition-all"
        onClick={toggleIcons}
        ref={buttonRef}
      >
        <span className={'font-semibold flex gap-1'}>
          Compartir <ShareIcon />
        </span>
      </div>

      <nav
        ref={menuRef}
        className={showIcons ? 'absolute right-0 top-full bg-white p-2 rounded-lg shadow-lg z-10 mt-1 animate-fade-down animate-duration-200' : ` animate-fade-down animate-duration-500 hidden`}
      >
        <a
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=&text=Hola%2C%20te%20comparto%20esta%20ficha%3A%20${encodeURIComponent(window.location.href)}&source=&data=`}
          className="block p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
          title="Compartir en WhatsApp"
        >
          <WhatsAppIcon  h="24" w="24"/>
        </a>
        <a
          target="_blank"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
          className="block p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
          title="Compartir en LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&source=&data=&fbclid=`}
          className="block p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
          title="Compartir en Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          target="_blank"
          href={`mailto:?subject=Te comparto este articulo&body=Hola, te comparto este articulo que me parecio interesante ${encodeURIComponent(window.location.href)}`}
          className="block p-1 rounded-full hover:bg-gray-200 transition-colors duration-300"
          title="Compartir por Email"
        >
          <EmailIcon />
        </a>
      </nav>

    </div>
  );
};

export default ShareButton;
