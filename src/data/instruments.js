import * as Tone from "tone";

export const toneObject = Tone;

export const toneTransport = toneObject.Transport;

// TODO
// Adjust so it can attack multiple notes
export const toneParts = new toneObject.Part((time, note) => {
    guitar.triggerAttackRelease(note, "8n", time);
}, []).start(0);

export const tonePart = {
    'guitar': new toneObject.Part((time, note) => {
        guitar.triggerAttackRelease(note, "8n", time);
    }, []).start(0),
    'french_horn': new toneObject.Part((time, note) => {
        frenchHorn.triggerAttackRelease(note, "8n", time);
    }, []).start(0),
    'drums': new toneObject.Part((time, note) => {
        drums.triggerAttackRelease(note, "8n", time);
    }, []).start(0),
    'piano': new toneObject.Part((time, note) => {
        piano.triggerAttackRelease(note, "8n", time);
    }, []).start(0),
}

export const synth = new toneObject.PolySynth().toDestination();

export const guitar = new toneObject.Sampler({
    urls: {
        "B3": "B3.mp3",
        "A3": "A3.mp3",
        "G3": "G3.mp3",
        "F3": "F3.mp3",
        "E3": "E3.mp3",
        "D3": "D3.mp3",
        "C3": "C3.mp3",
    },
    release: 1,
    baseUrl: "samples/guitar-acoustic/"
}).toDestination();

export const frenchHorn = new toneObject.Sampler({
    urls: {
        "B3": "D5.mp3",
        "A3": "C4.mp3",
        "G3": "A3.mp3",
        "F3": "F3.mp3",
        "E3": "D3.mp3",
        "D3": "G2.mp3",
        "C3": "Ds2.mp3",
    },
    release: 1,
    baseUrl: "samples/french-horn/"
}).toDestination();

export const drums = new toneObject.Sampler({
    urls: {
        "B3": "drums1.mp3",
        "A3": "drums2.mp3",
        "G3": "drums3.mp3",
        "F3": "drums4.mp3",
        "E3": "drums5.mp3",
        "D3": "drums6.mp3",
        "C3": "drums7.mp3",
    },
    release: 1,
    baseUrl: "samples/drums/"
}).toDestination();

export const piano = new toneObject.Sampler({
    urls: {
        "B3": "B3.mp3",
        "A3": "A3.mp3",
        "G3": "G3.mp3",
        "F3": "F3.mp3",
        "E3": "E3.mp3",
        "D3": "D3.mp3",
        "C3": "C3.mp3",
    },
    release: 1,
    baseUrl: "samples/piano/"
}).toDestination();