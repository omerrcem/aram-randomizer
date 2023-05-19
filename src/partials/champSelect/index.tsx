import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getChamps, shuffleAndSplitList, shuffleTeam } from '@/helper';
import styles from '@/styles/partials/ChampionSelect.module.scss';
import classNames from 'classnames';
import Team from './team';
import Actions from './actions';

const ChampSelect = ({ summoners, options, champs }) => {
	const [champsSplitted, setChampsSplitted] = useState(shuffleAndSplitList(champs));
	const [summonersSplitted, setSummonersSplitted] = useState([]);
	const [champsHidden, setChampsHidden] = useState(false);
	const [teamsHidden, setTeamsHidden] = useState(false);

	const { champCount = 2 } = options;

	const resetSummoners = () => {
		setTeamsHidden(true);
		resetChamps();
		setTimeout(() => {
			setTeamsHidden(false);
			setSummonersSplitted(shuffleTeam(summoners));
		}, 500);
	};

	const resetChamps = () => {
		setChampsHidden(true);
		setTimeout(() => {
			setChampsHidden(false);
			setChampsSplitted(shuffleAndSplitList(champs));
		}, 500);
	};

	useEffect(() => {
		setSummonersSplitted(shuffleTeam(summoners));
	}, [summoners]);

	return (
		<div className={classNames('p-3 pos-rel', styles.championSelect)} style={{ minHeight: 600 }}>
			<Team
				className={styles.team1}
				team={summonersSplitted[0]}
				champs={champsSplitted[0]}
				index={1}
				multiplier={champCount}
				champsHidden={champsHidden}
				teamsHidden={teamsHidden}
			/>
			<Actions
				allChamps={champsSplitted}
				allSummoners={summonersSplitted}
				resetSummoners={resetSummoners}
				resetChamps={resetChamps}
				multiplier={champCount}
			/>
			<Team
				className={styles.team2}
				team={summonersSplitted[1]}
				champs={champsSplitted[1]}
				index={2}
				multiplier={champCount}
				champsHidden={champsHidden}
				teamsHidden={teamsHidden}
			/>
		</div>
	);
};

export default ChampSelect;
