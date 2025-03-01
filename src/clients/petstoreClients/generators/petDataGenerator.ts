import { BaseGenerator } from '../../../shared/utils/baseGenerator';
import { petDto } from '../dtos/petDto';

export class PetDataGenerator extends BaseGenerator<petDto> {
  public constructor() {
    super({
      id: 1,
      category: {
        id: 1,
        name: 'string',
      },
      name: 'string',
      photoUrls:['string'],
      tags: ['string'],
      status: 'string',
    });
  }
}
