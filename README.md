# API Tester - Chrome Extension

A handy Chrome extension to test your APIs directly from your browser! Send requests with various configurations and inspect the full response with ease.

[![Chrome Web Store](https://developer.chrome.com/static/docs/webstore/branding/image/tbyBjqi7Zu733AAKA5n4.png)](https://chromewebstore.google.com/detail/mini-api-test/penoflfnnofbobilcdclllkckijedngc)
[![Buy Me A Coffee](bmc-button.png)](https://www.buymeacoffee.com/jivfur)

Support my work by buying me a coffee! [https://www.buymeacoffee.com/jivfur](https://www.buymeacoffee.com/jivfur)

## Overview

API Tester is a lightweight and intuitive Chrome extension designed for developers and testers to quickly interact with RESTful APIs. Forget switching to separate tools – now you can send requests and analyze responses without leaving your browser.

## Key Features

* **Simple Request Builder:** Easily construct API requests by specifying the URL and HTTP method.
* **Custom Headers:** Add and manage custom HTTP headers for your requests.
* **URL Parameters:** Define and append query parameters to your API URLs.
* **Request Body Support:** Send data with various content types:
    * JSON (with basic validation).
    * Plain Text.
    * Form Data (key-value pairs).
* **Clear Response Display:** View the API response, including:
    * HTTP Status Code and Text (with color-coded indicators).
    * Complete Response Headers.
    * Formatted Response Body (with basic JSON formatting).
* **Easy Copy:** Quickly copy the entire response body to your clipboard for further use.
* **Clean Interface:** A user-friendly tabbed interface to organize your request details.
* **Reset Functionality:** Clear all request inputs with a single click.

## Installation

1.  **Visit the Chrome Web Store:** Go to the [API Tester Chrome Web Store listing](https://chromewebstore.google.com/detail/mini-api-test/penoflfnnofbobilcdclllkckijedngc).
2.  **Add to Chrome:** Click the "Add to Chrome" button.
3.  **Confirm Installation:** Click "Add extension" in the confirmation dialog.

The API Tester icon will now appear in your Chrome toolbar for easy access.

## How to Use

1.  **Open the Extension:** Click the API Tester icon in your Chrome toolbar.
2.  **Build Your Request:**
    * **URL & Method:** Enter the target API endpoint URL and select the HTTP method (GET, POST, PUT, DELETE, etc.).
    * **Headers:** Navigate to the "Headers" tab and click "Add Header" to include custom headers.
    * **Parameters:** Go to the "Parameters" tab and click "Add Parameter" to define URL query parameters.
    * **Body:** Select the "Body" tab, choose the Content-Type, and enter your request body. For Form Data, use the "Add Field" button.
3.  **Send the Request:** Click the "Send" button.
4.  **Inspect the Response:** The API response will be displayed below the request builder, showing the status, headers, and formatted body.
5.  **Copy Response:** Click the "Copy Response" button to copy the response body.
6.  **Start Again:** Use the "Reset Request" button to clear all fields for a new API test.

## Support and Feedback

If you encounter any issues or have suggestions for improvement, please feel free to:

* **Leave a review** on the [Chrome Web Store listing](https://chromewebstore.google.com/detail/mini-api-test/penoflfnnofbobilcdclllkckijedngc).
* **Report bugs or suggest features** on our [GitHub repository](https://github.com/jivfur/chrome-api-tester/issues).

Your feedback is valuable in making API Tester even better!

## Contributing

We welcome contributions from the community! If you're a developer and would like to help improve API Tester, please check out our [GitHub repository](https://github.com/jivfur/chrome-api-tester) for more information on how to contribute.

## Privacy Policy

API Tester is designed to function entirely **locally within your Chrome browser**. It does **not** transmit any of your API request data, headers, parameters, or response bodies to any external servers controlled by the developer (that's us).

**Data Handling:**

* All the information you enter into the extension (URLs, methods, headers, parameters, request bodies) is processed and used solely within your browser to make the API calls directly to the target server you specify.
* The extension does **not** collect, store, log, or share this data outside of your local machine.
* The response data from the APIs you test is displayed directly within the extension in your browser and is not sent to any external servers controlled by the developer.
* We do **not** track your browsing history or any other information unrelated to your direct use of the API Tester extension.

**Permissions:**

The extension may require certain permissions to function correctly (e.g., `activeTab`, `scripting`, `storage`). These permissions are used solely for the purpose of enabling the extension's features within your browser and are not used to collect or transmit personal or sensitive data externally.

**No External Data Collection:**

We want to assure you that we have no mechanisms in place to collect or access your API testing data once it's processed within your local Chrome browser.

If we ever introduce features that require the collection or transmission of data to external servers, we will clearly disclose this in a revised Privacy Policy and request your explicit consent.

**In summary, your API testing activity within the API Tester Chrome Extension remains private and local to your browser.**
