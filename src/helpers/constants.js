
export const API_HOST = process.env.REACT_APP_HOST;
export const API_KEY = process.env.REACT_APP_API_KEY;
// export const READ_SAMPLES_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples&limit=${limit}&order=${order}`
// export const READ_SAMPLES_TO_LOCATIONS_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples_to_locations&limit=${limit}&order=${order}`
// export const READ_LOCATIONS_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=locations&limit=${limit}&order=${order}`
// export const SHARE_URL = (sampleID, locationID) => `${API_HOST}?apiKey=${API_KEY}&mode=create&endpoint=samples_to_locations&sampleID=${sampleID}&locationID=${locationID}`
// export const UNSHARE_URL = (relID) => `${API_HOST}?apiKey=${API_KEY}&mode=delete&endpoint=samples_to_locations&id=${relID}`
// export const CREATE_SAMPLE_URL = (sampleName, sampleType) => `${API_HOST}?apiKey=${API_KEY}&mode=create&endpoint=samples&sampleType=${sampleType}&sampleName=${sampleName}`
// export const UPDATE_SAMPLE_URL = (id, sampleName, sampleType) => `${API_HOST}?apiKey=${API_KEY}&mode=update&endpoint=samples&sampleType=${sampleType}&sampleName=${sampleName}&id=${id}`
export const READ_SAMPLES_URL = `${API_HOST}samples?mode=read`
export const READ_SAMPLES_TO_LOCATIONS_URL = `${API_HOST}samplesToLocations?mode=read`
export const READ_LOCATIONS_URL = `${API_HOST}locations?mode=read`
export const SHARE_URL = (sampleID, locationID) => `${API_HOST}samplesToLocations?mode=create&sampleID=${sampleID}&locationID=${locationID}`
export const UNSHARE_URL = (relID) => `${API_HOST}samplesToLocations?mode=delete&id=${relID}`
export const CREATE_SAMPLE_URL = (sampleName, sampleType) => `${API_HOST}samples?mode=create&sampleType=${sampleType}&sampleName=${sampleName}`
export const UPDATE_SAMPLE_URL = (id, sampleName, sampleType) => `${API_HOST}samples?mode=update&sampleType=${sampleType}&sampleName=${sampleName}&id=${id}`
