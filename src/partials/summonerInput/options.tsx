import { useEffect, useState } from 'react';
import Stepper from '@/shared/stepper';
import styles from '../../styles/partials/Options.module.scss';
import classNames from 'classnames';
import Button from '@/shared/button';

export const ROLES = [
	'Assassin',
	'Fighter',
	'Mage',
	'Marksman',
	'Support',
	'Tank'
]

const Options = ({ options, setOptions }) => {

	const [roles, setRoles] = useState(options.filter);

	const updateOptions = obj => {
		setOptions({ ...options, ...obj});
	}

	const toggleRole = role => {
		role.enabled = !role.enabled;
		setRoles([
			...roles
		])
		updateOptions({ filter: roles })
	}

	const enableAll = () => {
		roles.forEach(role => role.enabled = true);
		setRoles([ ...roles ]);
		updateOptions({ filter: roles })
	};

	useEffect(() => {
		setRoles(options.filter);
	}, [options.filter])

	return (
		<div className={classNames('text-center mt-5 mt-md-0', styles.options)}>
			<div>
				<span className="Spiegel fs-12 color-gold-two">{'Number of champions per summoner'}</span>
				<Stepper className="fs-24 justify-content-center" value={options?.champCount} onChange={val => updateOptions({ champCount: val })} minValue={1} maxValue={5} />
			</div>
			<div className="mt-3">
			 	<span className="Spiegel fs-12 color-gold-two ">{'Enabled champion roles'}</span>
				<div className={classNames("border border-gold-six bg-blue-six", styles.roles)}>
					{roles.map(role => (
						<div
							className={classNames('d-flex px-1 justify-content-between', styles.role)}
							onClick={() => toggleRole(role)}
						>
							<div className={classNames("d-flex align-items-center", { 'opacity-50' : !role.enabled })}>
								<div className={classNames("p-1 h-100-p", styles.icon)}>
									<img className="h-100-p" src={`./roles/${role.name}.webp`} />
								</div>
								<div className="d-flex fs-12 justify-content-center">
									{role.name}
								</div>
							</div>
							<div className={classNames('fs-12 d-flex align-items-center p-2', role.enabled ? 'text-gold-two' : 'text-grey-half')}>
								{role.enabled ? 'On' : 'Off'}
							</div>
						</div>
					))}
					<div className="d-flex p-2 justify-content-center">
						<Button className="p-1 px-2" onClick={enableAll}>
							Enable All
						</Button>
					</div>
				</div>
			</div>

		 </div>
	);
};

export default Options;
