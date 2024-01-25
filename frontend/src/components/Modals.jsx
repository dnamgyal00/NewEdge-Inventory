import React from "react";
import { Modal, Button } from "react-bootstrap";
// import { IoWarningOutline } from "react-icons/io5";

export default function Modals({ show, onHide, onConfirm, title, body }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalType, setModalType] = React.useState("");

  return (
    <Modal
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton className="border-0 pb-0">
        {/* <Modal.Title className="text-center">{title}</Modal.Title> */}
      </Modal.Header>

      <Modal.Body className="text-center text-black pt-1">
        <h5>{title}</h5>
        <hr className="m-auto w-50 mb-3" />
        {body}
      </Modal.Body>
      <Modal.Footer className="m-auto mb-2 border-0">
        <Button variant="primary" className="py-1" onClick={onConfirm}>
          Yes
        </Button>
        <Button variant="danger" className="py-1 text-white" onClick={onHide}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
