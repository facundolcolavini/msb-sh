import { atom, map } from 'nanostores';

export type TabMenuPropertyStore = {
    video:boolean;
    gallery:boolean;
    pdf:boolean;
    blueprint:boolean;
    unitList:boolean;
}

export const tabMenuPropertyStore = map<TabMenuPropertyStore>({
    video: false,
    gallery: true,
    pdf: false,
    blueprint: false,
    unitList: false
})


export const setTabMenu = (tab: TabMenuPropertyStore) => {
    tabMenuPropertyStore.set({...tabMenuPropertyStore.get(), ...tab});
}

export const resetTabMenu = () => {
    tabMenuPropertyStore.set({
        video: false,
        gallery: true,
        pdf: false,
        blueprint: false,
        unitList: false
    });
}
