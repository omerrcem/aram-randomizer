import classNames from 'classnames';
import Icon, { IconSize, IconType } from '@/shared/icon';
import styles from '@/styles/partials/ChampionSelect.module.scss';
import { TeamOptions, TeamOptionsLabel, useTimeCounter } from '@/helper';
import Modal from '@/shared/modal';
import { useEffect, useRef, useState } from 'react';
import Button from '@/shared/button';

const Team = ({
	className,
	team,
	champs,
	index,
	multiplier = 1,
	champsHidden,
	teamsHidden,
	options
}) => {
	const right = index === 2;
	const champCount = (team?.length || 0) * multiplier;

	const [roll, setRoll] = useState(0);

	useEffect(() => {
		setRoll(roll + 1);
	}, [team])


	return (
		<div className={className}>
			<div className={classNames('d-flex ', { 'justify-content-end text-right': right })}>
				<div
					className={classNames(
						'fs-16 w-100-p border-bottom border-gold-six d-flex',
						{ 'justify-content-end text-right': right },
					)}>
					{`Team ${index}`}
				</div>
			</div>
			<div>
				<div className={classNames('d-flex p-2 gap-1', { 'flex-row-reverse': right })}>
					{options.filter.map(role => {
						return (
							<div className={classNames({ 'opacity-25' : !role.enabled})}>
								<img style={{ height: 20 }} src={`../roles/${role.name}.webp`} alt={role.name} />
							</div>
						)
					})}
				</div>
			</div>
			<Champs
				champs={champs}
				champCount={champCount}
				right={right}
				hide={champsHidden || teamsHidden}
			/>
			<div className={classNames("d-flex flex-column gap-3 my-3",
				styles.summoners,
				teamsHidden && styles.hidden,
				)}>
				{team?.map(summoner => (
					<div className={classNames(
						'd-flex p-2 fs-14 border-bottom border-grey-half pb-3 align-items-center gap-3',
						{ 'flex-row-reverse': right },
						styles.summoner,
					)}
					key={summoner.name + roll}
					>
						<div
							className={classNames(
								"d-flex rounded-circle border-secondary bg-grey-cool border justify-content-center align-items-center",
								{'opacity-25': summoner.team === TeamOptions.EMPTY}
								)}
							style={{ height: 35, width: 35 }}
						>
							<Icon iconType={IconType.CHAMP} iconSize={IconSize.SMALLER} />
						</div>
						{summoner.team !== TeamOptions.EMPTY && summoner.name}
						<div className={classNames(
							"Spiegel fs-10",
							{'opacity-25': summoner.team === TeamOptions.EMPTY},
							![TeamOptions.RNG, TeamOptions.EMPTY].includes(summoner.team) ? 'text-secondary' : 'text-grey-one'
							)}>
							{TeamOptionsLabel[summoner.team]}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const Champs = ({
	champs, champCount, right, hide = false,
}) => {

	const [roll, setRoll] = useState(0);

	useEffect(() => {
		setRoll(roll + 1);
	}, [champs])

	return (
		<div
			className={classNames(
				'd-flex flex-wrap p-2 gap-2 w-100-p',
				{ 'flex-row-reverse': right },
				styles.champions,
				hide && styles.hidden,
			)}
			style={{ minHeight: 70 }}
		>
			{champs?.slice(0, champCount)?.map(champ => 
					<Champ key={champ.name + roll} hide={hide} champ={champ} />
			)}
		</div>
	);
};


const Champ = ({ hide, champ }) => {
	const [preview, setPreview] = useState(false);

	return (
		<>
			<div
				className={classNames(
					'border border-gold-six',
					styles.champion,
					hide && styles.hidden,
				)}
				style={{ width: 50, height: 50 }}
				onClick={() => setPreview(true)}
				>
				<div className={classNames(styles.name, 'shadow-lg')}>
					{champ.name}
				</div>
				<img src={champ.icon} alt={champ.champ} className="h-100-p w-100-p" />
			</div>
			{preview && <ChampPreview champ={champ} onClose={() => setPreview(false)} />}
		</>
	)
};

const ChampPreview = ({ champ, onClose }) => {
	const imageRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (!imageRef.current) return;
		imageRef.current.onerror = () => {
			imageRef?.current?.classList.toggle('d-none');
		};
	}, []);

	return (
		<Modal style={{ maxWidth: 800 }} onClose={onClose}>
			<div className="row p-2">
				<div className="col-sm-6">
					<div className="w-100-p d-flex justify-content-center bg-blue-seven ratio ratio-1x1">
						<img ref={imageRef} src={champ.image} style={{ height: 'auto'}} className="w-100-p" loading='lazy' />
					</div>
				</div>
				<div className="col-sm-6 mt-3 mt-sm-0">
					<div className="d-flex">
						<div className="align-items-center d-flex px-2">
							<img src={`./roles/${champ.tags[0]}.webp`} style={{ height: 50 }} />
						</div>
						<div>
							<div className="BeaufortBold fs-20">{champ.name}</div>
							<div className="BeaufortBold fs-14 text-grey-one">{champ.title}</div>
						</div>
					</div>
					<div className="Spiegel fs-12 text-grey-one p-2 mt-2">
						{champ.blurb}
					</div>
					<div className="d-flex justify-content-center">
						<Button className="px-3 py-2" onClick={onClose}>
							Back
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
};

export default Team;
