import { useEffect, useState } from 'react';
import axios from 'axios';
import { GrClose } from "react-icons/gr";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import {  InputOTP,  InputOTPGroup,  InputOTPSeparator,  InputOTPSlot,} from "@/components/ui/input-otp"
import {  Select, SelectContent,  SelectItem,  SelectTrigger,  SelectValue,  SelectGroup,  SelectLabel} from "@/components/ui/select"
import { useAuth } from '@/context/auth';

// eslint-disable-next-line react/prop-types
export function ProfileModal ({onClose, onUpdate, userId}) {

    const { updateUserName} = useAuth()

    const [formData, setFormData] = useState({
    userId: userId,
    userName: '',
    description: '',
    telefono:'',
    ocupacion: '',
    empresa: '',
    puesto: '',
    city:'',
    lada:'',

  });
  
  const [userData, setUserData] = useState({
    userId: userId,
    userName: '',
    description: '',
    telefono:'',
    ocupacion: '',
    empresa: '',
    puesto: '',
    city:'',
    lada:'',

  });

  
  useEffect(()=>{
        axios.get(`http://localhost:3001/users/${userId}`).then(response => {
        console.log("Profile Modal Response", response)
          if (response.status === 200 && response.data){
              console.log('New data:  ', response.data)
              const newUserData = {
                userId: response.data.id,
                userName: response.data.user_name,
                description: response.data.user_description,
                telefono: response.data.user_telefono,
                ocupacion: response.data.user_ocupacion,
                empresa: response.data.user_empresa,
                puesto: response.data.user_puesto,
                city: response.data.user_city,
                lada: response.data.user_lada
              }
              setUserData(newUserData)  
          }
      })} ,[userId])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log( 'Data from form: ', formData)

    if (formData.userName) await updateUserName(formData.userName) 
    
    const response = await axios.post('http://localhost:3001/updateUser', {userId: formData.userId, userName: formData.userName, description: formData.description, ocupacion: formData.ocupacion, empresa: formData.empresa, puesto: formData.puesto, city: formData.city, lada: formData.lada});    

    console.log('Response de actualizar form: ', response)
    onClose();
  };

  console.log('User data: ', userData)

  return (
    <div className='fixed z-20 w-[47.7rem] h-[45rem] left-1/4 right-1/4 mt-7 rounded-lg bg-primary-bg drop-shadow-md overflow-y-auto'>
        <header className='flex px-6 justify-between py-6'>
            <h1 className='font-semibold text-xl' >Editar perfil</h1>
            <button onClick={onClose}><GrClose  /></button>
        </header>
        
        <Separator />
        <div className="px-6">
            <span className=' text-xs text-gray-500'>*El asterisco indica que es obligatorio.</span>

            <form className='py-6' action="" onSubmit={handleSubmit} >    
                <h1 className='font-semibold text-xl' >Información personal</h1>
                <label className='text-gray-600' htmlFor="name"> Nombre*</label>
                <Input placeholder={userData.userName ? userData.userName : 'Ingresa tu nombre de usuario' } className='my-1' name='userName' onChange={handleInputChange}/>

                <label className='text-gray-600' htmlFor="descripcion" > Descripción*</label>
                <Input placeHolder={userData.description ? userData.description : 'Ingresa tu descripcion'} minlength="10" maxlength="40" className='my-1' name='description' onChange={handleInputChange}/>

                <label className='text-gray-600' name='telefono'> Telefono</label>
                <div className='flex justify-center gap-5'>
                  <Input placeHolder={`+ ${userData.user_lada ? userData.user_lada : '52'}}`} type='number' className='my-1 w-[4rem]' name='lada' onChange={handleInputChange}/>
                  <InputOTP maxLength={10}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                      <InputOTPSlot index={8} />
                      <InputOTPSlot index={9} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                <h1 className='font-semibold text-xl my-4' >Ocupacion</h1>
                <label className='text-gray-600' htmlFor="empresa"> Sector*</label>
                <Input placeHolder={userData.ocupacion ? userData.ocupacion : 'Ingresa tu sector en el que trabajas' } className='my-1' name='ocupacion' onChange={handleInputChange}/>
                
                <label className='text-gray-600' htmlFor="empresa"> Empresa*</label>
                <Input placeHolder={userData.empresa ? userData.empresa : 'Ingresa la empresa en la que trabajas'} className='my-1'name='empresa' onChange={handleInputChange}/>
                
                <label className='text-gray-600' htmlFor="empresa"> Puesto*</label>
                <Input placeHolder={userData.puesto ? userData.puesto : 'Ingresa tu puesto que tienes donde trabajas'} className='my-1' name='puesto' onChange={handleInputChange}/>
                
                <div className='flex gap-10 mt-7'>
                  <label className='text-gray-700' htmlFor="empresa">¿Negocio propio?</label>
                  <Input type='checkbox' name='negocioPropio' className='my-1 w-5 h-5' />
                </div>

                <h1 className='font-semibold text-xl my-4' >Ubicación</h1>
                <label className='text-gray-600' htmlFor="city"> Ciudad / Estado*</label>
                <Input placeHolder={userData.city ? userData.city : 'Ingresa la ciudad donde vives'} className='my-1' name='city' onChange={handleInputChange}/>

                <label className='text-gray-600' htmlFor="country"> País*</label>
                <div className='mt-2'>
                  <Select > 
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>País</SelectLabel>
                        <SelectItem value="est">México</SelectItem>
                        <SelectItem value="cst">USA</SelectItem>
                        <SelectItem value="akst">Canada</SelectItem>
                        <SelectItem value="mst">España</SelectItem>
                        <SelectItem value="pst">Argentina</SelectItem>
                        <SelectItem value="hst">Inglaterra</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <Button type='submit' className='bg-indigo-500 mt-5 ml-[88%]'>Guardar</Button>
              
            </form>
              
        </div>

    </div>
  );
}
