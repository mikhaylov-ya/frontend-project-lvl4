import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { Modal as ModalContainer } from 'react-bootstrap';
import { closeModal } from '../../slices/modalsSlice.js';
import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpened } = useSelector((state) => state.modals);

  const close = () => {
    dispatch(closeModal());
  };
  const { type } = useSelector((state) => state.modals);

  const ModalBody = modals[type];

  return (
    <ModalContainer show={isOpened} onHide={close} centered>
      {ModalBody && <ModalBody closeModal={close} />}
    </ModalContainer>
  );
};

export default Modal;
