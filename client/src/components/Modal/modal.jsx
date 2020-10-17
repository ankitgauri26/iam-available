import React, {useState} from 'react';
import './modal.scss'

const Modal = ({closeModal, onYes, modalMessage}) => {
  return (
    <div className='overlay'>
      <div className='modal-container'>
        <div className='modal-body'>{modalMessage}</div>
        <div className='modal-buttons'>
          <button onClick={onYes} className='yes-button'>YES</button>
          <button onClick={closeModal} className='no-button'>NO</button>
        </div>
      </div>
    </div>
  )}

export default Modal;