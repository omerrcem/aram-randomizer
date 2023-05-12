import axios from 'axios';

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
