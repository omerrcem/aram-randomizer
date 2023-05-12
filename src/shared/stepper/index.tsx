import { useState } from 'react';

const Stepper = ({ onChange = () => {}, minValue = 0, maxValue = 99 }) => {
	const [value, setValue] = useState(1);

	const handleClick = (diff) => {
		if (value + diff < minValue || value + diff > maxValue) return;
		setValue(value + diff);
		onChange(value + diff);
	};

	return (
		<div className="d-flex">
			<div onClick={() => handleClick(-1)}>
				-
			</div>
			<div>
				{value}
			</div>
			<div onClick={() => handleClick(1)}>
				+
			</div>
		</div>
	);
};

export default Stepper;
