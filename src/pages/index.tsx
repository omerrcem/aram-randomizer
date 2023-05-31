import Layout from '@/layout/main';
import Randomizer from '@/partials/summonerInput';
import { routes } from '@/shared/header';

export default function Home() {
	return (
		<Layout
			title="Randomizer - Jaksho"
			description="Jaksho, randomizer and index tool for League of Legends. Get champion details, roles and skills. Build up your team along with your friends and randomize teams & champions."
			currentRoute={routes.RANDOMIZER}>
			<Randomizer />
		</Layout>
	);
}
