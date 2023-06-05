import classNames from 'classnames';
import styles from '../../styles/shared/Modal.module.scss';
import { useEffect, useRef, useState } from 'react';

const Modal = ({ children, space = 5, className = null, style = null, onClose }) => {

	const modalRef = useRef<HTMLDivElement>();
	const [mount, setMount] = useState(false);

	const handleClick = e => {
		console.log('lol');
		if (!modalRef.current.contains(e.target)) {
			onClose();
		}
	};

	useEffect(() => {
		if (mount) {
			window.addEventListener('click', handleClick)
		}
		setMount(true);

		return () => {
			window.removeEventListener('click', handleClick)
		}
	}, [mount]);

	return (
		<>
			<div className={classNames("w-100-p modalWrapper", `p-${space}` ,styles.modal)}>
				<div ref={modalRef} style={style} className={classNames("p-3 m-auto border border-secondary bg-hextec", className)}>
					{children}
				</div>
			</div>
			<div className={styles.overlay} />
		</>
	);
};

export default Modal;
