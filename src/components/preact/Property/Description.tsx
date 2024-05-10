import he from 'he';
import { useEffect, useRef } from 'preact/hooks';

interface Props {
  htmlText: string;
}

const Description = ({ htmlText }: Props) => {
  // Decodificar el texto HTML
  const decodedText = he.decode(htmlText);
  // Use userRef to create a div component with the decoded HTML text 
  const divRef = useRef<HTMLDivElement>(null);

  // load the decoded text into the divRef
   useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = decodedText;
    }
  } , [decodedText]);

  // Crear un componente div con el texto HTML decodificado
  return (
    <div className={'relative overflow-clip w-100 text-base'} ref={divRef}>
     
      </div>)

};

export default Description;
