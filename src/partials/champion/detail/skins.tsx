import { getChampImageName } from "@/helper";
import { useEffect, useState } from "react";
import styles from '../../../styles/partials/ChampionSkins.module.scss';
import classNames from "classnames";
import { useScrollContainer } from 'react-indiana-drag-scroll'
import Modal from "@/shared/modal";
import Icon, { IconType } from "@/shared/icon";

const Skins = ({ champData }) => {
	const [skinId, setSkinId] = useState(null);
	const scrollContainer = useScrollContainer();
	const images = champData?.skins?.filter(skin => skin.num !== 0).map(skin => ({
		image: `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${getChampImageName(champData.id)}_${skin.num}.jpg`,
		num: skin.num,
		name: skin.name,
	}))

	useEffect(() => {
		console.log(champData);
	}, []);
	return (
		<div className={classNames(styles.championSkinsWrapper, 'p-4')}>
			<span className="BeaufortBold text-primary border-bottom border-secondary pe-3 pb-1">
				Skins 
				<span className="fs-11 px-2 text-gold-three">
					{`(${images.length})`}
				</span>
			</span>
			{skinId && <>
				<Modal style={{ maxWidth: 1200 }} space={2} onClose={() => setSkinId(null)}>
					<div className="mb-2 d-flex justify-content-between">
						<div className="BeaufortBold fs-18">{skinId.name}</div>
						<Icon iconType={IconType.CANCEL} clickable onClick={() => setSkinId(null)} />
					</div>
					<img
						className={styles.fullImage}
						src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${getChampImageName(champData.id)}_${skinId.num}.jpg`}
						alt={skinId.name}
					/>
				</Modal>
			</>}
			<div ref={scrollContainer.ref} className={classNames(styles.championSkins, 'mt-3')}>
					{images.map(skin => {
						
						return (
							<div className={classNames(styles.skin)} onClick={() => setSkinId({ num: skin.num, name: skin.name} )}>
								<img src={skin.image} alt={skin.name} />
								<div className={classNames(styles.name, 'text-primary m-auto h-40-px p-1')}>
									{skin.name}
								</div>
							</div>
						)
					})}
			</div>
		</div>
	);
};

export default Skins;
