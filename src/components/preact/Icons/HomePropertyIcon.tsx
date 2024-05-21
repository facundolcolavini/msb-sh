import type { JSX } from 'preact'
interface Props extends JSX.SVGAttributes<SVGSVGElement> {
}

function HomePropertyIcon(props:Props) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <path stroke="none" d="M0 0h24v24H0z" />
      <path d="M8 9l5 5v7H8v-4m0 4H3v-7l5-5m1 1V4a1 1 0 011-1h10a1 1 0 011 1v17h-8M13 7v.01M17 7v.01M17 11v.01M17 15v.01" />
    </svg>
  );
}

export default HomePropertyIcon;
