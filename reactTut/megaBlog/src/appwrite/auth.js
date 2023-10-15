/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";

import { appwriteProjectId, appwriteURL } from '..conf';

export class AuthService{
    client= new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(appwriteURL)
            .setProject(appwriteProjectId);
        this.account = new Account(this.client);
        this.account.create('uzzuboi@gmail.com', '123456', 'Uzzu Boi');
    }
    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount ){
                //call another function to login
                return this.login
            }
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async login ({email, password}) {
        try {
            return  await this.account.createEmailSession(email, password);             
        } catch (error) {
            throw error;
        }
    }
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        
    }
    async logout() {
        try{
            await this.account.deleteSession('current');
        } catch (error) {
            throw error;
        }
        
    }
}

const authService = new AuthService();

export default authService;

