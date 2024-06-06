'use client';

import React from 'react';

export function useOutside(callback: () => void) {
	const ref = React.useRef<any>(null);

	React.useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			// call callback if ref.current is not under the cursor click
			if (
				ref.current &&
				event.target instanceof Node &&
				!ref.current.contains(event.target)
			) {
				callback();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [callback]);

	return { ref };
}
