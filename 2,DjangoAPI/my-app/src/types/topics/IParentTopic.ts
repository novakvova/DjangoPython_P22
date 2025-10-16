import type {IChildTopic} from "./IChildTopic.ts";

export interface IParentTopic {
    id: number;
    name: string;
    url_slug: string;
    priority: number;
    image?: string;
    description: string;
    children: IChildTopic[];
}