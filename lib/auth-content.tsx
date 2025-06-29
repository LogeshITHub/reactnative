import { ID } from "appwrite";
import React, { createContext } from "react";
import { account } from "./appwrite";


type AuthContextType={
    // user: Models.User<Models.Preferences>|null
    signUp:(email:string,password:string)=> Promise<string | null>
    signIn:(email:string,password:string)=> Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({children}:{children :React.ReactNode}){

    const signUp = async (email:string,password:string)=>{
        try{
            await account.create(ID.unique(),email,password)
            await signIn(email,password)
            return null
        }catch (error) {
            if (error instanceof Error){
                return error.message
            }                
            return "An error occured in signUp"
        }
    }

    const signIn = async (email:string,password:string)=>{
        try{ 
            await account.createEmailPasswordSession(email,password)            
            return null
        }catch (error) {
            if (error instanceof Error){
                return error.message
            }                
            return "An error occured in signIn"
        }
    }

    return (
        <>
           <AuthContext.Provider
            value={{signUp , signIn}}
            >{children}
            </AuthContext.Provider>
        </>
    )
}
export function useAuth(){
 
}
