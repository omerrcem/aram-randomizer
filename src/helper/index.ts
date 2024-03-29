import axios from 'axios';
import { useEffect, useState } from 'react';
import { PRNG } from './prng';

export const VERSION = "1.1.0"

export const MAGIC_BACKGROUND = 'https://assets.contentstack.io/v3/assets/blt2ac872571a60ee02/blt7a72b1686eb3219a/618d75137ae6ce6fab413b1f/background-video-d-02.mp4';

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


export const generateSeed = () => {
	return Math.floor(Math.random() * 10000)
};

export const shuffleTeam = (summoners, seed) => {
	const prng = new PRNG(seed); 
	const firstTeam = [...summoners.filter(summoner => summoner.team === 0 )];
	const secondTeam = [...summoners.filter(summoner => summoner.team === 1 )];
	const randoms = [...summoners.filter(summoner => summoner.team === 2 )];

	randoms.sort(() => prng.next() - 0.5)

	randoms.forEach(summoner => {
		switch (true) {
			case firstTeam.length < secondTeam.length:
				firstTeam.push(summoner);
				break;
			case firstTeam.length > secondTeam.length:
				secondTeam.push(summoner);
				break;
			default:
				[firstTeam, secondTeam][Math.round(prng.next())].push(summoner)
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

export const shuffleChamps = (list, seed, roleFilter) => {
	const prng = new PRNG(seed);
	const listCopy = [...list];
	const filteredChampions = listCopy.filter(champ => {
		return roleFilter.filter(role => {
			return role.enabled && champ.tags.includes(role.name);
		}).length > 0;
	})
	const shuffledList = filteredChampions.sort(() => prng.next() - 0.5);
	const halfLength = Math.floor(shuffledList.length / 2);
	const firstList = shuffledList.slice(0, halfLength);
	const secondList = shuffledList.slice(halfLength, shuffledList.length);
	return [firstList, secondList];
};

export const getChamps = async (setCallback, full = false) => {
	const VERSION_URL = 'https://ddragon.leagueoflegends.com/realms/tr.json';

	const versionPromise = await axios.get(VERSION_URL);
	const version = versionPromise.data.css;

	const CHAMP_LIST_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion${full ? 'Full' : ''}.json`;

	const champPromise = await axios.get(CHAMP_LIST_URL);
	const champs = champPromise.data.data;

	setCallback(Object.keys(champs).map(champ => ({
		...champs[champ],
		champ,
		icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png`,
		image: `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${getChampImageName(champ)}_0.jpg`,
		loadImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${getChampImageName(champ)}_0.jpg`,
		fullImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${getChampImageName(champ)}_0.jpg`
	})));
};

export const getChamp = async (name, setCallback) => {
	const VERSION_URL = 'https://ddragon.leagueoflegends.com/realms/tr.json';

	const versionPromise = await axios.get(VERSION_URL);
	const version = versionPromise.data.css;

	const CHAMP_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${name}.json`;
	const champPromise = await axios.get(CHAMP_URL);
	const champ = champPromise.data.data[name];

	setCallback({
		...champ,
		version,
		icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`,
		image: `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${getChampImageName(champ.id)}_0.jpg`,
		loadImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${getChampImageName(champ.id)}_0.jpg`,
		fullImage: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${getChampImageName(champ.id)}_0.jpg`
	});
};

export const getChampImageName = champ => {
	if (champ === 'Fiddlesticks') return 'FiddleSticks';
	return champ;
}

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
