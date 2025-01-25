export interface ISuggestData {
    alias?: string;
    avatar?: string;
    name?: string;
    type: ESuggestionType;
}

export const enum ESuggestionType {
    COMPANY = "company",
    USER = "user"
}