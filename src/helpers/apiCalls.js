import { addTimestamp } from "./helpers";

export const fetchData = async (url) => {
    return fetch(url)
        .then(res => res.json())
        .then(res => {
            const dataWithTimestamp = addTimestamp(res)
            console.log('fetchData', dataWithTimestamp)
            return dataWithTimestamp;
        })
        .catch(error => {
            // TODO: Error Handling
            console.log(error)
            throw Error("No data")
        });
}