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
	const [champs, setChamps] = useState([]);
	const [champsSplitted, setChampsSplitted] = useState([]);
	const [summonersSplitted, setSummonersSplitted] = useState([]);

	const MULTIPLIER = 2;

	const resetSummoners = () => {
		setSummonersSplitted(shuffleAndSplitList(summoners));
	};

	const resetChamps = () => {
		setChampsSplitted(shuffleAndSplitList(champs));
	};

	useEffect(() => {
		if (!data) return;
		const parsed = JSON.parse(Buffer.from(data as string, 'base64').toString());
		setSummoners(parsed);
		setSummonersSplitted(shuffleAndSplitList(parsed));
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
				multiplier={MULTIPLIER}
			/>
			<Actions
				allChamps={champsSplitted}
				allSummoners={summonersSplitted}
				resetSummoners={resetSummoners}
				resetChamps={resetChamps}
				multiplier={MULTIPLIER}
			/>
			<Team
				className={styles.team2}
				team={summonersSplitted[1]}
				champs={champsSplitted[1]}
				index={2}
				multiplier={MULTIPLIER}
			/>
		</div>
	);
};

export default ChampSelect;
