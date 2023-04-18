export const getTwitterUsername = (url: string) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/\?\s]*)/);
    return match ? match[1] : undefined;
}
