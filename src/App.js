import React, { useEffect, useState } from 'react'
import Button from './components/Button/Button';
import SampleCard from './components/Cards/SampleCard';
import './App.css'
import Card from './components/Cards/Card';

export default function App() {
  const API_HOST = process.env.REACT_APP_HOST;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const READ_URL = (location, limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=${location}&limit=${limit}&order=${order}`


  // Fetch all samples from API
  const [samples, setSamples] = useState([]);
  async function fetchSamples(location, limit, order) {
    const response = await fetch(READ_URL(location, limit, order));
    const json = await response.json();
    setSamples(json)
    console.log(response)
    console.log(json)
  }

  useEffect(() => {
    // fetchSamples(1, 5, "desc");
  }, []);



  return (
    <>
      <div className='body'>
        <h1>Samples You've Created</h1>

        {/* List of Cards */}
        <div className='sample_card_list'>
          <SampleCard title='Hellz Puff' createdAt='6:40pm on 25 August 2022' />
          <SampleCard title='C.R.E.A.M' createdAt='7:40pm on 25 August 2022' />
          <SampleCard title='A Better Tomorrow' createdAt='8:40pm on 25 August 2022' shared/>



          {/* Create Sample Button */}
          <Card>
            <div className={`create_sample_card`}>
              <Button variant='contained'>Create Sample</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
