import Layout from '@/layout/main';
import Randomizer from '@/partials/summonerInput';
import { routes } from '@/shared/header';

export default function Home() {
	return (
		<Layout currentRoute={routes.RANDOMIZER}>
			<Randomizer />
		</Layout>
	);
}
