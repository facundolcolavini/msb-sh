import type { JSX } from "preact/jsx-runtime";

/* interface Props extends JSX.HTMLAttributes<HTMLDivElement> {
} */

const Spinner = () => {
  return (
    <div className="flex  h-screen items-center">

      <div id="spinner"  class="border-gray-300 h-20 w-20 rounded-full border-8 border-t-blue-600 animate-spinSlow h-100"  />
    </div>
  )
}

export default Spinner