import { Loader } from 'lucide-react';

export const Loading = ({ children }: React.PropsWithChildren) => {
	return (
		<div className='flex h-full w-full flex-col items-center justify-center'>
			{children}
			<Loader
				size={40}
				className='animate-spin'
			/>
		</div>
	);
};
