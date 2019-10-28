
export interface Topic {
    id: string;
    name: string;
    alias: string;
    createdAt: string;
    updatedAt: string;
    prerequisiteTopics: string[];
    knowledgeComponents: KnowledgeComponent[];
}

export interface KnowledgeComponent {
    kc: string;
    relevance: number;
}