import { NextApiRequest } from 'next';
import { Payload } from 'payload';

export async function getRecipesByUser(req: NextApiRequest & { payload: Payload }, userId: string) {
    try {
        const result = await req.payload.find({
            collection: 'recipes',
            where: {
                createdBy: {
                    equals: userId,
                },
            },
            depth: 2,
        });
        return result.docs;
    } catch (error) {
        console.log('Error fetching recipes by user:', error);
        throw new Error('Failed to fetch recipes');
    }
}
