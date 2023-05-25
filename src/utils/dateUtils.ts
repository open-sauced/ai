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
