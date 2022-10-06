import React, { useState } from 'react'
import Button from './Button';


export default function PreviewButton({ toneObject, toneTransport, tonePart, recording_data }) {
    const [previewing, setPreviewing] = useState();
    function handleButtonClick() {

        tonePart.clear();
        toneTransport.cancel();

        recording_data.map(note => {
            return console.log(note)
        })

        recording_data.map((note) => {
            console.log(Object.keys(note)[0], Object.values(note))
            return Object.values(note).forEach((bars) => {
                bars.forEach((bar, index) => {
                    if (bar === true) {
                        tonePart.add(index / 4, `${Object.keys(note)[0].toString()}3`)
                    }
                })
            })
        })

        toneTransport.schedule(time => {
            setPreviewing(false);
            console.log("Preview stopped automatically.");
        }, 16 / 4);


        toneObject.start();
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

    return <Button onClick={handleButtonClick} disabled={previewing} >{previewing ? "Stop Previewing" : "Preview"}</Button>;

}
