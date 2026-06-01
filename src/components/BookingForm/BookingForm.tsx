'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { BookingFormData } from '@/shared/types';

import clsx from 'clsx';
import { useCallback, useId, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ConfirmationScreen } from '@/components/ConfirmationScreen/ConfirmationScreen';
import { Button } from '@/components/ui';
import { MAX_GUESTS_AMOUNT, START_HOUR, TIME_TOTAL_SLOTS } from '@/shared/constants';
import { formatDate, mockRequest } from '@/shared/utils';
import {
	getDateValidation,
	getGuestsValidation,
	getNameValidation,
	getPhoneValidation,
	getTimeValidation,
} from '@/shared/validations';
import styles from './BookingForm.module.scss';

interface BookingFormProps {
	className?: string;
}

export const BookingForm = ({ className }: BookingFormProps) => {
	const nameId = useId();
	const phoneId = useId();
	const guestsId = useId();
	const dateId = useId();
	const timeId = useId();

	const todayDate = useMemo(() => formatDate(new Date()), []);

	const maxDate = useMemo(() => {
		const date = new Date();
		date.setDate(date.getDate() + 90);
		return formatDate(date);
	}, []);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<BookingFormData>({
		mode: 'onBlur',
		defaultValues: {
			guests: 1,
			date: todayDate,
			time: '12:00',
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isConfirmOpened, setIsConfirmOpened] = useState<boolean>(false);
	const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

	const toggleConfirmModal = useCallback(() => {
		setIsConfirmOpened((prev) => !prev);
	}, []);

	const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
		try {
			setIsLoading(true);
			const response = await mockRequest(data, 300);

			setSubmittedData(response);
			setIsConfirmOpened(true);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.form, className)}>
			<div className={styles.inputGroup}>
				<div className={styles.inputWrapper}>
					<label htmlFor={nameId} className={styles.label}>
						Имя гостя
					</label>
					<input
						id={nameId}
						className={styles.input}
						type='text'
						placeholder='Имя'
						{...register('name', getNameValidation())}
					/>

					{errors.name && (
						<span className={styles.error}>{errors.name?.message}</span>
					)}
				</div>

				<div className={styles.inputWrapper}>
					<label htmlFor={phoneId} className={styles.label}>
						Номер телефона
					</label>
					<input
						id={phoneId}
						className={styles.input}
						type='tel'
						placeholder='Номер'
						{...register('phone', getPhoneValidation())}
					/>
					{errors.phone && (
						<span className={styles.error}>{errors.phone?.message}</span>
					)}
				</div>
			</div>

			<div className={styles.inputGroup}>
				<div className={styles.inputWrapper}>
					<label htmlFor={guestsId} className={styles.label}>
						Количество гостей
					</label>
					<input
						id={guestsId}
						className={styles.input}
						type='number'
						max={MAX_GUESTS_AMOUNT}
						{...register('guests', getGuestsValidation())}
					/>
					{errors.guests && (
						<span className={styles.error}>{errors.guests?.message}</span>
					)}
				</div>

				<div className={styles.inputWrapper}>
					<label htmlFor={dateId} className={styles.label}>
						Дата посещения
					</label>
					<input
						id={dateId}
						className={styles.input}
						type='date'
						{...register('date', getDateValidation(todayDate, maxDate))}
					/>
					{errors.date && (
						<span className={styles.error}>{errors.date.message}</span>
					)}
				</div>

				<div className={styles.inputWrapper}>
					<label htmlFor={timeId} className={styles.label}>
						Время
					</label>

					<select
						id={timeId}
						className={styles.select}
						{...register('time', getTimeValidation())}
					>
						{Array.from({ length: TIME_TOTAL_SLOTS }).map((_, index) => {
							const timeValue = `${START_HOUR + index}:00`;

							return (
								<option key={index} value={timeValue}>
									{timeValue}
								</option>
							);
						})}
					</select>

					{errors.time && (
						<span className={styles.error}>{errors.time.message}</span>
					)}
				</div>
			</div>

			<Button type='submit' isLoading={isLoading} className={styles.submitBtn}>
				{isLoading ? 'Бронируем...' : 'Забронировать'}
			</Button>

			<ConfirmationScreen
				isOpen={isConfirmOpened}
				onCancel={reset}
				onClose={toggleConfirmModal}
				data={submittedData}
			/>
		</form>
	);
};
