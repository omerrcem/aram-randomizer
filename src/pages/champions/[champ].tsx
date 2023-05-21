import { getChamp } from "@/helper";
import Layout from "@/layout/main";
import { routes } from "@/shared/header";
import styles from '../../styles/partials/ChampionDetail.module.scss';
import classNames from "classnames";
import Button, { ButtonThemes } from "@/shared/button";
import Icon, { IconSize, IconType } from "@/shared/icon";
import { useRouter } from "next/router";
import { useState } from "react";

const ChampionDetail = ({ champ }) => {
	const router = useRouter();
	console.log(champ);
	return (
		<Layout currentRoute={routes.CHAMPIONS}>
			<div className="px-3 pb-3">
				<Button onClick={() => router.back()} theme={ButtonThemes.FLAT} className="fs-14 p-1 px-2">
					<Icon className="me-1" iconType={IconType.BACK} iconSize={IconSize.TINY} />
					Back
				</Button>
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
					<div className="col-sm-6 col-12 p-4">
						<span className="BeaufortBold text-primary border-bottom border-secondary pe-3 pb-1">
							Lore
						</span>
						<div className="Spiegel fs-12 text-grey-one mt-3">
							{champ.lore}
						</div>
					</div>

					<div className="col-sm-6 col-12 p-4">
						<span className="BeaufortBold text-primary border-bottom border-secondary pe-3 pb-1">
							Skills
						</span>
						<Skills champ={champ} />
					</div>
				</div>
			</div>
		</Layout>
	)
};


const Skills = ({ champ }) => {
	const [activeSkillIndex, setActiveSkillIndex] = useState(0);

	const activeSkill =  [champ.passive, ...champ.spells][activeSkillIndex];
	const spellButtons = ['Passive', 'Q', 'W', 'E', 'R']

	return	(

		<div className={classNames(styles.skills)}>
			<div className={classNames("d-flex gap-2 mt-3 justify-content-center")}>
			<div
				className={classNames(styles.skill, 'me-md-4 me-2 w-100-p ratio ratio-1x1')}
				data-selected={activeSkillIndex === 0}
				onClick={() => setActiveSkillIndex(0)}>
				<img
					className="w-100-p"
					src={`https://ddragon.leagueoflegends.com/cdn/${champ.version}/img/passive/${champ.passive.image.full}`} />
			</div>
			{champ.spells.map((spell, index) => {
				return (
					<div
						className={classNames(styles.skill, 'w-100-p ratio ratio-1x1')}
						data-selected={activeSkillIndex === index + 1}
						onClick={() => setActiveSkillIndex(index + 1)}
					>
						<img className="w-100-p" src={`https://ddragon.leagueoflegends.com/cdn/${champ.version}/img/spell/${spell.image.full}`} />
					</div>
				);
			})}

		</div>
			<div className={classNames(styles.description, 'fs-12 text-grey-one p-2')}>
				<div className="BeaufortBold fs-14 text-primary my-2">
					<span className="text-secondary">
						{spellButtons[activeSkillIndex]}
						{' - '}
					</span>
					{activeSkill.name}
				</div>
				<div dangerouslySetInnerHTML={{ __html: activeSkill.description }}></div>
			</div>
		</div>
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
