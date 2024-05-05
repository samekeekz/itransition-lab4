import {create} from 'zustand'
import {SignInSchema} from "@/libs/signinSchema/signInSchema";
import axios from "axios";

type Store = {
  count: number
  login: (data: SignInSchema) => Promise<any>
}
export const useAuthStore = create<Store>()((set) => ({
  count: 0,
  login: async (data) => {
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res;
  }
}))

