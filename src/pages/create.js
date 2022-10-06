import React, { useState } from 'react'
import SampleTextField from '../Components/Cards/SampleTextField'
import '../App.css'
import InstrumentSelector from '../Components/Shared/InstrumentSelector';
import Sequencer from '../Components/Shared/Sequencer';


export default function Create(props) {


    const [sample, setSample] = useState({
        'sampleName': "",
        'sampleType': "guitar",

    });

    const [recordingData, setRecordingData] = useState([])


    console.log('sample', sample)
    console.log('recordingData', recordingData)

    return (
        <>
            <div className='body'>
                <h1>Create a New Sample:</h1>
                <SampleTextField {...props} type={sample.sampleType} recording_data={recordingData} setSample={setSample} sample={sample} recordingData={recordingData} />
                <InstrumentSelector sample={sample} setSample={setSample} {...props} />
                <Sequencer {...props} sample={sample} setRecordingData={setRecordingData} />
            </div>
        </>
    )
}
