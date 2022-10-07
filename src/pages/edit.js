import React, { useEffect, useState } from 'react'
import SampleTextField from '../Components/Cards/SampleTextField'
import '../App.css'
import InstrumentSelector from '../Components/Shared/InstrumentSelector';
import Sequencer from '../Components/Shared/Sequencer';
import { fetchSample } from '../helpers/apiCalls';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_SAMPLE_URL } from '../helpers/constants';


export default function Edit(props) {

    const { sampleId } = useParams()

    // Fetch sample data from API
    const [sample, setSample] = useState({});
    useEffect(() => {
        fetchSample(setSample, sampleId);
    }, [sampleId]);

    // console.log(sample)
    // console.log(initialRecordingData && JSON.parse(initialRecordingData))
    // console.log(name)


    const { name, type, recording_data: initialRecordingData } = sample;
    const [recordingData, setRecordingData] = useState(initialRecordingData && JSON.parse(initialRecordingData))
    useEffect(() => {
        setRecordingData(initialRecordingData && JSON.parse(initialRecordingData))
    }, [initialRecordingData])


    const navigate = useNavigate()
    const handleSubmit = async () => {
        await fetch(UPDATE_SAMPLE_URL(sampleId, name, type), { method: 'POST', body: JSON.stringify(recordingData) })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(e => console.log(e))
    }

    return (
        <>
            {sample && (
                <div className='body'>
                    <h1>Editing This Sample: </h1>
                    <SampleTextField {...props} {...sample} recording_data={JSON.stringify(recordingData)} setSample={setSample} onSubmit={handleSubmit} />
                    <InstrumentSelector sample={sample} setSample={setSample} {...props} />
                    <Sequencer {...props} {...sample} isEdit recordingData={recordingData} setRecordingData={setRecordingData} />
                </div>
            )}
        </>
    )
}
