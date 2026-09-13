import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import Button from '../Button/Button';
import ContainerFluid from '../Container/ContainerFluid';
import Column from '../Layout/Column';
import Row from '../Layout/Row';
import {
  modalDuration,
  modalHeaderStyle,
  modalStyle,
  overlayStyle,
} from './Modal.css';

export const ModalContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
}>({ isOpen: false, toggle: () => null });

const Modal: React.FC<PropsWithChildren<unknown>> = (props) => {
  const { children } = props;
  const { isOpen, toggle } = useContext(ModalContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      menuRef.current?.focus({ preventScroll: true });
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
  }, [isOpen]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && isOpen) {
      toggle();
    }
  };

  return (
    <>
      <Transition
        in={isOpen}
        nodeRef={overlayRef}
        timeout={modalDuration}
        unmountOnExit
      >
        {(state) => {
          return <div ref={overlayRef} className={overlayStyle[state]} />;
        }}
      </Transition>

      <Transition
        in={isOpen}
        nodeRef={menuRef}
        timeout={modalDuration}
        unmountOnExit
      >
        {(state) => {
          return (
            <div onKeyDown={onKeyDown} ref={menuRef} tabIndex={0}>
              <nav className={modalStyle[state]}>
                <div className={modalHeaderStyle}>
                  <Row horizontalAlign="right">
                    <Column width={{ xs: 'auto' }}>
                      <Button
                        aria-label="Close"
                        onClick={toggle}
                        size="sm"
                        type="button"
                      >
                        <FontAwesomeIcon
                          color="white"
                          icon={faTimes}
                          size="lg"
                        />
                      </Button>
                    </Column>
                  </Row>
                </div>
                <ContainerFluid>{children}</ContainerFluid>
              </nav>
            </div>
          );
        }}
      </Transition>
    </>
  );
};

export default Modal;
