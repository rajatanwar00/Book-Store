import React,{useState,useEffect} from 'react'
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';

const backendURL=import.meta.env.VITE_BACKEND_URL;

const EditBook = () => {
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [publishYear,setPublishYear]=useState('');
  const [loading, setLoading]=useState(false);
  const navigate=useNavigate();
  const {id}=useParams();
  const {enqueueSnackbar}=useSnackbar();
  useEffect(()=>{
    setLoading(true);
    axios
      .get(`${backendURL}/books/${id}`)
      .then((response)=>{
        setAuthor(response.data.author);
        setTitle(response.data.title);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      })
  },[])
  const handleEditBook=()=>{
    const data={
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`${backendURL}/books/${id}`,data)
      .then(()=>{
        setLoading(false);
        enqueueSnackbar('Book Edited Successfully',{variant:'success'});
        navigate('/');
      })
      .catch((error)=>{
        setLoading(false);
        //alert('An error happened. Please check console');
        enqueueSnackbar('Error',{variant:'error'});
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading?<Spinner/>:''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e)=> setTitle(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />  
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />  
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e)=> setPublishYear(e.target.value)}
            className='border-2 border-grey-500 px-4 py-2 w-full'
          />  
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
          Edit
        </button>
      </div>
    </div>
  )
}

export default EditBook