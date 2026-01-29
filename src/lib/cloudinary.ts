export function getPublicId(url: string) {
    return url.split("/").pop()?.split(".")[0];
}