import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface Props {
    title: string;
    message: string;
    visible: boolean;
    handleClose: () => void;
    handleConfirm: () => void
}

function MyModal({title, message, visible, handleClose, handleConfirm}: Props) {
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      <Modal show={visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyModal;