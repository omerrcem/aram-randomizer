import styles from '@/styles/shared/Icon.module.scss';
import classNames from 'classnames';
import imports from './imports';

export enum IconType {
	CANCEL = 'cancel',
	DICE = 'dice',
	CHAMP = 'champ',
	REFRESH = 'refresh',
	BACK = 'back',
	COPY = 'copy'
}

export enum IconSize {
	TINY = 14,
	SMALLER = 16,
	SMALL = 18,
	MEDIUM = 24,
	LARGE = 32,
}

export enum IconVariant {
	GOLD_ONE = '#F0E6D2',
	GOLD_FOUR = '#C89B3C',
	GOLD_SIX = '#463714',
	HEXTEC = '#010A13',
	GREY_HALF = '#5B5A56',
	BLUE_SIX = '#091428',
	BLUE_SEVEN = '#0A1428',
	GREY_THREE = '#1E2328',
	GREY_COOL = '#1E282D',
}

const Icon = props => {
	const {
		iconType = IconType.CANCEL,
		variant = IconVariant.GOLD_ONE,
		iconSize = IconSize.MEDIUM,
		clickable = false,
	} = props;

	const SVG = imports[iconType];

	return (
		<span
			{...props}
			style={{ color: variant }}
			className={classNames(styles.icon, clickable && styles.clickable)}
		>
			<SVG
				stroke="currentColor"
				style={{ maxHeight: iconSize, maxWidth: iconSize, color: 'inherit' }}
				width={iconSize}
			/>
		</span>
	);
};

export default Icon;