import React, {} from 'react'
import { FaSquarePlus } from 'react-icons/fa6'
import { Link, useLocation } from 'react-router-dom'



const Navbar = () => {

    const location = useLocation()
    const items = [
        {
            item: "Books",
            linknya: "/"
            
        },
        {
            item: "Authors",
            linknya: "/authors"
        },
    ]

    
  return (
    <div className='flex justify-center'>
        <header className='fixed top-10 bg-gray-200 shadow-lg w-1/2 z-10 rounded-xl'>
            <nav className='flex gap-4 justify-around items-center'>
                <div className='flex gap-6'>
                    {items.map((items, idx) =>(
                        <Link 
                            key={idx} 
                            to={items.linknya}
                            className={`p-4 rounded-xl ${location.pathname === items.linknya?"bg-fuchsia-500 text-white cursor-not-allowed": "cursor-pointer bg-gray-200 hover:bg-fuchsia-500 hover:text-white"}`}
                        >
                            {items.item}
                            {console.log(location.pathname)}
                        </Link>
                    ))}
                </div>
                <div>
                    {location.pathname === "/" && (
                        <Link to={'/create'} className="text-3xl hover:text-fuchsia-500">
                            <FaSquarePlus/>
                        </Link>  
                    )}
                    {location.pathname === '/authors' && (
                        <Link to={'/create/author'} className="text-3xl hover:text-fuchsia-500">
                            <FaSquarePlus/>
                        </Link>        
                     )}
                    
                </div>
            </nav>
      </header>
    </div>
  )
}

export default Navbar
