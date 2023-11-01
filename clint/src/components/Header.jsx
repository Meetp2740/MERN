import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Header() {

  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className='bg-slate-200'>

      <div className='flex justify-between p-3 mx-auto items-center max-w-6xl'>
        <Link to={"/"}>
          <p className='font-bold text-xl'>Autho09</p>
        </Link>
        <ul className='flex gap-4'>
          <Link to={"/"}>
            <li>Home</li>
          </Link>
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          <Link to={"/profile"}>
            {
              currentUser ? <img src={currentUser.profileImage} alt='profile' className='h-7 w-7 rounded-full items-center object-cover'></img> 
              : <li>Sign-in</li>
            }
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header



{/* <Link to={"/"}><li>Home</li></Link> */ }
{/* <Link to={"/about"}><li>About</li></Link> */ }
{/* <Link to={"/sign-in"}><li>Sign-in</li></Link> */ }