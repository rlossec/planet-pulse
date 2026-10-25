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

export async function createIndicator(data) {
    let response;
    try {
        response = await fetch(`${API_BASE_URL}/indicators`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toPayload(data))
        });
    } catch {
        throw new Error('Unable to reach the server. Please try again later.');
    }

    if (response.ok) {
        return;
    }

    let body = null;
    try {
        body = await response.json();
    } catch {
        // the response has no JSON body
    }

    if (body && body.errors) {
        throw new Error(Object.values(body.errors).join(' '));
    }
    throw new Error((body && body.message) || indicatorMessages.form.apiError.unexpected);
}