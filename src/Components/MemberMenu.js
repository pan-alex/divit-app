// When visible, shows a menu with different actions that can be performed for a member (edit, delete)
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
import MemberDelete from './MemberDelete';
import ThreeDots from './Icons'

export default function MemberMenu( {member, toggleMemberEdit}) {
    return (
        <Menu className='memberMenu'>
            <MenuButton className='menuButton rgt-columns-manager-button' onClick={e => e.stopPropagation()}>
                <ThreeDots />
            </MenuButton>
            <MenuList className='menuList' onClick={e => e.stopPropagation()}>
                <MenuItem onClick={toggleMemberEdit}>Edit</MenuItem>
                <MemberDelete member={member} />
            </MenuList>
        </Menu>
    )
}