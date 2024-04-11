import axios from "axios";

export const getAvatarUrl = async ({userId}) => {
    try{
        const response = await axios.post('http://localhost:8080/getAvatarUrl', {userId: userId})
        const {avatarUrl} = response.data
        console.log(avatarUrl)
        return avatarUrl
    } catch (error) {   
            console.error("Error de red:", error.message);
            throw error;
    }
}