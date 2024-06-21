import { ComponentProps, ReactElement } from "react";

export type ModalProviderState = {
    activeId: string;
    componentProps: ComponentProps<any>;
};

export type ModalMap<I extends string> = Record<I, (props?: ComponentProps<any>) => ReactElement>;

export type ModalContextModal = {
    activeModalId: string;
    closeModal(): void;
    openModal(id: string, props?: ComponentProps<any>): void;
};

export type CreateModalState<I extends string, A extends [id: I, props?: any]> = {
    activeModalId: I;
    closeModal(): void;
    openModal(...args: A): void;
};

