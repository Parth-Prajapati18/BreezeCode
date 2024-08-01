"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Home() {

  return (
    <div className='mt-4 md:mt-16'>

      <div className='w-full h-[30vh] md:h-[45vh] relative mx-auto'>
        <Image
          src='/HomeBanner.jpg'
          layout='fill'
          objectFit='contain'
          objectPosition='center'
          alt='BreezeCode'
        />
      </div>

      <div className="mt-1 md:mt-20 mx-auto max-w-2xl sm:text-center">
        <h2 className="text-4xl font-medium tracking-tight text-gray-900">
          Start Learning Code
        </h2>
        <p className="mt-2 text-lg text-gray-600">
        BreezeCode: Where Coding is Made Clear and Simple
        </p>
        <button className='md:text-xl font-medium text-white bg-black py-2 px-8 mt-4 md:mt-6 rounded-sm'><Link href={'/courses'}>Courses</Link></button>
      </div>
    </div>
  )
}

export default Home