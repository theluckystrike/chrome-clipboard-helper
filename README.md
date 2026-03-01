# chrome-clipboard-helper — Clipboard Utilities for Chrome Extensions

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Zero Dependencies](https://img.shields.io/badge/dependencies-0-green.svg)]()

> **Built by [Zovo](https://zovo.one)**

**Copy text/HTML/images, read clipboard, paste events, and clipboard history** for MV3 extensions. Zero dependencies.

## 🚀 Quick Start
```typescript
import { ClipboardHelper, ClipboardHistory } from 'chrome-clipboard-helper';
await ClipboardHelper.copyText('Hello!');
await ClipboardHelper.copyHTML('<b>Bold</b>');
const history = new ClipboardHistory();
await history.add('copied text');
const results = await history.search('copied');
```

## 📄 License
MIT — [Zovo](https://zovo.one)
