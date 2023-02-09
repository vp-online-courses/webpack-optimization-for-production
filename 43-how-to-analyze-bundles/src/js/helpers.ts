export function trim(value: string): string {
    return value
        .replace(/^\s+/, '')
        .replace(/\s+$/, '')
        .replace(/\s{2,}/g, ' ');
}