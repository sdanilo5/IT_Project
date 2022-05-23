import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import './App.css';
import Home from './components/HomeComponent/Home';
import Jokes from './components/JokesComponent/Jokes';
import Users from './components/UsersComponent/Users';
import JokeDetails from './components/JokeDetailsComponent/JokeDetails';
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

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  const signUp = () => {
    // signup functionallity
  }

  return (
    <div  className='body-div'>
      <Router>
        <header style={{marginBottom: "30px"}}>
          <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" >
            <Container>
            <Navbar.Brand href="/">Fore Nocne More</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/jokes">Jokes</Nav.Link>
                <Nav.Link href="/users">Users</Nav.Link>
              </Nav>
              <Nav >
                <Nav.Link onClick={() => setModalShow(true)}>Sign up</Nav.Link>
                <Nav.Link>Log in</Nav.Link>
                {/* to show when user is logged in
                <NavDropdown title="My Account" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#">Log out</NavDropdown.Item>
                </NavDropdown>
                */}
              </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <SignUpModal 
          show={modalShow} 
          onHide={() => setModalShow(false)}
        />

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/jokes' element={<Jokes />} />
          <Route exact path='/jokes/:id' element={<JokeDetails />} />
          <Route exact path='/users' element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
