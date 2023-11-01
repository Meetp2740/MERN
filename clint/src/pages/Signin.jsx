import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signInFail, signInStart, signInSuccess } from '../redux/Slices/userSlice'
import OAuth from '../components/OAuth'

function Signin() {

  const [formData, setformData] = useState({})
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch()

  const navigate = useNavigate();

  const formHandler = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false ){
        dispatch(signInFail(data))
          return
      }else{
        dispatch(signInSuccess(data));
        navigate("/")
      }
    } catch (error) {
      dispatch(signInFail(error))
    }
  };


  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={submitHandler}>
        <input type='email' placeholder='email' id='email' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
        <input type='password' placeholder='password' id='password' className='p-3 bg-slate-100 rounded-lg' onChange={formHandler}></input>
        <button disabled={loading} className='bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>{loading ? "Loading..." : "Sign-In"}</button>
        <OAuth/>
        <div className='flex gap-3'>
          <p className='font-semibold'>Dont Have an account?</p>
          <Link to={"/sign-up"}>
            <span className='text-blue-600 font-semibold'>Sign up</span>
          </Link>
        </div>
      </form>
      <p className='text-red-900 my-5 font-semibold'>{error ? error.message || "Something went wrong" : " "}</p>
    </div>
  )
}

export default Signin
