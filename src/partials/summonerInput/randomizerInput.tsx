import { useState } from 'react';
import Input from '@/shared/input';
import Button from '@/shared/button';
import Icon, { IconSize, IconType } from '@/shared/icon';
import styles from '@/styles/partials/RandomizerInput.module.scss';
import classNames from 'classnames';
import Select, { SelectSizes } from '@/shared/select';

const RandomizerInput = ({ summoners = [], setSummoners }) => {
	const [text, setText] = useState('');

	const summonerAddDisabled = summoners?.length > 9;

	const teamOptions = [
		{ label: 'Team 1', value: 0 },
		{ label: 'Team 2', value: 1 },
		{ label: 'RNG', value: 2 }
	]

	const getTeamOptions = () => {
		return teamOptions.map(team => ({
			...team,
			disabled:  team.value !== 2 && summoners?.filter(summoner => summoner.team === team.value)?.length === 5
		}))
	};

	const onTextChange = (value) => {
		setText(value);
	};

	const onEnter = () => {
		const trimmed = text?.trim();
		if (trimmed && !summoners.includes(trimmed) && !summonerAddDisabled) {
			setSummoners([{ name: trimmed, team: 2 }, ...summoners]);
		}
		setText('');
	};

	const changeTeam = (team, summoner) => {
		console.log(team);
		summoner.team = team.value;
		setSummoners([...summoners]);
	}

	const onRemove = (index) => {
		summoners.splice(index, 1);
		setSummoners([...summoners]);
	};

	return (
		<div className={classNames(styles.randomizerInput, 'w-100-p px-3 mt-4 mt-md-0')}>
			<div className="d-flex gap-2 mt-2">
				<Input placeholder="Type summoner name" onChange={onTextChange} onEnter={onEnter} value={text} maxLength={16} />
				<Button style={{ width: 80 }} className="justify-content-center" onClick={onEnter} disabled={summonerAddDisabled}>Add</Button>
			</div>
			<div>
				{summoners.map((summoner, index) => (
					<div className={`w-100-p align-items-center border-bottom border-grey-half my-2 ${styles.summoner}`}>
						<div
							style={{ justifyContent: 'space-between', fontFamily: 'Spiegel' }}
							className={
								classNames("user-select-none text-grey-one p-2 my-1 align-items-center", styles.name)
							}
							key={summoner.name}
							>
							{summoner.name}
							
		
						</div>
						<div className="h-100-p d-flex align-items-center">
							<Select
								value={summoner.team}
								className="w-100-p fs-12"
								onChange={val => changeTeam(val, summoner)}
								size={SelectSizes.SMALL}
								options={getTeamOptions()}
							/>
						</div>
						<div className="d-flex justify-content-center">
							<Button
								style={{ height: 35 }}
								className="h-100-p w-100-p"
								onClick={() => onRemove(index)}
							>
								<Icon
									type={IconType.CANCEL}
									iconSize={IconSize.SMALL}
								/>
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RandomizerInput;
