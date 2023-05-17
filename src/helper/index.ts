import axios from 'axios';
import { useEffect, useState } from 'react';

export const VERSION = "1.0.0"

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

	const CHAMP_LIST_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/tr_TR/champion.json`;

	const champPromise = await axios.get(CHAMP_LIST_URL);
	const champs = champPromise.data.data;

	setCallback(Object.keys(champs).map(champ => ({ champ, icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ}.png` })));
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
