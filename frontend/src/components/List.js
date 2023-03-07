import { useState } from "react";
import { useParams } from "react-router-dom";

export default function List() {
  let paramsId = useParams()
  const [data, setData] = useState({})
  
  fetch(`/${paramsId.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        response.json()
        .then(res => setData(res));
      } else {
        console.error('Login failed');
      }
    })
    .catch(error => {
      console.error(error);
    });

  return (
    <div className='flex justify-center items-center h-5/6 rounded text-7xl text-white text-center mx-8 bg-gradient-to-b from-gradient-start to-gradient-end'>
      <h1>A better to-do application <br/> - for everyone!</h1>
    </div>
  );
}