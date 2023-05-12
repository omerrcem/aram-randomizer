import { useState } from 'react';
import RandomizerInput from './randomizerInput';
import Roll from './roll';

const Randomizer = () => {
	const [summoners, setSummoners] = useState([]);
	return (
		<div className="p-3 d-flex flex-column gap-3">
			<div className="d-flex  justify-content-center col-sm">
				<div className="BeaufortBold fs-28 text-center">
					{`${summoners.length} Summoners Added`}
					<Roll summoners={summoners} setSummoners={setSummoners} />
				</div>
			</div>
			<div className="d-flex justify-content-center col-sm">
				<RandomizerInput summoners={summoners} setSummoners={setSummoners} />
			</div>
		</div>
	);
};

export default Randomizer;
