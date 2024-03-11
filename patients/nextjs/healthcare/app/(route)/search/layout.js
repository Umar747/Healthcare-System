import React from 'react'
import DoctorsCategory from './_components/DoctorsCategory'

function layout({children}) {
  return (
    <div className= 'grid grid-cols-4'>
      <div> 
        <DoctorsCategory/>
      </div>

      <div className='col-span-3'> 
      {children}    
      </div>
      </div>
  )
}

export default layout