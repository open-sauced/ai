export interface PRResponse {
    data: {
        full_name: string;
    }[];
    meta: {
        itemCount: number;
    };
}

export const countUniqueRepos = (response: PRResponse | null): number => {
    if (!response?.data) {
        return 0;
    }

    const { data } = response;
    const uniqueRepos = new Set(data.map((obj) => obj.full_name));

    return uniqueRepos.size;
};
