import type { ComponentProps, FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Loader } from '../Loader/Loader';
import styles from './Button.module.scss';

type ButtonTheme = 'primary' | 'secondary';
type LoaderPlacement = 'start' | 'end';

interface ButtonProps extends ComponentProps<'button'> {
	theme?: ButtonTheme;
	isLoading?: boolean;
	loaderPlacement?: LoaderPlacement;
	children: ReactNode;
	className?: string;
};

export const Button: FC<ButtonProps> = (props) => {
	const {
		children,
		theme = 'primary',
		loaderPlacement = 'end',
		isLoading,
		className,
		...otherProps
	} = props;

	return (
		<button
			className={clsx(styles.button, className, styles[theme], { [styles.loading]: isLoading })}
			disabled={isLoading || otherProps.disabled}
			{...otherProps}
		>
			{isLoading && loaderPlacement === 'start' && <Loader />}
			{children}
			{isLoading && loaderPlacement === 'end' && <Loader />}
		</button>
	);
};
