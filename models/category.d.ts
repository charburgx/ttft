import type { ObjectId } from "mongodb";

type Category = {
    _id: ObjectId;
    name: string;
    description: string | null;
    created_at: string /* Date */ | null;
    updated_at: string /* Date */ | null;
};
