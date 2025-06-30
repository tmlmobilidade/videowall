'use client';

/* * */

import { Compliance } from '@/components/Compliance';
import { Screen1 } from 'app/Area2/screens/Screen1';
import { Screen2 } from 'app/Area2/screens/Screen2';
import { Screen3 } from 'app/Area2/screens/Screen3';
import { Screen4 } from 'app/Area2/screens/Screen4';
// import Confetti from 'react-confetti';
// import Snowfall from 'react-snowfall';

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
			{/* <Confetti height={1080} numberOfPieces={50} width={1920} /> */}
			{/* <Snowfall snowflakeCount={40} speed={[0.5, 1]} wind={[0, 1]} /> */}
		</div>
	);
}
