import {
  createContext,
  useContext,
  useState,
  ReactNode,
  ComponentType,
} from 'react';

type BaseModalType = {
  onClose: () => void;
  message: string;
  btnText: string;
};

type ModalComponentType<P = object> = ComponentType<P & BaseModalType>;

interface ModalItem<P = object> {
  Component: ModalComponentType<P>;
  props: P & {
    message: string;
    btnText: string;
  };
}

type ContextType = {
  open: <P = object>(modal: ModalItem<P>) => void;
  close: (Component: ModalComponentType<unknown>) => void;
  openedModals: ModalItem[];
};

const defaultContext: ContextType = {
  open: () => {},
  close: () => {},
  openedModals: [],
};

export const ModalsContext = createContext<ContextType>(defaultContext);

export function useModalContext() {
  const { open, close } = useContext<ContextType>(ModalsContext);

  const openModal = <T,>({ Component, props }: ModalItem<T>) => {
    open({ Component, props });
  };

  const closeModal = (Component: ModalComponentType<unknown>) => {
    close(Component);
  };

  return { openModal, closeModal };
}

interface ModalContextProviderProps {
  children: ReactNode;
}

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [openedModals, setOpenedModals] = useState<ModalItem<any>[]>([]);

  const open = <T,>({ Component, props }: ModalItem<T>) => {
    setOpenedModals(modals => [...modals, { Component, props }]);
  };

  const close = (Component: ModalComponentType<unknown>) => {
    setOpenedModals(modals =>
      modals.filter(modal => modal.Component !== Component),
    );
  };

  const value = { open, close, openedModals };

  return (
    <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
  );
}
