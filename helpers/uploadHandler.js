import axios from 'axios';
export const uploadHandler = async (file) => {
        
    const formData = new FormData();
    formData.append("file", file);
    console.log("Se ejecuto")
  
    try {
      const response = await axios.post("http://localhost:3000/api/upload", formData);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }