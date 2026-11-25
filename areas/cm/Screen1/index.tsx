'use client';

/* * */

import { CardDefault } from '@/components/CardDefault';
import { Grid } from '@/components/Grid';
import { IconCreditCardPay } from '@tabler/icons-react';
import confetti from 'canvas-confetti';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

const TOTAL_VALIDATIONS_MILESTONE = 200_000_000;

const CONFETTI_CANNONS = [
	{ angle: 60, origin: { x: 0, y: 1 } },
	{ angle: 120, origin: { x: 1, y: 1 } },
];

function fireConfetti() {
	CONFETTI_CANNONS.forEach(cannon => confetti({ ...cannon, particleCount: 250, scalar: 3, spread: 55, startVelocity: 90, ticks: 400 }));
}

/* * */

export function Screen1() {
	//

	//
	// A. Fetch data

	const { data: validationsData, isLoading: validationsLoading, isValidating: validationsValidating } = useSWR('https://api.carrismetropolitana.pt/v2/metrics/videowall/validations', {
		onSuccess: (data) => {
			if (data?.data?._cm_total_valid_count >= TOTAL_VALIDATIONS_MILESTONE) {
				fireConfetti();
			}
		},
	});

	//
	// B. Transform data

	const validationsCmParsed = useMemo(() => {
		if (!validationsData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: validationsData.data._cm_today_valid_count,
			primary_value_string: Intl.NumberFormat('pt-PT').format(validationsData.data._cm_today_valid_count),
			secondary_value: validationsData.data._cm_today_valid_count / validationsData.data._cm_last_week_valid_count,
			secondary_value_string: `${parseFloat(((validationsData.data._cm_today_valid_count * 100) / validationsData.data._cm_last_week_valid_count).toFixed(2))}%`,
		};
	}, [validationsData]);

	const validationsCmTotalParsed = useMemo(() => {
		if (!validationsData) return { primary_value_detail_string: '', primary_value_string: '?', secondary_value_string: '?%' };
		const total = validationsData.data._cm_total_valid_count;
		const remainder = String(total % 1_000_000).padStart(6, '0');
		return {
			primary_value_detail_string: `${remainder.slice(0, 3)} ${remainder.slice(3)}`,
			primary_value_string: Intl.NumberFormat('pt-PT').format(Math.floor(total / 1_000_000)),
			secondary_value_string: `${parseFloat(((total * 100) / TOTAL_VALIDATIONS_MILESTONE).toFixed(2))}%`,
		};
	}, [validationsData]);

	const validations41Parsed = useMemo(() => {
		if (!validationsData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: validationsData.data._41_today_valid_count,
			primary_value_string: Intl.NumberFormat('pt-PT').format(validationsData.data._41_today_valid_count),
			secondary_value: validationsData.data._41_today_valid_count / validationsData.data._41_last_week_valid_count,
			secondary_value_string: `${parseFloat(((validationsData.data._41_today_valid_count * 100) / validationsData.data._41_last_week_valid_count).toFixed(2))}%`,
		};
	}, [validationsData]);

	const validations42Parsed = useMemo(() => {
		if (!validationsData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: validationsData.data._42_today_valid_count,
			primary_value_string: Intl.NumberFormat('pt-PT').format(validationsData.data._42_today_valid_count),
			secondary_value: validationsData.data._42_today_valid_count / validationsData.data._42_last_week_valid_count,
			secondary_value_string: `${parseFloat(((validationsData.data._42_today_valid_count * 100) / validationsData.data._42_last_week_valid_count).toFixed(2))}%`,
		};
	}, [validationsData]);

	const validations43Parsed = useMemo(() => {
		if (!validationsData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: validationsData.data._43_today_valid_count,
			primary_value_string: Intl.NumberFormat('pt-PT').format(validationsData.data._43_today_valid_count),
			secondary_value: validationsData.data._43_today_valid_count / validationsData.data._43_last_week_valid_count,
			secondary_value_string: `${parseFloat(((validationsData.data._43_today_valid_count * 100) / validationsData.data._43_last_week_valid_count).toFixed(2))}%`,
		};
	}, [validationsData]);

	const validations44Parsed = useMemo(() => {
		if (!validationsData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: validationsData.data._44_today_valid_count,
			primary_value_string: Intl.NumberFormat('pt-PT').format(validationsData.data._44_today_valid_count),
			secondary_value: validationsData.data._44_today_valid_count / validationsData.data._44_last_week_valid_count,
			secondary_value_string: `${parseFloat(((validationsData.data._44_today_valid_count * 100) / validationsData.data._44_last_week_valid_count).toFixed(2))}%`,
		};
	}, [validationsData]);

	//
	// C. Render components

	return (
		<Grid
			layout="sixDetails"
			cells={[
				<CardDefault
					icon={<IconCreditCardPay />}
					isLoading={validationsLoading}
					isValidating={validationsValidating}
					sentiment={validationsCmParsed.secondary_value < 1 ? 'normal' : 'good'}
					timestamp={validationsData?.timestamp_resource}
					title="CM / Passageiros transportados hoje, até agora"
					valuePrimary={validationsCmParsed.primary_value_string}
					valueSecondary={validationsCmParsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconCreditCardPay />}
					isLoading={validationsLoading}
					isValidating={validationsValidating}
					sentiment="highlight"
					timestamp={validationsData?.timestamp_resource}
					title="CM / Total de validações, desde o início do ano"
					valuePrimary={validationsCmTotalParsed.primary_value_string}
					valuePrimaryDetail={validationsCmTotalParsed.primary_value_detail_string}
					valueSecondary={validationsCmTotalParsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconCreditCardPay />}
					isLoading={validationsLoading}
					isValidating={validationsValidating}
					sentiment={validations41Parsed.secondary_value < 1 ? 'normal' : 'good'}
					timestamp={validationsData?.timestamp_resource}
					title="41 / Passageiros transportados hoje, até agora"
					valuePrimary={validations41Parsed.primary_value_string}
					valueSecondary={validations41Parsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconCreditCardPay />}
					isLoading={validationsLoading}
					isValidating={validationsValidating}
					sentiment={validations42Parsed.secondary_value < 1 ? 'normal' : 'good'}
					timestamp={validationsData?.timestamp_resource}
					title="42 / Passageiros transportados hoje, até agora"
					valuePrimary={validations42Parsed.primary_value_string}
					valueSecondary={validations42Parsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconCreditCardPay />}
					isLoading={validationsLoading}
					isValidating={validationsValidating}
					sentiment={validations43Parsed.secondary_value < 1 ? 'normal' : 'good'}
					timestamp={validationsData?.timestamp_resource}
					title="43 / Passageiros transportados hoje, até agora"
					valuePrimary={validations43Parsed.primary_value_string}
					valueSecondary={validations43Parsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconCreditCardPay />}
					isLoading={validationsLoading}
					isValidating={validationsValidating}
					sentiment={validations44Parsed.secondary_value < 1 ? 'normal' : 'good'}
					timestamp={validationsData?.timestamp_resource}
					title="44 / Passageiros transportados hoje, até agora"
					valuePrimary={validations44Parsed.primary_value_string}
					valueSecondary={validations44Parsed.secondary_value_string}
				/>,
			]}
		/>
	);

	//
}
