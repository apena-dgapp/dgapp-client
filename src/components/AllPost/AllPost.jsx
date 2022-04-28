import React,{ useContext, useState, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import AllPostForm from './AllPostForm'
import {allPostApi} from '../../api/post'; 

const AllPost = () => {

  const [contextState] = useContext(GlobalContext);
  const [arrayAllPost, setArrayAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(()=>{

    let unmounted = false;

      allPostApi(contextState.token)
        .then(res => {
          if (res.status >= 400) throw new alert.err('error usuario incorrecto');
          return res.json();

        })
        .then(res => {
          if(!unmounted){
            setArrayAllPost(arrayAllPost => [...arrayAllPost, ...res.posts]);
          }
          
        })
        .catch(err => {
            console.error(err.status);
        })

        return () => {
          unmounted = true
        } 
      
  },[contextState.token])

  const filteredArryPost = () => {
    if(search.length === 0) return arrayAllPost.slice(currentPage, currentPage + 10 );
      const filtered = arrayAllPost.filter( post => post.title.toLowerCase().includes(search) );
      return filtered.slice(currentPage, currentPage + 10 );
  }

  const nextPage = () => {
    if(arrayAllPost.filter( post => post.title.toLowerCase().includes(search) ).length > currentPage + 10)
    setCurrentPage( currentPage + 10);
  }

  const backPage = () => {
    if(currentPage > 0 ){
      setCurrentPage( currentPage - 10);
    } 
  }

  const onSearchChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value.toLowerCase());
  }

  return (
    <>
        <AllPostForm
          filteredArryPost={filteredArryPost}
          nextPage={nextPage}
          backPage={backPage}
          onSearchChange={onSearchChange}
          search={search}
        />
    </>
  )
}

export default AllPost