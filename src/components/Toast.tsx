import React from "react";
import { ToastContainer } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';

interface Props {
    visible: boolean;
    message: string;
    toggleClose: () => void
}
const MyToast = ({visible, message, toggleClose}: Props) => {
    return (
        <div
        aria-live="polite"
        aria-atomic="true"
        className="position-relative"
        style={{ minHeight: '240px' }}>
        <ToastContainer
          className="p-3"
          position="top-center"
          style={{ zIndex: 1 }}>
        <Toast show={visible} onClose={toggleClose} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Alert</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
        </ToastContainer>
        </div>
    );
}

export default MyToast;