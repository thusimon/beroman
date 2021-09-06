import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  useEffect(() => {
    const getAllPD = async () => {
      const resp = await axios.get('/api/all_pd');
      if (resp.status === 200 && resp.data) {
        
      }
    }
    getAllPD();
  }, []);
  return <div>
    Welcome to beroman
  </div>
}

export default Main;
