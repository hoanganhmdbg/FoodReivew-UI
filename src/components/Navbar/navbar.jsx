import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import logo from '../../logo.png';
import { AuthContext } from '../../App';
import { useContext, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import {Button as ButtonUI} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './navbar.style.css'
function MyNavbar() {
    const { user,setUser } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
        localStorage.removeItem('token');
        setUser(null);
    };
    return (
        <Navbar bg="light" variant="light" style={{ height: '50px' }}>
            <Container>
                <Navbar.Brand href="/"><img src={logo}></img></Navbar.Brand>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-auto" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
                <Nav className="mr-sm-2">
                    {user ? (
                        <>
                            <span className="name">{user.name}</span>
                            <Avatar className='avatar'>{user.name[0]}</Avatar>
                            <div>
                                <ButtonUI aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                    <ArrowDropDownIcon />
                                </ButtonUI>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
                                </Menu>
                            </div>
                            <Link to='/create' className='icon'><span ><AddCircleTwoToneIcon /> </span></Link>
                        </>
                    ) : (<Link to='/login'>Đăng Nhập</Link>)}
                </Nav>
            </Container>
        </Navbar>

    )
}
export default MyNavbar;
