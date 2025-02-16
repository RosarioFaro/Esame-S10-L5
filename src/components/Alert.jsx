import { Toast } from "react-bootstrap";

const CustomAlert = ({ show, message, onClose }) => {
  return (
    <Toast
      style={{
        position: "fixed",
        top: "70px",
        right: "10px",
        zIndex: 1050,
      }}
      show={show}
      onClose={onClose}
      delay={3000}
      autohide
    >
      <Toast.Body className="text-black">{message}</Toast.Body>
    </Toast>
  );
};

export default CustomAlert;
