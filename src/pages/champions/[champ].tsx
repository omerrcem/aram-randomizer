import { getChamp } from "@/helper";
import Layout from "@/layout/main";
import { routes } from "@/shared/header";
import styles from '../../styles/partials/ChampionDetail.module.scss';
import classNames from "classnames";
import Link from "next/link";
import Button, { ButtonThemes } from "@/shared/button";
import Icon, { IconSize, IconType } from "@/shared/icon";

const ChampionDetail = ({ champ }) => {
	console.log(champ);
	return (
		<Layout currentRoute={routes.CHAMPIONS}>
			<div className="px-3 pb-3">
				<Link style={{ textDecoration: 'none' }} href={routes.CHAMPIONS.path} >
					<Button theme={ButtonThemes.FLAT} className="fs-14 p-1 px-2">
						<Icon className="me-1" iconType={IconType.BACK} iconSize={IconSize.TINY} />
						Back
					</Button>
				</Link>
			</div>
			<div className={classNames(styles.championDetail)}>
				<div style={{ 
					backgroundImage: 
					`linear-gradient(90deg, #010A13 0%, rgba(255,0,0,0) 10%, rgba(255,25,10,0) 90%, #010A13 100%),
					linear-gradient(180deg, #010A13 0%, rgba(255,0,0,0) 10%, rgba(255,25,10,0) 90%, #010A13 100%),
					url(${champ.fullImage})`
				}}
				className={classNames(styles.image)}
				>
					<div className={classNames(styles.titleBox)}>
						<div className={classNames(styles.title, 'BeaufortBold fs-48')}>
							{champ.name}
						</div>
						<div className={classNames(styles.subtitle, 'BeaufortBold fs-24 text-secondary')}>
							{champ.title}
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-6 col p-4">
						<span className="BeaufortBold text-primary border-bottom border-secondary pe-3 pb-1">
							Lore
						</span>
						<div className="Spiegel fs-12 text-grey-one mt-3">
							{champ.lore}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
};

ChampionDetail.getInitialProps = async ({ query }) => {
	const name = query.champ;
	let champ;
	await getChamp(name, res => { champ = res });

	return {
		champ
	}
};

export default ChampionDetail;
