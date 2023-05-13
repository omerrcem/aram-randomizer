import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getChamps, shuffleAndSplitList } from '@/helper';
import styles from '@/styles/partials/ChampionSelect.module.scss';
import classNames from 'classnames';
import Team from './team';
import Actions from './actions';

const ChampSelect = () => {
	const router = useRouter();
	const { data } = router.query;
	const [summoners, setSummoners] = useState([]);
	const [options, setOptions] = useState({ champCount: 2 });
	const [champs, setChamps] = useState([]);
	const [champsSplitted, setChampsSplitted] = useState([]);
	const [summonersSplitted, setSummonersSplitted] = useState([]);
	const [champsHidden, setChampsHidden] = useState(false);
	const [teamsHidden, setTeamsHidden] = useState(false);

	const { champCount = 2 } = options;

	const resetSummoners = () => {
		setTeamsHidden(true);
		resetChamps();
		setTimeout(() => {
			setTeamsHidden(false);
			setSummonersSplitted(shuffleAndSplitList(summoners));
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
		if (!data) return;
		const parsed = JSON.parse(Buffer.from(data as string, 'base64').toString());
		setSummoners(parsed?.summoners);
		setOptions(parsed?.options)
		setSummonersSplitted(shuffleAndSplitList(parsed?.summoners));
		getChamps(val => {
			setChamps(val);
			setChampsSplitted(shuffleAndSplitList(val));
		});
	}, [data]);

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
