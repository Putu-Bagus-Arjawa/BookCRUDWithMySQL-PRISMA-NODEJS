import React, {  useState } from 'react'
import Navbar from '../components/Navbar'
import { FaPencilAlt } from 'react-icons/fa'

const CreateAuthor = () => {
  const[form, setForm] = useState([{email: "", username: ""}])
  const[validateErr, setValidateErr] = useState('')
  const[createAuthor, setCreateAuthor] = useState(null)
  

  const handleSubmit = async (e)=>{
   try {
     e.preventDefault()
     setValidateErr('')
     const res = await fetch("http://localhost:3000/api/authors", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
     })

     const hasil = await res.json()
     
     if(!res.ok|| res.status === 400 || res.status === 404){
      setValidateErr(hasil.message)
      return;
    }
     console.log(hasil);
     setCreateAuthor(hasil)
     setForm({email: "", username: ""})
   } catch (error) {
     console.error(error.message)
   }
  }

  return (
    <div>
      <Navbar/>
      <div className='flex justify-center h-screen items-center bg-neutral-100'>
        <form 
          action="" 
          className='flex flex-col gap-6 w-1/3 bg-neutral-200 p-8 rounded-xl shadow-lg'
          onSubmit={handleSubmit}
        >
          <h2 className='flex justify-center gap-8 text-2xl tracking-widest'>Register Author 
            <FaPencilAlt/>
          </h2>
          
          {validateErr && (<div className='text-red-500'>{validateErr}</div>)}

          {createAuthor &&(
            <div className='text-green-600'>
              Author successfully created bre😉
            </div>
          )}


          <div className='space-y-2'>
            <label htmlFor="" className='block text-md'>Email</label>
            <input
              type="email"
              name='email' 
              value={form.email}
              onChange={(e)=> {setForm({...form, email: e.target.value})}}
              placeholder='your@email.com' 
              className='w-full px-4 py-2 outline-none border border-gray-600 rounded-lg focus:ring-1 focus:border-transparent focus: ring-blue-500'
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor="" className='block text-md'>Name</label>
              <input 
                type="text" 
                name='username'
                value={form.username}
                placeholder='Insert Your Name' 
                onChange={(e)=> setForm({...form, username: e.target.value})}
                className='w-full px-4 py-2 outline-none border border-gray-600 rounded-lg focus:ring-1 focus:border-transparent focus: ring-blue-500'
              />
          </div> 
          <button 
            className='text-center bg-linear-to-t from-blue-400 via-blue-400 to-blue-500 py-2 px-4 rounded-lg mt-4 hover:from-blue-300 hover:via-blue-300 hover:to-blue-200 tracking-wide'
            type='submit'
            >
              Create
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateAuthor
