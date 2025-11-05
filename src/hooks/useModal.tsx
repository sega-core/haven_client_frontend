import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/modal";
import { Typography } from "../components/Typography";
import { Icon } from "../components/Icon";

export const useModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const ModalComponent: React.FC<{
    title?: string;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';
    backdrop?: 'transparent' | 'opaque' | 'blur';
    placement?: "auto" | "bottom" | "top" | "center" | "top-center" | "bottom-center" | undefined;
  }> = ({ 
    title, 
    body, 
    footer, 
    size = 'md',
    backdrop = 'blur',
    placement = 'center'
  }) => {
    return (
      <>
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          size={size}
          backdrop={backdrop}
          placement={placement}
          closeButton={<div className="p-0"><Icon name='Close' className="mt-1.5"/></div>}
        >
          <ModalContent className="bg-white-primary">
            {() => (
              <>
                {title && (
                  <div className="flex flex-col items-center gap-1 pt-4">
                    <Typography type="heading-s" weight='medium' className="text-brown-primary">{title}</Typography>
                  </div>
                )}
                
                {body && <ModalBody>{body}</ModalBody>}
                
                {footer && <ModalFooter>{footer}</ModalFooter>}
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  };

  return {
    Modal: ModalComponent,
    isOpen,
    onOpen,
    onClose,
    onOpenChange,
  };
};