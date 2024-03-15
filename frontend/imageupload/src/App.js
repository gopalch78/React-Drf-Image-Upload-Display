import React, { useState,useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {
    // Fetch image URL from the backend when component mounts 
    fetchImageUrl();
    // const interval = setInterval(() => {
   
    // }, 5000);
     //set your time here. repeat every 5 seconds
  
    // return () =>  clearTimeout(interval);

  }, []); 

  const fetchImageUrl = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/upload/');
      setData(response);
      console.log(response)
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button> 

      <div>
    {loading && <div>Loading</div>}
    {!loading && (
      <div >
        <h2>My Photos </h2> 
        <button onClick={fetchImageUrl}>Reload
        </button>
        {data.data.map(item => (<ul >
          
          <li key={item.id}>
            <p>{item.id}</p>
            <img src={item.image}  alt='uploaded'/> </li>
            <p>{item.uploaded_at}</p>
          </ul>))}
      </div>
    )}
    </div>
    </div>
  );
};

export default App;

