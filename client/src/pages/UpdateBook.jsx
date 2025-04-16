import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { FaPencilAlt } from 'react-icons/fa';

const UpdateBook = () => {
  const [errValidate, setErrValidate] = useState('');
  const [data, setData] = useState({judul: '', authorEmail: ''})
  const [success, setSuccess] = useState('')

  const {id} = useParams()

  useEffect(()=>{
    const loadData = async ()=>{
      try {
        const res = await fetch(`http://localhost:3000/api/books/${id}`)
        const hasil = await res.json()
  
      if(!res.ok){
        setErrValidate(hasil.message)
        return
      }
  
      setData({
        judul: hasil.judul ,
        authorEmail: hasil.authorEmail,
      })
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/api/books/${id}`,{
        method:"PUT",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      const hasil = await res.json()
      if(!res.ok){
        setErrValidate(hasil.error)
        return
      }else{
        setSuccess("Data anda Berhasil Di-Update 😭")
      }
      setData(hasil)
      console.log(hasil)
    } catch (error) {
      setErrValidate(error.message)
    }
  }

  return (
    <div>
    <Navbar/>
    <div className='flex justify-center min-h-screen items-center bg-neutral-100'>
      <form 
        action=""
        className='flex flex-col gap-6 w-1/3 bg-neutral-200 p-8 rounded-xl shadow-lg'
        onSubmit={handleSubmit}
      >
        <h2 className='flex justify-center gap-8 text-2xl tracking-widest'>
          Update Book <FaPencilAlt/></h2>
       
       {/* Bagian untuk buat validasi*/}
       {errValidate && (
        <p className='text-red-600'>{errValidate}</p>
       )}
              {success && (
        <p className='text-green-600'>{success}</p>
       )}

        <div className='space-y-2'>
          <label htmlFor="judul" className='block text-md'>Book's Title</label>
          <input
            type="text"
            name='judul' 
            value={data.judul}
            onChange={(e)=> setData({...data, judul:e.target.value })}
            placeholder="Insert Your Title"
            className='w-full px-4 py-2 outline-none border border-gray-600 rounded-lg focus:ring-1 focus:border-transparent focus:ring-blue-500'
          />
        </div>
        
        <div className='space-y-2'>
          <label htmlFor="email" className='block text-md'>Email</label>
          <input 
            type="email" 
            name='authorEmail'
            value={data.authorEmail}
            onChange={(e)=> setData({...data, authorEmail:e.target.value })}
            placeholder="example@gmail.com"
            className='w-full px-4 py-2 outline-none border border-gray-600 rounded-lg focus:ring-1 focus:border-transparent focus:ring-blue-500'
          />
        </div> 
        {console.log(data)}
        <button 
          className='text-center bg-gradient-to-t from-blue-400 via-blue-400 to-blue-500 py-2 px-4 rounded-lg mt-4 hover:from-blue-300 hover:via-blue-300 hover:to-blue-200 tracking-wide'
          type='submit'
        >
          Update
        </button>
      </form>
    </div>
  </div>
  )
}

export default UpdateBook
