import React, { useState} from 'react';
import {IntlProvider} from 'react-intl';
import { Toaster } from 'react-hot-toast';
import GlobalContext from '../context/GlobalContext';
import LangEnglish from '../common/lang/en-US.json';
import LangSpanish from '../common/lang/es-DR.json';
// import io from "socket.io-client";

const ContextMiddleware = (props) => {
    const [contextState, setContextState] = useState(getLocalCache() ||{
        token: '',
        userName: '',
        isAdmin: false,
        isAuth: false,
        appMessage: LangSpanish,
        appLocale: 'en-DR',
        personId:'',
        isLoading:false,
        isShowChat:false,
        clients:'',
    });
   

    function getLocalCache () {
        let localContextCached = localStorage.getItem("localContext");
        return localContextCached === null ? null : JSON.parse(localContextCached);
    };

    const langError = () =>{
      if(contextState.appLocale && contextState.appMessage){
         } else {
        }
    }
    const middleware = (state, setState) => {
        let localContext = Object.assign({}, { ...state });

        const setLocalCache = (localContextCached) => {
            localStorage.setItem("localContext", JSON.stringify(localContextCached));
            setState(localContextCached);
        };

        const signIn = (token) => {
            localContext = Object.assign(
                {},
                { ...localContext },
                { token }
            );
            setLocalCache(localContext);
        };

        const newToken = (newToken) =>{
            localContext = Object.assign(
                {},
                { ...localContext },
                {  token: newToken}
            );
            setLocalCache(localContext);
        };

        const signOut = () => {
            localContext = Object.assign(
                {},
                { ...localContext },
                { token: '', personId:'', userName:'', isAdmin:false, isAuth:false, clients:'' }
            );
            setLocalCache(localContext);
        };

           const newUserName = (personId, userName, role, isAuth,clients) =>{
            localContext = Object.assign(
                {},
                { ...localContext },
                { personId:personId, userName: userName, isAdmin: role, isAuth: isAuth, clients:clients }
            );
            setLocalCache(localContext);
        };

        const showSpinner = (isLoading) =>{
            localContext = Object.assign(
                {},
                { ...localContext },
                { isLoading:isLoading }
            );
            setLocalCache(localContext);
        };

        const implementationLang =(language)=>{
            switch (language){
                case 'es-DR':
                    setLanguage(LangSpanish,'es-DR')
                    break;
                case 'en-US':
                    setLanguage(LangEnglish,'en-US')
                    break; 
                default:
                    setLanguage(LangEnglish,'en-DR')
            }
        }

        const setLanguage = (appMessage,appLocale) => {
            localContext = Object.assign(
                {},
                { ...localContext },
                {  appMessage: appMessage, appLocale: appLocale}
            );
            setLocalCache(localContext);
        }

        const setIsShowChat = (isShowChat) => {
            localContext = Object.assign(
                {},
                { ...localContext },
                { isShowChat: isShowChat}
            );
            setLocalCache(localContext);
        }

        const setClients = (clients) => {
            localContext = Object.assign(
                {},
                { ...localContext },
                { clients: clients}
            );
            setLocalCache(localContext);
        }

        return {signIn, signOut, newToken, newUserName, setLanguage,implementationLang, setIsShowChat, showSpinner,setClients};
    };

    return (
        <GlobalContext.Provider
            value={[
                contextState,
                setContextState,
                middleware(contextState, setContextState),
            ]}
        >
            <IntlProvider locale={contextState.appLocale} messages={contextState.appMessage} onError={langError}  >
                {props.children}    
            </IntlProvider>

           <Toaster position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                background: '#627485',
                color: '#fff',
                },
                // Default options for specific types
                success: {
                duration: 3000,
                theme: {
                    primary: 'green',
                    secondary: 'black',
                },
                },
            }}/>
        </GlobalContext.Provider>
    );
};

export default ContextMiddleware;
