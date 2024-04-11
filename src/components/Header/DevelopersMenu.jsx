import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export default function DevelopersMenu() {
  const navigate = useNavigate()

  const handleGoProfile = () => {
    navigate('/profile')
  }
  return (
    <>  
      <DropdownMenu>
        <DropdownMenuTrigger className='font-medium'>Developers</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleGoProfile}>Hugo</DropdownMenuItem>
          <DropdownMenuItem>Hernan</DropdownMenuItem>
          <DropdownMenuItem>Omar</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    </>
  )
}
