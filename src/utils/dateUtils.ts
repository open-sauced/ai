export const getRelativeDays = (days: number) => {
    if (days === 0) {
        return "-";
    }

    if (days >= 365) {
        return `${Math.floor(days / 365)}y`;
    }

    if (days > 30 && days < 365) {
        return `${Math.floor(days / 30)}mo`;
    }

    return `${days}d`;
};

interface PRResponse {
    data: [{
        full_name: string;
    }]
    meta: {
        itemCount: number;
    };
}

export const countUniqueFullNames = (response: PRResponse | null) => {
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
