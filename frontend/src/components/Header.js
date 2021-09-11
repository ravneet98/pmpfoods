import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown,Dropdown,NavItem,NavLink } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
const Header = () => {
  
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  

  const logoutHandler = () => {
    dispatch(logout());
  };
  

  return (
    <header>
      <Navbar
        bg='light'
        variant='light'
        expand='lg'
        collapseOnSelect
        className='shadow-sm'
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
            <img
                src='/logo.png'
                height='60'
                className='d-inline-block align-top'
                alt='PMP Foods LTD'
              />
             
            </Navbar.Brand>
          </LinkContainer>
          <NavDropdown
            title={
              <strong>
                <i className='fab fa-buffer'></i>
                {" ALL CATEGORIES"}
              </strong>
            }
            id='categories'
          >
            <LinkContainer to='/search/cat@Fruits'>
              <NavDropdown.Item>Fresh Fruits</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='search/cat@Vegetables'>
              <NavDropdown.Item>Fresh Vegetables</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/search/cat@Grocery'>
              <NavDropdown.Item>Grocery</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/search/cat@Flour'>
              <NavDropdown.Item>Atta &amp; Flour</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='search/cat@Rice'>
              <NavDropdown.Item>Rice &amp; Rice Products</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/search/cat@SpicesAndHerbs'>
              <NavDropdown.Item>Spices &amp; Herbs</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/search/cat@ReadyMeals'>
              <NavDropdown.Item>Ready Meals</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/search/cat@SweetAndSnacks'>
              <NavDropdown.Item>Sweets &amp; Snacks</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/search/cat@Beverages'>
              <NavDropdown.Item>Beverages</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to='/search/cat@others'>
              <NavDropdown.Item>Others</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className='ms-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <strong>
                    <i className='fas fa-shopping-bag'></i> Bag
                  </strong>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown
                  title={<strong >{userInfo.name}</strong>}
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user-circle'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title={<strong>{"More"}</strong>} id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
