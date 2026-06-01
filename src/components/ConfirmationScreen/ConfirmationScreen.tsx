import type { FC } from 'react';
import type { BookingFormData } from '@/shared/types';

import { memo } from 'react';
import { Button } from '@/components//ui';
import { Modal } from '@/components/ui/Modal/Modal';
import styles from './ConfirmationScreen.module.scss';

interface ConfirmationScreenProps {
	data: BookingFormData | null;
	isOpen: boolean;
	onCancel: () => void;
	onClose: () => void;
}

export const ConfirmationScreen: FC<ConfirmationScreenProps> = memo((props) => {
	const { data, isOpen, onCancel, onClose } = props;

	const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onClose();
	};

	const bookMore = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onCancel();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h1 className={styles.title}>
				Столик забронирован <span className={styles.check}>&#x2705;</span>
			</h1>
			<div className={styles.data}>
				<div>Имя гостя: {data?.name}</div>
				<div>Номер телефона: {data?.phone}</div>
				<div>Количество гостей: {data?.guests}</div>
				<div>Дата: {data?.date}</div>
				<div>Время: {data?.time}</div>
			</div>

			<div className={styles.actions}>
				<Button onClick={handleCancel} theme='secondary'>
					Отменить
				</Button>
				<Button onClick={bookMore}>Забронировать ещё</Button>
			</div>
		</Modal>
	);
});
