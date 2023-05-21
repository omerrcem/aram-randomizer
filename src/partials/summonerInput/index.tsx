import { useState } from 'react';
import RandomizerInput from './randomizerInput';
import Roll from './roll';
import Options from './options';
import { MAGIC_BACKGROUND } from '@/helper';

const Randomizer = () => {
	const [summoners, setSummoners] = useState([]);
	const [options, setOptions] = useState({ champCount: 2 })
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
