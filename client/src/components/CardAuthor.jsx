import React from 'react'

const CardAuthor = ({ author, email, books = [] }) => {
  return (
    <div className='flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-200 w-80 min-h-80 max-h-80 border border-gray-100'>
      {/* Header with email */}
      <div className='bg-fuchsia-600 px-4 py-3'>
        <h1 className='text-white font-medium text-center truncate text-sm' title={email}>
          {email}
        </h1>
      </div>
      
      {/* Author name */}
      <div className='p-4 pb-2'>
        <h3 className='text-xl font-bold text-gray-800 text-center'>{author}</h3>
      </div>
      
      {/* Books section */}
      <div className="px-4 pb-4">
        <div className="border-t border-gray-200 pt-3">
          <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-3 font-semibold">
            Published Books
          </h4>
          
          <div className="max-h-40 overflow-y-auto pr-2 scrollbar-thin">
            {books.length > 0 ? (
              <ul className="space-y-2">
                {books.map((book) => (
                  <li 
                    key={book.id} 
                    className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded hover:bg-blue-50 transition-colors"
                  >
                    <span className="font-medium text-blue-600">"</span>
                    {book.judul}
                    <span className="font-medium text-blue-600">"</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 italic py-2">No books published yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardAuthor