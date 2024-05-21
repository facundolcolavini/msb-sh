import clsx from 'clsx';
import type { JSX } from 'preact'
import { twMerge } from 'tailwind-merge';
interface Props extends JSX.SVGAttributes<SVGSVGElement> {
}
function WarningAlertIcon(props:Props) {
  const styles = twMerge(clsx("fill-primary-msb flex items-center w-[24px] h-[24px]", props.className));
  return (
    <svg
      viewBox="0 0 21 21"
      fill="currentColor"
      
      height="1em"
      width="1em"
      {...props}
      className={styles}
    >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.517 3.5l4.983 5v6l-4.983 5H8.5l-5-5v-6l5-5zM11.5 12.5v-5"
        />
        <path
          fill="currentColor"
          d="M12.5 15.5 A1 1 0 0 1 11.5 16.5 A1 1 0 0 1 10.5 15.5 A1 1 0 0 1 12.5 15.5 z"
        />
    </svg>
  );
}

export default WarningAlertIcon;
