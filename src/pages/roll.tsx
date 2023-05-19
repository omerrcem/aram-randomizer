import { getChamps } from '@/helper';
import Layout from '@/layout/main';
import ChampSelect from '@/partials/champSelect';

const Roll = ({ summoners, options, champs }) => {
	return (
		<Layout>
			<ChampSelect summoners={summoners} options={options} champs={champs} />
		</Layout>
	);
};

Roll.getInitialProps = async ({ query }) => {
	const { data} = query;
	const parsed = JSON.parse(Buffer.from(data as string, 'base64').toString());
	let champs = [];

	await getChamps(res => { champs = res });

	return {
		summoners: parsed?.summoners,
		options: parsed?.options,
		champs
	};
}

export default Roll;
