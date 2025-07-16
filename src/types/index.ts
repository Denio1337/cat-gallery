// API types
export interface Photo {
  id: string;
  url: string;
  width: number;
  height: number;
}

export type PhotosResponse = Photo[];
