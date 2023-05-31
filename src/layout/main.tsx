import Head from 'next/head';
import classNames from 'classnames';
import styles from '@/styles/shared/Layout.module.scss';
import Header from '@/shared/header';

const Layout = ({
	children,
	title = 'Jaksho',
	description = 'League of Legends Randomizer & Champion Index',
	currentRoute
}) => {
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="author" content="Ömer Cem Turan" />
				<meta name="keywords" content="League of Legends, LoL, ARAM, Random, Player, Champion, Summoner, Randomizer, RNG, Matchup, VS" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content={description} />
				<link rel="icon" href="/favicon.ico" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

			</Head>
			<div className={classNames(styles.layout)}>
				<div className="container py-5">
					<div className="border border-secondary Spiegel p-3 text-primary bg-hextec">
						<Header currentRoute={currentRoute} />
						{children}
					</div>
				</div>
			</div>
			<div className="position-fixed bottom-0 end-0 text-primary Spiegel fs-10">
				By OCT
				<br />
				Hayri Abi Corp.
			</div>
		</div>
	);
};

export default Layout;
