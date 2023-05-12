import { useState } from 'react';
import Input from '@/shared/input';
import Button from '@/shared/button';
import Icon, { IconSize, IconType } from '@/shared/icon';
import styles from '@/styles/partials/RandomizerInput.module.scss';
import classNames from 'classnames';

const RandomizerInput = ({ summoners = [], setSummoners }) => {
	const [text, setText] = useState('');

	const summonerAddDisabled = summoners?.length > 9;

	const onTextChange = (value) => {
		setText(value);
	};

	const onEnter = () => {
		const trimmed = text?.trim();
		if (trimmed && !summoners.includes(trimmed) && !summonerAddDisabled) {
			setSummoners([trimmed, ...summoners]);
		}
		setText('');
	};

	const onRemove = (index) => {
		summoners.splice(index, 1);
		setSummoners([...summoners]);
	};

	return (
		<div className={classNames(styles.randomizerInput)}>
			<div className="d-flex gap-2 mt-2">
				<Input placeholder="Type summoner name" onChange={onTextChange} onEnter={onEnter} value={text} maxLength={16} />
				<Button className="justify-content-center" onClick={onEnter} disabled={summonerAddDisabled}>Add</Button>
			</div>
			<div>
				{summoners.map((summoner, index) => (
					<div
						style={{ justifyContent: 'space-between' }}
						className="user-select-none p-2 my-1 align-items-center d-flex border-bottom border-secondary"
						key={summoner}
					>
						{summoner}
						<Icon
							type={IconType.CANCEL}
							onClick={() => onRemove(index)}
							iconSize={IconSize.SMALL}
							clickable
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default RandomizerInput;
