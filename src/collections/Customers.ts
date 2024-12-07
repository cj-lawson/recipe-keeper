import { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
    slug: 'customers',
    auth: false, // Supabase handles auth
    fields: [
        {
            name: 'databaseUserId',
            type: 'text',
            unique: true,
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
        },
        {
            name: 'name',
            type: 'text',
        }, 
        {
            name: 'savedRecipes',
            type: 'relationship',
            relationTo: 'recipes',
            hasMany: true,
        },
        {
            name: 'createdRecipes',
            type: 'relationship',
            relationTo: 'recipes',
            hasMany: true,
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'preferences',
            type: 'json',
        },
        {
            name: 'profilePhoto',
            type: 'upload',
            relationTo: 'media',
            required: false,
        },
    ]
}