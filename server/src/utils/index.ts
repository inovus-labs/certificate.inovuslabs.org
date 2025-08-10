
export const toISOString = (unixSeconds: any): string | null => {
    if (!unixSeconds || unixSeconds.toString() === "0") return null;
    const date = new Date(Number(unixSeconds.toString()) * 1000);
    return date.toISOString();
};


export function SerialDateToISOString(serial: number): string {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400; // seconds in a day
    const date = new Date(utc_value * 1000);
    return date.toISOString();
}