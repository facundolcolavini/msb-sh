import type { JSX } from 'preact'
interface Props extends JSX.SVGAttributes<SVGSVGElement> {
}

function DoorOpen(props:Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M10.385 21.788a.997.997 0 00.857.182l8-2A.999.999 0 0020 19V5a1 1 0 00-.758-.97l-8-2A1.003 1.003 0 0010 3v1H6a1 1 0 00-1 1v14a1 1 0 001 1h4v1c0 .308.142.599.385.788zM12 4.281l6 1.5v12.438l-6 1.5V4.281zM7 18V6h3v12H7z" />
      <path d="M14.242 13.159c.446-.112.758-.512.758-.971v-.377a1 1 0 10-2 .001v.377a1 1 0 001.242.97z" />
    </svg>
  );
}

export default DoorOpen;
