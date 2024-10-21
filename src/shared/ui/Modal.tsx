import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { CgClose } from 'react-icons/cg';

type ModalProps = {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  useEffect(() => {
    const handleEscKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKeydown);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKeydown);
      document.body.style.overflow = '';
    };
  }, [onClose, isOpen]);

  const handleClose = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          onClick={handleClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="md:min-w-[450px] min-w-[300px] py-8 md:px-8 px-4 relative rounded-md min-h-[200px] bg-secondary text-foreground"
          >
            {children}
            <button
              onClick={handleClose}
              className="absolute top-1 duration-200 right-1 bg-rose-500 active:opacity-100 hover:opacity-60 p-[2px] rounded-sm flex justify-center items-center focus:ring-[2px] focus:ring-offset-secondary focus:ring-offset-[2.5px] focus:ring-rose-500 text-secondary"
            >
              <CgClose size={16} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
