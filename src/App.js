import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { fetchSamples, fetchSamplesToLocations } from './helpers/apiCalls';

import Button from './Components/Shared/Button';
import SampleCard from './Components/Cards/SampleCard';
import './App.css'
import Card from './Components/Cards/Card';


export default function App(props) {


	const [samples, setSamples] = useState([]);
	useEffect(() => {
		fetchSamples(setSamples);
	}, []);

	const [samplesToLocations, setSamplesToLocations] = useState([])
	useEffect(() => {
		fetchSamplesToLocations(setSamplesToLocations)
	}, [])
	

	const [sampleIDs, setSampleIDs] = useState([])
	useEffect(() => {
		setSampleIDs(samplesToLocations?.map(location => location.sample_id))
		localStorage.setItem("relIDs", samplesToLocations?.map(location => location.id))
	}, [samplesToLocations])

	



	return (
		<>
			<div className='body'>
				<h1>Samples You've Created</h1>

				<div className='sample_card_list'>

					{samples?.map(sample => (
						<SampleCard key={sample.id} {...sample} sampleIDs={sampleIDs} {...props} />
					))}

					<Card variant='translucent'>
						<div className='create_sample_card'>
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
