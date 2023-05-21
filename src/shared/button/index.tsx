import classNames from 'classnames';
import styles from '@/styles/shared/Button.module.scss';

export enum ButtonThemes {
	PRIMARY = 'primary',
	MAGIC = 'magic',
	HEXTEC = 'hextec',
	FLAT = 'flat'
}

const Button = props => {
	const { style, children, disabled, className, theme = ButtonThemes.PRIMARY, onClick } = props;

	return (
		<button
			style={style}
			onClick={onClick}
			disabled={disabled}
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
