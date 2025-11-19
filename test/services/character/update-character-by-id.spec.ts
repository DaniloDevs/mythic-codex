import { beforeEach, describe, expect, it } from "vitest";
import type { ICharacterRepository } from "@/repository/character-repository";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { UpdateCharacterByIdService } from "@/services/character/update-character-by-id";
import { createSlug } from "@/utils/create-slug";
import { createCharacterMock } from "../_mocks/character";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";

describe("Update Character By Id - Service", () => {
   let characterRepository: ICharacterRepository;
   let sut: UpdateCharacterByIdService;
   let userRepository: UserImMemoryRepository;

   beforeEach(() => {
      characterRepository = new CharacterImMemoryRepository();
      userRepository = new UserImMemoryRepository();

      sut = new UpdateCharacterByIdService(characterRepository);
   });

   it("It should be possible to update a character with an ID.", async () => {
      const user = await userRepository.create({
         id: "user-01",
         name: "Jhon Doe",
         email: "ex@email.com",
         avatar: null,
         password: "123456",
      });

      const { characterDataMocks } = createCharacterMock({ userId: user.id });

      const character = await characterRepository.create(characterDataMocks);

      const { character: updateCharacter } = await sut.execute({
         id: character.id,
         updateData: {
            age: 40
         },
      });

      expect(updateCharacter.age).toBe(40);
   });

   it("should be possible to update the name and generate the slug.", async () => {
      const user = await userRepository.create({
         id: "user-01",
         name: "Jhon Doe",
         email: "ex@email.com",
         avatar: null,
         password: "123456",
      });

      const { characterDataMocks } = createCharacterMock({ userId: user.id });

      const character = await characterRepository.create(characterDataMocks);

      const { character: updateCharacter } = await sut.execute({
         id: character.id,
         updateData: {
            name: "Vladimir Bura",
         },
      });

      expect(updateCharacter.slug).toBe(createSlug("Vladimir Bura"));
   });

   it('não deve ser possivel atualizar sem informar dados validos', async () => {
      const user = await userRepository.create({
         id: "user-01",
         name: "Jhon Doe",
         email: "ex@email.com",
         avatar: null,
         password: "123456",
      });

      await expect(() => sut.execute({ id: user.id, updateData: {} })).rejects.toBeInstanceOf(ResourceNotFoundError)
   })
   it('não deve ser possivel atualizar um personagem que não existe', async () => {
      await expect(() => sut.execute({ id: "non-exist-user", updateData: { age: 55 }})).rejects.toBeInstanceOf(ResourceNotFoundError)
   })
});
