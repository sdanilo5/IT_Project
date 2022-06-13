import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Home from './components/HomeComponent/Home';
import Jokes from './components/JokesComponent/Jokes';
import Users from './components/UsersComponent/Users';
import ProfilePage from './components/ProfilePageComponent/ProfilePage';
import {
          BrowserRouter as Router,
          Routes, 
          Route
        } from 'react-router-dom';
import {
  Navbar, 
  Nav, 
  NavDropdown, 
  Container,
} from 'react-bootstrap';
import SignUpModal from './components/SignUpModalComponent/SignUpModal';
import LogInModal from './components/LogInModalComponent/LogInModal';
import jwt_decode from "jwt-decode";
import EditProfile from './components/EditProfileComponent/EditProfile';

function App() {
  const [signUpModalShow, setSignUpModalShow] = React.useState(false);
  const [logInModalShow, setLogInModalShow] = React.useState(false);


  const logOutClick = () => {
    window.localStorage.removeItem('token');
    window.sessionStorage.removeItem('token');
  }

  return (
    <div  className='body-div'>
      <Router>
        <header style={{marginBottom: "30px"}}>
          <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" >
            <Container>
            <Navbar.Brand href="/">Fore Noćne More</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/jokes">Jokes</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
              <Nav >
                {
                  (sessionStorage.getItem('token')) ? 
                    <NavDropdown title="My Account" id="collasible-nav-dropdown">
                      <NavDropdown.Item href={`/users/${jwt_decode(sessionStorage.getItem('token')).id}`}>View Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/edit-profile">Settings</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/" onClick={() => logOutClick()}>Log out</NavDropdown.Item>
                    </NavDropdown>
                    :
                    <>
                      <Nav.Link onClick={() => setSignUpModalShow(true)}>Sign up</Nav.Link>
                      <Nav.Link onClick={() => setLogInModalShow(true)}>Log in</Nav.Link>
                    </>
                }
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <SignUpModal 
          show={signUpModalShow} 
          onHide={() => setSignUpModalShow(false)}
        />

        <LogInModal 
          show={logInModalShow} 
          onHide={() => setLogInModalShow(false)}
        />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/jokes' element={<Jokes />} />
          <Route exact path='/users' element={<Users />} />
          <Route exact path='/users/:id' element={<ProfilePage />} />
          <Route exact path='/edit-profile' element={<EditProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
