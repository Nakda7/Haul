import { useEffect, useState } from "react"
import { useAuth } from "../context/auth"
import { useNavigate } from "react-router-dom"
import { postUser } from "@/services/postUser"

export function Register() {
    const [user, setUser] = useState({
        email:"" ,
        password:"",
        username: ''
    })

    const { signup, updateUserName} = useAuth()
    const [error, setError ] = useState('')
    const navigate = useNavigate()
    
    const handleChange = ({target: {name, value}}) => {
        setUser({...user, [name]: value})
    }
    
    const createNewUser = async (userId, username, email) => {
        try {
          const response = await postUser(userId, username, email);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
           const newUserId = await signup(user.email, user.password)
           await createNewUser(newUserId, user.username, user.email)
           await updateUserName(user.username)
           console.log("User id: ", newUserId)
        } catch (error) {
            setError(error.message)
        }
    }

    
    return (
        <>
        <div className="w-full h-full flex items-center justify-center lg:w-1/2 overflow-hidden">
                <div className=" px-10 py-20 rounded-3xl">
                    <div className="flex justify-center">
                        <img className="w-1/2" src="src\assets\haullogopng.png" alt="" />
                    </div>
                    <h1 className="mt-5 text-4xl font-medium text-center">Welcome to your new adventure</h1>
                    <p className="font-medium text-base text-center text-gray-800 mt-4">
                        Do you have an account? <span onClick={()=>{navigate('/login')}} className="text-blue-500 cursor-pointer">Log in</span>
                    </p>
                    <div className="mt-8">
                        <form className=" max-w-xl" onSubmit={handleSubmit}>
                            
                            <label className="text-base font-light">Username</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                type="text"
                                name="username"
                                placeholder="Your username"
                                onChange={handleChange}
                            />

                            <label className="text-base font-light">Email</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                type="email"
                                name="email"
                                placeholder="e.g:john@toyota.com"
                                onChange={handleChange}
                            />
                        
                            <label className="text-base font-light">Password</label>
                            <input
                                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                                type="password"
                                name="password"
                                placeholder="•••••••"
                                onChange={handleChange}
                            />
                            
                            <button  className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white tx-lg font-bold w-full mt-5">Sign Up</button>
                       </form>
                        <p>{error}</p>
                      
                    </div>
                </div>
            </div>
            <div className="hidden relative lg:flex min-h-full w-1/2 items-center justify-center bg-gray-200">
                <img className="flex w-full mb-39 h-auto animate-pulse" src="src\assets\teslatruck.png" alt="" />
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
            </div>  
        </>
    )
}