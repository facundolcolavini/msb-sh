import type { PropsWithChildren } from 'preact/compat';
import { useState } from 'preact/hooks';
import Button from './ui/Buttons/Button';


type Props = {
  label?: string,
  childrenDrop?: string
}
const NavDropDown = (props: PropsWithChildren<Props>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div class="relative z-10 ">
      <button onClick={toggleDropdown} class="flex flex-row items-center" >
        <span>{props.label}</span>
      </button>
      {isOpen && (
        <>
          {props.childrenDrop}
        </>
      )}
    </div>
  );
};

export default NavDropDown;
