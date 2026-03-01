/**
 * Clipboard History — Track clipboard entries in storage
 */
export interface ClipboardEntry { text: string; timestamp: number; source?: string; }

export class ClipboardHistory {
    private key: string; private maxEntries: number;
    constructor(key: string = '__clipboard_history__', maxEntries: number = 100) { this.key = key; this.maxEntries = maxEntries; }

    async add(text: string, source?: string): Promise<void> {
        const entries = await this.getAll();
        entries.unshift({ text, timestamp: Date.now(), source });
        if (entries.length > this.maxEntries) entries.splice(this.maxEntries);
        await chrome.storage.local.set({ [this.key]: entries });
    }

    async getAll(): Promise<ClipboardEntry[]> {
        const result = await chrome.storage.local.get(this.key);
        return (result[this.key] as ClipboardEntry[]) || [];
    }

    async search(query: string): Promise<ClipboardEntry[]> {
        const all = await this.getAll();
        const q = query.toLowerCase();
        return all.filter((e) => e.text.toLowerCase().includes(q));
    }

    async clear(): Promise<void> { await chrome.storage.local.remove(this.key); }

    async remove(index: number): Promise<void> {
        const entries = await this.getAll();
        entries.splice(index, 1);
        await chrome.storage.local.set({ [this.key]: entries });
    }
}
