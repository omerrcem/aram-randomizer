import { useEffect, useState } from "react";
import Button, { ButtonThemes } from "../button";
import Icon, { IconType } from "../icon";
import classNames from "classnames";

const Stepper = ({ value = 1, className = '',
	 minValue = 0, maxValue = 99, label = '', onChange = null }) => {
	const [step, setStep] = useState(value || 1);

	const onClick = diff => {
		if (step + diff >= minValue && step + diff <= maxValue) {
			setStep(step + diff);
			onChange && onChange(step + diff);
		}
	};

	useEffect(() => {
		setStep(value);
	}, [value]);

	return (
		<div className={classNames('d-flex', className)} style={{ height: 40 }}>
			<Button theme={ButtonThemes.PRIMARY} onClick={() => onClick(-1)}>
				<Icon iconType={IconType.MINUS} />
			</Button>
			<div className="d-flex align-items-center justify-content-center border border-gold-seven h-100-p" style={{ minWidth: '45px' }}>
				{step}
			</div>
			<Button theme={ButtonThemes.PRIMARY} onClick={() => onClick(1)}>
				<Icon iconType={IconType.PLUS} className="color-secondary" />
			</Button>
		</ div>
	);
};

export default Stepper;
