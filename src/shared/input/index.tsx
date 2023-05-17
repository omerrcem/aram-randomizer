import classNames from 'classnames';
import styles from '@/styles/shared/Input.module.scss';

const Input = props => {
	const { onChange, onEnter, value } = props;

	const onTextEnter = (e) => {
		onChange(e.target.value);
	};

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			// 👇 Get input value
			onEnter(value);
		}
	};

	return (
		<input
			{...props}
			className={classNames('px-3 w-100-p fs-14 bg-blue-seven text-primary border border-grey-half', styles.input)}
			type="text"
			onChange={onTextEnter}
			onKeyDown={handleKeyDown}
		/>
	);
};

export default Input;
