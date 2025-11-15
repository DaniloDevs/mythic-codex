import z from "zod";
import {
	type EXPERTISE_ATTRIBUTES,
	ExpertiseRanksEnum,
} from "@/@types/ordem-paranormal-sheet";

/**
 * ============================================================================
 * TYPE DEFINITIONS - Tipos auxiliares para construção dos schemas
 * ============================================================================
 */

/**
 * ExpertiseKey - Tipo que representa as chaves do objeto EXPERTISE_ATTRIBUTES
 * Exemplo: "acrobatics" | "athletics" | "fighting" | ...
 * 
 * Usado para garantir type-safety ao iterar sobre as perícias.
 */
type ExpertiseKey = keyof typeof EXPERTISE_ATTRIBUTES;

/**
 * AttributeValue - Tipo que representa os valores possíveis de atributos
 * Exemplo: "agility" | "strength" | "intellect" | "presence" | "vigor"
 * 
 * Extrai os valores do objeto EXPERTISE_ATTRIBUTES para garantir que apenas
 * atributos válidos sejam usados.
 */
type AttributeValue = (typeof EXPERTISE_ATTRIBUTES)[ExpertiseKey];

/**
 * BaseExpertiseSchema - Estrutura base de uma perícia (usada no input)
 * 
 * Campos mínimos necessários para criar uma perícia:
 * - rank: Nível de proficiência (Untrained, Trained, Veteran, Expert)
 * - trained: Se a perícia está treinada (default: false)
 * - secondBonus: Bônus secundário adicional (pode ser 0)
 * 
 * Nota: Não inclui atributo nem rankBonus, pois esses são calculados automaticamente.
 */
type BaseExpertiseSchema = {
	rank: typeof ExpertiseRanksEnum;
	trained: z.ZodDefault<z.ZodBoolean>;
	secondBonus: z.ZodNumber;
};

/**
 * FullExpertiseSchema - Estrutura completa de uma perícia (usada na sheet completa)
 * 
 * Estende BaseExpertiseSchema com:
 * - attributes: Atributo base da perícia (literal type para type-safety)
 * - rankBonus: Bônus calculado baseado no rank (0, 5, 10 ou 15)
 * 
 * Esta estrutura é usada após os cálculos serem feitos, quando a ficha
 * já está completa e salva.
 */
type FullExpertiseSchema = BaseExpertiseSchema & {
	attributes: z.ZodLiteral<AttributeValue>;
	rankBonus: z.ZodNumber;
};

/**
 * Tipos de objetos Zod para type-checking dos retornos das funções
 */
type BaseExpertiseObject = z.ZodObject<BaseExpertiseSchema>;
type FullExpertiseObject = z.ZodObject<FullExpertiseSchema>;

/**
 * ============================================================================
 * FUNÇÕES DE CRIAÇÃO DE SCHEMAS DE PERÍCIAS
 * ============================================================================
 */

/**
 * createExpertises - Cria schemas completos de perícias para a ficha final
 * 
 * Esta função gera automaticamente um objeto de schemas Zod para todas as
 * perícias definidas em EXPERTISE_ATTRIBUTES, incluindo todos os campos necessários.
 * 
 * Lógica:
 * 1. Itera sobre cada entrada de EXPERTISE_ATTRIBUTES
 * 2. Para cada perícia, cria um schema Zod com:
 *    - rank: Nível de proficiência (validado pelo enum)
 *    - attributes: Atributo base (literal type para garantir correção)
 *    - rankBonus: Bônus numérico baseado no rank (calculado externamente)
 *    - trained: Flag de treinamento (default: false)
 *    - secondBonus: Bônus secundário adicional
 * 
 * Uso:
 * - Usado no schema OrdemParanormalSheet (ficha completa)
 * - Os valores de rankBonus e attributes já devem estar calculados
 * 
 * @param exp - Objeto EXPERTISE_ATTRIBUTES com mapeamento perícia -> atributo
 * @returns Objeto com schemas Zod para todas as perícias, tipado como Record
 * 
 * Exemplo de retorno:
 * {
 *   acrobatics: z.object({ rank, attributes: "agility", rankBonus, trained, secondBonus }),
 *   athletics: z.object({ rank, attributes: "strength", rankBonus, trained, secondBonus }),
 *   ...
 * }
 */
export function createExpertises(exp: typeof EXPERTISE_ATTRIBUTES) {
	return Object.entries(exp).reduce(
		(acc, [expertise, attr]) => {
			acc[expertise as ExpertiseKey] = z.object({
				rank: ExpertiseRanksEnum,
				attributes: z.literal(attr),
				rankBonus: z.number(),
				trained: z.boolean().default(false),
				secondBonus: z.number(),
			});
			return acc;
		},
		{} as Record<ExpertiseKey, FullExpertiseObject>,
	);
}

/**
 * createInputExpertises - Cria schemas simplificados de perícias para input de criação
 * 
 * Esta função gera schemas Zod apenas com os campos necessários para criar uma
 * nova ficha, excluindo campos que serão calculados automaticamente.
 * 
 * Diferenças em relação a createExpertises():
 * - NÃO inclui "attributes": Será inferido do mapeamento EXPERTISE_ATTRIBUTES
 * - NÃO inclui "rankBonus": Será calculado baseado no rank durante a criação
 * 
 * Lógica:
 * 1. Itera sobre cada entrada de EXPERTISE_ATTRIBUTES
 * 2. Para cada perícia, cria um schema Zod apenas com:
 *    - rank: Nível de proficiência escolhido pelo usuário
 *    - trained: Se a perícia está treinada (default: false)
 *    - secondBonus: Bônus secundário fornecido pelo usuário
 * 
 * Uso:
 * - Usado no schema OrdemParanormalCreateInput (dados de entrada)
 * - Permite que o sistema calcule automaticamente atributos e rankBonus
 * - Previne que o usuário forneça dados inconsistentes ou calculados incorretamente
 * 
 * @param exp - Objeto EXPERTISE_ATTRIBUTES com mapeamento perícia -> atributo
 * @param _attr - Parâmetro não utilizado (prefixado com _ para indicar intencional)
 * @returns Objeto com schemas Zod simplificados para todas as perícias
 * 
 * Exemplo de retorno:
 * {
 *   acrobatics: z.object({ rank, trained, secondBonus }),
 *   athletics: z.object({ rank, trained, secondBonus }),
 *   ...
 * }
 * 
 * Nota: O atributo base e rankBonus serão adicionados durante o processamento
 * da criação da ficha, garantindo consistência e cálculos corretos.
 */
export function createInputExpertises(exp: typeof EXPERTISE_ATTRIBUTES) {
	return Object.entries(exp).reduce(
		(acc, [expertise, _attr]) => {
			acc[expertise as ExpertiseKey] = z.object({
				rank: ExpertiseRanksEnum,
				trained: z.boolean().default(false),
				secondBonus: z.number(),
			});
			return acc;
		},
		{} as Record<ExpertiseKey, BaseExpertiseObject>,
	);
}
