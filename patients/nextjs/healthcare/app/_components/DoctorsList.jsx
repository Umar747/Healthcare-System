import React from 'react';
import Image from 'next/image';

function DoctorsList({ doctorsList }) {
  return (
    <div className='mb-10 px-10'>
      <h2 className='font-bold text-xl mb-5'>Available Doctors</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {doctorsList.length >0?doctorsList.map((item, index) => (
          <div key={index} className='flex flex-col justify-between border-[1px] rounded-lg p-2 cursor-pointer hover:border-primary transition-all ease-in-out h-full'> 
            <Image 
              src={item.attributes?.Picture?.data?.attributes?.url || '/default-image.png'}
              alt='doctor'
              width={450}
              height={250}
              layout='responsive'
              className='h-[150px] w-full object-cover rounded-lg'
            />
            <div className='mt-3 flex flex-col gap-1'>
              <h2 className='text-[12px] bg-green-300 p-1 rounded-full text-center self-center px-2'>{item.attributes?.category?.data?.attributes?.Name || 'Specialization not listed'}</h2>
              <h2 className='font-bold text-center'>{item.attributes.Name}</h2>
              <h2 className='text-sm font-bold text-center'>{item.attributes?.Experience} of Experience</h2>
              <h2 className='text-sm text-center'>{item.attributes?.Address}</h2>
              <button className='py-2 px-4 border-[2px] border-primary text-primary rounded-full w-full text-center mt-1 cursor-pointer hover:bg-primary hover:text-white transition-colors duration-200 ease-in-out'>Book Now</button>
            </div>
          </div>
        ))
      :
      [1,2,3,4,5,6,7,8].map((item,index)=>(
        <div className= 'h-[130px] bg-slate-200 w-[130px] rounded-lg animate-pulse'>

      </div>
      ))}
      
      
      </div>
    </div>
  );
}

export default DoctorsList;
