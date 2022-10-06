import React, { useEffect, useState } from 'react'
import Button from './Button';


export default function PreviewButton({ toneObject, toneTransport, tonePart, type, recording_data }) {
    const [previewing, setPreviewing] = useState();

    const [instrument, setInstrument] = useState()

    // console.log(instrument)

    useEffect(() => {
        setInstrument(tonePart[type])
    }, [tonePart, type])

    function handleButtonClick() {

        instrument.clear();
        toneTransport.cancel();

        recording_data.map(note => {
            return console.log(note)
        })

        recording_data.map((note) => {
            console.log(Object.keys(note)[0], Object.values(note))
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
