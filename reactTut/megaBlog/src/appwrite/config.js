/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import conf from '../conf';
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId
                }

            )
        } catch (error) {
            throw error;
        }
    }
    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            if (slug) {
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug,
                    {
                        title, 
                        content,
                        featuredImage,
                        status
                    }
                )
            }
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            if (slug) {
                await this.databases.deleteDocument(
                    conf.appwriteDatabaseId, 
                    conf.appwriteCollectionId,
                    slug
                )
                return true;
            }
        } catch (error) {
            console.log("Appwrite server :: deletePost :: error", error);
            return false;
        }        
    }
    async getPost(slug) {
        try {
            if (slug) {
                return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug
                )
            }
        } catch (error) {
            console.log('Appwrite server :: getPost :: error', error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log('Appwrite server :: getPosts :: error', error);
            return false;
        }
    }

    //file upload services
    async uploadFile (file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite server :: uploadFile :: error', error);
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
            if(fileId) {
                return await this.bucket.deleteFile(
                    conf.appwriteBucketId,
                    fileId
                )
            }
        } catch (error) {
            console.log('Appwrite server :: deleteFile :: error', error);
            return false;
        }
    }
     getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();

export default service;