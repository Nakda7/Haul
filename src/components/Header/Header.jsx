/* eslint-disable no-unused-vars */
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAvatarUrl } from '@/services/getAvatarUrl';
import ProfileMenu from './ProfileMenu';
import DriverMenu from './DriverMenu';
import HaulerMenu from './HaulerMenu';
import AboutMenu from './AboutMenu';
import DevelopersMenu from './DevelopersMenu';


export function Header() {
    const {user, logout, userId } = useAuth()
    const [avatarUrl, setAvatarUrl] = useState('https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg')
    const navigate = useNavigate()

    const handleNavigateHome = () => {
        navigate('/')
    }

    return(
        <header className="w-full p-2">
            <nav className="flex justify-between items-center  w-5/6 mx-auto">
                <div onClick={handleNavigateHome}>
                    <img className="w-7 cursor-pointer" src="src\assets\logopng.png" alt="" />
                </div>
                <div>
                    <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <li className=" hover:text-gray-500 font-medium flex gap-2">
                        <img className='h-auto w-6' src="src\assets\driver.png" alt="" />
                            <DriverMenu  className='flex gap-2 '></DriverMenu>  
                        </li>
                        <li className=" hover:text-gray-500` flex gap-2">
                            <HaulerMenu/>
                             <img className='h-auto w-6' src="src\assets\shipment-tracking.png" alt="" />
                        </li>
                        <li className=" hover:text-gray-500 font-medium flex gap-2">
                            <AboutMenu/>
                            <img className='h-auto w-6' src="src\assets\group-dynamics.png" alt="" />
                        </li>
                        <li className=" hover:text-gray-500 font-medium flex gap-2 ">
                            <DevelopersMenu/>
                            <img className='h-auto w-6' src="src\assets\hackero.png" alt="" />
                        </li>
                        <li className=" hover:text-gray-500 font-medium flex gap-2">
                            <a href="#" className='flex gap-2'><img className='h-auto w-6' src="src\assets\more.png" alt="" />More</a>
                        </li>
                    </ul>
                </div>  
                <div    className='flex gap-1 my-auto'>
                    <Avatar className="mr-1 h-auto w-8">
                        <AvatarImage src={user.photoURL ? user.photoURL : avatarUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <ProfileMenu/>
                </div>
            </nav>
        </header>
    )
}