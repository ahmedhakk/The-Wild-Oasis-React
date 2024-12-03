import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

// My Code With Notes
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
