# Binance WebSocket App

## Overview

The Binance WebSocket App is a mini-application designed to manage real-time pricing updates from the Binance cryptocurrency exchange. It allows users to select symbols and track their price changes, best bid and ask prices, and price change percentages through a WebSocket connection.

## Features

- Fetches exchange information from the Binance API.
- Allows users to create and manage a list of symbols.
- Connects to Binance WebSocket for real-time price updates.
- Displays the latest price updates, best bid and ask prices, and price change percentages for selected symbols.
- Responsive design for optimal viewing on various devices.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/binance-websocket-app.git
   ```

2. Navigate to the project directory:
   ```
   cd binance-websocket-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application

To start the application in development mode, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:
```
npm run build
```

The production build will be generated in the `build` directory.

## Usage

- Upon launching the application, users can select symbols from the provided list.
- The selected symbols will be displayed, and their price updates will be shown in real-time.
- Users can monitor the best bid and ask prices as well as the price change percentages.

## Testing

To run the unit tests, use:
```
npm test
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Binance API documentation: [Binance API Docs](https://binance-docs.github.io/apidocs/spot/en/#introduction)
- React documentation: [React Docs](https://reactjs.org/docs/getting-started.html)