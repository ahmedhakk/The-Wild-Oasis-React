import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// Create a Compound Component
// 1) Create a context
const ModalContext = createContext();

// 2. Create parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const closeHandler = () => setOpenName("");
  const openHandler = (value) => setOpenName(value);

  return (
    <ModalContext.Provider
      value={{
        openName,
        closeHandler,
        openHandler,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

// 3. create a child component to help implementing the common task
function Open({ children, opens: openWindowName }) {
  const { openHandler } = useContext(ModalContext);

  // clone - استنساخ
  // cloneElement(element, props, ...children)
  // children = <Button>Add New Cabin</Button> // so when we click on that we need to excute the openHandler
  const clonedElement = cloneElement(children, {
    onClick: () => openHandler(openWindowName),
  }); // <Button onClick={() => openHandler(openWindowName)}>Add New Cabin</Button>

  /*
    <Modal.Open opens="cabin-form">
      <Button>Add New Cabin</Button>
    </Modal.Open>

    So What will be returned from this code is 
    clonedElement = <Button onClick={() => openHandler(openWindowName)}>Add New Cabin</Button>
  */

  return clonedElement;

  /*
  I have a Question here ?
  Now Open is a Child Component of the modal so it can manage the context
  and Button is a child component of the Modal.Open SO, it don't show the context ? so we can't manage our ModalContext form it ? 
  I Don't know 
  But That is why we take a clone of the Button element here to can access the context in this file.

    <Modal.Open opens="cabin-form">
      <Button>Add New Cabin</Button>
    </Modal.Open>
  */
}

function Window({ children, name }) {
  const { openName, closeHandler } = useContext(ModalContext);
  // const ref = useRef();

  // useEffect(() => {
  //   const clickHandler = (e) => {
  //     // console.log(ref); // modal
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       console.log("click outside");
  //       closeHandler();
  //     }
  //   };

  //   // addEventListener(type, listener, useCapture)
  //   document.addEventListener("click", clickHandler, true);

  //   return () => document.removeEventListener("click", clickHandler, true);

  //   // document.addEventListener("click", clickHandler);
  //   // return () => document.removeEventListener("click", clickHandler);

  //   // V : 16 - How React Work behind the scences -> More about Events capturing, Bubbling
  //   // More About That on slide 188, 189 -> on the slides of the Ultimate React Course (Jonas)
  //   /*
  //     Events starts from the root -> capturing phase
  //     Get to the place it clicked on,
  //     Then
  //     Starts the Bubbling Phace until it give out the DOM
  //   */

  //   /*
  //     we render the modal when we click on <Add New Cabin> button -> 'which is click outside the modal'

  //     And If we See the elements in the console we will find the div#modal-root flashes that improves that the modal is rendered.

  //     But when the event get out the DOM (Bubbling phace)
  //     it deletes the modal from the dom as the click on the <Add New Cabin> button is accully click outside the modal which is true

  //     SO,
  //     The Solution for that
  //     we need to get the fun excuted in the capturing phase only
  //   */
  // }, [closeHandler]);

  const ref = useOutsideClick(closeHandler);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={closeHandler}>
          <HiXMark />
        </Button>

        {/* Now Any Modal.Window child will recive onCloseModal prop to can close the modal */}

        <div>{cloneElement(children, { onCloseModal: closeHandler })}</div>
      </StyledModal>
    </Overlay>,
    document.querySelector(".modal-root")
  );
}

// 4. Add child components as properties to parent component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
