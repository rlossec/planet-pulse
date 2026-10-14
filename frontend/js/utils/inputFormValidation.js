export function convertEmptyStringToNull(data) {
    for (const key in data) {
        if (data[key] === '')
            data[key] = null;
    }
}

export function validateRequiredValue(value, errorMessage) {
    if (!value?.trim()) {
        return errorMessage;
    }

    return null;
}

export function validateInteger(value, errorMessage) {
    if (!Number.isInteger(Number(value))) {
        return errorMessage;
    }

    return null;
}

export function validateDecimal(value, errorMessage) {
    if (value && !Number.isFinite(Number(value))) {
        return errorMessage;
    } 
}

export function validateIntegerRange(value, min, max, errorMessage) {
    const integer = Number(value);
    if (integer < min || integer > max) {
        return errorMessage;
    }
    return null;
}

export function validateIndicatorRange(value, max,errorMessage) {
    const range = Number(value);
    if (range < 0 || range > max) {
        return errorMessage + max;
    }

    return null;
}

export function validateAtLeastOneIndicator(data, errorMessage) {
    const indicatorValues = [data.co2, data.renewableEnergy, data.forest, data.pm25];
    let allFieldsEmpty = true;
    for (const value of indicatorValues) {
        if (value !== null)
            allFieldsEmpty = false;
    }                                
    return allFieldsEmpty ? errorMessage : null;
}
