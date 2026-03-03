# chrome-clipboard-helper — Clipboard Helper

> **Built by [Zovo](https://zovo.one)** | `npm i chrome-clipboard-helper`

Chrome extension clipboard utilities — copy text/HTML/images, read clipboard, handle paste events, and clipboard history in Manifest V3. Zero dependencies.

## Features

- **Copy Text**: Copy plain text
- **Copy HTML**: Copy rich HTML
- **Copy Images**: Copy images to clipboard
- **Paste Events**: Handle paste events
- **Clipboard History**: Remember copied items

## Installation

```bash
npm install chrome-clipboard-helper
```

## Quick Start

```typescript
import { ClipboardHelper } from 'chrome-clipboard-helper';

const clipboard = new ClipboardHelper();

// Copy text
await clipboard.copyText('Hello, world!');

// Copy HTML
await clipboard.copyHTML('<b>Hello</b>');

// Read clipboard
const text = await clipboard.readText();

// Handle paste
clipboard.on('paste', (text) => {
  console.log('Pasted:', text);
});
```

## API Reference

### Methods

```typescript
clipboard.copyText(text: string): Promise<void>;
clipboard.copyHTML(html: string): Promise<void>;
clipboard.copyImage(dataUrl: string): Promise<void>;
clipboard.readText(): Promise<string>;
clipboard.readHTML(): Promise<string>;
clipboard.getHistory(): ClipboardItem[];
```

## License

MIT License — see [LICENSE](./LICENSE) for details.
