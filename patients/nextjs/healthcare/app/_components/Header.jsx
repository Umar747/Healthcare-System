import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


function Header() {
    const Contents =[
        {
            id: 1,
            name: 'Homepage',
            path: '/'
        }, 
        {
            id: 2,
            name: 'Explore',
            path: '/'
        }, {
            id: 3,
            name: 'Contact Us',
            path: '/'
        }
    ]
  return (
    <div className='flex items-center justify-between p-3 shadow-md'> 
        <div className='flex items-center gap-10'>
            <Image src= '/logotip.svg' alt = 'logotip' 
            width = {100} height = {50}
            />

            <ul className = 'md:flex gap-10 hidden'>
                {Contents.map((item,index)=>(
                    <Link href = {item.path}> 
                    <li className='hover:text-primary cursor-pointer hover:scale-110 transition-all ease-in-out'>{item.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
        <Button>Hello</Button>
    </div>
  )
}

export default Header