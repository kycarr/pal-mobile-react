import { KnowledgeComponent } from '../models/KnowledgeComponent';

export interface Topic {
    id: string;
    name: string;
    alias: string;
    createdAt: string;
    updatedAt: string;
    prerequisiteTopics: string[];
    knowledgeComponents: KnowledgeComponent[];
}