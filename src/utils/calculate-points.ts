export function calculatePoints({
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
	return base + attr + level * multiplier + level * attr;
}
