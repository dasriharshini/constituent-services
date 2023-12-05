import Link from 'next/link'
import React from 'react'
import { FaHeadphones } from "react-icons/fa6";


const NavBar = () => {
const links =[
    {label: "Dashboard", href:'/'},
    {label: "Issues", href:'/issues'}
]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'><FaHeadphones /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => <Link key={link.href} className='text-slate-500 hover:text-slate-900 transition-colors' href={link.href}>{link.label}</Link> )}
        </ul>
    </nav>
  )
}

export default NavBar
