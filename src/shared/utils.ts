export const mockRequest = <T>(data: T, delay: number = 150): Promise<T> => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(data), delay);
	});
};

export const formatDate = (date: Date) => date.toISOString().split('T')[0];
