'use client';

/* * */

import { Compliance } from '@/components/Compliance';
import { Screen1 } from '@/screens/Screen1';
import { Screen2 } from '@/screens/Screen2';
import { Screen3 } from '@/screens/Screen3';
import { Screen4 } from '@/screens/Screen4';
import Snowfall from 'react-snowfall';

import styles from './styles.module.css';

/* * */

export function AllScreens() {
	return (
		<div className={styles.container}>
			<Screen1 />
			<Screen2 />
			<Screen3 />
			<Screen4 />
			<Compliance />
			<Snowfall snowflakeCount={40} speed={[0.5, 1]} wind={[0, 1]} />
		</div>
	);
}
