import React, { useState } from 'react'
import { FaPencilAlt, FaEraser } from "react-icons/fa";
import { Link } from 'react-router-dom';




const BookCard = ({id, judul, author, onDelete}) => {
  const [err, setErr] = useState('')
  const [del, setDel] = useState(false)


  const handleDelete= async(e)=>{
    e.preventDefault()
    if(!window.confirm(`Yakin buku ${judul} mau dihapus?`)) return;
    setDel(true)

    try {
      const res = await fetch(`http://localhost:3000/api/books/${id}`,{
        method: "DELETE",
      })

      if (res.status === 204){
        onDelete(id)
        return
      }
      const hasil = await res.json()
      if (!res.ok){
        setErr(hasil.message)
        return
      }
    } catch (error) {
      console.error(error.message)
    }finally{
      setDel(false)
    }
  }
  return (
    <div className='flex flex-col bg-gray-300 h-72 rounded-xl w-[20vw] shadow-xl'>
      {err && (
        <p className='text-red-600'>{err}</p>
      )}


      <h1 className='text-[18px] bg-fuchsia-600 text-center rounded-t-xl p-2 text-white'>{judul}</h1>
      <img src="#" alt="image" className='h-1/2'/>
      <h3 className='text-lg text-neutral-700 text-center'>{author}</h3>
      <div className='flex justify-around'>
        <Link 
          to={`/update/${id}`}  
          className='text-3xl text-yellow-400 text-center hover:text-yellow-200'>
          <FaPencilAlt/>
        </Link>
        <button 
          className='text-3xl text-red-600 text-center hover:text-red-400'
          onClick={handleDelete}
          disabled={del}
        >
            <FaEraser/>
        </button>
      </div>
    </div>
  )
}

export default BookCard
