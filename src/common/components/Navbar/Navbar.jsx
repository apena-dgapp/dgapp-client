import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../../../context/GlobalContext';
import NavbarForm from './NavbarForm';
import { getOnePerson } from '../../../api/person';

const Header = () => {

    const history = useHistory();

    //InitialState - ContexState
    const [contextState, , contextMiddleware] = useContext(GlobalContext);

    const [person, setPerson] = useState({
        fullName:'',
        position:'',
        birthday:'',
        photo:''
    });
    

    //funcion para setear lenguaje
    const setLanguage = (lang) => {
        contextMiddleware.implementationLang(lang);
    };

    const logOut = () => {
        contextMiddleware.signOut();
        history.push('./home')
    };

    const createPost = () => {
        history.push('./newpost')
    };

    const correspo = () => {
        history.push('./correspondence')
    };

    useEffect(()=>{

        let unmounted = false;
    
        getOnePerson(contextState.token, contextState.personId)
          .then(res => {
            if (res.status >= 400) throw new alert.err('error usuario incorrecto');
            return res.json();
    
          })
          .then(res => {
            if(!unmounted){
            //  setInterest(res.post);
            setPerson({
                fullName: res.firstName.split(" ", 1) + " " + res.lastName.split(" ", 1),
                position: res.position,
                birthday: res.birthday,
                photo: res.photo
                })
            }
            
          })
          .catch(err => {
              console.error(err.status);
          })
    
          return () => {
            unmounted = true
          } 
          
      },[contextState.token, contextState.personId])

    return (
        <>
            <NavbarForm
                handeleLang={setLanguage}
                logOut={logOut}
                createPost={createPost}
                correspo={correspo}
                person={person}
            />
        </>
    )
}

export default Header
