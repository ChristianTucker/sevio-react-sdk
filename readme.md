
# Sevio React SDK

This is a third-party React client SDK for integrating [Sevio](https://sevio.com/) into your React applications. The SDK provides components and hooks to easily manage and display advertisements using Sevio's services.

## Installation

Install the SDK via npm:

```bash
npm install sevio-react-sdk
```

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

The `useSevio` hook can be used to access Sevio context properties within your components. It provides access to various properties and methods to manage advertisements. You will likely `not need` any of these functions besides possibly `refreshZone` for custom use-cases; However please check with Sevio if you should be manually refreshing zones first. The `<SevioAdvertisement ...>` component below handles managing advertisement state for you.

```jsx
import React from 'react';
import { useSevio } from 'sevio-react-sdk/hooks';

const MyComponent = () => {
  const { initialized, advertisements, setAdvertisements, refreshZone } = useSevio();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Render your advertisements or other content */}
    </div>
  );
};
```

### Sevio Context Properties

The `SevioContextProps` interface extends common Sevio properties and includes the following:

- `accountId: string`: The accountId provided by Sevio
- `inventoryId: string`: The inventoryId provided by Sevio
- `initialized: boolean`: Indicates if the SDK is initialized.
- `advertisements: SevioAdvertisement[][]`: A 2D array of advertisements.
- `setAdvertisements: React.Dispatch<React.SetStateAction<SevioAdvertisement[][]>>`: Function to update advertisements.
- `refreshZone: (adType: AdType, zone: string) => void`: Function to refresh advertisements in a specific zone.

### Advertisement Component

The `SevioAdvertisement` component is used to display advertisements. This component automatically handles the state updates to show and hide advertisements based on its placement in the component tree.

```jsx
import React from 'react';
import { SevioAdvertisement } from 'sevio-react-sdk/components';

const AdComponent = () => (
  <SevioAdvertisement accountId="your-account-id" inventoryId="your-inventory-id" zone="header" adType="banner">
    {/* Optional children components */}
  </SevioAdvertisement>
);
```

## API Reference

### `SevioProvider`

Props:

- `accountId: string`: Your Sevio account ID.
- `inventoryId: string`: Your Sevio inventory ID.
- `debug?: boolean`: Optional. Enable debug mode.

### `useSevio`

Returns `SevioContextProps`:

- `accountId: string` Your Sevio account ID.
- `inventoryId: string` Your Sevio inventory ID.
- `initialized: boolean`
- `advertisements: SevioAdvertisement[][]`
- `setAdvertisements: React.Dispatch<React.SetStateAction<SevioAdvertisement[][]>>`
- `refreshZone: (adType: AdType, zone: string) => void`

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
import { SevioProvider, SevioAdvertisement, useSevio } from 'sevio-react-sdk';

const AdSection = () => {
  const { initialized, advertisements, refreshZone } = useSevio();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {advertisements.map((adRow, index) => (
        <div key={index}>
          {adRow.map((ad, idx) => (
            <SevioAdvertisement
              key={idx}
              accountId={ad.accountId}
              inventoryId={ad.inventoryId}
              zone={ad.zone}
              adType={ad.adType}
            />
          ))}
        </div>
      ))}
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

For any questions or support, please contact [support@sevio.com](mailto:support@sevio.com).
