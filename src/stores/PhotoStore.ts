import { makeAutoObservable, runInAction } from 'mobx';
import api from '../api';
import { Photo, PhotosResponse } from '../types';

const INITIAL_PAGE = 1;
const DEFAULT_LIMIT = 20;

class PhotoStore {
  photos: Photo[] = []; // Array to hold fetched photos
  page: number = INITIAL_PAGE; // Current page for pagination
  limit: number = DEFAULT_LIMIT; // Number of photos per page
  loading: boolean = false; // Loading state
  error: string | null = null; // Error message

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPhotos(refresh: boolean = false) {
    // Check if already loading
    if (this.loading) return;
    this.loading = true;

    this.error = null;
    if (refresh) this.page = INITIAL_PAGE;

    try {
      const response = await api.get<PhotosResponse>('', {
        params: { page: this.page, limit: this.limit },
      });

      // Update photos array with new data
      runInAction(() => {
        this.photos = refresh
          ? response.data
          : [...this.photos, ...response.data];
        this.page += 1;
      });
    } catch (error) {
      let errorMessage = 'Неизвестная ошибка';
      if (error && typeof error === 'object') {
        const err = error as {
          response?: any;
          code?: string;
          message?: string;
        };
        if (err.response) {
          errorMessage = `Ошибка сервера (${err.response.status}): ${
            err.response.data?.message || 'Попробуйте позже'
          }`;
        } else if (
          err.code === 'ECONNABORTED' ||
          err.message?.includes('timeout')
        ) {
          errorMessage = 'Превышено время ожидания ответа от сервера';
        } else if (
          err.message === 'Network Error' ||
          err.message?.includes('Network')
        ) {
          errorMessage = 'Нет подключения к интернету';
        }
      }
      runInAction(() => {
        this.error = errorMessage;
        console.error(error);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const photoStore = new PhotoStore();
