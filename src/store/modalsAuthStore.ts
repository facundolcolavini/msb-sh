import { atom, map } from 'nanostores';

export type ModalsAuthPropertyStore = {
   changeToLogin: boolean;
   changeToRegister:boolean;

}


export const modalAuthPropertyStore = map<ModalsAuthPropertyStore>({
    changeToLogin: false,
    changeToRegister:false
})

export const setModalAuth  = (modal: ModalsAuthPropertyStore) => {
    modalAuthPropertyStore.set({...modalAuthPropertyStore.get(), ...modal});
}

