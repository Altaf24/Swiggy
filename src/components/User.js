import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const User = () => {
    const [count,setCount] = useState(0);
   
    useEffect(() => {
        
      }, []);

      

    
  return (
   

    <div className='user-card'>
      <h1>Count:{count}</h1>
     
        <h2>Name :{name}</h2>
        <h3>Frontend Developer</h3>
        <h3>Location : Pune</h3>
        <h4>Contact : 123456789</h4>
        
      
    </div>
  )
}

export default User;
