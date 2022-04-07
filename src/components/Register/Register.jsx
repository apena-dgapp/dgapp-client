import React, { useState, useContext } from 'react'
import GlobalContext from '../../context/GlobalContext';
import RegisterForm from './RegisterForm'
import Modal from '../../common/components/Modal/Modal';
import { useHistory } from 'react-router-dom'
import toast from 'react-hot-toast';
import { getOnePerson } from '../../api/person';

const Register = () => {

    const history = useHistory()
    const btnCancel = () => {
        history.push('./')
    };

    // //ContexState
    const [contextState] = useContext(GlobalContext)

    //Estado de tipo objeto resgister  que tendra como propiedades los valores de los campos del formulario
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    //function que sera el controlador que se encargara de setear los valores del estado register.
    const handleRegisterForm = (e) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    //funcion encargada de crear usuario
    const handeleCreateUser = (e) => {
        e.preventDefault();

        // if (registerForm.username === "") {
        //     return toast.error('');
        // } else if (registerForm.email === "") {
        //     return toast.error('');
        // } else if (registerForm.password === "") {
        //     return toast.error('');
        // };

        console.log(contextState.token)
        console.log(registerForm.email)

        getOnePerson(contextState.token, registerForm.email)
            .then(res => {
                // if (res.status >= 400) throw new toast.error('');
                return res.json();

            })

            .then(res => {
                console.log(res)

            })
            .catch(err => {
                console.log(err.status);
                // throw new toast.error('');
            })

    }

    return (
        <>
            <RegisterForm
                registerForm={registerForm}
                handleRegisterForm={handleRegisterForm}
                handeleCreateUser={handeleCreateUser}
                btnCancel={btnCancel}
            />
        </>

    )
}

export default Register