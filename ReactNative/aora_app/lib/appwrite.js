import { Client, Account, ID, Avatars, Databases,Query, Storage} from 'react-native-appwrite';
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.th3.aora",
    projectId: "67019cde0031891a5468",
    databaseId: "67019f16002ac82d7210",
    userCollectionId: "67019f7300018e33ab70",
    videoCollectionId: "67019fc6002c23b2c792",
    storageId: "6701a25c0024edba80db"
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

const account = new Account(client);
const storage = new Storage(client)
const avatars = new Avatars(client)
const databases = new Databases(client)

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )

        if (!newAccount) throw new Error

        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountid: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            }

        )

        return newUser

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


export const signIn = async(email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }

}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await getAccount()

        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountid',currentAccount.$id)]
        )

        if(!currentUser ) throw Error

        return currentUser.documents[0]

    }catch(error){
        console.log(error)
        return null
    }

}
