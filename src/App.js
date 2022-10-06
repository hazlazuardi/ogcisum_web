import React, { useEffect, useState } from 'react'
import Button from './components/Button/Button';
import SampleCard from './components/Cards/SampleCard';
import './App.css'
import Card from './components/Cards/Card';
import { fetchData, fetchSamplesToLocations } from './helpers/apiCalls';
import { isValidCache } from './helpers/helpers';
import { Link } from 'react-router-dom';

const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const READ_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples&limit=${limit}&order=${order}`

export default function App(props) {


	const [samples, setSamples] = useState([]);
	useEffect(() => {
		const fetchSamples = async () => {
			const localStorageData = localStorage.getItem('samples');
			if (localStorageData && isValidCache(localStorageData)) {
				console.log(localStorageData)
				setSamples(JSON.parse(localStorageData).samples)
			} else {
				const data = await fetchData(READ_URL(999, 'asc'))
				setSamples(data.samples)
				localStorage.setItem("samples", JSON.stringify(data))
				console.log('from api')
			}
		}
		fetchSamples();
	}, []);

	const [samplesToLocations, setSamplesToLocations] = useState([])
	useEffect(() => {
		fetchSamplesToLocations(setSamplesToLocations)
	}, [])
	console.log('samplesToLocations', samplesToLocations)

	const [sampleIDs, setSampleIDs] = useState([])
	useEffect(() => {
		setSampleIDs(samplesToLocations?.map(location => location.samples_id))
		localStorage.setItem("relIDs", samplesToLocations?.map(location => location.id))
	}, [samplesToLocations])

	console.log('sampleIDs', sampleIDs)



	return (
		<>
			<div className='body'>
				<>
					<h1>Samples You've Created</h1>

					{/* List of Cards */}
					<div className='sample_card_list'>
						{samples?.map(sample => (
							<SampleCard key={sample.id} {...sample} sampleIDs={sampleIDs} {...props} />
						))}



						{/* Create Sample Button */}
						<Card>
							<div className={`create_sample_card`}>
								<Link to={'/create'}>
									<Button variant='contained'>Create Sample</Button>
								</Link>
							</div>
						</Card>
					</div>
				</>
			</div>
		</>
	)
}
