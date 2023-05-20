import Head from 'next/head';
import classNames from 'classnames';
import styles from '@/styles/shared/Layout.module.scss';
import Icon, { IconSize, IconType, IconVariant } from '@/shared/icon';
import Header from '@/shared/header';

const Layout = ({ children, currentRoute }) => {
	return (
		<div>
			<Head>
				<title>Randomizer - Jaksho</title>
				<meta name="author" content="Ömer Cem Turan" />
				<meta name="keywords" content="League of Legends, LoL, ARAM, Random, Player, Champion, Summoner, Randomizer, RNG, Matchup, VS" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="Get ready for unpredictable battles with Jak'Sho, ARAM Randomizer 
          for League of Legends. Embrance the power of RNG and matchup with your friends for a thrilling game." />
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
