import { useAuth } from '@/context/auth';
import { Header } from '@/components/Header/Header';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import axios from 'axios';
import { uploadFile } from '@/firebase';
import { Toastify } from 'toastify-js';
import "toastify-js/src/toastify.css"

const MisTransportes = () => {
    const { user, userId } = useAuth();
    const [file, setFile ] = useState()

    const [formData, setFormData] = useState({
        id: userId,
        transportPlate: '',
        transportModel: '',
        transportColor: '',
        transportYear: '',
        transportDescription: '',
        transportPhotoUrl: ''
      });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
     };
     

    const uploadTransportPhoto = async () => {
        try {
            const transportPhotoUrlReceived = await uploadFile(file)
            setFormData({ transportPhotoUrl: transportPhotoUrlReceived })
            return transportPhotoUrlReceived
        } catch (error) {
            console.log('Error al elegir foto de transporte')
        }
    }
      
   const handleSubmit = async (event) => {
        event.preventDefault();
       
        try {
        console.log('file: ', file)
        const transportUrlReceived = await uploadTransportPhoto()
        

        console.log('form data: ', formData)
        console.log(transportUrlReceived)

        const response = await axios.post('http://localhost:3001/transports', {id: userId, transportModel: formData.transportModel, transportPlate: formData.transportPlate, transportColor: formData.transportColor, transportYear: formData.transportYear, transportDescription: formData.transportDescription, transportPhotoUrl: transportUrlReceived});    
        
        console.log('Transport added successfully:', response.data);

        } catch (error) {
        console.error('Error adding transport:', error); 
        }
    };

    const handleScrollTo = () => {
        window.scroll({ top: 400, left: 0, behavior: "smooth" });
    }


    return (
    <div className='h-screen w-screen pb-20'>
        <Header/>
        <main className='w-[72.5%] mx-auto'>
            <h1 className='font-semibold text-black text-center text-4xl mt-10 font-inter'>Haul Transportation Manage</h1>
            <h2 className='font-semibold text-violet-500 text-center text-3xl mt-3 font-merriweather '>Welcome {user.displayName}</h2>
            <p className="text-gray-600 font-medium text-center text-lg mt-3 font-inter">Here you can see all the transports that you have registered, you can do...</p>
            <section className='grid grid-cols-5 gap-7 mt-10'>
                <div onClick={handleScrollTo} className='w-full text-center col-span-3 bg-gray-100 hover:bg-gray-200 h-[14rem] rounded-2xl p-10 drop-shadow-md'>
                    <h2 className='font-normal text-lg'>Add transportation</h2>
                    <img className='w-24 mx-auto'  src="src\assets\3d-truck.png" alt="" />
                </div>
                <div className='w-full text-center bg-gray-100 col-span-2 hover:bg-gray-200 h-[14rem] rounded-2xl p-10 drop-shadow-md'>
                    <h2 className='font-normal text-lg'>Delete transportation</h2>
                    <img className='w-20 mx-auto mt-2 hover:'  src="src\assets\remove-friend.png" alt="" />
                </div>
            </section>
            <section className='pb-20'>
                <h1 className='font-semibold text-violet-500 text-center text-2xl mt-20 mb-10'>Add transport.</h1>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-10">
                    <div className="flex items-center">
                        <Input type="text" onChange={handleChange} name="transportModel" placeholder="Modelo de transporte" />
                    </div>

                    <div className="flex items-center">
                        <Input type="text" onChange={handleChange} name="transportColor" placeholder="Color de transporte" />
                    </div>

                    <div className="flex items-center">
                        <Input type="text" onChange={handleChange} name="transportYear" placeholder="Año de tu transporte" />
                    </div>

                    <div className="flex items-center">
                        <Input type="text"  onChange={handleChange} name="transportPlate" placeholder="Placa del transporte" />
                    </div>

                    <div className="flex items-center">
                        <Input type="text" onChange={handleChange} name="transportDescription" placeholder="Description" />
                    </div>
                    <div className="flex items-center">
                        <Input id="file-upload" type="file" className="" onChange={(e) => setFile(e.target.files[0])}/>
                    </div>

                    <Button variant="outline" onChange={handleChange} className='w-40 mx-auto'>Add transport!</Button>
                </form>

            </section>
        </main>
    </div>
  )
}

export default MisTransportes