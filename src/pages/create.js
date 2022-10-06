import React, { useState } from 'react'
import SampleTextField from '../Components/Cards/SampleTextField'
import '../App.css'
import InstrumentSelector from '../Components/Shared/InstrumentSelector';
import Sequencer from '../Components/Shared/Sequencer';

const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const CREATE_URL = (sampleName, sampleType) => `${API_HOST}?apiKey=${API_KEY}&mode=create&endpoint=samples&sampleType=${sampleType}&sampleName=${sampleName}`

export default function Create(props) {


    const [sample, setSample] = useState({
        'name': "",
        'type': "guitar",

    });

    const [recordingData, setRecordingData] = useState([])


    console.log('sample', sample)
    console.log('recordingData', recordingData)

    const handleSubmit = async () => {
        await fetch(CREATE_URL(sample.name, sample.type), { method: 'POST', body: JSON.stringify(recordingData) })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className='body'>
                <h1>Create a New Sample:</h1>
                <SampleTextField {...props} type={sample.sampleType} sample={sample} setSample={setSample} recordingData={recordingData} onSubmit={handleSubmit} />
                <InstrumentSelector sample={sample} setSample={setSample} {...props} />
                <Sequencer {...props} sample={sample} setRecordingData={setRecordingData} />
            </div>
        </>
    )
}
