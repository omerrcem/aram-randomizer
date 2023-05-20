import { getChamps } from "@/helper";
import Layout from "@/layout/main";
import ChampionList from "@/partials/champion/championList";
import { routes } from "@/shared/header";

const Champions = ({ champs }) => {
	return (
		<Layout currentRoute={routes.CHAMPIONS}>
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
