import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInFail, signInStart, signInSuccess } from '../redux/Slices/userSlice';
import { useNavigate } from 'react-router-dom';

function OAuth() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerGoogleAuth = async () => {
    try {
      dispatch(signInStart())
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL 
            }),
      })
      const data = await res.json();
      if(data.success === false ){
        dispatch(signInFail("Something went wrong"))
          return
      }else{
        dispatch(signInSuccess(data))
        navigate("/")
      }
      
    } catch (error) {
      dispatch(signInFail(error))
    }
  }

  return (
    <button onClick={handlerGoogleAuth} type='button' className='bg-red-700 text-white p-2 rounded-lg uppercase hover:opacity-80 disabled:opacity-50'>Continue with google</button>
  )
}

export default OAuth