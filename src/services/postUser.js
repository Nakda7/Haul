import axios from "axios"

export const postUser = async (userId, userName, userEmail) => {
  try {
    const response = await axios.post('http://localhost:3001/users', {
      userId: userId,
      userEmail: userEmail,
      userName: userName
    });

    return response.data;
  
  } catch (error) {
    console.error(error);
  }
}

