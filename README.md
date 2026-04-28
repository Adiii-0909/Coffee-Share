# ☕ CoffeeShare

Peer-to-peer file sharing in your browser. Encrypted direct transfer, password protection, one-time links, and live chat.

![CoffeeShare](public/images/share-card.png)

## What is CoffeeShare?

CoffeeShare is an open-source, purely peer-to-peer file transfer tool built with Next.js and WebRTC. It allows you to share files of any size directly between two devices without ever staging or storing your files on an intermediary server.

Your files. Your connection. We stay out of it.

### ✨ Features
- **Pure P2P**: Files stream directly from the sender to the receiver. No cloud storage, no middlemen.
- **End-to-End Encrypted**: All transfers occur over secure WebRTC DTLS channels.
- **Burn-after-pour Mode**: One-time links that auto-close the connection after the first successful download.
- **Password Protection**: Lock your transfer with a PIN for an extra layer of security.
- **Live Collaboration**: Built-in real-time chat so you can communicate without breaking your transfer flow.
- **Interactive Waiting Lounge**: Challenge your peer to built-in games (Pong, Tic-Tac-Toe, Connect 4, etc.) while you wait for large files to transfer.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/CoffeeShare.git
   cd CoffeeShare
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With
- **[Next.js 15](https://nextjs.org/)** - React Framework
- **[PeerJS](https://peerjs.com/)** - WebRTC wrapper for P2P connections
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling and UI
- **[Framer Motion](https://www.framer.com/motion/)** - Animations

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License
This project is open-source. Built with ❤️ for a better way to share.
