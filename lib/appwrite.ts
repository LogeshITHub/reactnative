import { Account, Client, Databases } from 'appwrite';

// Load environment variables
const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// Export services
export const account = new Account(client);
export const databases = new Databases(client);
export default client;
