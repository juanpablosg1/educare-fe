const api =  {
    /*Creamos las funciones para cada petición, estas funciones son asíncronas puesto que fetch nos devolverá una promesa que debemos esperar a que sea resuelta*/

    async getAllActivities( token ) {
        /*creamos una variable para almacenar la respuesta de la promesa, usamos await para esperar a que la promesa se resuelva*/
        const response = await fetch(`https://apieducare.mybluemix.net/resources`, {
            headers: {
                "Authorization": token
            }
        })

        /*regresamos la respuesta de la petición, usando await para esperar que resuelva el método .json()*/
        return await response.json()
    },
    async getActivityById(token, id, callBack) {
        await fetch(`https://apieducare.mybluemix.net/resources/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            }
        })
            .then(response => {
                if (!response.ok) {
                    return response.json()
                        .then(error => { throw new Error(error.message) })
                }
                return response.json()
            })
            .then(json => callBack(json.data))
            .catch(error => console.log(error))
    },

    async saveNewActivityHandler(token, newActivity) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": token
            },
            body: JSON.stringify(newActivity)
        };


        await fetch('https://apieducare.mybluemix.net/resources', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                window.location.href = "/actividades"
            });

    },

    async sendLoginHandler(user, callback) {
        const requestObject = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };


        await fetch('https://apieducare.mybluemix.net/auth/user/login', requestObject)
            .then(data => {
                return data.json()
            })
            .then(data => {
                if (data.success) {
                    console.log(data.data.token)
                    localStorage.setItem("token", data.data.token)
                    window.location.href = "/"
                } else {
                    console.log("Tus datos son incorrectos.")
                    callback(true)
                }
            })
    },

    async deleteActivity(id, token) {
        await fetch(`https://apieducare.mybluemix.net/resources/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        })
        .then( data => {
            return data.json()
          })
          .then( data => {
            if (data.success) {
                console.log("Se borró el recurso exitosamente.")
                window.location.reload()
            } else {
              console.error("Error: ", data.error)
            }
          })
    },

    async saveNewUserHandler( newUser, successCallback, errorCallback ) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( newUser )
        }

        await fetch('https://apieducare.mybluemix.net/auth/user/signup', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.json().error)
                }
            })
            .then(data => {
                console.log(data)
                if(data.success) {
                    successCallback(data)
                } else {
                    errorCallback(data)
                }
            })
            .catch(error => {
                errorCallback(error)
            })
    },

    async getUserInfoHandler(token, callback) {
        const requestObject = {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": token
            }
        };


        await fetch('https://apieducare.mybluemix.net/users/tracking', requestObject)
            .then(data => {
                return data.json()
            })
            .then(data => {
                if (data.success) {
                    console.log(data.data)
                    callback(data.data)
                } else {
                    console.error("Error: ", data.error)
                }
            })
    },

    async addActivityToMyContentHandler(token, activityId, callback) {
        const requestObject = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                "Authorization": token
            },
            body: JSON.stringify({"resource_id": activityId})
        };


        await fetch('https://apieducare.mybluemix.net/users/tracking', requestObject)
            .then(data => {
                return data.json()
            })
            .then(data => {
                if (data.success) {
                    console.log(data.data)
                    callback()
                } else {
                    console.error("Error: ", data.error)
                }
            })
    },

    async deleteResourceFromUserHandler(token, activityId) {
        const requestObject = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        };

        await fetch(`https://apieducare.mybluemix.net/users/tracking/${activityId}`, requestObject)
            .then(response => {
                if (!response.ok) {
                    return response.json()
                    .then(error => { throw new Error(error.message) })
                }
                return response.json()
            })
            .then( json => {})
            .catch((error) => {
                console.log(error.message);
            })
    },

    async getUserInfo(token, callback) {
        const requestObject = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }

        await fetch("https://apieducare.mybluemix.net/users/info", requestObject)
            .then(response => {
                if (!response.ok) {
                    return response.json()
                    .then(error => { throw new Error(error.message) })
                }
                return response.json()
            })
            .then( json => callback(json))
            .catch((error) => {
                console.log(error.message);
            })
    }

}

export default api