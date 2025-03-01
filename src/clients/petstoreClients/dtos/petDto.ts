export interface petDto {
  id: number;
  category: {
    id: number;
    name: string;
  };
  name: string;
  photoUrls:[string];
  tags: [string];
  status: string;
}
