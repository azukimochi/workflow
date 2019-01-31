import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('#root')

const CancelModal = props => {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onAfterOpen={props.afterOpenModal}
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <div className="modalContainer">
          <p id="modalClose" onClick={props.closeModal}>x</p>
          <br />
          <h2>Are you sure?</h2>
          <div className="modalBlurb">If you cancel, your workflow will not be saved.</div>
          <br />
          <button onClick={props.closeModal}>
            <i className="fa fa-times"></i>
            I want to keep working
            </button>
          <button onClick={() => props.handleDiscard()}>
            <i className="fa fa-check"></i>
            I want to cancel
            </button>
        </div>
      </Modal>
    </div>
  )
}

export default CancelModal