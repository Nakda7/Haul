import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export default function DriverMenu() {
  const navigate = useNavigate()

  const handleGoProfile = () => {
    navigate('/profile')
  }
  return (
    <>  
      <DropdownMenu>
        <DropdownMenuTrigger className='font-medium'>Driver</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleGoProfile}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/mis-transportes')}>Mis transportes</DropdownMenuItem>
          <DropdownMenuItem>Historial</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    </>
  )
}
