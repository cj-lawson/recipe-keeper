import type { PayloadRequest } from "payload";

declare module "payload" {
    interface User {
        id: string; // Define the structure of your user object
        email: string;
        [key: string]: unknown; // Extendable for other custom fields
    }

    interface PayloadRequest {
        user?: User; // Extend the user field
    }
}
