import { Context, createContext, useContext } from 'react';
import { ModalContextModal } from './Modal.types';

const ModalContext = createContext<ModalContextModal>({
    activeModalId: null,
    closeModal: () => undefined,
    openModal: () => undefined,
});

export default ModalContext;

export function useModalState<T = ModalContextModal>() {
    return useContext(ModalContext as unknown as Context<T>);
}

