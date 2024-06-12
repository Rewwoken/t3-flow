import clsx from 'clsx';
import { Loader } from 'lucide-react';

interface ISubmitButtonProps extends React.ComponentProps<'button'> {
	isPending: boolean;
	isValid: boolean;
}
export const SubmitButton = ({
	isPending,
	isValid,
	children,
	className,
	...props
}: ISubmitButtonProps) => {
	return (
		<button
			disabled={isPending || !isValid}
			type='submit'
			{...props}
			className={clsx(
				'rounded-sm bg-accent py-1 text-white hover:bg-accent disabled:bg-muted/10 disabled:text-muted/80',
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
		</button>
	);
};
