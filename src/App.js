import React, { useEffect, useState } from 'react'
import Button from './components/Button/Button';
import SampleCard from './components/Cards/SampleCard';
import './App.css'
import Card from './components/Cards/Card';
import { fetchData } from './helpers/apiCalls';
import { isValidCache } from './helpers/helpers';
import { Link } from 'react-router-dom';

const API_HOST = process.env.REACT_APP_HOST;
const API_KEY = process.env.REACT_APP_API_KEY;
const READ_URL = (limit, order) => `${API_HOST}?apiKey=${API_KEY}&mode=read&endpoint=samples&limit=${limit}&order=${order}`

export default function App({ toneObject, toneTransport, tonePart }) {


	// Fetch all samples from API
	const [samples, setSamples] = useState([]);



	// Put all of the functions inside useEffect because we use it once
	useEffect(() => {
		const fetchSamples = async () => {
			const localStorageData = localStorage.getItem('samples');
			if (localStorageData && isValidCache(localStorageData)) {
				console.log(localStorageData)
				setSamples(JSON.parse(localStorageData).samples)
			} else {
				const data = await fetchData(READ_URL(999, 'asc'))
				console.log(data);
				setSamples(data.samples)
				localStorage.setItem("samples", JSON.stringify(data))
				console.log('from api')
			}
		}
		fetchSamples();
	}, []);

	// console.log(samples[2].recording_data)
	useEffect(() => {
		samples.map(sample => {
			console.log(sample.recording_data)
		})
	}, [])

	useEffect(() => {
		tonePart.clear();
		toneTransport.cancel();

		samples.map(sample => sample.recording_data.map((note) => {
			// console.log(Object.keys(note)[0], Object.values(note))
			Object.values(note).forEach((bars) => {
				bars.forEach((bar, index) => {
					if (bar === true) {
						tonePart.add(index / 4, `${Object.keys(note)[0].toString()}3`)
					}
				})
			})
		}))

		toneTransport.schedule(time => {
			// setPreviewing(false);
			console.log("Preview stopped automatically.");
		}, 16 / 4);


	})


	return (
		<>
			<div className='body'>
				<h1>Samples You've Created</h1>

				{/* List of Cards */}
				<div className='sample_card_list'>
					{samples?.map(sample => (
						<SampleCard key={sample.id} id={sample.id} title={sample.name} createdAt={sample.datetime} />
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
			</div>
		</>
	)
}
