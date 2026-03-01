/**
 * Clipboard Helper — Copy/paste utilities for Chrome extensions
 */
export class ClipboardHelper {
    /** Copy text to clipboard (works in content scripts and popups) */
    static async copyText(text: string): Promise<boolean> {
        try {
            if (navigator.clipboard) { await navigator.clipboard.writeText(text); return true; }
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text; textarea.style.cssText = 'position:fixed;left:-9999px';
            document.body.appendChild(textarea); textarea.select();
            const result = document.execCommand('copy');
            document.body.removeChild(textarea);
            return result;
        } catch { return false; }
    }

    /** Copy HTML to clipboard */
    static async copyHTML(html: string): Promise<boolean> {
        try {
            const blob = new Blob([html], { type: 'text/html' });
            await navigator.clipboard.write([new ClipboardItem({ 'text/html': blob })]);
            return true;
        } catch { return false; }
    }

    /** Read text from clipboard */
    static async readText(): Promise<string> {
        try { return await navigator.clipboard.readText(); } catch { return ''; }
    }

    /** Copy image from URL to clipboard */
    static async copyImage(imageUrl: string): Promise<boolean> {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
            return true;
        } catch { return false; }
    }

    /** Listen for paste events */
    static onPaste(callback: (text: string, html?: string) => void): () => void {
        const handler = (e: ClipboardEvent) => {
            const text = e.clipboardData?.getData('text/plain') || '';
            const html = e.clipboardData?.getData('text/html') || undefined;
            callback(text, html);
        };
        document.addEventListener('paste', handler);
        return () => document.removeEventListener('paste', handler);
    }
}
