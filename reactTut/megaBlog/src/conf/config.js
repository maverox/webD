const conf = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_Id),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_Id),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_Id),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_Id),
}


export default conf;