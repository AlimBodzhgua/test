import type { FC, MouseEvent, ReactNode } from 'react';

import clsx from 'clsx';
import { memo, useCallback, useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	className?: string;
	children: ReactNode;
}

export const Modal: FC<ModalProps> = memo((props) => {
	const { isOpen, onClose, children, className } = props;

	const onEscapePress = useCallback((e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		window.addEventListener('keydown', onEscapePress);

		return () => {
			window.removeEventListener('keydown', onEscapePress);
		};
	}, [onEscapePress]);

	const onContentClick = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
	};

	return (
		<div className={clsx(styles.modal, { [styles.open]: isOpen })} onClick={onClose}>
			<div className={styles.overlay}>
				<div className={clsx(styles.content, className)} onClick={onContentClick}>
					{children}
				</div>
			</div>
		</div>
	);
});
