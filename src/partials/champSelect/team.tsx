import classNames from 'classnames';
import Icon, { IconSize, IconType } from '@/shared/icon';

const Team = ({
	className, team, champs, index, multiplier = 1,
}) => {
	const right = index === 2;
	const champCount = (team?.length || 0) * multiplier;

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
			<div className={classNames('d-flex flex-wrap p-2 gap-2', { 'flex-row-reverse': right })}>
				{champs?.slice(0, champCount)?.map(champ => (
					<div className="border border-gold-six" style={{ width: 50, height: 50 }}>
						<img src={champ.icon} alt={champ.champ} className="h-100-p w-100-p" />
					</div>
				))}
			</div>
			<div className="d-flex flex-column gap-3 my-3">
				{team?.map(summoner => (
					<div className={classNames('d-flex p-2 fs-16 border-bottom border-gold-six pb-3 align-items-center gap-2', { 'flex-row-reverse': right })}>
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

export default Team;
