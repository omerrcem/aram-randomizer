import { useState } from 'react';
import RandomizerInput from './randomizerInput';
import Roll from './roll';
import Options from './options';

const Randomizer = () => {
	const [summoners, setSummoners] = useState([]);
	const [options, setOptions] = useState({ champCount: 2 })
	return (
		<div className="p-3 d-flex row">
			<div className="d-flex  justify-content-center col-md-5 col-12">
				<div className="BeaufortBold fs-28 text-center">
					{`${summoners.length} Summoners Added`}
					<Roll summoners={summoners} setSummoners={setSummoners} options={options} setOptions={setOptions}/>
					<Options options={options} setOptions={setOptions} />
				</div>
			</div>
			<div className="d-flex justify-content-center col-md-7 w-100-p col-12">
				<RandomizerInput summoners={summoners} setSummoners={setSummoners} />
			</div>
		</div>
	);
};

export default Randomizer;
