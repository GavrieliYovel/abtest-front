import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, useDisclosure, Text,
} from "@chakra-ui/react"
import * as PropTypes from "prop-types";

function Lorem(props) {
    return null;
}

Lorem.propTypes = {count: PropTypes.number};

function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen}>Open Modal</Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                            You can scroll the content behind the modal
                        </Text>
                        <Lorem count={2} />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="brand" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost">Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
export default BasicUsage;
