import type { PropsWithChildren } from 'preact/compat';
import { useState } from 'preact/hooks';

type Props = {
  label?: string,
  childrenDrop?: string
}
const NavDropDown = (props: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div class="relative z-10 transition-all">
      <button onClick={toggleDropdown} class="flex flex-row items-center" >
        <span>{props.label}</span>
      </button>
      {isOpen && (
        <div className=" animate-fade-down animate-duration-300">
          {props.childrenDrop}
        </div>
      )}
    </div>
  );
};

export default NavDropDown;
