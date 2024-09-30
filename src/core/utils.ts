export function toKebabCase(text: string): string {
    text = text.replace(/^ *?[A-Z]/, function (allStr) { return allStr.toLowerCase(); });
    text = text.replace(/_/g, '-');
    text = text.replace(/ *?[A-Z]/g, function (allStr, i) { return '-' + allStr.replace(/ /g, '').toLowerCase(); });

    return text;
}