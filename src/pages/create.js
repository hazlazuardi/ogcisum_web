import React, { useEffect, useState } from 'react'
import SampleTextField from '../components/Cards/SampleTextField'
import '../App.css'
import ToggleButton from '../components/Button/ToggleButton';
import { synth, guitar } from "../data/instruments.js";
import SampleToneCreator from '../components/SampleToneCreator/SampleToneCreator';
import styles from '../components/SampleToneCreator/SampleToneCreator.module.css'
import Button from '../components/Button/Button';


function Bar({ barID, barToggled, handleBarClick }) {

    function barSelected() {
        if (barToggled) {
            return "contained";
        }
        return "";
    }

    console.log('id:' + barID + ' sel: ' + barSelected())
    return (
        <ToggleButton variant={barSelected()} onClick={handleBarClick}>
            {/* {barID} */}
        </ToggleButton>
    );
}

function Bars({ sequence, setSequence, toneObject, note }) {

    function sortSequence(bar, otherBar) {
        if (bar.barID < otherBar.barID) {
            return -1;
        }
        if (bar.barID > otherBar.barID) {
            return 1;
        }
        return 0;
    }

    function handleBarClick(bar) {
        const now = toneObject.now();
        guitar.triggerAttackRelease(note, "8n", now);
        let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
        setSequence([...filteredSequence, { ...bar, barToggled: !bar.barToggled }]);
    }

    return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);

}

function Preview({ previewing, setPreviewing, toneObject, toneTransport }) {

    function handleButtonClick() {

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

function Sequencer({ toneObject, toneTransport, tonePart, note, previewing, setPreviewing }) {

    const initialSequence = [];
    for (let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar,
            barToggled: false,
            //barToggled: bar % 2 == 1 ? true : false, // Pre-fill every second bar for testing
        });
    }
    const [sequence, setSequence] = useState(initialSequence);

    const initialPreviewing = false;
    // const [previewing, setPreviewing] = useState(initialPreviewing);

    useEffect(() => {

        tonePart.clear();
        toneTransport.cancel();

        sequence.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, note); // Plays an C note on 3rd octave 0.25s apart
            tonePart.add((bar.barID - 1) / 4, "B3"); // Plays an C note on 3rd octave 0.25s apart
        });

        toneTransport.schedule(time => {
            setPreviewing(false);
            console.log("Preview stopped automatically.");
        }, 16 / 4);

    });

    return (
        <>
            {/* Container */}
            <div className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{note}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequence} setSequence={setSequence} toneObject={toneObject} note={note} />
                </div>
            </div>

            {/* <div className="sequencer">
            </div>
            <h4>Play Multiple Bars From Sequence</h4>
            <p> */}
            {/* <Preview previewing={previewing} setPreviewing={setPreviewing} toneObject={toneObject} toneTransport={toneTransport} />
            </p> */}
        </>
    );

}



export default function Create({ toneObject, toneTransport, tonePart }) {

    const [previewing, setPreviewing] = useState();
    const [sample, setSample] = useState();
    return (
        <>
            <div className='body'>
                <h1>Create a New Sample:</h1>

                <SampleTextField setSample={setSample} sample={sample} />

                {/* TextField for Sample Name */}
                {/* Button for Preview Sample */}
                {/* Button for Save Sample */}


                {/* Sample Type */}
                {/* ToggleButton for Sample Type */}

                {/* Sample Tones */}
                {/* ToggleBuyyon for Sample Tones */}
                <SampleToneCreator />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} note={"B3"} previewing={previewing} setPreviewing={setPreviewing} />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} note={"A3"} previewing={previewing} setPreviewing={setPreviewing} />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} note={"G3"} previewing={previewing} setPreviewing={setPreviewing} />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} note={"F3"} previewing={previewing} setPreviewing={setPreviewing} />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} note={"E3"} previewing={previewing} setPreviewing={setPreviewing} />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} note={"D3"} previewing={previewing} setPreviewing={setPreviewing} />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} note={"C3"} previewing={previewing} setPreviewing={setPreviewing} />
                <Preview previewing={previewing} setPreviewing={setPreviewing} toneObject={toneObject} toneTransport={toneTransport} />
            </div>
        </>
    )
}
