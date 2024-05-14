import type { JSX } from 'preact'
interface Props extends JSX.SVGAttributes<SVGSVGElement> {
}

function ArrowDobleLeft(props:Props) {
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
        d="M32.936 48.936l-17-17 17-17"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="bevel"
        strokeMiterlimit={10}
        strokeWidth={2}
        d="M47.936 48.936l-17-17 17-17"
      />
    </svg>
  );
}

export default ArrowDobleLeft;
