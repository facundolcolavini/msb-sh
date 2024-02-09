import { map } from 'nanostores';
export type Gallery = {
    imagesProperty: string[];
}


export const galleryPropertyStore = map<Gallery>();

export const addGalleryProperty = (gallery: Gallery) => {
    galleryPropertyStore.set(gallery);
};

export const resetGalleryProperty = async (gallery: Gallery) => {
    galleryPropertyStore.set(gallery);
}