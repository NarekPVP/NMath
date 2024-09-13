# 📊 NMath - A Powerful Offline Math Research App

**NMath** is an open-source mathematical app that helps users explore and research mathematical functions, providing detailed results with graphs. Unlike other tools like Photomath, **NMath** works **offline**, completely free of charge.

## 🌟 Features

- 📶 **Works without Internet** - Fully functional offline.
- 🧮 **Mathematical Function Research** - Solve and graph functions effortlessly.
- 📈 **Graphical Visualization** - Get beautiful graphs and detailed function analysis.
- 🚀 **Cross-Platform** - Available on web and mobile platforms.
- ⚙️ **Open Source** - Free for everyone to use and contribute to.

## 🛠️ Tech Stack

- **Backend**: .NET 7 (C#) REST API
- **Web**: React (create-react-app)
- **Mobile**: React Native (Expo)

## 🖥️ Installation

### Backend (Server)

1. **Install .NET SDK 7**

- Follow the official installation guide [here](https://dotnet.microsoft.com/en-us/download/dotnet/7.0).

2. **Clone the Repository**:

```bash
git clone https://github.com/NarekPVP/NMath.git
cd NMath/NMathService
```

3. **Restore and Run:**

```bash
dotnet restore
dotnet run
```

The server should now be running on http://localhost:5000.

### Web App

1. **Navigate to Web Directory:**

```bash
cd ../nmath-client
```

2. **Install Dependencies** (You can use npm, yarn, pnpm, or any package manager):

```bash
npm install
```

3. **Run the App:**

```bash
npm start
```

The web app will be accessible at http://localhost:3000.

### Mobile App (Expo React Native)

1. **Install Expo CLI:**
If you don’t have Expo CLI installed, run:

```bash
npm install -g expo-cli
```

2. **Navigate to Mobile Directory:**

```bash
cd ../nmath-mobile-client
```

3. **Install Dependencies:**

```bash
npm install
```

4. **Run the App:**

```bash
npm run start
```

_You can now use the Expo Go app on your phone to scan the QR code and run the mobile app._

### 🚀 Usage

1.	Open the web or mobile app.
2.	Enter a mathematical function into the search field.
3.	View the results and explore the graph generated.
4.	The app works completely offline, so no internet connection is required.

#### 🧑‍💻 **Contributing**

Contributions are welcome! Feel free to submit a pull request or open an issue.

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Open a pull request with a detailed description of your changes.
