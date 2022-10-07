import React, { useEffect, useState } from 'react'
import styles from '../Shared/InstrumentSelector.module.css'
import Bars from './Bars';

export default function Sequencer(props) {

    const { isEdit, type, toneObject, recordingData, recording_data, setRecordingData } = props

    console.log(props)

    const initialSequence = [];
    for (let bar = 1; bar <= 16; bar++) {
        initialSequence.push({
            barID: bar,
            barToggled: false,
            //barToggled: bar % 2 == 1 ? true : false, // Pre-fill every second bar for testing
        });
    }


    
    
    
    //     ...bar,
    //     barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'C').map(note => Object.values(note)[0][bar.barID - 1])[0],
    // })))

    const [sequenceB, setSequenceB] = useState(initialSequence)
    const [sequenceA, setSequenceA] = useState(initialSequence);
    const [sequenceG, setSequenceG] = useState(initialSequence);
    const [sequenceF, setSequenceF] = useState(initialSequence);
    const [sequenceE, setSequenceE] = useState(initialSequence);
    const [sequenceD, setSequenceD] = useState(initialSequence);
    const [sequenceC, setSequenceC] = useState(initialSequence);

    useEffect(() => {
        if (isEdit && recordingData) {
            setSequenceB(initialSequence.map(bar => ({
                ...bar,
                barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'B').map(note => Object.values(note)[0][bar.barID - 1])[0],
            })))
            setSequenceA(initialSequence.map(bar => ({
                ...bar,
                barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'A').map(note => Object.values(note)[0][bar.barID - 1])[0],
            })))
            setSequenceG(initialSequence.map(bar => ({
                ...bar,
                barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'G').map(note => Object.values(note)[0][bar.barID - 1])[0],
            })))
            setSequenceF(initialSequence.map(bar => ({
                ...bar,
                barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'F').map(note => Object.values(note)[0][bar.barID - 1])[0],
            })))
            setSequenceE(initialSequence.map(bar => ({
                ...bar,
                barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'E').map(note => Object.values(note)[0][bar.barID - 1])[0],
            })))
            setSequenceD(initialSequence.map(bar => ({
                ...bar,
                barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'D').map(note => Object.values(note)[0][bar.barID - 1])[0],
            })))
            setSequenceC(initialSequence.map(bar => ({
                ...bar,
                barToggled: recordingData?.filter(note => Object.keys(note)[0] === 'C').map(note => Object.values(note)[0][bar.barID - 1])[0],
            })))

        }
        // eslint-disable-next-line
    }, [JSON.stringify(recordingData), isEdit])

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


    if (!recording_data && !recordingData && isEdit) return (<p>Loading..</p>)

    return (
        <>
            {/* Container */}
            <div key={"B3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={styles.list_text} >{"B"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars type={type} sequence={sequenceB} setSequence={setSequenceB} toneObject={toneObject} note={"B3"} />
                </div>
            </div>
            <div key={"A3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={styles.list_text} >{"A"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars type={type} sequence={sequenceA} setSequence={setSequenceA} toneObject={toneObject} note="A3" />
                </div>
            </div>
            <div key={"G3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={styles.list_text} >{"G"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars type={type} sequence={sequenceG} setSequence={setSequenceG} toneObject={toneObject} note="G3" />
                </div>
            </div>
            <div key={"F3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={styles.list_text} >{"F"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars type={type} sequence={sequenceF} setSequence={setSequenceF} toneObject={toneObject} note="F3" />
                </div>
            </div>
            <div key={"E3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={styles.list_text} >{"E"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars type={type} sequence={sequenceE} setSequence={setSequenceE} toneObject={toneObject} note="E3" />
                </div>
            </div>
            <div key={"D3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={styles.list_text} >{"D"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars type={type} sequence={sequenceD} setSequence={setSequenceD} toneObject={toneObject} note="D3" />
                </div>
            </div>
            <div key={"C3"} className={styles.type_container}>

                {/* Item 1 */}
                <div className={styles.type_item_text}>
                    <p className={styles.list_text} >{"C"}</p>
                </div>

                {/* Item 2 */}
                <div className={styles.type_item_action}>
                    <Bars type={type} sequence={sequenceC} setSequence={setSequenceC} toneObject={toneObject} note="C3" />
                </div>
            </div>
        </>
    );
}

