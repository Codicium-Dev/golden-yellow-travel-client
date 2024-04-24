'use client'
import React, { useState } from 'react'

type NavLinks = [
  {
    title : string;
    href : string
  }
]


const ItineraryNavLink = ({NavLinks} : any) => {

    const [activeNav, setActiveNav] = useState('');

    const handelNavLink = (e : any) => {
        setActiveNav(e);
    }

  return (
    <div>

        <ul className=" flex items-center gap-5 text-gray-500 border-b-0 border-gray-300">
            {
                NavLinks?.map((link : any) => {

                    const isActive = activeNav === link?.title

                return (
                        <li 
                            key={link?.href}
                            onClick={() => handelNavLink(link?.title)}
                            className={`${isActive ? 'py-[5px] text-orange-500 border-b-2 border-orange-500 font-bold' : ''} ${link?.title === 'Overview' && 'py-[5px] text-orange-500 border-b-2 border-orange-500 font-bold'}`}
                            >
                                <a href={`#${link?.href}`}>{link?.title}</a>
                        </li>
                        )
                        })
            }
        </ul>

    </div>
  )
}

export default ItineraryNavLink