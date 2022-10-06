import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import SampleTextField from '../Components/Cards/SampleTextField';
import InstrumentSelector from '../Components/Shared/InstrumentSelector';
import { fetchData } from '../helpers/apiCalls';
import { isValidCache } from '../helpers/helpers';


const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const READ_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples&limit=${limit}&order=${order}`


export default function Edit() {

    const { sampleId } = useParams();
    const [sample, setSample] = useState();

    // Put all of the functions inside useEffect because we use it once
    useEffect(() => {
        const fetchSample = async () => {
            const localStorageData = JSON.parse(localStorage.getItem('samples'));
            if (isValidCache(localStorageData)) {
                setSample(localStorageData.samples.filter(sample => sample.id === `${sampleId}`)[0])
                console.log('from storage')
            } else {
                const data = await fetchData(READ_URL(9999, 'asc'))
                setSample(localStorageData.samples.filter(sample => sample.id === `${sampleId}`)[0])
                localStorage.setItem("samples", JSON.stringify(data))
                console.log('from api')
            }
        }
        fetchSample();
    }, [sampleId]);


    return (
        <>
            {sample && (
                <div className='body'>
                    <h1>Edit This Sample:</h1>

                    {/* TextField for Sample Name */}
                    {/* Button for Preview Sample */}
                    {/* Button for Save Sample */}
                    <SampleTextField sampleName={sample.name} setSample={setSample} sample={sample} />



                    {/* Sample Type */}
                    {/* ToggleButton for Sample Type */}
                    {/* Sample Tones */}
                    {/* ToggleBuyyon for Sample Tones */}
                    <InstrumentSelector />

                </div>
            )}
        </>
    )
}
