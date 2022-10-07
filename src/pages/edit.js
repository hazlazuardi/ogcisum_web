import React, { useEffect, useState } from 'react'
import SampleTextField from '../Components/Cards/SampleTextField'
import '../App.css'
import InstrumentSelector from '../Components/Shared/InstrumentSelector';
import Sequencer from '../Components/Shared/Sequencer';
import { fetchSample } from '../helpers/apiCalls';
import { useNavigate, useParams } from 'react-router-dom';

const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const UPDATE_URL = (id, sampleName, sampleType) => `${API_HOST}?apiKey=${API_KEY}&mode=update&endpoint=samples&sampleType=${sampleType}&sampleName=${sampleName}&id=${id}`

export default function Edit(props) {

    const { sampleId } = useParams()

    // Fetch sample data from API
    const [sample, setSample] = useState({
        name: "",
        type: ""
    });
    const { name, type, recording_data: initialRecordingData } = sample;
    useEffect(() => {
        fetchSample(setSample, sampleId);
    }, [sampleId]);

    // console.log(initialRecordingData && JSON.parse(initialRecordingData))
    // console.log(name)


    const [recordingData, setRecordingData] = useState([])
    useEffect(() => {
        setRecordingData(initialRecordingData && JSON.parse(initialRecordingData))
        console.log('setRec')
    }, [initialRecordingData])


    const navigate = useNavigate()
    const handleSubmit = async () => {
        await fetch(UPDATE_URL(sampleId, name, type), { method: 'POST', body: JSON.stringify(recordingData) })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(e => console.log(e))
    }

    // console.log('sample', sample)
    // console.log('recordingData', recordingData)

    return (
        <>
            <div className='body'>
                <h1>Editing This Sample: </h1>
                <SampleTextField {...props} type={type} sample={sample} setSample={setSample} recordingData={recordingData} onSubmit={handleSubmit} />
                <InstrumentSelector sample={sample} setSample={setSample} {...props} />
                <Sequencer {...props} isEdit sample={sample} recordingData={recordingData} setRecordingData={setRecordingData} />
            </div>
        </>
    )
}
