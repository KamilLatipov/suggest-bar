import {makeRequest} from "@/shared/client.ts";
import type {ISuggestData} from "@/features/suggestion/models";

export async function getCompaniesRequest(query: string): Promise<ISuggestData[]> {
    try {
        const payload = await makeRequest<ISuggestData[]>('https://habr.com/kek/v2/publication/suggest-mention', {}, {
            q: query
        });

        return payload;
    } catch (e) {
        throw new Error(e.message);
    }
}