import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../Button/Button'
import Card from './Card'
import styles from './Card.module.css'

export default function SampleCard({ id, name, datetime, recording_data, toneObject, toneTransport, tonePart }) {

    const [previewing, setPreviewing] = useState();


    function PreviewButton({ previewing, setPreviewing, toneObject, toneTransport, tonePart, recording_data }) {

        function handleButtonClick() {

            tonePart.clear();
            toneTransport.cancel();

            JSON.parse(recording_data).map(note => {
                return console.log(note)
            })

            JSON.parse(recording_data).map((note) => {
                console.log(Object.keys(note)[0], Object.values(note))
                Object.values(note).forEach((bars) => {
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

    useEffect(() => {
        // console.log(JSON.parse(recording_data))
    }, [])
    return (
        <>
            {/* Grid Container */}
            <Card>
                <div className={styles.sample_card_container}>

                    {/* Grid Item 1 */}
                    <div>
                        <h3>{name}</h3>
                        <p className={styles.sample_card_createdAt} >{datetime}</p>
                    </div>

                    {/* Grid Item 2 */}
                    <div className={styles.sample_card_item_action} >
                        <Link to={`share/${id}`} >
                            <Button variant='shared'>Share</Button>
                        </Link>
                        <PreviewButton previewing={previewing} setPreviewing={setPreviewing} toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} recording_data={recording_data}>Preview</PreviewButton>
                        <Link to={`edit/${id}`} >
                            <Button variant='contained' >Edit</Button>
                        </Link>

                    </div>
                </div>
            </Card>
        </>
    )
}
