'use client';

/* * */

import { CardDefault } from '@/components/CardDefault';
import { Grid } from '@/components/Grid';
import { IconClock } from '@tabler/icons-react';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export function Screen3() {
	//

	//
	// A. Fetch data

	const { data: delaysData, isLoading: delaysLoading, isValidating: delaysValidating } = useSWR('https://api.cmet.pt/metrics/videowall/delays');

	//
	// B. Transform data

	const delaysCmOverview = useMemo(() => {
		if (!delaysData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._cm_average_delay_minutes,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._cm_average_delay_minutes)} min`,
			secondary_value: delaysData.data._cm_average_delay_minutes,
			secondary_value_string: delaysData.data._cm_total_until_now_count,
		};
	}, [delaysData]);

	const delaysCmParsed = useMemo(() => {
		if (!delaysData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._cm_delayed_for_more_than_five_minutes_count / delaysData.data._cm_total_until_now_count,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._cm_delayed_for_more_than_five_minutes_count / delaysData.data._cm_total_until_now_count * 100)}%`,
			secondary_value: delaysData.data._cm_delayed_for_more_than_five_minutes_count,
			secondary_value_string: delaysData.data._cm_delayed_for_more_than_five_minutes_count,
		};
	}, [delaysData]);

	const delays41Parsed = useMemo(() => {
		if (!delaysData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._41_delayed_for_more_than_five_minutes_count / delaysData.data._41_total_until_now_count,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._41_delayed_for_more_than_five_minutes_count / delaysData.data._41_total_until_now_count * 100)}%`,
			secondary_value: delaysData.data._41_delayed_for_more_than_five_minutes_count,
			secondary_value_string: delaysData.data._41_delayed_for_more_than_five_minutes_count,
		};
	}, [delaysData]);

	const delays42Parsed = useMemo(() => {
		if (!delaysData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._42_delayed_for_more_than_five_minutes_count / delaysData.data._42_total_until_now_count,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._42_delayed_for_more_than_five_minutes_count / delaysData.data._42_total_until_now_count * 100)}%`,
			secondary_value: delaysData.data._42_delayed_for_more_than_five_minutes_count,
			secondary_value_string: delaysData.data._42_delayed_for_more_than_five_minutes_count,
		};
	}, [delaysData]);

	const delays43Parsed = useMemo(() => {
		if (!delaysData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._43_delayed_for_more_than_five_minutes_count / delaysData.data._43_total_until_now_count,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._43_delayed_for_more_than_five_minutes_count / delaysData.data._43_total_until_now_count * 100)}%`,
			secondary_value: delaysData.data._43_delayed_for_more_than_five_minutes_count,
			secondary_value_string: delaysData.data._43_delayed_for_more_than_five_minutes_count,
		};
	}, [delaysData]);

	const delays44Parsed = useMemo(() => {
		if (!delaysData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._44_delayed_for_more_than_five_minutes_count / delaysData.data._44_total_until_now_count,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._44_delayed_for_more_than_five_minutes_count / delaysData.data._44_total_until_now_count * 100)}%`,
			secondary_value: delaysData.data._44_delayed_for_more_than_five_minutes_count,
			secondary_value_string: delaysData.data._44_delayed_for_more_than_five_minutes_count,
		};
	}, [delaysData]);

	//
	// C. Render components

	return (
		<Grid
			layout="sixDetails"
			cells={[
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading}
					isValidating={delaysValidating}
					sentiment={delaysCmOverview.secondary_value > 5 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="CM / Atraso médio do total de viagens"
					valuePrimary={delaysCmOverview.primary_value_string}
					valueSecondary={delaysCmOverview.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading}
					isValidating={delaysValidating}
					sentiment={delaysCmParsed.primary_value > 0.10 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="CM / Viagens atrasadas > 5 min"
					valuePrimary={delaysCmParsed.primary_value_string}
					valueSecondary={delaysCmParsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading}
					isValidating={delaysValidating}
					sentiment={delays41Parsed.secondary_value > 5 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="41 / Viagens atrasadas > 5 min"
					valuePrimary={delays41Parsed.primary_value_string}
					valueSecondary={delays41Parsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading}
					isValidating={delaysValidating}
					sentiment={delays42Parsed.secondary_value > 5 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="42 / Viagens atrasadas > 5 min"
					valuePrimary={delays42Parsed.primary_value_string}
					valueSecondary={delays42Parsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading}
					isValidating={delaysValidating}
					sentiment={delays43Parsed.secondary_value > 5 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="43 / Viagens atrasadas > 5 min"
					valuePrimary={delays43Parsed.primary_value_string}
					valueSecondary={delays43Parsed.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading}
					isValidating={delaysValidating}
					sentiment={delays44Parsed.secondary_value > 5 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="44 / Viagens atrasadas > 5 min"
					valuePrimary={delays44Parsed.primary_value_string}
					valueSecondary={delays44Parsed.secondary_value_string}
				/>,
			]}
		/>
	);

	//
}
