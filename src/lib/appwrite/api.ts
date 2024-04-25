//functions for creating new users.

import { INewUser } from "@/types";
import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases } from "./config";



export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.name,
            user.password,
        );

        if(!newAccount) {
            throw Error
        }

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
    })

        return newUser
    } catch (error) {
        console.log(error)
    }
}

 export async function saveUserToDB(user: {
     accountId: string;
     email: string;
     name: string;
     imageUrl: URL;
     username?: string;
 }) {
     try {
        const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user,
  )
  return newUser;
     } catch (error) {
  console.log(error)
     }
 }

export async function signInAccount(user: {
    email: string;
    password: string;
}) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error)
    }
}

export async function getCurrentUser() {
    try {
       const currentAccount = await account.get()
       
       if(!currentAccount) throw Error;

       //getting a list of all user document in the given collection
       const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accoutntId', currentAccount.$id)]
       )

       if(!currentUser) throw Error;

       return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}