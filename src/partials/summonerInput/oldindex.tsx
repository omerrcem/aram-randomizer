import { useChamps, shuffleAndSplitList } from '@/helper';
import { useEffect, useState } from 'react';

enum View {
    INIT,
    CHAMP
}

const MainPage = () => {
	const [champs, setChamps] = useState([]);
	const [summoners, setSummoners] = useState([]);
	const [view, setView] = useState(View.INIT);

	const onCalculateClick = (summonerList: any) => {
		setSummoners(summonerList);
		setView(View.CHAMP);
	};

	useEffect(() => {
		useChamps(setChamps);
	}, []);

	useEffect(() => {
		console.log(champs);
	}, [champs]);

	return (
		<div
			className="d-flex"
			style={{
				display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh',
			}}
		>
			{view === View.INIT
				? <NameEntry onClick={onCalculateClick} />
				: <ChampSelect summoners={summoners} champs={champs} onBack={() => setView(View.INIT)} />}
		</div>

	);
};

const NameEntry = ({ onClick }) => {
	const [text, setText] = useState('');
	return (
		<div style={{ width: '700px', border: '1px white solid', borderRadius: '5px' }}>
			<div className="fs-title disp-flex train__justify-center">
				Aram Randomizer
			</div>

			<div className="disp-flex train__justify-center" style={{ padding: 20 }}>
				<textarea
					value={text}
					onChange={(e) => setText(e?.target?.value?.replace(/\n\n/g, '\n'))}
					rows={10}
					style={{ width: '300px', fontSize: '16px' }}
					placeholder="Add summoner names up to 10"
				/>
			</div>
			<div className="disp-flex train__justify-center" style={{ paddingBottom: 20 }}>
				<button disabled={!text} onClick={() => onClick(text.trim().split('\n').slice(0, 10))}>Calculate</button>
			</div>
		</div>
	);
};

const ChampSelect = ({ summoners, champs, onBack }) => {
	const [teams, setTeams] = useState(shuffleAndSplitList(summoners));
	const [teamChamps, setTeamChamps] = useState(shuffleAndSplitList(champs));

	const onSummonerReshuffle = () => {
		setTeams(shuffleAndSplitList(summoners));
		setTeamChamps(shuffleAndSplitList(champs));
	};

	const onChampReshuffle = () => {
		setTeamChamps(shuffleAndSplitList(champs));
	};

	return (
		<div>
			<div className="disp-flex" style={{ width: 700, justifyContent: 'space-between' }}>
				<div style={{ maxWidth: 350 }}>
					<div>Team 1</div>
					<div>
						{teams[0].map((sum) => <Summoner summoner={sum} />)}
					</div>
					<div className="disp-flex" style={{ marginTop: 10, flexFlow: 'wrap' }}>
						{teamChamps[0].slice(0, teams[0].length * 2).map((item) => {
							return (
								<div>
									<img style={{ width: 60 }} src={item.icon} alt={item.champ} />
								</div>
							);
						})}
					</div>
				</div>
				<div style={{ textAlign: 'end', maxWidth: 350 }}>
					<div>Team 2</div>
					<div style={{ display: 'grid', justifyContent: 'flex-end' }}>
						{teams[1].map((sum) => <Summoner summoner={sum} />)}
					</div>
					<div className="disp-flex" style={{ justifyContent: 'flex-end', marginTop: 10, flexFlow: 'wrap' }}>
						{teamChamps[1].slice(0, teams[1].length * 2).map((item) => {
							return (
								<div>
									<img style={{ width: 60 }} src={item.icon} alt={item.champ} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="disp-flex train__justify-center" style={{ gap: 10, marginTop: 10 }}>
				<button onClick={onSummonerReshuffle}>Reshuffle teams</button>
				<button onClick={onChampReshuffle}>Reshuffle champions</button>
			</div>
			<div className="disp-flex train__justify-center" style={{ gap: 10, marginTop: 10 }}>
				<button onClick={onBack}>Back</button>
			</div>
		</div>
	);
};

const Summoner = ({ summoner }) => {
	return (
		<div style={{
			border: '1px white solid', padding: 10, marginTop: 10, width: 200,
		}}
		>
			{summoner}
		</div>
	);
};

export default MainPage;
