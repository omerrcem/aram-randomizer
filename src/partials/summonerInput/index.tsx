import { useState } from 'react';
import RandomizerInput from './randomizerInput';
import Roll from './roll';
import Options, { ROLES } from './options';

const Randomizer = () => {
	const [summoners, setSummoners] = useState([]);
	const [options, setOptions] = useState({ 
		champCount: 2,
		filter: ROLES.map(role => ({ name: role, enabled: true}))
	 })

	return (
		<>
			<div className="p-3 d-flex BeaufortBold fs-24 justify-content-center">
				<div className="position-relative">
					<div style={{ zIndex: 2 }}>
						{`${summoners.length} Summoners Added`}
					</div>
					<Roll summoners={summoners} setSummoners={setSummoners} options={options} setOptions={setOptions} />
				</div>
			</div>
			<div className="p-3 d-flex row">
				<div className="col-md-7 w-100-p col-12">
					<RandomizerInput summoners={summoners} setSummoners={setSummoners} />
				</div>
				<div className="d-flex  justify-content-center col-md-5 col-12">
					<div>
						<Options options={options} setOptions={setOptions} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Randomizer;
