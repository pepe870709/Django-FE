import React from 'react'
import ReactDOM from "react-dom";

function Modal ({ isOpen, onClose, children }){

  if (!isOpen) return null;

  console.log("Rendering Modal");

  return ReactDOM.createPortal(
        <dialog id="my_modal_2" className={!isOpen ? "modal" : "modal modal-open"}>
            <div className={!isOpen ? "modal-box modal-top" : "modal-box modal-open modal-top"}>
                <h3 className="font-bold text-lg">Hello!</h3>
                {children}
                <div className="modal-action">
                <form method="dialog" >
                <button className='btn' onClick={onClose}>close</button>
                </form>

            </div>
            </div>
            
            
        </dialog>
    ,
    document.body
  );
}

export default Modal
