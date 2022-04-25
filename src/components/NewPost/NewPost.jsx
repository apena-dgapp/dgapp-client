import React,{useState, useContext} from 'react';
import GlobalContext from '../../context/GlobalContext';
import NewPostForm from './NewPostForm';
import {newPostApi} from '../../api/post'; 
import {blobToBase64} from '../../utils/blobManager'

const NewPost = () => {

  const [contextState] = useContext(GlobalContext);

  const [img, setImg] = useState(null);

  const [formData, setFormData] = useState({
    title:'',
    description:'',
    category:'',
    author:'',
    img:'',
    views: 0,
    isActive: true
  })

  const handlerInputChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const seletedHandler = async (e)=> {
    setImg(e.target.files[0])
  }

  const sendHandlerImg = async () => {
      if(!formData.category){
        alert("Por favor agregar un categoria")
        return
      }else  if(!img){
        alert("Por favor agregar una imagen")
        return
      }else  if(!formData.title){
        alert("Por favor agregar un titulo")
        return
      }else  if(!formData.author){
        alert("Por favor agregar un autor")
        return
      }else  if(!formData.description){
        alert("Por favor agregar una descripcion")
        return
      }

      const myb64 = await blobToBase64(img)
    
      newPostApi(contextState.token,formData.title,formData.description, formData.category, formData.author,myb64, formData.views, formData.isActive, contextState.userName,'')
          .then(res => {
            if (res.status >= 400) throw new alert.err('error al hacer el fetch');
            return res.json();

          })

          .then(res => {
              console.log(res.status)
              alert('el nuevo post se creo exitosamente')
          })
          .catch(err => {
              console.error(err.status);
          })

          setFormData({
            title:'',
            description:'',
            category:'',
            author:'',
            img:'',
            views:'',
            isActive: true
          })
        
  }

  return (
    <>
      <NewPostForm
        seletedHandler={seletedHandler}
        sendHandlerImg={sendHandlerImg}
        handlerInputChange={handlerInputChange}
        formData={formData}
      />
    </>
  )
}

export default NewPost;