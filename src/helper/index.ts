import axios from 'axios';
import { useEffect, useState } from 'react';

export const VERSION = "1.1.0"

export enum TeamOptions {
	TEAM_1 = 0,
	TEAM_2,
	RNG,
	EMPTY
}

export const TeamOptionsLabel = {
	[TeamOptions.TEAM_1]: 'Team 1',
	[TeamOptions.TEAM_2]: 'Team 2',
	[TeamOptions.RNG]: 'RNG',
	[TeamOptions.EMPTY]: 'Empty',
}

export const TEAM_OPTIONS = [
	{ label: 'Team 1', value: 0 },
	{ label: 'Team 2', value: 1 },
	{ label: 'RNG', value: 2 }
]

export const EMPTY_SUMMONER = {
	name: '',
	team: TeamOptions.EMPTY
}

export const shuffleTeam = summoners => {
	const firstTeam = [...summoners.filter(summoner => summoner.team === 0 )];
	const secondTeam = [...summoners.filter(summoner => summoner.team === 1 )];
	const randoms = [...summoners.filter(summoner => summoner.team === 2 )];

	randoms.sort(() => Math.random() - 0.5)

	randoms.forEach(summoner => {
		switch (true) {
			case firstTeam.length < secondTeam.length:
				firstTeam.push(summoner);
				break;
			case firstTeam.length > secondTeam.length:
				secondTeam.push(summoner);
				break;
			default:
				[firstTeam, secondTeam][Math.round(Math.random())].push(summoner)
				break;
		}
	});

	const maxTeamSize = Math.max(firstTeam.length, secondTeam.length);

	if (firstTeam.length < maxTeamSize) {
		[...Array(maxTeamSize - firstTeam.length)].map((_, index) => {
			firstTeam.push({ ...EMPTY_SUMMONER, name: index.toString()});	
		})
	}

	if (secondTeam.length < maxTeamSize) {
		[...Array(maxTeamSize - secondTeam.length)].map((_, index) => {
			secondTeam.push({ ...EMPTY_SUMMONER, name: index.toString()});	
		})
	}

	return [firstTeam, secondTeam];
}

export const shuffleAndSplitList = list => {
	const shuffledList = list.sort(() => Math.random() - 0.5);
	const halfLength = Math.floor(shuffledList.length / 2);
	const firstList = shuffledList.slice(0, halfLength);
	const secondList = shuffledList.slice(halfLength, shuffledList.length);

	return [firstList, secondList];
};

export const getChamps = async setCallback => {
	const VERSION_URL = 'https://ddragon.leagueoflegends.com/realms/tr.json';

	const versionPromise = await axios.get(VERSION_URL);
	const version = versionPromise.data.css;

	const CHAMP_LIST_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/championFull.json`;

	const champPromise = await axios.get(CHAMP_LIST_URL);
	const champs = champPromise.data.data;

	setCallback(Object.keys(champs).map(champ => ({
		...champs[champ],
		champ,
		icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`,
		image: `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champ}_0.jpg`,
	})));
};

export const useTimeCounter = ({
	maxCount, cancel, dependencies, delay = 350,
}) => {
	const [animationIndex, setAnimationIndex] = useState(0);

	const handleIncrease = () => {
		setTimeout(() => {
			setAnimationIndex(prev => prev + 1);
		}, delay);
	};

	useEffect(() => {
		setAnimationIndex(0);
	}, []);

	useEffect(() => {
		if (animationIndex < maxCount && !cancel) handleIncrease();
	}, [animationIndex, maxCount]);

	useEffect(() => {
		setAnimationIndex(0);
	}, [...dependencies]);

	return animationIndex;
};
