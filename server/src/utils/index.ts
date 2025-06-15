
export const toISOString = (unixSeconds: any): string | null => {
    if (!unixSeconds || unixSeconds.toString() === "0") return null;
    const date = new Date(Number(unixSeconds.toString()) * 1000);
    return date.toISOString();
};