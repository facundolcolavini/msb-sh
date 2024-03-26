
interface PDFViewerProps {
  file: string;
}

const PDFViewer: preact.FunctionComponent<PDFViewerProps> = ({ file }) => {
  return (
    <div className={'animate-fade animate-duration-800  transition-all '}>
      <iframe className={'rounded-lg'} src={`https://ficha.amaira.com.ar/view_pdf.php?file=emprendimientos/pdf/${file}`} width="100%" height="760px"></iframe>
    </div>
  );
}

export default PDFViewer;