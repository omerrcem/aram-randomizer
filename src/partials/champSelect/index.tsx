import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { generateSeed, shuffleChamps, shuffleTeam } from '@/helper';
import styles from '@/styles/partials/ChampionSelect.module.scss';
import classNames from 'classnames';
import Team from './team';
import Actions from './actions';

const ChampSelect = ({ summoners, options, champs }) => {
	const router = useRouter();
	const { tseed, cseed, data } = router.query;
	const [champsSplitted, setChampsSplitted] = useState([]);
	const [summonersSplitted, setSummonersSplitted] = useState([]);
	const [champsHidden, setChampsHidden] = useState(false);
	const [teamsHidden, setTeamsHidden] = useState(false);


	const { champCount = 2, filter } = options;

	const resetSummoners = () => {
		const newChampSeed = generateSeed();
		const newTeamSeed = generateSeed();
		router.replace(`/roll?data=${data}&tseed=${newTeamSeed}&cseed=${newChampSeed}`, undefined, { shallow: true}).then(() => {
		setChampsHidden(true);
		setTeamsHidden(true);
			setTimeout(() => {
				setChampsHidden(false);
				setTeamsHidden(false);
				setChampsSplitted(shuffleChamps(champs, newChampSeed, filter));
				setSummonersSplitted(shuffleTeam(summoners, newTeamSeed));
			}, 500);
		})
	};

	const resetChamps = () => {
		const newChampSeed = generateSeed();
		setChampsHidden(true);
		router.replace(`/roll?data=${data}&tseed=${tseed}&cseed=${newChampSeed}`, undefined, { shallow: true }).then(() => {
			setTimeout(() => {
				setChampsHidden(false);
				setChampsSplitted(shuffleChamps(champs, newChampSeed, filter));
			}, 500);
		});
	};

	useEffect(() => {
		if (!cseed || !tseed) {
			const newChampSeed = generateSeed();
			const newTeamSeed = generateSeed();
			router.replace(`/roll?data=${data}&tseed=${newTeamSeed}&cseed=${newChampSeed}`);
		} else {
			setChampsSplitted(shuffleChamps(champs, cseed, filter));
			setSummonersSplitted(shuffleTeam(summoners, tseed));
		}
	}, []);
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
