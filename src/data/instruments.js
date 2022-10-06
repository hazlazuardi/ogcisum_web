import * as Tone from "tone";

export const toneObject = Tone;

export const toneTransport = toneObject.Transport;

// TODO
// Adjust so it can attack multiple notes
export const tonePart = new toneObject.Part((time, note) => {
    guitar.triggerAttackRelease(note, "8n", time);
}, []).start(0);

export const synth = new toneObject.PolySynth().toDestination();

export const guitar = new toneObject.Sampler({
    urls: {
        "F3": "F3.mp3",
        "G3": "G3.mp3",
        "A3": "A3.mp3",
        "B3": "B3.mp3",
        "C3": "C3.mp3",
        "D3": "D3.mp3",
        "E3": "E3.mp3",
    },
    release: 1,
    baseUrl: "samples/guitar-acoustic/"
}).toDestination();

// export const frenchHorn = new toneObject.Sampler({
//     urls: {
//         "A1": "A1.mp3",
//         "A3": "A3.mp3",
//         "C2": "C2.mp3",
//         "C4": "C4.mp3",
//         "D3": "D3.mp3",
//         "D5": "D5.mp3",
//         "D#2": "Ds2.mp3",
//         "F3": "F3.mp3",
//         "F5": "F5.mp3",
//         "G2": "G2.mp3",
//     },
//     release: 1,
//     baseUrl: "samples/french-horn/"
// }).toDestination();