// import React, { useEffect, useState } from 'react'
// import Header from '../components/Header'
// import { synth, guitar } from "../data/instruments.js";
// import * as Tone from "tone";

// export default function Create() {


//   function Bars({ sequence, setSequence, toneObject }) {
//     function handleBarClick(bar) {
//       const now = toneObject.now();
//       guitar.triggerAttackRelease("C3", "8n", now);
//       let filteredSequence = sequence.filter((_bar) => _bar.barID !== bar.barID);
//       setSequence([...filteredSequence, { ...bar, barEnabled: !bar.barEnabled }]);
//     }

//     function sortSequence(bar, otherBar) {
//       if (bar.barID < otherBar.barID) {
//         return -1;
//       }
//       if (bar.barID > otherBar.barID) {
//         return 1;
//       }
//       return 0;
//     }
//     // ...
//     return sequence.sort(sortSequence).map(bar => <Bar key={bar.barID} {...bar} handleBarClick={() => handleBarClick(bar)} />);

//   }
//   function Preview({ previewing, setPreviewing, toneObject, toneTransport }) {

//     function handleButtonClick() {
//       if (previewing) {
//         setPreviewing(false);
//         console.log("Preview stopped manually.");
//       }
//       else {
//         setPreviewing(true);
//         console.log("Preview started.");
//       }
//     }

//     return <button onClick={handleButtonClick}>{previewing ? "Stop Previewing" : "Preview"}</button>;

//   }
//   function Sequencer({ toneObject, toneTransport, tonePart }) {

//     // ...

//     const initialPreviewing = false;
//     const [previewing, setPreviewing] = useState(initialPreviewing);

//     useEffect(() => {

//       tonePart.clear();
//       toneTransport.cancel();

//       sequence.filter(bar => bar.barEnabled).forEach(bar => {
//         tonePart.add((bar.barID - 1) / 4, "C3"); // Plays an C note on 3rd octave 0.25s apart
//       });

//     });

//     // ...

//   }


//   return (
//     <>
//       <Header />
//       <div>This is create page!</div>
//     </>
//   )
// }
