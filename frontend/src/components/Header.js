import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown,Dropdown,NavItem,NavLink } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { Hamburger } from "./Hamburger";
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
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
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
                  title={<strong>{userInfo.name}</strong>}
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
                <NavDropdown
                  title={<strong>{'More'}</strong>}
                  id='adminmenu'
                >
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

      <Navbar className='sub-header' variant='dark' expand='sm'>
        <Container>
          <Nav className='ms-start h-20'>
            <Dropdown as={NavItem} renderMenuOnMount={true}>
              <Dropdown.Toggle as={NavLink}>
                <strong>
                  {" "}
                  <i className='fab fa-buffer'></i> ALL CATEGORIES
                </strong>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@Fruits'>
                    <Nav.Link>Fresh Fruits</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@Vegetables'>
                    <Nav.Link>Fresh Vegetables</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@Grocery'>
                    <Nav.Link>Grocery</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@Flour'>
                    <Nav.Link>Atta &amp; Flour</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@Rice'>
                    <Nav.Link>Rice &amp; Rice Products</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@SpicesAndHerbs'>
                    <Nav.Link>Spices &amp; Herbs</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@ReadyMeals'>
                    <Nav.Link>Ready Meals</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@SweetAndSnacks'>
                    <Nav.Link>Sweets &amp; Snacks</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@Beverages'>
                    <Nav.Link>Beverages</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
                <Dropdown.Item>
                  <LinkContainer to='/search/cat@others'>
                    <Nav.Link>Others</Nav.Link>
                  </LinkContainer>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
