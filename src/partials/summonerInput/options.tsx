import Stepper from '@/shared/stepper';

const Options = ({ options, setOptions }) => {

	const updateOptions = obj => {
		setOptions({ ...options, ...obj});
	}

	return (
		<div className='text-center mt-3'>
			 <span className="Spiegel fs-12 color-gold-two">{'Number of champions per summoner'}</span>
			<Stepper className="justify-content-center" value={options.champCount} onChange={val => updateOptions({ champCount: val })} minValue={1} maxValue={5} />
		 </div>
	);
};

export default Options;
