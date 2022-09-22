import { addTimestamp } from "./helpers";

export const fetchData = async (url) => {
    const response = await fetch(url);
    const json = await response.json()
    const dataWithTimestamp = addTimestamp(json)
    console.log('apiCalls: ', dataWithTimestamp)
    return dataWithTimestamp;
}