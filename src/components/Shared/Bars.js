import React from 'react'
import { guitar, frenchHorn, drums, piano } from "../../data/instruments";
import Bar from './Bar.js';


export default function Bars({ sequence, type, setSequence, toneObject, note }) {

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
        instruments[type].triggerAttackRelease(note, "8n", now);
        let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
        setSequence([...filteredSequence, { ...bar, barToggled: !bar.barToggled }]);
        console.log(`bars: ${note}`, sequence)
    }

    return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);

}
