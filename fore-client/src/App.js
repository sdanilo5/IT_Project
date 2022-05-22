import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Home from './components/HomeComponent/Home';
import Jokes from './components/JokesComponent/Jokes';
import Users from './components/UsersComponent/Users';
import ProfilePage from './components/ProfilePageComponent/ProfilePage';
import {
          BrowserRouter as Router,
          Link, 
          Routes, 
          Route
        } from 'react-router-dom';
import {
  Navbar, 
  Nav, 
  NavDropdown, 
  Container,
} from 'react-bootstrap';

function App() {
  return (
    <div  className='body-div'>
      <Router>
        <header style={{marginBottom: "30px"}}>
          <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" >
            <Container>
            <Navbar.Brand href="#home">Fore Nocne More</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/jokes">Jokes</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
              <Nav>
                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Log out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/jokes' element={<Jokes />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/users/:id' element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
