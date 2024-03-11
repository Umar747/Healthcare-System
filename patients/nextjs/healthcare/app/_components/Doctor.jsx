import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function Doctor() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative lg:order-last" style={{ height: '100%', minHeight: '400px' }}>
            <div className="relative h-full w-full overflow-hidden rounded-lg">
              <Image
                alt=""
                src="/doctors.jpg"
                layout="fill"
                objectFit="contain"
                className="rounded-3xl"
              />
            </div>
          </div>

          <div className="lg:py-24">
            <h2 className="text-3xl font-bold sm:text-4xl">Book Your
            <span className='text-primary'> Appointment </span> with Your Favourite 
            <span className='text-primary'> Doctor</span> Today!</h2>

            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui hic atque tenetur quis
              eius quos ea neque sunt, accusantium soluta minus veniam tempora deserunt? Molestiae eius
              quidem quam repellat.
            </p>

            <Button className='mt-10'>Book now</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Doctor;
