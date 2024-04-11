/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useEffect, useState, useCallback} from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineSaveAs } from "react-icons/md";
import {getUserData } from "@/services/getUserData";
export const ProfileInfo = ({user, userId, handleUpload, transports, handleOpenModal}) => {

    const [userData, setUserData] = useState({})
    const [isEditingDescription, setIsEditingDescription] = useState(false)
    const [description, setDescription] = useState('')
    const userFollowers = 100
    const undefinedAvatarUrl = 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg'
    
    console.log('transports en profileinfo: ', transports)
    
    const searchUserData = useCallback( async () => {
        try{
            const newUserData = await getUserData({userId})
            console.log("Profile Info User :>> ", newUserData);
            setUserData(newUserData)
            console.log('UserData: ', userData)
        } catch(e){
            console.error(`Failed to fetch user data for id ${userId}:`, e)
        }
      },
      [userId],
    )
    
    
    const handleEditDescription = () => {
        setIsEditingDescription(!isEditingDescription);
    };
    
    const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    };

    const handleSaveDescription = () => {

        setIsEditingDescription(false); // Close the form
    };

    useEffect(()=>{
        console.log('User Data: ', userData)
        searchUserData()
    },[searchUserData])

    return (
    <div className='w-full' >   
        <div className="w-full h-52">
            <img className=" w-full h-full object-cover rounded-t-2xl" src="https://www.geotab.com/CMS-Media-production/Blog/NA/May_2019/longest_highway/blog-longest-highway-sea-cliff-bridge-hero@2x.jpg" alt="" />
        </div>

        <Avatar className="absolute mt-[-120px] border-4 ml-5 border-white w-40 h-40">
            <AvatarImage src={user.photoURL ? user.photoURL : undefinedAvatarUrl } />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <label htmlFor="file-upload" className="inline-flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-300 rounded-full cursor-pointer absolute text-gray-700 hover:bg-gray-100 transition duration-300 ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6  " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            <input id="file-upload" type="file" className="hidden" onChange={(e) => handleUpload(e.target.files[0])}/>
        </label>
        

        <div className="pt-16 px-7 static">
            <button className=" absolute text-black mt-[-3rem] left-[59rem] " onClick={() => handleOpenModal()}>< FaRegEdit/></button>
            
            <div className='grid grid-cols-6'>
                
                <h1 className="font-medium col-span-5 text-2xl">{user.displayName ? user.displayName : 'Miguel Angel Duran'}</h1>
                
                <a className='h-7 flex gap-2' href="https://www.facebook.com/">
                    <img className="w-7" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="" />
                    <button className="rounded-full text-center bg-violet-500 h-7 w-[10rem] text-white">Seguir</button>
                </a>
                
            </div>
            <div className="mt-5">
                <div className="col-span-4 flex">
                    {isEditingDescription ? (
                    <textarea
                        className="border border-gray-300 rounded p-2 w-[20rem]"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                    ) : (
                    <p className="max-w-lg break-words">{userData.description || 'No description yet.'}</p>
                    )}

                    <button
                    className="rounded-full text-center ml-3 w-10 h-auto"
                    onClick={isEditingDescription ? handleSaveDescription : handleEditDescription}
                    >
                    {isEditingDescription ? <MdOutlineSaveAs /> : <FaRegEdit />}
                    </button>

                </div>

            
            </div>

            <p className=" text-blue-500 mt-4">Querétaro, México.</p>

            <p className=" text-gray-500 mb-10"><span className="text-gray-600">{userFollowers}</span> seguidores.</p>

            <div className="h-auto mb-10">
                    <h3 className="font-semibold mb-10">Transportes disponibles.</h3>
                    <ul className="w-[87.5%] mx-auto ">
                        {transports.map((transport) => (
                                <li className="flex gap-7 mb-10" key={transport.id}>
                                    <img className=" w-[5rem] h-[5rem] bg-cover bg-blue-200" src={transport.transport_photoUrl} alt="" />
                                    <div>
                                        <h2 className="flex font-semibold gap-1">
                                            {transport.transport_model}
                                            <p className="font-semibold">{transport.transport_year}</p>
                                        </h2>
                                        <p className="font-semibold">{transport.transport_color}</p>
                                        <p className="font-semibold">{transport.transport_plate}</p>
                                    </div>
                                </li>
                        ))}
                    </ul>
            </div>
            <div className="h-[20rem]">
                    <h3 className="font-semibold">Actividad reciente.</h3>
            </div>
            <div className="h-[20rem]">
                    <h3>Experiencia.</h3>
            </div>
            <div className="h-[20rem]">
                    <h3>Educacion.</h3>
            </div>
            <div className="h-[20rem]">
                    <h3>Recomendaciones.</h3>
            </div>
        </div>
    </div>
  )
}
