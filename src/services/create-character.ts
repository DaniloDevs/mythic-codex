import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import type {
   Character,
   CharacterCreateInput,
   ICharacterRepository,
} from "@/repository/character-repository";
import type { IUserRepository } from "@/repository/user-repository";

interface RegisterCharacterResponse {
   character: Character;
}

export class CreateCharacterService {
   constructor(
      private characterRepository: ICharacterRepository,
      private userRepository: IUserRepository
   ) { }

   async execute(
      data: CharacterCreateInput,
   ): Promise<RegisterCharacterResponse> {
      const existUser = await this.userRepository.getById(data.userId)

      if (!existUser) {
         throw new ResourceNotFoundError();
      }
 
      if (!data.sheet || Object.keys(data.sheet).length === 0) {
         throw new ResourceNotFoundError()
      }

      const character = await this.characterRepository.create(data);

      return { character };
   }
}
