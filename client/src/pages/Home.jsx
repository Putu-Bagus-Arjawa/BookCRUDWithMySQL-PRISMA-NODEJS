import React, { useEffect, useState} from 'react'
import BookCard from "../components/BookCard"
import Navbar from "../components/Navbar"



const Home = () => {
const [books, setBooks] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const loadData = async ()=>{
  try 
  {
    const res = await fetch('http://localhost:3000/api/books')
    const data = await res.json()
    if (!res.ok){
      setError(data.message)
    }
    setBooks(data)
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

 const setDelete= (deleteId)=> {
  setBooks(books.filter(book =>book.id!==deleteId))
 }


 
if(loading){
  return (
    <div className=''>
      <Navbar/>
      <div className='flex justify-center items-center h-screen'>
        <h3 className='text-yellow-500 cursor-wait'>Loading datanya kawan...</h3>
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
      <div  className="mt-40 mx-10">
        <div className="grid grid-cols-4 gap-10">
          { books.map((item, idx)=>(
            <BookCard 
              key={idx} 
              id={item.id} 
              judul={item.judul}  
              author={item.author.username}
              onDelete={setDelete}
            
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
