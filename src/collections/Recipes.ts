import type { CollectionConfig } from 'payload'
import { Categories } from './Categories'


export const Recipes: CollectionConfig = {
    slug: 'recipes',
    fields: [
        {
            name: 'isPublic',
            type: 'checkbox',
            defaultValue: true,
            label: 'Public Recipe'
        },
        {
            name: 'createdBy',
            type: 'relationship',
            relationTo: 'users',
            hasMany: false,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'mainImage',
            type: 'upload',
            relationTo: 'media',
        },
        
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'coreCategories',
            type: 'relationship',
            relationTo: 'categories',
            admin: {
                position: 'sidebar',
            }
        },
        {
            name: 'customCategories',
            type: 'array',
            fields: [
                {
                    name: 'category',
                    type: 'text',
                    required: false,
                }
            ],
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'tags',
            type: 'array',
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                }
            ]
        },
        {
            name: 'ingredients',
            type: 'array',
            fields: [
                {
                    name: 'ingredient',
                    type: 'text',
                    required: true,
                }
            ]
        },
        {
            name: 'directions',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'stepNumber',
                    type: 'number',
                    admin: {
                        readOnly: true, // Auto-generate this based on array position
                    },
                },
                {
                    name: 'instruction',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'stepImage',
                    type: 'upload',
                    relationTo: 'media',
                    admin: {
                        position: 'sidebar',
                    }
                }
            ],
            admin: {
                initCollapsed: true, // Collapses the list of steps in the CMS for cleaner UI
            }
        },
        {
            name: 'source',
            type: 'text',
            required: true,
        },
        {
            name: 'sourcePhoto',
            type: 'upload',
            relationTo: 'media'
        },
        {
            name: 'url',
            type: 'text',
        },
    ]
}