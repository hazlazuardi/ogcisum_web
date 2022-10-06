import React, { useEffect, useState } from 'react'
import SampleTextField from '../components/Cards/SampleTextField'
import '../App.css'
import ToggleButton from '../components/Button/ToggleButton';
import { guitar, frenchHorn, drums, piano } from "../data/instruments.js";
import InstrumentSelector from '../components/InstrumentSelector/InstrumentSelector';
import styles from '../components/InstrumentSelector/InstrumentSelector.module.css'
import PreviewButton from '../components/Button/PreviewButton';


function Bar({ barID, barToggled, handleBarClick }) {

    function barSelected() {
        if (barToggled) {
            return "contained";
        }
        return "";
    }

    return (
        <ToggleButton variant={barSelected()} onClick={handleBarClick}>
            {/* {barID} */}
        </ToggleButton>
    );
}

function Bars({ sequence, sample, setSequence, toneObject, note }) {

    const instruments = {
        'guitar': guitar,
        'french_horn': frenchHorn,
        'drums': drums,
        'piano': piano
    }

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
        instruments[sample.sampleType].triggerAttackRelease(note, "8n", now);
        let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
        setSequence([...filteredSequence, { ...bar, barToggled: !bar.barToggled }]);
        console.log(`bars: ${note}`, sequence)
    }

    return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);

}


function Sequencer({ sample, toneObject, tonePart, setRecordingData }) {

    const initialSequence = [];
    for (let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar,
            barToggled: false,
            //barToggled: bar % 2 == 1 ? true : false, // Pre-fill every second bar for testing
        });
    }


    const [sequenceB, setSequenceB] = useState(initialSequence);
    const [sequenceA, setSequenceA] = useState(initialSequence);
    const [sequenceG, setSequenceG] = useState(initialSequence);
    const [sequenceF, setSequenceF] = useState(initialSequence);
    const [sequenceE, setSequenceE] = useState(initialSequence);
    const [sequenceD, setSequenceD] = useState(initialSequence);
    const [sequenceC, setSequenceC] = useState(initialSequence);


    // Update data everytime sequence changes
    useEffect(() => {
        setRecordingData(
            [
                { "B": sequenceB.map(bar => bar.barToggled) },
                { "A": sequenceA.map(bar => bar.barToggled) },
                { "G": sequenceG.map(bar => bar.barToggled) },
                { "F": sequenceF.map(bar => bar.barToggled) },
                { "E": sequenceE.map(bar => bar.barToggled) },
                { "D": sequenceD.map(bar => bar.barToggled) },
                { "C": sequenceC.map(bar => bar.barToggled) },
            ]
        )
    }, [sequenceA, sequenceB, sequenceC, sequenceD, sequenceE, sequenceF, sequenceG, setRecordingData])


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
                    <Bars sample={sample} sequence={sequenceB} setSequence={setSequenceB} toneObject={toneObject} note={"B3"} />
                </div>
            </div>
            <div key={"A3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"A3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sample={sample} sequence={sequenceA} setSequence={setSequenceA} toneObject={toneObject} note="A3" />
                </div>
            </div>
            <div key={"G3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"G3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sample={sample} sequence={sequenceG} setSequence={setSequenceG} toneObject={toneObject} note="G3" />
                </div>
            </div>
            <div key={"F3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"F3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sample={sample} sequence={sequenceF} setSequence={setSequenceF} toneObject={toneObject} note="F3" />
                </div>
            </div>
            <div key={"E3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"E3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sample={sample} sequence={sequenceE} setSequence={setSequenceE} toneObject={toneObject} note="E3" />
                </div>
            </div>
            <div key={"D3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"D3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sample={sample} sequence={sequenceD} setSequence={setSequenceD} toneObject={toneObject} note="D3" />
                </div>
            </div>
            <div key={"C3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p>{"C3"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars sample={sample} sequence={sequenceC} setSequence={setSequenceC} toneObject={toneObject} note="C3" />
                </div>
            </div>
        </>
    );

}



export default function Create(props) {


    // const [instrument, setInstrument] = useState()
    // useEffect(() => {
    //     setInstrument(tonePart[sample.sampleType])
    // }, [])

    const [sample, setSample] = useState({
        'sampleName': "",
        'sampleType': "guitar",

    });

    const [recordingData, setRecordingData] = useState([])


    console.log('sample', sample)
    console.log('recordingData', recordingData)

    return (
        <>
            <div className='body'>
                <h1>Create a New Sample:</h1>
                <SampleTextField previewButton={<PreviewButton {...props} type={sample.sampleType} recording_data={recordingData} />
                } setSample={setSample} sample={sample} recordingData={recordingData} />
                <InstrumentSelector sample={sample} setSample={setSample} {...props} />
                <Sequencer {...props} sample={sample} setRecordingData={setRecordingData} />
            </div>
        </>
    )
}
