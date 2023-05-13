import Head from 'next/head';
import classNames from 'classnames';
import styles from '@/styles/shared/Layout.module.scss';
import Image from 'next/image';
import decoratorLine from '../../public/decorators/decorator-hr-lg.png';

const Layout = ({ children }) => {
	return (
		<div>
			<Head>
				<title>LoL Aram Randomizer</title>
				<meta name="description" content="Aram randomizer By Omer Cem Turan" />
				<meta name="viewport" content="width=800px, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={classNames(styles.layout)}>
				<div className="container py-5">
					<div className="border border-secondary Spiegel p-3 text-primary bg-hextec">

						<div className="text-secondary text-center m-auto py-5" style={{ maxWidth: 600 }}>
							<h5 className="BeaufortBold">
								ARAM Randomizer
							</h5>
							<h1 className="BeaufortBold text-primary display-3">
								JAK'SHO
							</h1>
							<div className="w-100-p d-flex mt-4 justify-content-center">
								<Image src={decoratorLine} className="h-auto" style={{ width: '85%' }} alt="" />
							</div>
						</div>
						{children}
					</div>
				</div>
			</div>
			<div className="position-fixed bottom-0 end-0 text-primary Spiegel">
				By OCT
				<br />
				Hayri Abi Corp.
			</div>
		</div>
	);
};

export default Layout;
