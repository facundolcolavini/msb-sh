import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props {
  addStyles?: string;
  w?: string;
  h?: string;
}
const UserIcon
 = ({ addStyles, w = "16", h = "16" }: Props) => {
  const styles = twMerge(clsx("object-contain", addStyles));
  return (
    <>
      <img id="user" className={styles} alt="user icon" src="/images/user.png" width={w} height={h} />
    </>

  )
}

export default UserIcon
