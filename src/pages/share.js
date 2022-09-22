import React from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'


export default function Share() {

    const { sampleId } = useParams()
    return (
        <>
            <div className='body'>
                <h1>Share This Sample: {sampleId}</h1>

                {/* Card */}
                {/* Sample Name */}
                {/* Sample CreatedAt */}
                {/* Button for Preview Sample */}

                {/* List of Locations */}
                {/* ToggleButton for Shared or Not Shared Sample */}
            </div>
        </>
    )
}
