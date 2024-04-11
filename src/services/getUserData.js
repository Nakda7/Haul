import axios  from "axios"

export const getUserData = async ({ userId }) => {
  try{    
    const response = await axios.get(`http://localhost:3001/users/${userId}`)
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
        return newUserData;
    }
  } catch (error) {
    console.error("Error de red:", error.message);
    throw error;
  } 
}   