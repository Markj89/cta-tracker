import { ReactElement, ReactNode, useMemo, useState } from "react";
import { ModalContextModal, ModalMap, ModalProviderState } from "./Modal.types";
import ModalContext from './Modal.context';

type Props<I extends string> = {
    map: ModalMap<I>;
    children: ReactNode;
};

const initialState = {
    activeId: null,
    componentProps: null,
    children: null
};

function ModalStateProvider<I extends string>({ map, children }: Props<I>) {
    const [{ activeId, componentProps }, setState] = useState<ModalProviderState>(initialState);

    const openModal: ModalContextModal['openModal'] = (activeId, componentProps): void => {
        setState({ activeId, componentProps });
    };

    const closeModal: ModalContextModal['closeModal'] = () => {
        setState({ ...initialState });
    };

    const renderModalComponent = (): ReactElement => {
        if (!activeId) {
            return null;
        }

        if (!(activeId in map)) {
            return null;
        }
        const Component = map[activeId];

        return <Component onClose={closeModal} {...componentProps} />;
    }

    const value = useMemo(() => ({ openModal, closeModal, activeModalId: activeId }),[openModal, closeModal, activeId]);
    return (
        <ModalContext.Provider value={value}>
            {children}
            {renderModalComponent()}
        </ModalContext.Provider>
    );
}

export default ModalStateProvider;