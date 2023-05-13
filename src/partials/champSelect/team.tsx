import classNames from 'classnames';
import Icon, { IconSize, IconType } from '@/shared/icon';
import styles from '@/styles/partials/ChampionSelect.module.scss';
import { useTimeCounter } from '@/helper';

const Team = ({
	className, team, champs, index, multiplier = 1, champsHidden, teamsHidden,
}) => {
	const right = index === 2;
	const champCount = (team?.length || 0) * multiplier;
	const animationIndex = useTimeCounter({
		maxCount: team?.length,
		cancel: teamsHidden && team?.length === 0,
		dependencies: [team],
		delay: 700,
	});

	return (
		<div className={className}>
			<div className={classNames('d-flex ', { 'justify-content-end text-right': right })}>
				<div
					className={classNames(
						'fs-16 w-100-p border-bottom border-gold-six d-flex',
						{ 'justify-content-end text-right': right },
					)}
				>
					{`Team ${index}`}
				</div>
			</div>
			<Champs
				team={team}
				champs={champs}
				champCount={champCount}
				right={right}
				hide={champsHidden || teamsHidden}
			/>
			<div className="d-flex flex-column gap-3 my-3">
				{team?.slice(0, animationIndex).map(summoner => (
					<div className={classNames(
						'd-flex p-2 fs-18 border-bottom border-gold-six pb-3 align-items-center gap-3',
						{ 'flex-row-reverse': right },
						teamsHidden && styles.hidden,
						styles.summoner,
					)}
					>
						<div
							className="d-flex rounded-circle border-secondary bg-grey-cool border justify-content-center align-items-center"
							style={{ height: 45, width: 45 }}
						>
							<Icon iconType={IconType.CHAMP} iconSize={IconSize.SMALLER} />
						</div>
						{summoner}
					</div>
				))}
			</div>
		</div>
	);
};

const Champs = ({
	team, champs, champCount, right, hide = false,
}) => {
	const animationIndex = useTimeCounter({
		maxCount: champCount,
		cancel: hide || champs?.length === 0,
		dependencies: [team, champs],
	});

	return (
		<div
			className={classNames(
				'd-flex flex-wrap p-2 gap-2 w-100-p',
				{ 'flex-row-reverse': right },
				styles.champion,
				hide && styles.hidden,
			)}
			style={{ minHeight: 70 }}
		>
			{champs?.slice(0, champCount)?.slice(0, animationIndex).map(champ => (
				<div
					className={classNames(
						'border border-gold-six',
						styles.champion,
						hide && styles.hidden,
					)}
					style={{ width: 50, height: 50 }}
				>
					<img src={champ.icon} alt={champ.champ} className="h-100-p w-100-p" />
				</div>
			))}
		</div>
	);
};

export default Team;
