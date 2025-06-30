'use client';

/* * */

import { CardDefault } from '@/components/CardDefault';
import { Grid } from '@/components/Grid';
import { IconBusOff } from '@tabler/icons-react';
import { IconCreditCardPay } from '@tabler/icons-react';
import { IconClock } from '@tabler/icons-react';
import { IconRulerMeasure } from '@tabler/icons-react';
import { useMemo } from 'react';
import useSWR from 'swr';

export function Area2() {
	// A. Fetch data
	const { data: slaData, isLoading: slaLoading, isValidating: slaValidating } = useSWR('https://api.carrismetropolitana.pt/v2/metrics/videowall/sla');

	const { data: validationsData, isLoading: validationsLoading, isValidating: validationsValidating } = useSWR('https://api.carrismetropolitana.pt/v2/metrics/videowall/validations');

	const { data: delaysData, isLoading: delaysLoading, isValidating: delaysValidating } = useSWR('https://api.carrismetropolitana.pt/v2/metrics/videowall/delays');

	const { data: vkmData, isLoading: vkmLoading, isValidating: vkmValidating } = useSWR('https://api.carrismetropolitana.pt/v2/metrics/videowall/vkm');

	// B. Transform data

	const delaysCmOverview = useMemo(() => {
		if (!delaysData || !slaData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		const formattedSeconds = delaysData.data._cm_average_delay_minutes * 60 % 60;
		const formattedMinutes = delaysData.data._cm_average_delay_minutes - formattedSeconds / 60;
		return {
			primary_value: delaysData.data._cm_average_delay_minutes,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(formattedMinutes)}m ${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(formattedSeconds)}s`,
			secondary_value: delaysData.data._cm_average_delay_minutes,
			secondary_value_string: `${Intl.NumberFormat('pt-PT').format(slaData.data._cm_scheduled_rides_until_now)}`,
		};
	}, [delaysData, slaData]);

	const delaysCmParsed = useMemo(() => {
		if (!delaysData || !slaData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._cm_delayed_for_more_than_five_minutes_count / slaData.data._cm_scheduled_rides_until_now,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._cm_delayed_for_more_than_five_minutes_count / slaData.data._cm_scheduled_rides_until_now * 100)}%`,
			secondary_value: delaysData.data._cm_delayed_for_more_than_five_minutes_count,
			secondary_value_string: `${Intl.NumberFormat('pt-PT').format(delaysData.data._cm_delayed_for_more_than_five_minutes_count)}`,
		};
	}, [delaysData, slaData]);

	const validations42Parsed = useMemo(() => {
		if (!validationsData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: validationsData.data._42_today_valid_count,
			primary_value_string: Intl.NumberFormat('pt-PT').format(validationsData.data._42_today_valid_count),
			secondary_value: validationsData.data._42_today_valid_count / validationsData.data._42_last_week_valid_count,
			secondary_value_string: `${parseFloat(((validationsData.data._42_today_valid_count * 100) / validationsData.data._42_last_week_valid_count).toFixed(2))}%`,
		};
	}, [validationsData]);

	const sla42Parsed = useMemo(() => {
		if (!slaData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: slaData.data._42_simple_three_events_or_simple_one_validation_transaction_fail_until_now,
			primary_value_string: Intl.NumberFormat('pt-PT').format(slaData.data._42_simple_three_events_or_simple_one_validation_transaction_fail_until_now),
			secondary_value: slaData.data._42_simple_three_events_or_simple_one_validation_transaction_fail_until_now / slaData.data._42_scheduled_rides_until_now,
			secondary_value_string: `${parseFloat(((slaData.data._42_simple_three_events_or_simple_one_validation_transaction_fail_until_now * 100) / slaData.data._42_scheduled_rides_until_now).toFixed(2))}% de ${slaData.data._42_scheduled_rides_until_now} (${slaData.data._42_scheduled_rides_total})`,
		};
	}, [slaData]);

	const delays42Parsed = useMemo(() => {
		if (!delaysData || !slaData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '-' };
		return {
			primary_value: delaysData.data._42_delayed_for_more_than_five_minutes_count / slaData.data._42_scheduled_rides_until_now,
			primary_value_string: `${Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(delaysData.data._42_delayed_for_more_than_five_minutes_count / slaData.data._42_scheduled_rides_until_now * 100)}%`,
			secondary_value: delaysData.data._42_delayed_for_more_than_five_minutes_count,
			secondary_value_string: `${Intl.NumberFormat('pt-PT').format(delaysData.data._42_delayed_for_more_than_five_minutes_count)}`,
		};
	}, [delaysData, slaData]);

	const vkm42Parsed = useMemo(() => {
		if (!vkmData) return { primary_value: 0, secondary_value: 0, secondary_value_string: '?%' };
		return {
			primary_value: vkmData.data._42_simple_three_events_or_simple_one_validation_transaction_vkm_until_now,
			primary_value_string: Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(vkmData.data._42_simple_three_events_or_simple_one_validation_transaction_vkm_until_now / 1000),
			secondary_value: vkmData.data._42_simple_three_events_or_simple_one_validation_transaction_vkm_until_now / vkmData.data._42_scheduled_vkm_until_now,
			secondary_value_string: `${parseFloat(((vkmData.data._42_simple_three_events_or_simple_one_validation_transaction_vkm_until_now * 100) / vkmData.data._42_scheduled_vkm_until_now).toFixed(2))}%`,
			// secondary_value_string: Intl.NumberFormat('pt-PT', { maximumFractionDigits: 0 }).format(vkmData.data._42_scheduled_vkm_until_now / 1000),
		};
	}, [vkmData]);

	return (
		<Grid
			layout="sixDetails"
			cells={[
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading || slaLoading}
					isValidating={delaysValidating || slaValidating}
					sentiment={delaysCmOverview.primary_value > 3 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="CM / Atraso médio do total de viagens"
					valuePrimary={delaysCmOverview.primary_value_string}
					valueSecondary={delaysCmOverview.secondary_value_string}
				/>,
				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading || slaLoading}
					isValidating={delaysValidating || slaValidating}
					sentiment={delaysCmParsed.primary_value > 0.095 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="CM / Viagens atrasadas > 5 min"
					valuePrimary={delaysCmParsed.primary_value_string}
					valueSecondary={delaysCmParsed.secondary_value_string}
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
					icon={<IconBusOff />}
					isLoading={slaLoading}
					isValidating={slaValidating}
					sentiment={sla42Parsed.secondary_value > 0.05 ? 'bad' : 'good'}
					timestamp={slaData?.timestamp_resource}
					title="42 / Viagens não executadas hoje, até agora"
					valuePrimary={sla42Parsed.primary_value_string}
					valueSecondary={sla42Parsed.secondary_value_string}
				/>,

				<CardDefault
					icon={<IconClock />}
					isLoading={delaysLoading || slaLoading}
					isValidating={delaysValidating || slaValidating}
					sentiment={delays42Parsed.primary_value > 0.095 ? 'bad' : 'good'}
					timestamp={delaysData?.timestamp_resource}
					title="42 / Viagens atrasadas > 5 min"
					valuePrimary={delays42Parsed.primary_value_string}
					valueSecondary={delays42Parsed.secondary_value_string}
				/>,

				<CardDefault
					icon={<IconRulerMeasure />}
					isLoading={vkmLoading}
					isValidating={vkmValidating}
					sentiment="normal"
					size="lg"
					timestamp={vkmData?.timestamp_resource}
					title="42 / VKm Executados hoje, até agora"
					valuePrimary={vkm42Parsed.primary_value_string}
					valueSecondary={vkm42Parsed.secondary_value_string}
				/>,

			]}
		/>
	);
}
