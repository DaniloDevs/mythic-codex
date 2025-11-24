export function calculateConditionsPoints({
	base,
	level,
	multiplier,
	attribute,
}: {
	base: number;
	attribute?: number;
	level: number;
	multiplier: number;
}) {
	const attr = attribute || 0;
	const result = base + attr + level * multiplier + level * attr;
	return Math.floor(result);
}
