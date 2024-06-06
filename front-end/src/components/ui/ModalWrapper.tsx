import { createPortal } from 'react-dom';

export const ModalWrapper = ({ children }: React.PropsWithChildren) => {
	return createPortal(
		<div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black/50'>
			{children}
		</div>,
		document.body,
	);
};
