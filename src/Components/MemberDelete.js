import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    MenuItem,
  } from '@chakra-ui/react'
import { group } from './Classes'
import { useContext } from 'react';
import { GroupContext } from '../App'

export default function MemberDelete( {member} ) {
    const [, setMembersState] = useContext(GroupContext)
    const { isOpen, onOpen, onClose } = useDisclosure()

    function handleDeleteClick() {
        group.deleteMember(member)
        setMembersState()
        onClose()
    }

    return (
        <MenuItem onClick={onOpen}>
            Delete
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>Are you sure you want to delete <strong>{member.name}</strong>?</p>
                        <p>All of their contributions / transactions will be deleted. This action is irreversible.</p>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-outline-danger' onClick={handleDeleteClick}>
                        Delete
                        </button>
                        <button className='btn btn-secondary' onClick={onClose}>
                        Cancel
                        </button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </MenuItem>
    )
}