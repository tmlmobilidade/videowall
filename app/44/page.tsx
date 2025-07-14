/* * */

import { AllScreens } from '@/areas/44/AllScreens';
import { PasswordCheck } from '@/components/PasswordCheck';

/* * */

export default function Area1() {
	return (
		<PasswordCheck id="44" password="teste">
			<AllScreens />
		</PasswordCheck>
	);
}
