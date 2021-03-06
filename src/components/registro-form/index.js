import React, { useState, useEffect } from 'react'
import api from '../../lib/api' 
import { useHistory } from 'react-router-dom'

function RegistryForm ( props ) {
    const [ newUser, setNewUser ] = useState({})
    const [ errorMessage, setErrorMessage] = useState("")
    const history = useHistory()

    const createNewUserHandler = ( event ) => {
        let value = event.target.value
        let property = event.target.name
        setNewUser( {...newUser, [property] : value} )
    }

    const showNewUserError = (message) => {
        setErrorMessage("¡Este correo ya existe!\nRegistra un nuevo correo")
    }

    const showSuccessRegistry = () => {
      history.push('/login')
    }

    const sendRegistryFrom = async ( event ) => {
      event.preventDefault()
      await api.saveNewUserHandler(newUser, showSuccessRegistry, showNewUserError)
    }

    return (
        <form action="registry-form" onSubmit={sendRegistryFrom}>
          { errorMessage &&
            <div className="alert-danger p-2 rounded" borderRadius={8}>
              {errorMessage}
            </div>
          }
          <span className="registry-span">Mis datos</span>
          <div className="form-group mt-2">
            <input class="form-controle" required type="text" placeholder="Nombre" name="first_name" onChange={createNewUserHandler} />
          </div>

          <div className="form-group">
            <input class="form-controle" required type="text" placeholder="Apellidos" name="last_name" onChange={createNewUserHandler} />
          </div>

          <div className="form-group">
            <input class="form-controle" required type="email" placeholder="E-mail" name="email" onChange={createNewUserHandler} />
          </div>

          <div className="form-group">
            <input class="form-controle" required type="password" placeholder="Contraseña" name="password" onChange={createNewUserHandler} />
          </div>

          <span className="registry-span">Datos de mi hijo</span>

          <div className="form-group mt-2">
            <input class="form-controle" required type="date" placeholder="Fecha de nacimiento de tu hijo" name="kid_birthday" onChange={createNewUserHandler} />
          </div>

          <div className="form-group">
            <input class="form-controle" required type="text" placeholder="Alias de tu hijo" name="kid_name" onChange={createNewUserHandler} />
          </div>

          <div className="text-right">
            <button type="submit" className="create-user-button">¡Registrarme!</button>
          </div>
        </form>
    )
}

export default RegistryForm