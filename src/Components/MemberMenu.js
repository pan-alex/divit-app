// When visible, shows a menu with different actions that can be performed for a member (edit, delete)
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
  } from '@chakra-ui/react'

import ButtonTripleDots from './ButtonTripleDots'

export default function MemberMenu() {

    return (
        <Menu className='memberMenu'>
            <MenuButton as={ButtonTripleDots} className='rgt-columns-manager-button' />
            <MenuList className='menuList'>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </MenuList>
        </Menu>
        // <Menu>
        //     {({ isOpen }) => (
        //         <>
        //             <MenuButton as={ButtonTripleDots} onClick={e => e.stopPropagation} isActive={isOpen} />
        //             <MenuList>
        //                 <MenuItem>Hi</MenuItem>
        //                 <MenuItem>Bye</MenuItem>
        //             </MenuList>
        //         </>
        //     )}
        // </Menu>
    )
}