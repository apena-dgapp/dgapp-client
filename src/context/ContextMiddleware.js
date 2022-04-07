import React, { useState} from 'react';
import {IntlProvider} from 'react-intl';
import { Toaster } from 'react-hot-toast';
import GlobalContext from '../context/GlobalContext';
import LangEnglish from '../common/lang/en-US.json';
import LangSpanish from '../common/lang/es-DR.json';

const ContextMiddleware = (props) => {
    const [contextState, setContextState] = useState(getLocalCache() ||{
        token: '',
        userName: '',
        isAdmin: false,
        isAuth: false,
        appMessage: LangEnglish,
        appLocale: 'en-US'
    });

    function getLocalCache () {
        let localContextCached = localStorage.getItem("localContext");
        return localContextCached === null ? null : JSON.parse(localContextCached);
    };

    // useEffect(() => {
    //     const localContextCached = getLocalCache();
    //     if (localContextCached !== null) {
    //         setContextState(localContextCached);
    //     }
    // }, []);


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
                { token: '', userName:'', isAdmin:false, isAuth:false }
            );
            setLocalCache(localContext);
        };

           const newUserName = (userName, role, isAuth) =>{
            localContext = Object.assign(
                {},
                { ...localContext },
                {  userName: userName, isAdmin: role, isAuth: isAuth }
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
                    setLanguage(LangEnglish,'en-US')
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

        return {signIn, signOut, newToken, newUserName, setLanguage,implementationLang};
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
