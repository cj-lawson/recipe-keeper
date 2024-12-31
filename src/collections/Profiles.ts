import { CollectionConfig } from 'payload';

export const Profiles: CollectionConfig = {
    slug: 'profiles',
    auth: false, // Supabase handles auth
    fields: [
        {
            name: 'email',
            type: 'email',
            required: false,
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
            name: 'username',
            type: 'text'
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
            hooks: {
                beforeChange: [
                  async ({ data, value, operation }) => {
                    if (operation === 'update' || operation === 'create') {
                      // Ensure savedRecipes is an array
                      const existingSavedRecipes = Array.isArray(data?.savedRecipes)
                        ? data?.savedRecipes
                        : [];
        
                      // Remove duplicates
                      const uniqueRecipes = Array.from(new Set(existingSavedRecipes));
        
                      return uniqueRecipes;
                    }
        
                    return value;
                  },
                ],
              },
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