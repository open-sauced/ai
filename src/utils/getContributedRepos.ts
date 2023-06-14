interface PRResponse {
    data: [{
        full_name: string;
    }]
    meta: {
        itemCount: number;
    };
}

export const countUniqueRepos = (response: PRResponse | null) => {
    if (!response?.data) {
        return 0;
    }

    const { data } = response;
    const uniqueFullNames = (new Set<string>);

    // eslint-disable-next-line no-loops/no-loops
    for (const obj of data) {
        uniqueFullNames.add(obj.full_name);
    }

    return uniqueFullNames.size;
}
