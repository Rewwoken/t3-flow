import { TextField } from '@mui/material';
import { MuiColorInput } from 'mui-color-input';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRankedCreate } from '@/components/dashboard-time-blocking/hooks/useRankedCreate';
import { TimeBlockCreateTabs } from '@/components/dashboard-time-blocking/time-block-create/TimeBlockCreateTabs';
import * as v from '@/components/dashboard-time-blocking/time-block-create/time-block-create.validation';
import { ICreateTimeBlockFields } from '@/types/time-block.types';

export const TimeBlockCreate = () => {
	const { rankedCreate, isPending } = useRankedCreate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		control,
		watch,
	} = useForm<ICreateTimeBlockFields>({
		mode: 'onChange',
		defaultValues: {
			color: 'rgb(0, 0, 0)',
		},
	});

	const onSubmit: SubmitHandler<ICreateTimeBlockFields> = (values) => {
		values.color = values.color.replaceAll(' ', ''); // class-validator @IsRgbColor()

		rankedCreate(values);
	};

	return (
		<div className='flex w-96 flex-col'>
			<h2 className='mb-4 text-xl'>Build a new time block:</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-y-4'
			>
				<TextField
					id='time-block-name-input'
					label='Name'
					type='text'
					autoComplete='off'
					variant='filled'
					size='medium'
					{...register('name', v.name)}
					error={!!errors.name?.message}
					helperText={errors.name?.message}
				/>
				<TextField
					id='time-block-minutes-input'
					label='Duration(minutes)'
					type='text'
					autoComplete='off'
					variant='filled'
					size='medium'
					{...register('minutes', v.minutes)}
					error={!!errors.minutes?.message}
					helperText={errors.minutes?.message}
				/>
				<Controller
					name='color'
					control={control}
					rules={v.color}
					render={({ field: { onChange, value, ref } }) => (
						// Potential improvement: make validation & editing & color picking work together
						<MuiColorInput
							label='Color'
							format='rgb'
							variant='filled'
							size='medium'
							value={value}
							onChange={onChange}
							inputProps={{
								ref,
								readOnly: true,
							}}
							error={!!errors.color?.message}
							helperText={errors.color?.message}
						/>
					)}
				/>
				<TimeBlockCreateTabs
					isPending={isPending}
					isValid={isValid}
					data={watch()}
				/>
			</form>
		</div>
	);
};
