import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth"
import { useNavigate } from "react-router-dom"

export default function ProfileMenu() {
  const {user, logout} =  useAuth()
  const navigate = useNavigate()
  
  const handleLogout = async () => {
      try {
         await logout()
         navigate('/login')
      } catch (error) {
          console.log(error);
      }
  }

  const handleGoProfile = () => {
    navigate('/profile')
  }
  
  const firstName = user.displayName ? user.displayName.split(' ')[0] : 'Tu nombre';
  
  return (
    <>  
      <DropdownMenu>
        <DropdownMenuTrigger className='font-medium'>{firstName}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleGoProfile}>Profile</DropdownMenuItem>
          <DropdownMenuItem>Mis cargas</DropdownMenuItem>
          <DropdownMenuItem>Historial</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    </>
  )
}
