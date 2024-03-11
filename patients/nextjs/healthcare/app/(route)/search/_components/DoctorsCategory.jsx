"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from "next/navigation";
import Api from '@/app/_category/Api';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";

function DoctorsCategory() {
  const [categories, setCategories] = useState([]);
  const pathname = usePathname();
  const currentCategory = pathname.split('/')[2]; // Assuming the category is the third part of the URL

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const resp = await Api.getCategory();
        console.log(resp.data.data);
        setCategories(resp.data.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    getCategoryList();
  }, [pathname]);

  return (
    <div className='h-screen fixed mt-5 flex flex-col'>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandGroup heading="Suggestions">
            {categories.length > 0 ? (
              categories.map((item, index) => (
                <CommandItem key={index} className="p-2 flex gap-2 items-center rounded-md cursor-pointer w-full">
                  <Link href={`/search/${item?.attributes?.Name}`}>
                    <div className={`flex gap-2 text-[14px] text-green-600 items-center rounded-md w-full ${currentCategory === item.attributes.Name ? 'bg-green-100' : ''}`}>
                      <Image 
                        src={item.attributes?.Icon?.data?.[0]?.attributes?.url || '/default-icon.png'}
                        alt="icon"
                        width={25}
                        height={25}
                        unoptimized // If you're having trouble with image optimization, consider using this prop
                      />
                      <span>{item.attributes.Name}</span>
                    </div>
                  </Link>
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>Your customized empty state or loader</CommandEmpty>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default DoctorsCategory;
