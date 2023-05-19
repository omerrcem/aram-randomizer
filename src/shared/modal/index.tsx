import classNames from 'classnames';
import styles from '../../styles/shared/Modal.module.scss';

const Modal = ({ children, className = null, style = null, onClose }) => {
	return (
		<>
			<div className={classNames("p-5 w-100-p", styles.modal)}>
				<div style={style} className={classNames("p-3 m-auto border border-secondary bg-hextec", className)}>
					{children}
				</div>
			</div>
			<div className={styles.overlay} onClick={onClose} />
		</>
	);
};

export default Modal;
