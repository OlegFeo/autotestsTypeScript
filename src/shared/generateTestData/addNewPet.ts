import { Petstore } from '../../clients/petstoreClients/petstore';

export class AddNewPet {
  public static async addNewPet(): Promise<any> {
    await Petstore.addPet(1, { id: 1, name: 'dog' }, 'Taxa', [], [], 'sleep');
  }
}
