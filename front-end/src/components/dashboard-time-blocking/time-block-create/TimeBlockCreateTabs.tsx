'use client';

import { Tab, Tabs } from '@mui/material';
import React from 'react';
import { NewTimeBlock } from '@/components/dashboard-time-blocking/time-block-create/NewTimeBlock';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { ICreateTimeBlockFields } from '@/types/time-block.types';

type TTabMethod = 'click-a-button' | 'drag-a-block';
interface ITimeBlockCreateTabsProps {
	isValid: boolean;
	isPending: boolean;
	data: ICreateTimeBlockFields;
}
export const TimeBlockCreateTabs = ({
	isValid,
	isPending,
	data,
}: ITimeBlockCreateTabsProps) => {
	const [method, setMethod] = React.useState<TTabMethod>('drag-a-block');

	const handleChange = (e: React.SyntheticEvent, newMethod: TTabMethod) => {
		setMethod(newMethod);
	};

	return (
		<div className='w-full'>
			<Tabs
				value={method}
				onChange={handleChange}
				className='mb-4'
			>
				<Tab
					value='drag-a-block'
					label='Drag a block'
					className='w-1/2 hover:cursor-pointer'
				/>
				<Tab
					value='click-a-button'
					label='Click a button'
					className='w-1/2 hover:cursor-pointer'
				/>
			</Tabs>
			<div className='bg-secondary p-4'>
				{method === 'drag-a-block' && (
					<NewTimeBlock
						data={data}
						isValid={isValid}
					/>
				)}
				{method === 'click-a-button' && (
					<SubmitButton
						isValid={isValid}
						isPending={isPending}
						className='w-full'
					>
						Create
					</SubmitButton>
				)}
			</div>
		</div>
	);
};
