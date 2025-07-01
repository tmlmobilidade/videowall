'use client';

/* * */

import { Compliance } from '@/components/Compliance';

import { Screen1 } from '../Screen1/index';
import { Screen2 } from '../Screen2/index';
import { Screen3 } from '../Screen3/index';
import { Screen4 } from '../Screen4/index';
// import Confetti from 'react-confetti';
// import Snowfall from 'react-snowfall';

import styles from '@/areas/cm/AllScreens/styles.module.css';

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
