import { CollectionConfig } from 'payload';

export const Profiles: CollectionConfig = {
    slug: 'profiles',
    auth: false, // Supabase handles auth
    fields: [
        {
            name: 'databaseUserId',
            type: 'number',
            unique: true,
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
        },
        {
            name: 'first_name',
            type: 'text',
        }, 
        {
            name: 'last_name',
            type: 'text',
        },
        {
            name: 'bio',
            type: 'text'
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