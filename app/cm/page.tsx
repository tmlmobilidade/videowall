/* * */

import { AllScreens } from '@/areas/cm/AllScreens';
import { PasswordCheck } from '@/components/PasswordCheck';

/* * */

export default function Page() {
	return (
		<PasswordCheck id="cm" password="cmet">
			<AllScreens />
		</PasswordCheck>
	);
}
