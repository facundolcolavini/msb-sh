import he from 'he';
import { useEffect, useRef } from 'preact/hooks';

interface Props {
  htmlText: string;
}

const Description = ({ htmlText }: Props) => {
  // Decodificar el texto HTML
  const decodedText = he.decode(htmlText);
  // Use userRef to create a div component with the decoded HTML text 
  const pRef = useRef<HTMLParagraphElement>(null);

  // load the decoded text into the divRef
   useEffect(() => {
    if (pRef.current) {
      pRef.current.innerHTML = decodedText;
    }
  } , [decodedText]);

  // Crear un componente div con el texto HTML decodificado
  return (
    <p className={'relative overflow-clip w-100 text-base'} ref={pRef}>
     
      </p>)

};

export default Description;
