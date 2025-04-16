import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaSquarePlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import CardAuthor from '../components/CardAuthor';


const Author = () => {
  const [author, setAuthor] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const loadData = async ()=>{
    try 
    {
      const res = await fetch('http://localhost:3000/api/authors')
      if( !res.ok){
        const pesanError = await res.json()
        throw new Error(pesanError.message)
      }
      const data = await res.json()
      setAuthor(data)
    } 
    catch (error) 
    { 
      console.error(error.message || 'cannot fetch data')
      setError(error.message)
    }  finally{
      setLoading(false)
    }
  }
  useEffect(()=> {
    loadData();
   }, [])

   if(loading){
    return (
      <div className=''>
        <Navbar/>
        <div className='flex justify-center items-center h-screen'>
          <h3 className='text-yellow-500'>Loading datanya kawan...</h3>
        </div>
      </div>
    )
  }
  
  if(error){
    return (
      <div>
        <Navbar/>
        <h3 className='mt-40 text-red-600'>Error: {error}</h3>
      </div>
    )
  }

  return (
    <div>
        <Navbar/>
        <div className='mt-40 grid grid-cols-2 place-items-center gap-4'>
          {author.map((item)=>(
              <CardAuthor author={item.username} email={item.email} books={item.books}/>
          ))}
        </div>

    </div>
  )
}

export default Author
