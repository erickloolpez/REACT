import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
// export const config = {
//     endpoint: "https://cloud.appwrite.io/v1",
//     platform: "com.th3.aora",
//     projectId: "67019cde0031891a5468",
//     databaseId: "67019f16002ac82d7210",
//     userCollectionId: "67019f7300018e33ab70",
//     videoCollectionId: "67019fc6002c23b2c792",
//     storageId: "6701a25c0024edba80db"
// }
export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.gea',
    projectId: '67432f9c002bc6aa80b3',
    databaseId: '674331b50018a66d36d3',
    userCollectionId: '674331d8002e272bc4a7',
    parkCollectionId: '675321c4003575daec87',
    reviewCollectionId: '6754f7c6001d20e7d936',
    storageId: '674333a2001ccefae41d'
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    reviewCollectionId,
    parkCollectionId,
    videoCollectionId,
    storageId
} = config

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


export const signIn = async (email, password) => {
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
    try {
        const currentAccount = await getAccount()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountid', currentAccount.$id)]
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
        return null
    }

}

export const getAllParks = async () => {
    try {
        const parks = await databases.listDocuments(
            databaseId,
            parkCollectionId,
            [Query.orderDesc('$createdAt')]
        )
        return parks.documents

    } catch (error) {
        throw new Error(error)
    }
}

export const getAllRiviews = async () => {
    try {
        const reviews = await databases.listDocuments(
            databaseId,
            reviewCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        return reviews.documents

    } catch (error) {
        throw new Error(error)
    }
}
export const getAllReviewsByPark = async (parkId) => {
    try {
        const reviews = await databases.listDocuments(
            databaseId,
            reviewCollectionId,
            [Query.equal('parks', parkId), Query.orderDesc('$createdAt')]
        )
        return reviews.documents

    } catch (error) {
        throw new Error(error)
    }
}

export const getAllReviewsByUser = async (userId) => {
    try {
        const reviews = await databases.listDocuments(
            databaseId,
            reviewCollectionId,
            [Query.equal('users', userId), Query.orderDesc('$createdAt')]
        )
        return reviews.documents

    } catch (error) {
        throw new Error(error)
    }
}

export const createReview = async (form) => {
    try {
        const newReview = await databases.createDocument(
            databaseId,
            reviewCollectionId,
            ID.unique(),
            {
                rating: form.rating,
                text: form.text,
                users: form.userId,
                parks: form.parkId
            }
        )
        return newReview
    } catch (error) {
        throw new Error(error)
    }

}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        )
        return posts.documents

    } catch (error) {
        throw new Error(error)
    }
}


export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents

    } catch (error) {
        throw new Error(error)
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')

        return session
    } catch (error) {
        throw new Error(error)
    }
}
