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

export default function App() {


	// Fetch all samples from API
	const [samples, setSamples] = useState([]);



	// Put all of the functions inside useEffect because we use it once
	useEffect(() => {
		const fetchSamples = async () => {
			const localStorageData = JSON.parse(localStorage.getItem('samples'));
			if (isValidCache(localStorageData)) {
				setSamples(localStorageData.samples)
			} else {
				const data = await fetchData(READ_URL(1, 'asc'))
				setSamples(data.samples)
				localStorage.setItem("samples", JSON.stringify(data))
				console.log('from api')
			}
		}
		fetchSamples();
	}, []);



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
					<Link to={'/create'}>
						<Card>
							<div className={`create_sample_card`}>
								<Button variant='contained'>Create Sample</Button>
							</div>
						</Card>
					</Link>
				</div>
			</div>
		</>
	)
}
