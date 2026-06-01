import { BookingForm } from '@/components/BookingForm/BookingForm';
import styles from './page.module.scss';

export default function Home() {
	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<h1 className={styles.title}>Забронировать стол</h1>
				<BookingForm />
			</main>
		</div>
	);
}
