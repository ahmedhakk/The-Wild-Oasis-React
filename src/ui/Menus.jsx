import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenuContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");

  const open = setOpenId; // const open = (id) => setOpenId(id);

  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openId, close, open, setPosition } = useContext(MenuContext);

  const clickHandler = (e) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect  => More about getBoundingClientRect which help us to get positions about the element

    e.stopPropagation(); // This method prevents the event from bubbling up the DOM tree.
    /*
    How Event Propagation Works
      In the DOM, events follow a propagation pattern:

      Capturing Phase: The event travels down from the root to the target element.
      Target Phase: The event reaches the target element where the event handler is executed.
      Bubbling Phase: The event bubbles back up from the target element to the root, invoking event handlers on ancestor elements.
      By default, React handles events during the bubbling phase (not capturing). e.stopPropagation() halts this bubbling process.
    */
    const rect = e.target.closest("button").getBoundingClientRect();
    /* console.log(rect);
    // DOMRect {
    //   bottom: 288,
    //   height: 32,
    //   left: 1062,
    //   right: 1094,
    //   top: 256,
    //   width: 32,
    //   x: 1062,
    //   y: 256,
    // }; */
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <StyledToggle onClick={clickHandler}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenuContext);

  const ref = useOutsideClick(close, false); // false => listen on the bubbling phase + we need to stop the capturing phase in the toggleClick function

  if (openId !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick, disabled }) => {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
