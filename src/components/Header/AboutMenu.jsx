import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export default function AboutMenu() {
  const navigate = useNavigate()

  const handleGoProfile = () => {
    navigate('/profile')
  }
  return (
    <>  
      <DropdownMenu>
        <DropdownMenuTrigger className='font-medium'>About Us</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleGoProfile}>Who we are?</DropdownMenuItem>
          <DropdownMenuItem>History</DropdownMenuItem>
          <DropdownMenuItem>Social</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    </>
  )
}
