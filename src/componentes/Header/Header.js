import React, { useContext, useState, useEffect } from 'react';
import { Button, Nav, Navbar} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UseContext } from '../../App';
import './Header.css';

const Header = () => {

   const [loggedInUser, setLoggedInUser] = useContext(UseContext)


   return (
   <div className="header-bg">
      <div className="container">
         <Navbar collapseOnSelect expand="lg" >
            <Navbar.Brand className="navbar-title" href="#home">Tithi Riders</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="ml-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to={"/destination/:"}>Destination</Nav.Link>
                  <Nav.Link href="#deets">Blog</Nav.Link>
                  <Nav.Link className="userName" href="#deets">{loggedInUser.name}</Nav.Link>
                  {!loggedInUser.name && 
                  <Link to="/login"><Button  variant="primary" >Login</Button></Link>
                  }
                  {loggedInUser.name && 
                  <Link to="/login" onClick={() => setLoggedInUser({})}><Button variant="primary" >Logout</Button></Link>
                  }
               </Nav>
            </Navbar.Collapse>
         </Navbar>
      </div>
   </div>
   );
};

export default Header;