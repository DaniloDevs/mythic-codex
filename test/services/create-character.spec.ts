import { beforeEach, describe, expect, it } from "vitest";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { CreateCharacterService } from "@/services/create-character";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";

describe("Create Character Service", () => {
   let characterRepository: CharacterImMemoryRepository;
   let userRepository: UserImMemoryRepository;
   let service: CreateCharacterService;

   beforeEach(() => {
      characterRepository = new CharacterImMemoryRepository();
      userRepository = new UserImMemoryRepository();
      service = new CreateCharacterService(characterRepository, userRepository);
   });

   it("Deve ser possivel criar uma personagem com dados validos", async () => {
      await userRepository.create({
         id: "user-01",
         name: "Jhon Doe",
         email: "ex@email.com",
         avatar: null,
         password: await hash("123456", 6),
      })

      const { character } = await service.execute({
         userId: "user-01",
         name: "Elara Stormwind",
         age: 27,
         rpgSystem: "Dungeon And Dragons",
         description: "A half-elf ranger who roams the forests of the North.",
         sheet: {
            level: 12,
            status: "death"
         },
         avatar: null,
         inventory: null,
      });

      expect(character.id).toEqual(expect.any(String));
   });

   it("Não deve ser possivel criar uma personagem para um usuario que não existe ", async () => {
     await expect(
         service.execute({
            userId: "u12345",
            name: "Elara Stormwind",
            age: 27,
            rpgSystem: "Dungeon And Dragons",
            description: "A half-elf ranger who roams the forests of the North.",
            sheet: {
               level: 12,
               status: "death"
            },
            avatar: null,
            inventory: null,
         })
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
   });

   it("Não deve ser possivel criar uma personagem sem uma sheet do sistema", async () => {
      await userRepository.create({
         id: "user-01",
         name: "Jhon Doe",
         email: "ex@email.com",
         avatar: null,
         password: await hash("123456", 6),
      })

      await expect(
         service.execute({
            userId: "user-01",
            name: "Elara Stormwind",
            age: 27,
            rpgSystem: "Dungeon And Dragons",
            description: "A half-elf ranger who roams the forests of the North.",
            sheet: {},
            avatar: null,
            inventory: null,
         })
      ).rejects.toBeInstanceOf(ResourceNotFoundError)
   })
});
