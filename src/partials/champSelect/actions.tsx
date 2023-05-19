import Button, { ButtonThemes } from '@/shared/button';
import Icon, { IconSize, IconType } from '@/shared/icon';
import classNames from 'classnames';
import styles from '@/styles/partials/ChampionSelect.module.scss';
import { useRouter } from 'next/router';
import clipboardy from 'clipboardy';
import { useState } from 'react';

const Actions = ({
	allSummoners, allChamps, resetSummoners, resetChamps, multiplier = 1,
}) => {
	const router = useRouter();

	const [champsRolled, setChampsRolled] = useState(1); 
	const [summonersRolled, setSummonersRolled] = useState(1);


	const rollChamps = () => {
		setChampsRolled(champsRolled + 1);
		resetChamps();
	};

	const rollSummoners = () => {
		setChampsRolled(1);
		setSummonersRolled(summonersRolled + 1);
		resetSummoners();
	};


	const handleBack = () => {
		router.push('/');
	};

	const handleCopy = () => {
		const text = [0, 1].map(teamIndex => {
			const champCount = (allSummoners?.[teamIndex]?.length || 0) * multiplier;
			return [
				allSummoners?.[teamIndex].map(summoner => summoner.name)?.join(', '),
				allChamps?.[teamIndex]?.map(c => c.champ).slice(0, champCount).join(', '),
			].join('\n');
		}).join('\n\n');
		clipboardy.write(text);
	};

	return (
		<div className={classNames('p-3 mx-auto', styles.actions)}>
			<div
				style={{ maxWidth: 300 }}
				className={classNames(
					'p-4 d-flex justify-content-center border border-grey-cool bg-grey-three',
					styles.box,
				)}
			>
				<div className="d-grid gap-2">
					<Button className="mb-5" onClick={handleBack}>
						<Icon iconType={IconType.BACK} iconSize={IconSize.SMALLER} />
						Back
					</Button>

					<Button
						className={classNames('fs-18 p-1 px-3 d-flex gap-1')}
						theme={ButtonThemes.HEXTEC}
						onClick={handleCopy}
					>
						<Icon iconType={IconType.COPY} iconSize={IconSize.SMALL} />
						Copy
					</Button>
					<Button
						className={classNames('p-1 px-3 d-block mt-5')}
						theme={ButtonThemes.HEXTEC}
						onClick={rollChamps}
					>
						<div>
							<div className="fs-16 d-flex gap-1">
								<Icon iconType={IconType.REFRESH} iconSize={IconSize.SMALLER} />
								Champs
							</div>
							<div className="fs-10">
								Rolled {champsRolled}
							</div>
						</div>
					</Button>
					<Button
						className={classNames('p-1 px-3 d-block')}
						theme={ButtonThemes.MAGIC}
						onClick={rollSummoners}
					>
						<div>
							<div className="fs-16 d-flex gap-1">
								<Icon iconType={IconType.REFRESH} iconSize={IconSize.SMALLER} />
								Teams
							</div>
							<div className="fs-10">
								Rolled {summonersRolled}
							</div>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Actions;
