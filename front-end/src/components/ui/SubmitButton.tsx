import { Loader } from 'lucide-react';

interface ISubmitButtonProps {
	isPending: boolean;
	isValid: boolean;
}
export const SubmitButton = ({
	isPending,
	isValid,
	children,
}: React.PropsWithChildren<ISubmitButtonProps>) => {
	return (
		<button
			disabled={isPending || !isValid}
			type='submit'
			className='rounded-sm bg-accent py-1 text-white hover:bg-accent disabled:bg-muted/10 disabled:text-muted/80'
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
