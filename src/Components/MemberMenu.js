// When visible, shows a menu with different actions that can be performed for a member (edit, delete)
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuDivider,
  } from '@chakra-ui/react'


export default function MemberMenu() {

    return (
        <Menu className='memberMenu'>
            <MenuButton className='menuButton rgt-columns-manager-button' onClick={e => e.stopPropagation()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"></path>
                </svg>
            </MenuButton>
            <MenuList className='menuList' onClick={e => e.stopPropagation()}>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </MenuList>
        </Menu>
    )
}