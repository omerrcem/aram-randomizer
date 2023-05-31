import { getChamps } from "@/helper";
import Layout from "@/layout/main";
import ChampionList from "@/partials/champion/championList";
import { routes } from "@/shared/header";

const Champions = ({ champs }) => {
	return (
		<Layout
			title="All champions - Jaksho"
			description="Get details of all champions in League of Legends. Use them in the randomizer!"
			currentRoute={routes.CHAMPIONS}
		>
			<ChampionList champions={champs} />
		</Layout>
	)
};

Champions.getInitialProps = async () => {
	let champs;
	await getChamps(res => { champs = res });
	
	return {
		champs,
	}
};

export default Champions;
