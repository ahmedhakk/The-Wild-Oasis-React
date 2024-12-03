import Button from "../../ui/Button";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";
import Modal from "../../ui/Modal";

// const AddCabin = () => {
//   const [isOpenModel, setIsOpenModel] = useState(false);

//   const closeModalHandler = () => {
//     setIsOpenModel(false);
//   };

//   return (
//     <>
//       <Button onClick={() => setIsOpenModel((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModel && (
//         <Modal onCloseModal={closeModalHandler}>
//           <CreateCabinForm onCloseModal={closeModalHandler} />
//         </Modal>
//       )}
//     </>
//   );
// };

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
