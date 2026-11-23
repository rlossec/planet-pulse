import { API_BASE_URL } from '../config.js';
import targetMessages from '../../i18n/en/targets.js';

function toNumber(value) {
    if (value === null || value === undefined || value === '') {
        return null;
    }
    return Number(value);
}

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

    const apiErrors = targetMessages.apiErrors;
    const fieldErrors = body?.errors && Object.values(body.errors)
        .map((code) => apiErrors[code] || apiErrors.UNEXPECTED_ERROR);

    if (fieldErrors?.length) {
        throw new Error([...new Set(fieldErrors)].join(' '));
    }

    throw new Error(apiErrors[body?.code] || apiErrors.UNEXPECTED_ERROR);
}

export async function createTarget(data) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/targets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toPayload(data))
        });
    } catch {
        throw new Error(targetMessages.form.apiError.network);
    }

    if (response.ok) {
        return;
    }

    await throwApiError(response);
}

export async function getTargets(isoCode2) {
    let response;
    try {
        response = await fetch(
            `${API_BASE_URL}/targets?isoCode2=${encodeURIComponent(isoCode2)}`
        );
    } catch {
        throw new Error(targetMessages.form.apiError.network);
    }

    if (!response.ok) {
        await throwApiError(response);
    }

    return response.json();
}

export async function updateTarget(id, data) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/targets/${encodeURIComponent(id)}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toUpdatePayload(data))
        });
    } catch {
        throw new Error(targetMessages.form.apiError.network);
    }

    if (response.ok) {
        return;
    }

    await throwApiError(response);
}

export async function deleteTarget(id) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/targets/${encodeURIComponent(id)}`, {
            method: 'DELETE'
        });
    } catch {
        throw new Error(targetMessages.form.apiError.network);
    }

    if (response.ok) {
        return;
    }

    await throwApiError(response);
}
