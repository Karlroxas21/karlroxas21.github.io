export function fixMarkdownSpacing(text: string): string {
    // Add space before opening ** or * when directly preceded by a word character
    // e.g. "about**Karl**" → "about **Karl**"
    return text.replace(/([a-zA-Z0-9])(\*{1,2})([a-zA-Z])/g, '$1 $2$3');
}
