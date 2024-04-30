function PaperLocationIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6v.01M18 13l-3.5-5a4 4 0 117 0L18 13" />
      <path d="M10.5 4.75L9 4 3 7v13l6-3 6 3 6-3v-2M9 4v13M15 15v5" />
    </svg>
  );
}

export default PaperLocationIcon;
