
# Sevio React SDK

This is a **unofficial third-party** React client SDK for integrating [Sevio](https://sevio.com/) into your React applications. The SDK provides components and hooks to easily manage and display advertisements using Sevio's services.

## Table of Contents

- [Installation](#installation)
- [Getting Started](#getting-started)
    - [Provider Setup](#provider-setup)
    - [Using the `useSevio` Hook](#using-the-usesevio-hook)
    - [Sevio Context Properties](#sevio-context-properties)
    - [Advertisement Component](#advertisement-component)
- [API Reference](#api-reference)
    - [`SevioProvider`](#sevioprovider)
    - [`useSevio`](#usesevio)
    - [`SevioAdvertisement`](#sevioadvertisement)
- [Example](#example)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)


## Installation

Install the SDK via npm:

```bash
npm install git+https://github.com/ChristianTucker/sevio-react-sdk
````

## Getting Started

### Provider Setup

To use the Sevio SDK, you need to wrap your application with the `<SevioProvider>` component. This provider must be placed at a top level in your application and requires two properties: `accountId` and `inventoryId`, both of which are provided by Sevio.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { SevioProvider } from 'sevio-react-sdk/context';

const App = () => (
  <SevioProvider accountId="your-account-id" inventoryId="your-inventory-id">
    {/* Your application components */}
  </SevioProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### Using the `useSevio` Hook

The `useSevio` hook can be used to access Sevio context properties within your components. It provides access to various properties and methods to manage advertisements. However, this hook will likely go unused as advertisement state is managed automagically by the `<SevioAdvertisement>` component. `refreshZone` is only used in cases where you need direct control over advertisement refreshing, make sure to verify your use case with Sevio first, most people do not need this and it may get your account disabled if you abuse it.

```jsx
import React from 'react';
import { useSevio } from 'sevio-react-sdk/hooks';

const MyComponent = () => {
  const { initialized, advertisements, setAdvertisements, refreshZone, debugEnabled } = useSevio();
  // ...
  return ( ... );
};
```

### Sevio Context Properties

The `SevioContextProps` interface extends common Sevio properties and includes the following:

- `initialized: boolean`: Indicates if the SDK is initialized.
- `advertisements: SevioPlacement[][]`: A 2D array of advertisements.
- `setAdvertisements: React.Dispatch<React.SetStateAction<SevioPlacement[][]>>`: Function to update advertisements.
- `refreshZone: (zone: string) => void`: Function to refresh advertisements in a specific zone.
- `debugEnabled?: boolean`: Optional debug mode.

### Advertisement Component

The `SevioAdvertisement` component is used to display advertisements. This component automatically handles the state updates to show and hide advertisements based on its placement in the component tree.

```jsx
import React from 'react';
import { SevioAdvertisement } from 'sevio-react-sdk/components';

const AdComponent = () => (
  <SevioAdvertisement zone="header" adType="banner">
    {/* Optional children components */}
  </SevioAdvertisement>
);
```

## API Reference

### `SevioProvider`

Props:

- `accountId: string`: Your Sevio account ID.
- `inventoryId: string`: Your Sevio inventory ID.
- `debugEnabled?: boolean`: Optional. Enable debug mode.

### `useSevio`

Returns `SevioContextProps`:

- `initialized: boolean`
- `advertisements: SevioPlacement[][]`
- `setAdvertisements: React.Dispatch<React.SetStateAction<SevioPlacement[][]>>`
- `refreshZone: (adType: AdType, zone: string) => void`
- `debugEnabled?: boolean`

### `SevioAdvertisement`

Props:

- `accountId: string`: Your Sevio account ID.
- `inventoryId: string`: Your Sevio inventory ID.
- `zone: string`: The zone where the advertisement will be displayed.
- `adType: AdType`: The type of advertisement.
- `children?: React.ReactNode`: Optional children components.

## Example

Here is a complete example of how to use the Sevio SDK in a React application:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { SevioProvider, SevioAdvertisement } from 'sevio-react-sdk';

const AdSection = () => {
  return (
    <div>
        <SevioAdvertisement
          zone={"<INSERT_ZONE_ID>"}
          adType={AdType.Banner}
        />
    </div>
  );
};

const App = () => (
  <SevioProvider accountId="your-account-id" inventoryId="your-inventory-id">
    <AdSection />
  </SevioProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes or additions.

## Contact

For any questions or support with this SDK, please create an issue.

For any questions or support with sevio, please contact [support@sevio.com](mailto:support@sevio.com).


