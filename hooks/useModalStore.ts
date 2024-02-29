import { create } from 'zustand';

type modalType = "signIn" | "signUp"

interface useModalStore {
  type: modalType | null;
  isOpen: boolean;
  onOpen: ( type: modalType ) => void;
  onClose: () => void;
}

const useModal = create<useModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));

export default useModal;