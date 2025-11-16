import {
	type CreateInputExpertise,
	type ExpertiseKey,
	type ExpertiseValue,
	expertisesAttributes,
	levelExpertiseBonus,
} from "@/@types/expertises-ordem-paranormal";

export function createExpertises(exp: ExpertiseKey, expValue: CreateInputExpertise) {
	const expertise = {
		[exp]: {
			rank: expValue.rank,
			attributes: expertisesAttributes[exp],
			rankBonus: levelExpertiseBonus[expValue.rank],
			trained: expValue.trained,
			secondBonus: expValue.secondBonus,
		} as ExpertiseValue,
	};

	return expertise;
}
