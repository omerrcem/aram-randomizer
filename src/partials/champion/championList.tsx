import classNames from 'classnames';
import styles from '../../styles/partials/ChampionList.module.scss';
import { useState } from 'react';
import Button, { ButtonThemes } from '@/shared/button';
import Link from 'next/link';
import { routeAs, routes } from '@/shared/header';
import { useRouter } from 'next/router';
import Input from '@/shared/input';
import Icon, { IconType, IconVariant } from '@/shared/icon';
import { ROLES } from '../summonerInput/options';

const ChampionList = ({ champions }) => {
	const router = useRouter();
	const { query } = router;
	const [index, setIndex] = useState((query.index as any) || 20);
	const [searchTerm, setSearchTerm] = useState('');
	const [roles, setRoles] = useState(ROLES);

	const reset = () => {
		setSearchTerm('');
		setRoles(ROLES);
	}

	const handleRoleClick = role => {
		if (roles.includes(role)) {
			setRoles(roles.filter(r => r !== role));
		} else {
			setRoles([...roles, role]);
		}
	};

	const onLoadMore = () => {
		const newIndex = parseInt(index) + 30;
		setIndex(newIndex);
		router.replace({ query: { ...query, index: newIndex },  }, undefined, { shallow: true });
	};

	const filteredChamps = champions.filter(champ => {
		return (JSON.stringify(Object.values(champ)).toLowerCase().includes(searchTerm.toLowerCase())) &&
			champ.tags.filter(tag => roles.includes(tag)).length > 0
	});

	return (
		<div>
			<div className={classNames(styles.filter, 'BeaufortMedium fs-24')}>
				Total {filteredChamps.length} champions
			</div>
			<div className={classNames(styles.filter, 'py-3 gap-3 border-bottom border-gold-six mb-4')}>
				<div className="d-flex gap-2">
					<Icon iconType={IconType.SEARCH} variant={IconVariant.GOLD_TWO} />
					<Input
						className={styles.search}
						placeholder="Search champions"
						value={searchTerm}
						onChange={setSearchTerm}
					/>
				</div>
				<div className="d-flex px-1 gap-1">
					{ROLES.map(role => (
						<img
							className={styles.role}
							src={`./roles/${role}.webp`} 
							alt={role}
							data-active={roles.includes(role)}
							onClick={() => handleRoleClick(role)}
							/>
					))}
					<Button className="ms-3 my-1" onClick={reset}>
						Reset
					</Button>
				</div>
			</div>
			<div className={classNames(styles.championList)}>
				{filteredChamps.slice(0, index).map((champ, index) =>{
					return (
						<Champ key={champ.name + index} champ={champ} />
					);
				})}
				{filteredChamps.slice(index, champions.length).map((champ, index) =>{
					return (
						<Champ key={champ.name + index} champ={champ} hidden />
					);
				})}
			</div>
			{filteredChamps.length > index && (
				<div className="d-flex justify-content-center mt-4 mb-2">
					<Button className="p-1 px-2" onClick={onLoadMore}>
						Load More
					</Button>
				</div>
			)}
		</div>
	)
};

export const Champ = ({ champ, hidden = false }) =>{
	return (
		<div className={classNames(styles.champion, { 'd-none' : hidden } )}>
			<Link style={{ textDecoration: 'none' }} 
				href={routes.CHAMPION_DETAIL.path} 
				as={routeAs(routes.CHAMPION_DETAIL.path, { champ: champ.champ })}
				shallow={false}
				>
				<div style={{ backgroundImage: 'url("./champion.svg")'}} className={styles.image}>
					
					<img src={champ.image} loading="lazy" alt={champ.name} onError={(event: any) => event.target.style.display = 'none'} />
				</div>

				<div className="p-2">
					<div className="BeaufortBold fs-12 text-primary">{champ.name}</div>
					<div className="BeaufortBold fs-10 text-grey-one">{champ.title}</div>
				</div>
			</Link>
		</div>
	);
};

export default ChampionList;
