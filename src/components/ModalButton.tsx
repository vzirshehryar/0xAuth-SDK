import { useState } from "react";
import Modal from "./Modal";

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Connect to 0xAuth</button>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default ModalButton;
