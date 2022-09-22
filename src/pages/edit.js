import React from 'react'
import { useParams } from 'react-router-dom'

export default function Edit() {

    const { sampleId } = useParams();

    return (
        <>
            <h1>Edit This Sample: {sampleId}</h1>


            {/* TextField for Sample Name */}
            {/* Button for Preview Sample */}
            {/* Button for Save Sample */}


            {/* Sample Type */}
            {/* ToggleButton for Sample Type */}

            {/* Sample Tones */}
            {/* ToggleBuyyon for Sample Tones */}

        </>
    )
}
