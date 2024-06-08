// I decided to move LexoRank logic to client side,
// because user can switch task order very fast so
// backend wouldn't able to handle all queries in time
// so client won't have the up-to-date task rank.
import { LexoRank } from 'lexorank';

/**
 * Generates a new LexoRank between two provided ranks.
 *
 * @param {string | null} prevRank - The rank immediately before the new rank, or null if it is the first item.
 * @param {string | null} nextRank - The rank immediately after the new rank, or null if it is the last item.
 * @returns {string | null} - The new rank as a string, or null if an error occurs.
 */
export const genRank = (prevRank: string | null, nextRank: string | null) => {
	try {
		// handle dropping to empty column case
		if (prevRank === null && nextRank === null) {
			return LexoRank.middle().toString();
		}

		// handle dropping as the first in the column
		if (prevRank === null && nextRank !== null) {
			// if(LexoRank.parse(prevRank).isMin()) // TODO: implement rebalance
			const lexorank = LexoRank.min().between(LexoRank.parse(nextRank));

			return lexorank.toString();
		}

		// handle dropping as the last in the column
		if (prevRank !== null && nextRank === null) {
			// if (LexoRank.parse(prevRank).isMax()) // TODO: implement rebalance
			const lexorank = LexoRank.parse(prevRank).between(LexoRank.max());

			return lexorank.toString();
		}

		// handle dropping between other tasks
		if (prevRank !== null && nextRank !== null) {
			const lexorank = LexoRank.parse(prevRank).between(
				LexoRank.parse(nextRank),
			);

			return lexorank.toString();
		}
	} catch (err) {
		return null; // TODO: improve error handling
	}

	return null;
};
