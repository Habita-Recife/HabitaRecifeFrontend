import React from "react";
import { useState } from "react";
import checkmark from "../../assets/checkmark.svg"

import "./style.css"; 
import { X } from "lucide-react";
// import userCheckIcon from "../../assets/user-check-icon.png"; 

const ModalCadSucess = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={15} />
        </button>
        <img  src={checkmark} alt="Sucesso" className="modal-icon" />
        <p>
          Cadastro enviado com sucesso, aguarde autorização da portaria!
        </p>
      </div>
    </div>
  );
};

export default ModalCadSucess;