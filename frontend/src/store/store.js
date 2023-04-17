import create from 'zustand';

export const useAuthStore = create(()=>({

    auth:{
        username:'',
        active : false
    },
    setUsername : (name)=> Set((state)=>({
        auth:{...state.auth,username:name}
    }))
}))