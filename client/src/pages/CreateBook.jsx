import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaPencilAlt } from 'react-icons/fa';

const CreateBook = () => {
 const [form, setForm] = useState({judul: "", authorEmail: ""})
 const [validateErr, setValidateErr] = useState('')
 const [createBook, setCreateBook] = useState (null)

 const handleSubmit = async (e) =>{
    e.preventDefault();
    setValidateErr('');

    try {
       const res = await fetch(" http://localhost:3000/api/books", {
          method: "POST",
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify(form),
       })

       const hasil = await res.json();

       if(res.status === 400 || res.status === 404){
         setValidateErr(hasil.message);
         return;
       }

       console.log(hasil)
       setCreateBook(hasil)
       setForm({judul: "", authorEmail: ""})
    } catch (error) {
      console.error(error.message);
    }
 }
return (
    <div>
      <Navbar/>
      <div className='flex justify-center min-h-screen items-center bg-neutral-100'>
        <form 
          action=""
          onSubmit={handleSubmit} 
          className='flex flex-col gap-6 w-1/3 bg-neutral-200 p-8 rounded-xl shadow-lg'
        >
          <h2 className='flex justify-center gap-8 text-2xl tracking-widest'>
            Create Book <FaPencilAlt/></h2>
         
          {validateErr && (<div className='text-red-500'>{validateErr}</div>)}

          {createBook &&(
            <div className='text-green-600'>
              Book successfully created bre😉
            </div>
          )}

          <div className='space-y-2'>
            <label htmlFor="judul" className='block text-md'>Book's Title</label>
            <input
              type="text"
              name='judul' 
              value={form.judul}
              onChange={(e)=> setForm({...form, judul: e.target.value })}
              placeholder='Enter Your Title' 
              className='w-full px-4 py-2 outline-none border border-gray-600 rounded-lg focus:ring-1 focus:border-transparent focus:ring-blue-500'
            />
          </div>
          
          <div className='space-y-2'>
            <label htmlFor="email" className='block text-md'>Email</label>
            <input 
              type="email" 
              name='authorEmail'
              value={form.authorEmail}
              onChange={(e)=> setForm({...form, authorEmail :e.target.value})}
              placeholder='your@email.com' 
              className='w-full px-4 py-2 outline-none border border-gray-600 rounded-lg focus:ring-1 focus:border-transparent focus:ring-blue-500'
            />
          </div> 
          
          <button 
            className='text-center bg-gradient-to-t from-blue-400 via-blue-400 to-blue-500 py-2 px-4 rounded-lg mt-4 hover:from-blue-300 hover:via-blue-300 hover:to-blue-200 tracking-wide'
            type='submit'
          >
            Create
          </button>
        </form>
      </div>
    </div>
);
}

export default CreateBook;