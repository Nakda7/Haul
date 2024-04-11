import axios from "axios"

export const postAvatarUrl = async ({avatarUrl, userId}) => {
    try {
      const response = await axios.post('http://localhost:8080/update', {userId: userId, avatarUrl: avatarUrl});
      return response.data.message; // Return any relevant response data, such as success message

    } catch (error) {
      console.error("Error de red:", error.message);
      throw error; // Re-throw the error to allow for further handling if needed
    }
  };