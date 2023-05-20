import classNames from 'classnames';
import styles from '@/styles/shared/Button.module.scss';

export enum ButtonThemes {
	PRIMARY = 'primary',
	MAGIC = 'magic',
	HEXTEC = 'hextec',
	FLAT = 'flat'
}

const Button = props => {
	const { children, className, theme = ButtonThemes.PRIMARY } = props;

	return (
		<button
			{...props}
			className={classNames(
				styles.button,
				styles[theme],
				className,
				'd-flex gap-1 justify-content-center align-items-center',
			)}
		>
			{children}

		</button>
	);
};

export default Button;
