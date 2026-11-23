import { API_BASE_URL } from '../config.js';
import indicatorMessages from '../../i18n/en/indicators.js';

function toNumber(value) {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    return Number(value);
}

// Builds the JSON expected by the backend DTO (AnnualIndicatorCreateDto)
function toPayload(data) {
    return {
        isoCode2: data.isoCode2,
        year: toNumber(data.year),
        co2: toNumber(data.co2),
        renewableEnergy: toNumber(data.renewableEnergy),
        forest: toNumber(data.forest),
        pm25: toNumber(data.pm25)
    };
}

// Builds the JSON expected by the backend DTO (AnnualIndicatorUpdateDto): indicators only,
// the country and the year of an existing entry never change
function toUpdatePayload(data) {
    return {
        co2: toNumber(data.co2),
        renewableEnergy: toNumber(data.renewableEnergy),
        forest: toNumber(data.forest),
        pm25: toNumber(data.pm25)
    };
}

async function throwApiError(response) {
    let body = null;
    try {
        body = await response.json();
    } catch {
        // The response body may be empty or not contain JSON.
    }

    const apiErrors = indicatorMessages.apiErrors;
    const fieldErrors = body?.errors && Object.values(body.errors)
        .map((code) => apiErrors[code] || apiErrors.UNEXPECTED_ERROR);

    if (fieldErrors?.length) {
        throw new Error([...new Set(fieldErrors)].join(' '));
    }

    throw new Error(apiErrors[body?.code] || apiErrors.UNEXPECTED_ERROR);
}

export async function createIndicator(data) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/indicators`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toPayload(data))
        });
    } catch {
        throw new Error(indicatorMessages.form.apiError.network);
    }

    if (response.ok) {
        return;
    }

    await throwApiError(response);
}

// Returns the indicator entries of a country, most recent year first (empty array if none)
export async function getIndicators(isoCode2) {
    let response;
    try {
        response = await fetch(
            `${API_BASE_URL}/indicators?isoCode2=${encodeURIComponent(isoCode2)}`
        );
    } catch {
        throw new Error(indicatorMessages.form.apiError.network);
    }

    if (!response.ok) {
        await throwApiError(response);
    }

    return response.json();
}

// Updates the 4 indicator values of one entry by its id (the backend answers 204 without body)
export async function updateIndicator(id, data) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/indicators/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toUpdatePayload(data))
        });
    } catch {
        throw new Error(indicatorMessages.form.apiError.network);
    }

    if (response.ok) {
        return;
    }

    await throwApiError(response);
}

// Deletes one indicator entry by its id (the backend answers 204 without body)
export async function deleteIndicator(id) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/indicators/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        });
    } catch {
        throw new Error(indicatorMessages.form.apiError.network);
    }

    if (response.ok) {
        return;
    }

    await throwApiError(response);
}