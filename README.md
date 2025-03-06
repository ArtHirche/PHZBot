# 🤖 PHZBot - Discord Bot  

## 📌 About the Project

PHZBot is a **Discord moderation bot** built with **JavaScript** and **Discord.js**.  
It provides powerful **administration tools** such as **role management, banning, muting, emoji management, and automated welcome messages**.  

## 🚀 Features  

✅ **Welcome message** for new members.  
✅ **Commands with prefix** `phz.`  
✅ **Role management** (add/remove roles).  
✅ **Custom emoji management** (add/remove emojis).  
✅ **Moderation** (ban, unban, mute, unmute).  
✅ **Help command** (`phz.help`) to list all available commands.  
✅ **Ping command** (`phz.ping`) to check bot latency.  

## 📦 Setup and Installation  

### 1️⃣ Requirements  

- **Node.js** v16 or higher  
- **A bot token** from [Discord Developer Portal](https://discord.com/developers/applications)  
- **Manage Roles and Manage Messages permissions** for the bot  

### 2️⃣ Installation  

1️⃣ Clone this repository:  
   ```sh
   git clone https://github.com/ArtHirche/PHZBot
   ```
2️⃣ Navigate to the project folder:  
   ```sh
   cd PHZBot
   ```
3️⃣ Install dependencies:  
   ```sh
   npm install
   ```
4️⃣ Configure the **`.env`** file:  
   ```plaintext
   TOKEN=your_token_here
   PREFIX=phz.
   ```
5️⃣ Start the bot:  
   ```sh
   node src/index.js
   ```

## 🔧 Available Commands  

| Command | Description |
|---------|------------|
| `phz.help` | 📜 Lists all available commands. |
| `phz.ping` | 🏓 Checks bot latency. |
| `phz.role add @user @role` | ➕ Adds a role to a user. |
| `phz.role remove @user @role` | ➖ Removes a role from a user. |
| `phz.addemoji <name> <url>` | 😀 Adds a custom emoji to the server. |
| `phz.removeemoji <emoji>` | ❌ Removes an emoji from the server. |
| `phz.ban @user <reason>` | 🔨 Bans a user from the server. |
| `phz.unban <user_id>` | ✅ Unbans a previously banned user. |
| `phz.mute @user <time>` | 🔇 Mutes a user for a certain duration. |
| `phz.unmute @user` | 🔊 Unmutes a muted user. |

💡 **More commands coming soon!**  

---

Created by **Arthur Hirche** and **Larissa Lopes** 🚀  