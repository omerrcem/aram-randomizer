import classNames from 'classnames';
import styles from '../../styles/partials/ChampionList.module.scss';
import { useState } from 'react';
import Button from '@/shared/button';
import Link from 'next/link';
import { routeAs, routes } from '@/shared/header';
import { useRouter } from 'next/router';

const ChampionList = ({ champions }) => {
	const router = useRouter();
	const { query } = router;
	const [index, setIndex] = useState((query.index as any) || 20);

	const onLoadMore = () => {
		const newIndex = parseInt(index) + 30;
		setIndex(newIndex);
		router.replace({ query: { ...query, index: newIndex },  }, undefined, { shallow: true });
	};

	return (
		<div>
			<div className={classNames(styles.championList)}>
				{champions.slice(0, index).map((champ, index) =>{
					return (
						<Champ key={champ.name + index} champ={champ} />
					);
				})}
				{champions.slice(index, champions.length).map((champ, index) =>{
					return (
						<Champ key={champ.name + index} champ={champ} hidden />
					);
				})}
			</div>
			{champions.length > index && (
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
