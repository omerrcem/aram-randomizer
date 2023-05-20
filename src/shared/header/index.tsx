import Link from "next/link";
import Icon, { IconSize, IconType, IconVariant } from "../icon";
import classNames from "classnames";
import styles from '../../styles/shared/Header.module.scss';


export const routes = {
	RANDOMIZER: { path: '/', name: 'Randomizer'},
	CHAMPIONS: { path: '/champions', name: 'Champions' },
	CHAMPION_DETAIL: { path: '/champions/[champ]', name: 'Champions' }
}

export const HEADER_LINKS = [
	routes.RANDOMIZER,
	routes.CHAMPIONS
];

export const routeAs = (route, params) => {
	let routeStr = route;
	Object.keys(params).forEach(key => {
		routeStr = routeStr.replace(`[${key}]`, params[key]);
	});
	return routeStr;
}

const Header = ({ currentRoute }) => {
	return (
		<div className={classNames("p-3 mb-3", styles.header)}>
			<h1 className="BeaufortBold text-primary fs-28 d-flex gap-3 px-4">
				<Icon iconType={IconType.JAKSHO} iconSize={IconSize.LARGE} variant={IconVariant.GOLD_TWO} />
				Jaksho
				<div className="fs-10 text-gold-three Spiegel align-items-end mt-auto mb-1">
					League of Legends Randomizer & Index
				</div>
			</h1>

			<div className="d-flex gap-3 border-bottom border-gold-six px-sm-5 px-1 mt-3">
				{HEADER_LINKS.map((route, index) => {
					return <NavigationButton key={index} route={route} currentRoute={currentRoute} />
				})}
			</div>

		</div>
	);
};

const NavigationButton = ({ route, currentRoute }) => {

	return (
		<Link style={{ textDecoration: 'none' }} href={route.path}>
			<div className={classNames(
				"fs-12 fs-14 border-primary py-2",
				styles.navigationButton,
				route === currentRoute && styles.active,
			)}>
				{route.name}
			</div>
		</Link>
	)
};

export default Header;
