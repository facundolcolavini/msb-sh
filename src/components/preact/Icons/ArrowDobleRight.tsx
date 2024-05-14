import type { JSX } from 'preact'
interface Props extends JSX.SVGAttributes<SVGSVGElement> {
}

function ArrowDobleRight(props:Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M31 15l17 17-17 17"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M16 15l17 17-17 17"
      />
    </svg>
  );
}

export default ArrowDobleRight;
