import React, { useEffect, useState } from 'react'
import Button from './Button';


export default function PreviewButton(props) {
    const { toneObject, toneTransport, tonePart, type, recording_data } = props;

    console.log(props)
    const [previewing, setPreviewing] = useState();

    const [instrument, setInstrument] = useState(tonePart['guitar'])


    useEffect(() => {
        setInstrument(tonePart[type])
    }, [tonePart, type])

    // console.log(instrument)

    const recordingData = recording_data && JSON.parse(recording_data);
    function handleButtonClick() {
        instrument.clear();
        toneTransport.cancel();

        recordingData?.map((note) => {
            return Object.values(note).forEach((bars) => {
                bars.forEach((bar, index) => {
                    if (bar === true) {
                        instrument.add(index / 4, `${Object.keys(note)[0].toString()}3`)
                    }
                })
            })
        })

        toneTransport.schedule(time => {
            setPreviewing(false);
            console.log("Preview stopped automatically.");
        }, 16 / 4);


        toneObject.loaded().then(() => {
            toneObject.start()
        })
        toneTransport.stop();

        if (previewing) {
            setPreviewing(false);
            console.log("Preview stopped manually.");
        }
        else {
            setPreviewing(true);
            console.log("Preview started.");
            toneTransport.start();
        }

    }

    return <Button variant={previewing && 'in_progress'} onClick={handleButtonClick}>{previewing ? "Stop Previewing" : "Preview"}</Button>;

}
