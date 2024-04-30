
interface PDFViewerProps {
  file: string;
addStyles?: string;
}

const PDFViewer: preact.FunctionComponent<PDFViewerProps> = ({ file,addStyles }) => {
  return (
  <div className={`animate-fade animate-duration-800  transition-all ${addStyles}`}>
      <iframe className={'rounded-lg'} src={`${file}`} width="100%" height="760px"></iframe>
    </div>
  );
}

export default PDFViewer;