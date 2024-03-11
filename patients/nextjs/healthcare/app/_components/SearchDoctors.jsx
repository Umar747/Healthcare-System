"use client"
import { Input } from '@/components/ui/input'
import React from 'react'
import { Button } from '@/components/ui/button'
import {Search} from 'lucide-react'
import Api from '../_category/Api'
import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

function SearchDoctors() {
  const [category, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    Api.getCategory().then(resp => {
      console.log(resp.data.data);
      setCategoryList(resp.data.data);
    });
  };

  return (
    <div className='mb-10 items-center px-5 flex flex-col gap-3'>
      <h2 className='font-bold text-4xl tracking-wide'>Available
        <span className='text-primary'> Services</span>
      </h2>
      <h2 className='text-gray-500 text-xl'>Search Your Doctor and Book Your Appointment</h2>
      <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Name" />
        <Button type="submit">
          <Search className='h-4 w-4 mr-2' />
          Search
        </Button>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-6 gap-4 p-4'>
        {category.length > 0 ? (
          category.map((item, index) => index < 6 && (
            <Link key={index} href={`/search/${item.attributes.Name}`} passHref>
              <div className="flex flex-col items-center text-center p-4 bg-green-50 m-2 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out cursor-pointer">
                <Image
                  src={item.attributes?.Icon?.data?.[0]?.attributes?.url || '/default-icon.png'}
                  alt="icon"
                  width={40}
                  height={40}
                  layout="fixed"
                />
                <span className="mt-2 text-sm">{item.attributes.Name}</span>
              </div>
            </Link>
          ))
        ) : (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className='h-[100px] w-[100px] m-2 bg-slate-200 animate-pulse rounded-lg'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default SearchDoctors;
