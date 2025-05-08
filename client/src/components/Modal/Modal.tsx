/**
 * Modal
 * @type {Component} Modal
 *
 * @returns JSX.Element
 */
import React, { useEffect } from "react";
import { CreateModalState, ModalMap } from "./Modal.types";
import StationModal, { StationCardProps } from "./StationModal";
import { useModalState } from "./Modal.context";
import ModalStateProvider from "./Modal.provider";

type ModalProps = {
  isOpen: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};

export enum ModalId {
  Station = "station-modal",
}

type ModalState = CreateModalState<
  ModalId,
  [ModalId.Station, StationCardProps]
>;

const MODAL_MAP: ModalMap<ModalId> = {
  [ModalId.Station]: StationModal,
};

export const useModal = () => useModalState<ModalState>();

const Modal: React.FC<ModalProps> = ({
    isOpen,
  children,
  handleClose
}: ModalProps) => {
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;
  return (
    <ModalStateProvider map={MODAL_MAP}>
      <div
        className="modal sm:rounded-lg sm:px-10 sm:mx-auto sm:max-w-lg px-6 pt-10 pb-8 shadow-xl ring-1"
        role="dialog"
        aria-labelledby="station-modal"
        aria-modal={isOpen}
      >
        <div className="modal-wrapper">
          <header className="modal-header">
            <button
              onClick={handleClose}
              className="close-btn"
              aria-label="close"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>
          <div className="modal-body">
            <div className="modal-content">{children}</div>
          </div>
        </div>
      </div>
    </ModalStateProvider>
  );
};

export default Modal;
