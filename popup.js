const urlInput = document.getElementById('url');
const methodSelect = document.getElementById('method');
const bodyTextAreaDiv = document.getElementById('body-text-area');
const bodyFormDataDiv = document.getElementById('form-fields');
const contentTypeSelect = document.getElementById('content-type');
const tabButtons = document.querySelectorAll('.tab-button');
const configSections = document.querySelectorAll('.config-section');
const statusDiv = document.getElementById('status');
const responseHeadersDiv = document.getElementById('response-headers');
const responseBodyDiv = document.getElementById('response-body');
const requestBodyTextarea = document.getElementById('request-body');
const addHeaderButton = document.getElementById('add-header');
const addParamButton = document.getElementById('add-param');
const addFormFieldButton = document.getElementById('add-form-field');
const sendButton = document.getElementById('send');
const copyResponseButton = document.getElementById('copy-response');
const resetButton = document.getElementById('reset-request');
const configTabs = document.querySelector('.config-tabs');

document.addEventListener('DOMContentLoaded', () => {
    configTabs.addEventListener('click', function (event) {
        if (event.target.classList.contains('tab-button')) {
            const tab = event.target.getAttribute('data-tab');

            tabButtons.forEach(btn => btn.classList.remove('active'));
            configSections.forEach(section => section.classList.remove('active'));

            event.target.classList.add('active');
            document.getElementById(tab).classList.add('active');
        }
    });

    function addKeyValue(targetDiv) {
        const newKeyValueDiv = document.createElement('div');
        newKeyValueDiv.classList.add('key-value');
        newKeyValueDiv.innerHTML = '<input type="text" placeholder="Key" class="key"><input type="text" placeholder="Value" class="value">';
        targetDiv.insertBefore(newKeyValueDiv, targetDiv.querySelector('[id^="add-"]'));
    }

    function getKeyValue(targetDiv) {
        const keyValuePairs = {};
        if (targetDiv) {
            const keyValueDivs = targetDiv.querySelectorAll('.key-value');
            keyValueDivs.forEach(keyValueDiv => {
                const keyInput = keyValueDiv.querySelector('.key');
                const valueInput = keyValueDiv.querySelector('.value');
                if (keyInput && valueInput) {
                    const key = keyInput.value.trim();
                    const value = valueInput.value.trim();
                    if (key !== '' || value !== '') {
                        keyValuePairs[key] = value;
                    }
                }
            });
            return keyValuePairs;
        } else {
            console.log(`The div was not found.`);
            return {};
        }
    }

    function getRequestBody(contentType) {
        if (contentType === 'multipart/form-data') {
            const formData = new FormData();
            const formDataRows = bodyFormDataDiv.querySelectorAll('.key-value');
            formDataRows.forEach(row => {
                const keyInput = row.querySelector('.key');
                const valueInput = row.querySelector('.value');
                const key = keyInput.value.trim();
                const value = valueInput.value.trim();
                if (key !== '') {
                    formData.append(key, value);
                }
            });
            return formData;
        } else if (contentType === 'application/json' && requestBodyTextarea.value.length > 0) {
            try {
                return JSON.stringify(JSON.parse(requestBodyTextarea.value));
            } catch (e) {
                alert('Invalid JSON in request body.');
                return null;
            }
        } else if (contentType === 'application/xml' || contentType === 'text/plain') {
            return requestBodyTextarea.value;
        }
        return requestBodyTextarea.value;
    }

    addHeaderButton.addEventListener('click', () => addKeyValue(document.getElementById('headers')));
    addParamButton.addEventListener('click', () => addKeyValue(document.getElementById('params')));
    addFormFieldButton.addEventListener('click', () => addKeyValue(bodyFormDataDiv));

    contentTypeSelect.addEventListener('change', () => {
        const selectedType = contentTypeSelect.value;
        bodyTextAreaDiv.classList.toggle('hidden', selectedType === 'multipart/form-data');
        bodyFormDataDiv.classList.toggle('hidden', selectedType !== 'multipart/form-data');
    });

    sendButton.addEventListener('click', sendFunction);
    copyResponseButton.addEventListener('click', () => {
        navigator.clipboard.writeText(responseBodyDiv.textContent);
    });

    resetButton.addEventListener('click', () => {
        urlInput.value = "";
        methodSelect.selectedIndex = 0;
        contentTypeSelect.selectedIndex = 0;
        setKeyValueInputs('headers', 'add-header', "Add Header");
        setKeyValueInputs('params', 'add-param', "Add Parameter");
        setKeyValueInputs('form-fields', 'add-form-field', "Add Field");
        requestBodyTextarea.value = '';
        bodyTextAreaDiv.classList.remove('hidden');
        bodyFormDataDiv.classList.add('hidden');
        statusDiv.textContent = "Status";
        statusDiv.className = 'status-default';
        responseHeadersDiv.textContent = "Headers:";
        responseBodyDiv.textContent = "Body:";
    });

    async function sendFunction() {
        try {
            const headers = getKeyValue(document.getElementById("headers"));
            const params = getKeyValue(document.getElementById("params"));
            const body = getRequestBody(contentTypeSelect.value);
            const request = {
                "method": methodSelect.value,
                "url": urlInput.value,
                "body": body,
                "headers": headers,
                "params": params
            };

            await fetchData(request);

        } catch (error) {
            statusDiv.textContent = `Status: Error`;
            statusDiv.className = '';
            statusDiv.classList.add('status-4xx');
            responseBodyDiv.textContent = `Error: ${error.message}`;
        }
    }

    function setKeyValueInputs(targetID, buttonId, buttonName) {
        const target = document.getElementById(targetID);
        target.innerHTML = "";
        const keyValueDiv = document.createElement('div');
        keyValueDiv.classList.add('key-value');
        keyValueDiv.innerHTML = `
            <input type="text" placeholder="Key" class="key">
            <input type="text" placeholder="Value" class="value">
        `;
        const addButton = document.createElement('button');
        addButton.id = buttonId;
        addButton.innerHTML = `<i class='fas fa-plus'></i>${buttonName}`;
        target.appendChild(keyValueDiv);
        target.appendChild(addButton);
    }

    async function fetchData(request) {
        try {
            let apiUrl = request.url;
            if (Object.entries(request.params).length > 0 && request.method === 'GET') {
                const queryParams = new URLSearchParams(request.params);
                apiUrl += `?${queryParams.toString()}`;
            }

            const fetchOptions = {
                method: request.method,
                headers: request.headers,
                body: request.method !== 'GET' ? request.body : null
            };

            const response = await fetch(apiUrl, fetchOptions);

            statusDiv.textContent = `Status: ${response.status} ${response.statusText}`;
            statusDiv.className = '';
            if (response.status >= 200 && response.status < 300) {
                statusDiv.classList.add('status-2xx');
            } else if (response.status >= 300 && response.status < 400) {
                statusDiv.classList.add('status-3xx');
            } else if (response.status >= 400 && response.status < 600) {
                statusDiv.classList.add('status-4xx');
            } else {
                statusDiv.classList.add('status-default');
            }

            const contentType = response.headers.get('Content-Type');
            responseHeadersDiv.textContent = `Headers:\n${Array.from(response.headers.entries()).map(pair => `${pair[0]}: ${pair[1]}`).join('\n')}`;

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                responseBodyDiv.textContent = `Body:\n${JSON.stringify(data, null, 2)}`;
            } else {
                const textData = await response.text();
                responseBodyDiv.textContent = `Body:\n${textData}`;
                if (textData.startsWith("<!DOCTYPE html>")) {
                    console.warn('Received HTML response, not JSON.');
                }
            }

        } catch (error) {
            console.error('Fetch error:', error);
            statusDiv.textContent = `Status: Error`;
            statusDiv.className = '';
            statusDiv.classList.add('status-4xx');
            responseBodyDiv.textContent = `Error: ${error.message}`;
        }
    }
});