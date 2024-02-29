import he from 'he';

interface Props {
  htmlText: string;
}

const Description = ({ htmlText }: Props) => {
  // Decodificar el texto HTML
  const decodedText = he.decode(htmlText);

  // Crear un componente div con el texto HTML decodificado
  return <p className={'text-base'} dangerouslySetInnerHTML={{ __html: decodedText }} />;
};

export default Description;
