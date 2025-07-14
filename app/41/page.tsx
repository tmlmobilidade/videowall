/* * */

import { AllScreens } from '@/areas/41/AllScreens';
import { PasswordCheck } from '@/components/PasswordCheck';

/* * */

export default function Area1() {
	return (
		<PasswordCheck id="41" password="teste">
			<AllScreens />
		</PasswordCheck>
	);
}
