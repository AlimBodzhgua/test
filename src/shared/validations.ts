export const getNameValidation = () => {
	const namePattern = /^[A-Za-zА-Яа-яЁё\s-]+$/;

	return {
		required: 'Обязательно для заполнения',
		minLength: { value: 2, message: 'Имя должно состоять минимум из 2 символов' },
		pattern: {
			value: namePattern,
			message: 'Разрешены только буквы, пробелы и дефис',
		},
	} as const;
};

export const getPhoneValidation = () => {
	return {
		required: 'Обязательно для заполнения',
		pattern: {
			value: /^(?:\+7|8)\d{10}$/,
			message: 'Формат должен быть +7 или 8, 10 цифр',
		},
	} as const;
};

export const getGuestsValidation = () => {
	return {
		required: 'Обязательно для заполнения',
		min: { value: 1, message: 'Минимум 1 гость' },
		max: { value: 12, message: 'Максимум 12 гостей' },
	} as const;
};

export const getDateValidation = (todayDate: string, maxDate: string) => {
	return {
		required: 'Обязательно для заполнения',
		min: {
			value: todayDate,
			message: 'Дата не раньше сегодня',
		},
		max: {
			value: maxDate,
			message: 'Дата не позднее +90 дней',
		},
	} as const;
};

export const getTimeValidation = () => {
	return {
		required: 'Обязательно для заполнения',
	} as const;
};
