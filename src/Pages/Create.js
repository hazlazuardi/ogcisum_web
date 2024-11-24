import React, { useState } from 'react'
import SampleTextField from '../Components/Cards/SampleTextField'
import '../App.css'
import InstrumentSelector from '../Components/Shared/InstrumentSelector';
import Sequencer from '../Components/Shared/Sequencer';
import { useNavigate } from 'react-router-dom';
import { CREATE_SAMPLE_URL } from '../helpers/constants';


export default function Create(props) {


    const [sample, setSample] = useState({
        'name': "",
        'type': "guitar",

    });

    const [recordingData, setRecordingData] = useState([])


    const navigate = useNavigate();
    const handleSubmit = async () => {
        await fetch(CREATE_SAMPLE_URL(sample.name, sample.type), { method: 'POST', body: JSON.stringify(recordingData) })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                navigate('/')
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            <div className='body'>
                <h1>Create a New Sample:</h1>
                <SampleTextField {...props} {...sample} recording_data={JSON.stringify(recordingData)} setSample={setSample} onSubmit={handleSubmit} />
                <InstrumentSelector sample={sample} setSample={setSample} {...props} />
                <div style={{ overflowX: 'scroll' }}>
                    <div style={{ width: 1000 }}>
                        <Sequencer {...props} {...sample} recordingData={recordingData} setRecordingData={setRecordingData} />
                    </div>
                </div>
            </div>
        </>
    )
}
