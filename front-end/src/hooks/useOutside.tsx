'use client';

import React from 'react';

/**
 * A custom hook that calls a given callback when the user clicks outside of the ref.current element.
 *
 * @param {() => void} callback - The callback to call when the user clicks outside of the ref.current element.
 * @returns {{ ref: React.MutableRefObject<any> }} - An object with a single property, ref, which is a ref that you should use to wrap the element that you want to detect outside clicks for.
 */
export function useOutside(callback: () => void) {
	// `<any>` is used to be able to pass this ref to any component
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
