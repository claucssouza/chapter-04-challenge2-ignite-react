import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
  title: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
  title
}: ModalViewImageProps): JSX.Element {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent style={{ background: '#1B1A18'}}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <Image src={imgUrl} />
        <ModalFooter>
         <Link href={imgUrl} isExternal fontSize="0.9rem" mr="auto" style={{ background: 'red', left: '10px'}}>
            Abrir original
          </Link>
        </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
