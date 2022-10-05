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

    // console.log('id:' + barID + ' sel: ' + barSelected() + ' note: ')
    return (
        <ToggleButton variant={barSelected()} onClick={handleBarClick}>
            {barID}
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

function Sequencer({ toneObject, toneTransport, tonePart, previewing, setPreviewing }) {

    const initialSequence = [];
    for (let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar,
            barToggled: false,
            //barToggled: bar % 2 == 1 ? true : false, // Pre-fill every second bar for testing
        });
    }

    const initialData = [
        {
            "B": [
                true,
                true,
                false,
                false,
                false,
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        },
        { "B": [] },
        { "A": [] },
        {
            "G": [
                true,
                false,
                false,
                false,
                false,
                false,
                true,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false
            ]
        },
        { "F": [] },
        { "E": [] },
        { "D": [] },
        { "C": [] },
    ]
    const [recordingData, setRecordingData] = useState(initialData)

    const [sequenceB, setSequenceB] = useState(initialSequence);
    const [sequenceA, setSequenceA] = useState(initialSequence);
    const [sequenceG, setSequenceG] = useState(initialSequence);
    const [sequenceF, setSequenceF] = useState(initialSequence);
    const [sequenceE, setSequenceE] = useState(initialSequence);
    const [sequenceD, setSequenceD] = useState(initialSequence);
    const [sequenceC, setSequenceC] = useState(initialSequence);

    // useEffect(() => {
    //     tonePart.clear();
    //     toneTransport.cancel();

    //     recordingData.map((note) => {
    //         // console.log(Object.keys(note)[0], Object.values(note))
    //         Object.values(note).forEach((bars) => {
    //             bars.forEach((bar, index) => {
    //                 if (bar === true) {
    //                     tonePart.add(index / 4, `${Object.keys(note)[0].toString()}3`)
    //                 }
    //             })
    //         })
    //     })

    //     toneTransport.schedule(time => {
    //         setPreviewing(false);
    //         console.log("Preview stopped automatically.");
    //     }, 16 / 4);


    // })


    useEffect(() => {

        tonePart.clear();
        toneTransport.cancel();
        
        sequenceB.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "B3"); // Plays an C note on 3rd octave 0.25s apart
        });
        sequenceA.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "A3"); // Plays an C note on 3rd octave 0.25s apart
        });
        sequenceG.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "G3"); // Plays an C note on 3rd octave 0.25s apart
        });
        sequenceF.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "F3"); // Plays an C note on 3rd octave 0.25s apart
        });
        sequenceE.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "E3"); // Plays an C note on 3rd octave 0.25s apart
        });
        sequenceD.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "D3"); // Plays an C note on 3rd octave 0.25s apart
        });
        sequenceC.filter(bar => bar.barToggled).forEach(bar => {
            tonePart.add((bar.barID - 1) / 4, "C3"); // Plays an C note on 3rd octave 0.25s apart
        });

        toneTransport.schedule(time => {
            setPreviewing(false);
            console.log("Preview stopped automatically.");
        }, 16 / 4);

    });

    useEffect(() => {
        setRecordingData([
            { "B": sequenceB },
            { "A": sequenceA },
            { "G": sequenceG },
            { "F": sequenceF },
            { "E": sequenceE },
            { "D": sequenceD },
            { "C": sequenceC },
        ])
    }, [sequenceA, sequenceB, sequenceC, sequenceD, sequenceE, sequenceF, sequenceG])

    console.log('recordingData', recordingData)

    return (
        <>
            {/* Container */}
            <div key={"B3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"B3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequenceB} setSequence={setSequenceB} toneObject={toneObject} note={"B3"} />
                </div>
            </div>
            <div key={"A3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"A3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequenceA} setSequence={setSequenceA} toneObject={toneObject} note="A3" />
                </div>
            </div>
            <div key={"G3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"G3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequenceG} setSequence={setSequenceG} toneObject={toneObject} note="G3" />
                </div>
            </div>
            <div key={"F3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"F3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequenceF} setSequence={setSequenceF} toneObject={toneObject} note="F3" />
                </div>
            </div>
            <div key={"E3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"E3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequenceE} setSequence={setSequenceE} toneObject={toneObject} note="E3" />
                </div>
            </div>
            <div key={"D3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"D3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequenceD} setSequence={setSequenceD} toneObject={toneObject} note="D3" />
                </div>
            </div>
            <div key={"C3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"C3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sequence={sequenceC} setSequence={setSequenceC} toneObject={toneObject} note="C3" />
                </div>
            </div>
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
                <SampleTextField previewButton={<Preview previewing={previewing} setPreviewing={setPreviewing} toneObject={toneObject} toneTransport={toneTransport} />
                } setSample={setSample} sample={sample} />
                <SampleToneCreator />
                <Sequencer toneObject={toneObject} toneTransport={toneTransport} tonePart={tonePart} previewing={previewing} setPreviewing={setPreviewing} />
            </div>
        </>
    )
}
