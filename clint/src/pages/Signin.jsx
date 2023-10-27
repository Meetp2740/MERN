import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Signin() {

  const [formData, setformData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const formHandler = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };


  const submitHandler = async (e) => {
    setError(false)
    e.preventDefault();
    try {
      setLoading(true)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false)
      if(data.success === false ){
        setError(true)  
        return
      };
      navigate("/")
    } catch (error) {
      console.log(error)
      console.log("somthing went wrong")
    }
  };


  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input type='email' placeholder='email' id='email' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
        <input type='password' placeholder='password' id='password' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
        <button disabled={loading} className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>{loading ? "Loading..." : "Sign-In"}</button>
        <button className='bg-red-700 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>Continue with google</button>
        <div className='flex gap-3'>
          <p className='font-semibold'>Dont Have an account?</p>
          <Link to={"/sign-up"}>
            <span className='text-blue-600 font-semibold'>Sign up</span>
          </Link>
        </div>
      </form>
      <p className='text-red-900 my-5 font-semibold'>{error && "Something went wrong"}</p>
    </div>
  )
}

export default Signin
