export interface IUserPR {
    readonly title: string;
    readonly author_login: string;
    readonly state: string;
    readonly created_at: string;
    readonly closed_at: string;
    readonly merged_at: string;
    readonly updated_at: string;
    readonly filesCount: number;
    linesCount: number;
    readonly merged: boolean;
    readonly draft: boolean;
    readonly full_name: string;
    readonly number: number;
    readonly additions: number;
    readonly deletions: number;
    readonly changed_files: number;
    readonly repo_id: number;
}

export interface Highlights {
    data: Highlight[];
    meta: HighlightsMeta;
}

export interface GeneralAPIResponse {
    data: Record<string, string>[];
    meta: Record<string, string>;
}

export interface Highlight {
    id: string;
    user_id: number;
    url: string;
    title: string;
    highlight: string;
    pinned: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    shipped_at: string;
    full_name: string;
    name: string;
    login: string;
}

interface HighlightsMeta {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}

// pages enum
export enum RepoQueryPages {
    Home = "home",
    Indexing = "indexing",
    Chat = "chat",
}
