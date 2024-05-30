import { Loader } from 'lucide-react';
import s from '@/components/auth/auth.module.css';

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
			className={s.submit}
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
