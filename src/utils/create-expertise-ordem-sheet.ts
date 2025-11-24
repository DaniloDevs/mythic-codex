import {
	type ExpertiseInput,
	type ExpertiseValue,
	expertiseRanks,
	expertisesAttributes,
} from "@/@types/ordem-paranormal/expertises-ordem-paranormal";

export function createExpertiseValue(
	exp: keyof typeof expertisesAttributes,
	input: ExpertiseInput,
): ExpertiseValue {
	const attribute = expertisesAttributes[exp];
	const rankBonus = expertiseRanks[input.rank];

	return {
		rank: input.rank,
		trained: input.trained,
		secondBonus: input.secondBonus,
		attribute,
		rankBonus,
	};
}
