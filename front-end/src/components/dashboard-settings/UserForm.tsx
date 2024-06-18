'use client';

import clsx from 'clsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUpdateUser } from '@/components/dashboard-settings/hooks/useUpdateUser';
import s from '@/components/dashboard-settings/settings.module.css';
import * as v from '@/components/dashboard-settings/settings.validation';
import { FieldWrapper } from '@/components/ui/FieldWrapper';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { IUpdateUserFields } from '@/types/settings.types';
import { IGetUserResponse } from '@/types/user.service.types';

interface IUserFormProps {
	user: IGetUserResponse;
}
export const UserForm = ({ user }: IUserFormProps) => {
	const { mutate: updateUser, isPending } = useUpdateUser();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<IUpdateUserFields>({ mode: 'onChange' });

	const onSubmit: SubmitHandler<IUpdateUserFields> = (values) => {
		updateUser(values);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			autoComplete='off'
			className={s.form}
		>
			<fieldset className={s.fieldset}>
				<legend className={s.legend}>User settings:</legend>
				<FieldWrapper
					label='Name'
					htmlFor='name-input'
					error={errors.name?.message}
					className='bg-background'
				>
					<input
						id='name-input'
						type='text'
						autoComplete='name'
						placeholder={user.name || 'Name'}
						{...register('name', v.name)}
						className={clsx(s.input, {
							'border-danger': !!errors.name?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Email'
					htmlFor='email-input'
					error={errors.email?.message}
					className='bg-background'
				>
					<input
						id='email-input'
						type='email'
						autoComplete='email'
						placeholder={user.email}
						{...register('email', v.email)}
						className={clsx(s.input, {
							'border-danger': !!errors.email?.message,
						})}
					/>
				</FieldWrapper>
				<FieldWrapper
					label='Password'
					htmlFor='password-input'
					error={errors.password?.message}
					className='bg-background'
				>
					<input
						id='password-input'
						type='password'
						autoComplete='new-password'
						placeholder='********'
						{...register('password', v.password)}
						className={clsx(s.input, {
							'border-danger': !!errors.password?.message,
						})}
					/>
				</FieldWrapper>
			</fieldset>
			<SubmitButton
				isValid={isValid}
				isPending={isPending}
			>
				Save
			</SubmitButton>
		</form>
	);
};
