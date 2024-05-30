"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn , signOut , useSession , getProviders } from 'next-auth/react'

const Nav = () => {
    const { data: session } = useSession() 
    console.log("The session is ")
    console.log(session)
    const [providers, setproviders ] = useState(null)
    const [toggleDropdown, settoggleDropdown] = useState(false);
    useEffect(()=>{
        const setUpProviders = async ()=>{
            const response = await getProviders()
            setproviders(response)
        }
        setUpProviders();
    },[])
  return (
    <nav className = "flex-between w-full mb-16 pt-3">
        <Link href = "/" className = "flex gap-2 flex-center">
            <Image 
            src = "/assets/images/logo.svg"
            alt = "Logo"
            className = "object-contain"
            width = {30}
            height = {30}
            />
            <p className = "logo_text">Prompotopia</p> 
        </Link>

        {/* Desktop Navigation  */}
        <div className = "sm:flex hidden">
            {session?.user ? (
                <div className = "flex gap-3 md:gap-5">
                    <Link href = '/create-prompt' className="black_btn">
                        Create Post
                    </Link>
                    <button type = "button"
                     onClick = {signOut}
                    className = "outline_btn hover:text-red-50"
                    >
                        Sign out
                    </button>
                    <Link href = {`/profile/?id=${session?.user?.id}`}>
                        <Image src = {session?.user.image} 
                        width = {37}
                        height = {37}
                        alt = "profileImage"
                        />
                    </Link>
                </div>
            ): <div>
                {providers && 
                    Object.values(providers).map((provider)=>(
                        <button
                        type = "button"
                        key = {provider.name}
                        onClick = {()=>signIn(provider.id)}
                        className="black_btn"
                        >
                            Sign In with {provider.name}
                        </button>
                    ))
                }
                </div>
            }
        </div>
        {/* Mobile Navigation  */}
        <div className = "sm:hidden flex relative">
            {session?.user ? (
                <div className = "flex">
                    <Image src = {session?.user.image}
                    style = {{cursor: 'pointer',zIndex: '55'}}
                        width = {37}
                        height = {37}
                        className = "rounded-full"
                        alt = "profile"
                        onClick = {()=>settoggleDropdown(prev=>!prev)}
                        />

                    {toggleDropdown && (
                        <div className = "dropdown">
                            <Link href = "/profile" 
                            className = "dropdown_link"
                            onClick = {()=>settoggleDropdown(false)}
                            >My Profile</Link>
                            <Link 
                            href = "/create-prompt"
                            className="dropdown_link"
                            >
                            Create Prompt
                            </Link>
                            <button type = "button"
                            className = "outline_btn"
                            onClick = {()=>{settoggleDropdown(false)
                                signOut()
                            }}
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) :<div>
            {providers && 
                Object.values(providers).map((provider)=>(
                    <button
                    type = "button"
                    key = {provider.name}
                    onClick = {()=>{signIn(provider.id)}}
                    className="black_btn"
                    >
                        Sign In
                    </button>
                ))
            }
            </div> }
            
        </div>
    </nav>
  )
}

export default Nav