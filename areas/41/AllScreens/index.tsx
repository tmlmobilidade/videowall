'use client';

/* * */

import { Screen1 } from '@/areas/41/Screen1/index';
import { Screen2 } from '@/areas/41/Screen2/index';
import { Screen3 } from '@/areas/41/Screen3/index';
import { Screen4 } from '@/areas/41/Screen4/index';

import styles from '@/areas/cm/AllScreens/styles.module.css';

/* * */

export function AllScreens() {
	return (
		<div className={styles.container}>
			<Screen1 />
			<Screen2 />
			<Screen3 />
			<Screen4 />
		</div>
	);
}
