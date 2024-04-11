import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export default function HaulerMenu() {
  const navigate = useNavigate()

  const handleGoProfile = () => {
    navigate('/profile')
  }
  return (
    <>  
      <DropdownMenu>
        <DropdownMenuTrigger className='font-medium'>Hauler</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleGoProfile}>Mis cargas</DropdownMenuItem>
          <DropdownMenuItem>Encontrar transporte</DropdownMenuItem>
          <DropdownMenuItem>Mis envios</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    </>
  )
}
