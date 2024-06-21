// I decided to move LexoRank logic to client side,
// because user can switch item order very fast so
// backend wouldn't be able to handle all queries in
// time so client won't have the up-to-date item ranks.
import { LexoRank } from 'lexorank';

/**
 * Generates a new LexoRank between two provided ranks.
 *
 * @param {string | undefined} prevRank - The rank immediately before the new rank, or undefined if it is the first item.
 * @param {string | undefined} nextRank - The rank immediately after the new rank, or undefined if it is the last item.
 * @returns {string | undefined} - The new rank as a string, or undefined if an error occurs.
 */
export const genRank = (
	prevRank: string | undefined,
	nextRank: string | undefined,
) => {
	try {
		// handle dropping to empty column case
		if (!prevRank && !nextRank) {
			return LexoRank.middle().toString();
		}

		// handle dropping as the first in the column
		if (!prevRank && nextRank) {
			// if(LexoRank.parse(prevRank).isMin()) // TODO: implement rebalance
			const lexorank = LexoRank.min().between(LexoRank.parse(nextRank));

			return lexorank.toString();
		}

		// handle dropping as the last in the column
		if (prevRank && !nextRank) {
			// if (LexoRank.parse(prevRank).isMax()) // TODO: implement rebalance
			const lexorank = LexoRank.parse(prevRank).between(LexoRank.max());

			return lexorank.toString();
		}

		// handle dropping between other items
		if (prevRank && nextRank) {
			const lexorank = LexoRank.parse(prevRank).between(
				LexoRank.parse(nextRank),
			);

			return lexorank.toString();
		}
	} catch (err) {
		return undefined; // TODO: improve error handling
	}
};
