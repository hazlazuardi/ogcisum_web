import React, { useEffect, useState } from 'react'
import styles from '../Shared/InstrumentSelector.module.css'
import Bars from './Bars';

export default function Sequencer({ sample, toneObject, setRecordingData }) {

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

