import React, { useState } from "react";
import Modal from "react-modal";
import CancelIcon from "@material-ui/icons/Cancel";
import "./ComponentStyle.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

Modal.setAppElement("#root");

const ModalBox = props => {
  const [isChecked, setIsChecked] = useState(false);

  const openModal = () => {
    props.setModalIsOpen(true);
  };

  const closeModal = () => {
    console.log(props);
    props.setModalIsOpen(false);
    if (props.redirectFunction) {
      props.redirectFunction();
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    props.submitFunction(isChecked);
  };

  return (
    <Modal
      isOpen={props.modalIsOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={props.modalLabel}
    >
      <div className="modalBox">
        <CancelIcon onClick={closeModal} />
        <form onSubmit={handleSubmit}>
          <label>
            remember me?
            <input
              type="checkbox"
              value={isChecked}
              onChange={event => {
                setIsChecked(event.target.checked);
              }}
            />
          </label>
          <input type="submit" value="Log Out" />
        </form>
      </div>
    </Modal>
  );
};

export default ModalBox;
