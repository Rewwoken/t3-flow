import { Button } from '@mui/material';
import clsx from 'clsx';
import { Loader } from 'lucide-react';

interface ISubmitButtonProps extends React.ComponentProps<'button'> {
	isPending: boolean;
	isValid: boolean;
}
export const SubmitButton = ({
	isPending,
	isValid,
	className,
	children,
}: ISubmitButtonProps) => {
	return (
		<Button
			type='submit'
			disabled={isPending || !isValid}
			variant='contained'
			className={clsx(
				'!text-white disabled:bg-muted/10 disabled:!text-muted/80',
				className,
			)}
		>
			{isPending ? (
				<Loader
					size={24}
					className='mx-auto animate-spin'
				/>
			) : (
				children
			)}
		</Button>
	);
};
