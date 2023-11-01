import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFail, updateStart, updateSuccess, deleteStart, deleteSuccess, deleteFail, signout } from '../redux/Slices/userSlice';

function Profile() {

  const [FormData, setFormData] = useState({});
  const [ updateSucess, setUpdateSuccess] = useState(false);
  const { currentUser } = useSelector((state) => state.user)
  const { loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value })
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(FormData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFail(data));
        return;
      }
      dispatch(updateSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateFail(error));
    }
  };

  const deleteHandler = async () => {
    try{
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json()
      if(data.status == false){
        dispatch(deleteFail(data))
      }
      dispatch(deleteSuccess())
    }
    catch(error){
      dispatch(deleteFail(error))
    }
  }

   const signOutHandler = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signout())
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='my-7 text-3xl font-semibold text-center'>Profile</h1>
      <form onSubmit={submitHandler} className='flex flex-col'>
        <img src={currentUser.profileImage} className='rounded-full cursor-pointer h-24 w-24 object-cover self-center' onChange={changeHandler}></img>
        <input defaultValue={currentUser.username} type='text' placeholder='Username' id='username' className='mt-3 p-3 bg-slate-100 rounded-lg' onChange={changeHandler}></input>
        <input defaultValue={currentUser.email} type='email' placeholder='Email' id='email' className='mt-3 p-3 bg-slate-100 rounded-lg' onChange={changeHandler}></input>
        <input type='password' placeholder='Password' id='password' className='mt-3 p-3 bg-slate-100 rounded-lg' onChange={changeHandler}></input>
        <button className='mt-3 bg-slate-700 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-50' onChange={changeHandler}>{loading ? "loading..." : "Update"}</button>
        <div className='flex justify-between mt-5'>
          <span className='text-red-600 cursor-pointer font-semibold' onClick={deleteHandler}>Delete Account</span>
          <span className='text-red-600 cursor-pointer font-semibold' onClick={signOutHandler}>Sign out</span>
        </div>
      </form>
      <div>
        <p className='font-semibold text-red-600 mt-4'>{error ? "Username or email already taken" || "Try again" : ""}</p>
        <p className='font-semibold text-green-600 mt-4'>{updateSucess && 'user is updated sucessfully!'}</p>
      </div>
    </div>
  )
}

export default Profile