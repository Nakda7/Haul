import { Header } from "@/components/Header/Header"
import axios from "axios"
import {ProfileInfo} from "@/components/Profile/ProfileInfo"
import { useAuth } from "@/context/auth"
import { useEffect, useState } from "react"
import { uploadFile } from "@/firebase"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import { ProfileModal } from "@/components/Modals/ProfileModal"

export function Profile () {

  const {user, userId, updateUserPhotoUrl} = useAuth()
  const [transports, setTransports] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {

    const fetchTransports = async () => {

      try {
        const response = await axios.post('http://localhost:3001/transports/user', { userId: userId });
        setTransports(response.data)
        console.log(response.data)
        setTransports(response.data);
      } catch (error) {
        console.error('Error fetching transports:', error);
      } 
    };

    fetchTransports();
  }, [userId]);

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleUpload = async (file) => {
      try {
          const avatarUrlReceived = await uploadFile(file)
          const uploaded = await updateUserPhotoUrl(avatarUrlReceived)
          if(uploaded){
            window.location.reload();
              Toastify({
              text: uploaded,
              className: "info",
              gravity: "bottom",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "white", color:'black'
              }
            }).showToast();
          }
      } catch (error) {
          Toastify({
              text: 'Error interno al subir el archivo.',
              className: "info",
              gravity: "bottom",
              position: "right",
              stopOnFocus: true,
              style: {
                background: "white", color:'black'
              }
            }).showToast();
            console.error(error)
      }
  }

  return(
    <>
    {isModalOpen && <ProfileModal onClose={() => setIsModalOpen(false)} userId={  userId} />}
    <div className={`h-screen w-screen ${isModalOpen ? 'blur-sm' : ''}`}>
        <Header />       
        <main className="w-[72.5%] pt-5 h-screen mx-auto grid grid-cols-7 gap-7 ">
            <section className="col-span-5 border-gray-200 border-2 rounded-2xl shadow-xl">
              <ProfileInfo user={user} userId = {userId} handleUpload={handleUpload} handleOpenModal={handleOpenModal} transports={transports} />
              <div>
                <h1>Transportes de {user.displayName}</h1>
              </div>
              
            </section>
            <section className="grid grid-rows-12 col-span-2 gap-4 rounded-2xl max-h-[70rem]" >
                <div className="rounded-2xl row-span-2 text-center p-4  border-gray-200 border-2">
                  <h1 className="font-semibold text-lg">Status</h1>
                  <h1 className=" text-green-500 mt-7 font-semibold grid grid-rows-2 gap-2"> 
                    <img className="w-16 m-auto" src="src\assets\available.png" alt="" />
                  </h1>
                </div>
                <div className="rounded-2xl row-span-4 text-center p-4  border-gray-200 border-2">
                  Personas que han enviado cosas con el.
                </div>
                <div className="rounded-2xl row-span-4 text-center p-4  border-gray-200 border-2">
                  Perfiles similares en la zona.
                </div>
            </section>
        </main>
    </div>
    </>
  )
}