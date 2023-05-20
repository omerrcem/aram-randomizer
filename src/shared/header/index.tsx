import Link from "next/link";
import Icon, { IconSize, IconType, IconVariant } from "../icon";


const routes = {
	RANDOMIZER: { path: '/', name: 'Randomizer'},
	// CHAMPIONS: '/champions'
} 

const Header = () => {
	return (
		<div className="p-3">
			<h1 className="BeaufortBold text-primary fs-28 d-flex gap-3 px-4">
				<Icon iconType={IconType.JAKSHO} iconSize={IconSize.LARGE} variant={IconVariant.GOLD_TWO} />
				Jaksho
				<div className="fs-10 text-gold-three Spiegel align-items-end mt-auto mb-1">
					League of Legends Randomizer & Index
				</div>
			</h1>

			<div className="d-flex gap-3 border-bottom border-gold-six px-sm-5 px-1 mt-3">
				{Object.keys(routes).map((key, index) => {
					console.log(key, routes[key])
					return <NavigationButton key={index} route={routes[key]} />
				})}
			</div>

		</div>
	);
};

const NavigationButton = ({ route }) => {
	return (
		<Link style={{ textDecoration: 'none' }} href={route.path}>
			<div className="text-primary border-bottom fs-14 border-primary">
				{route.name}
			</div>
		</Link>
	)
};

export default Header;
