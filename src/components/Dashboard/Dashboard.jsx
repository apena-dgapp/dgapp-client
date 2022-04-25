import React,{useContext,useState,useEffect} from 'react';
import GlobalContext from '../../context/GlobalContext';
import DashboardForm from './DashboardForm';
// import { useHistory } from 'react-router-dom';
import {getPost, viewUpdate,getview} from '../../api/post'; 

const Dashboard = () => {

  const [contextState] = useContext(GlobalContext);

  const [arrayPost, setArrayPost] = useState([]);
  const [viewInterest, setViewInterest] = useState();
  
  // const history = useHistory();

  // const singlePost = () =>{
  //   history.push('./siglepost')
  // }



  useEffect(()=>{

    let unmounted = false;

      getPost(contextState.token,'Featured Post')
        .then(res => {
          if (res.status >= 400) throw new alert.err('error usuario incorrecto');
          return res.json();

        })
        .then(res => {
          if(!unmounted){
            setArrayPost(arrayPost => [...arrayPost, ...res.posts]);
          }
          
        })
        .catch(err => {
            console.error(err.status);
        })

        return () => {
          unmounted = true
        } 
      
  },[contextState.token])



  useEffect(()=>{

    let unmounted = false;

      getview(contextState.token)
        .then(res => {
          if (res.status >= 400) throw new alert.err('error usuario incorrecto');
          return res.json();

        })
        .then(res => {
          // if(!unmounted){
          //   setViewInterest(viewInterest => [...viewInterest, ...res.posts]);
          // }

          console.log(res.post)
          
        })
        .catch(err => {
            console.error(err.status);
        })

        return () => {
          unmounted = true
        } 
      
  },[contextState.token])

  return (
    <>
    <DashboardForm
      arrayPost={arrayPost}
    />
    </>
  )
}

export default Dashboard