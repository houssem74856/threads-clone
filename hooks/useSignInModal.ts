import { create } from 'zustand';

interface useSignInModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSignInModal = create<useSignInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSignInModal;