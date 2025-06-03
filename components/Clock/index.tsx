'use client';

/* * */

import { Dates } from '@tmlmobilidade/utils';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function Clock() {
	//

	//
	// A. Setup variables

	const [time, setTime] = useState<Date>();

	//
	// B. Transform data

	useEffect(() => {
		const timer = setInterval(() => {
			const now = Dates.now('Europe/Lisbon');
			setTime(now.js_date);
		}, 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	const formattedHours = useMemo(() => {
		if (!time) return '-';
		const hours = time.getHours().toString().padStart(2, '0');
		return `${hours}`;
	}, [time]);

	const formattedMinutes = useMemo(() => {
		if (!time) return '-';
		const minutes = time.getMinutes().toString().padStart(2, '0');
		return `:${minutes}`;
	}, [time]);

	const formattedSeconds = useMemo(() => {
		if (!time) return '-';
		const seconds = time.getSeconds().toString().padStart(2, '0');
		return `:${seconds}`;
	}, [time]);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<p className={styles.hours}>{formattedHours}</p>
			<p className={styles.minutes}>{formattedMinutes}</p>
			<p className={styles.seconds}>{formattedSeconds}</p>
		</div>
	);

	//
}
