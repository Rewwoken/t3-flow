import clsx from 'clsx';
import { Loader } from 'lucide-react';

interface IAuthButtonProps {
	isPending: boolean;
	isValid: boolean;
}

export const AuthButton = ({
	children,
	isPending,
	isValid,
}: React.PropsWithChildren<IAuthButtonProps>) => {
	return (
		<button
			disabled={isPending || !isValid}
			type='submit'
			className={clsx('rounded-sm py-1 text-white', {
				'bg-muted/10 text-muted/80': isPending || !isValid,
				'bg-accent/70 hover:bg-accent': !isPending && isValid,
			})}
		>
			{isPending ? <Loader size={24} className='mx-auto animate-spin' /> : children}
		</button>
	);
};
