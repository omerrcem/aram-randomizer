import classNames from 'classnames';
import styles from '@/styles/shared/TextArea.module.scss';

const TextArea = (props) => {
	const { onChange } = props;

	const onTextEnter = (e) => {
		onChange(e.target.value);
	};

	return (
		<textarea
			{...props}
			className={classNames('ph-2 fs-16 bg-blue-seven text-primary border border-grey-half', styles.textarea)}
			onChange={onTextEnter}
		/>
	);
};

export default TextArea;
