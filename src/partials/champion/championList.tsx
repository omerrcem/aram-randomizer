import classNames from 'classnames';
import styles from '../../styles/partials/ChampionList.module.scss';
import { useState } from 'react';
import Button from '@/shared/button';

const ChampionList = ({ champions }) => {

	const [index, setIndex] = useState(20);

	return (
		<div>
			<div className={classNames(styles.championList)}>
				{champions.slice(0, index).map(champ =>{
					return (
						
						<div className={classNames(styles.champion)}>
							<div style={{ backgroundImage: 'url("./champion.svg")'}} className={styles.image}>
								
								<img src={champ.image} alt={champ.name} onError={(event: any) => event.target.style.display = 'none'} />
							</div>

							<div className="p-2">
								<div className="BeaufortBold fs-12">{champ.name}</div>
								<div className="BeaufortBold fs-10 text-grey-one">{champ.title}</div>
							</div>
						</div>
					);
				})}
			</div>
			{champions.length > index && (
				<div className="d-flex justify-content-center mt-4 mb-2">
					<Button className="p-1 px-2" onClick={() => setIndex(index + 30)}>
						Load More
					</Button>
				</div>
			)}
		</div>
	)
};

export default ChampionList;
