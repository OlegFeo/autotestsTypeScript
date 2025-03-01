import { expect } from '@playwright/test';
import { AxiosResponse } from 'axios';

import config from '../../config';
import { BaseApiClient } from '../baseApiClient';

import { petDto } from './dtos/petDto';
import { PetDataGenerator } from './generators/petDataGenerator';


export class Petstore extends BaseApiClient {

  public static async addPet(id: number, category: object, name: string, photoUrls: object, tags: object, status:string
  ): Promise<AxiosResponse> {
    const petData: petDto = new PetDataGenerator()
      .setProperties({
        id,
        category,
        name,
        photoUrls,
        tags,
        status
      })
      .generate();
    return this.post(`${config.petstore}/pet`, {
      data: petData,
    });
  }

  public static async getPetById(petId: string): Promise<AxiosResponse<petDto>> {
    return this.get(`${config.petstore}/pet/${petId}`, {
    });
  }
}
