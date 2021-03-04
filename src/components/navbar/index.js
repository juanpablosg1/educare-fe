import React, { useState } from 'react';
import {
  Collapse,
  NavbarToggler,
} from 'reactstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import logotype from '../../images/EduCaré-azul-logo.svg'
import SearchBar from '../searchbar/search-bar';

function NavBar (props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const token = localStorage.getItem("token")

    return(
      <nav className="navbar navbar-expand-lg navbar-light navbar-className flex-wrap">
        <Link className="navbar-brand" to="/"><img src={logotype} alt="logotype de EduCaré" width="200" /></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          
          <SearchBar />
          <ul className="navbar-nav ml-auto">
            {/* <li className="nav-item active">
              <Link to="/" className="nav-link" >Inicio<span className="sr-only">(current)</span></Link>
            </li> */}
            <li className="nav-item">
              <Link to="/materias" className="nav-link" style={{color: "#3BB4CA"}}>Materias</Link>
            </li>
            <li className="nav-item">
              <Link to="/actividades" className="nav-link" style={{color: "#3BB4CA"}}>Actividades</Link>
            </li>
            <button className="nav-item login-button" type="button">
              {
                token
                ? <Link className="nav-link" tabindex="-1" aria-disabled="true" onClick={props.logout} style={{color: "#FE8D03"}}>Cerrar Sesión</Link>
                : <Link to="/login" className="nav-link" tabindex="-1" aria-disabled="true" style={{color: "#FE8D03"}}>Iniciar Sesión</Link>
              }
            </button>

            {
              !token && <button className="nav-item signup-button" type="button">
                <Link to="/signup" className="text-white nav-link" tabindex="-1" aria-disabled="true" >Regístrate</Link>
              </button>
            }

          </ul>
        </Collapse>
      </nav>
    )
}

export default NavBar
