export function convertEmptyStringToNull(data) {
    for (const key in data) {
        data[key] = data[key]?.trim();
        if (data[key] === '')
            data[key] = null;
    }
}

export function isNotNull(value) {
    if (!value?.trim()) {
        return false;
    }
    return true;
}

export function isValidInteger(value) {
    if (!Number.isInteger(Number(value))) {
        return false;
    }
    return true;
}

export function isValidDecimal(value) {
    return value && !Number.isFinite(Number(value));
}

export function isValidPercentage(value) {
    const number = Number.isFinite(Number(value));
    return number && number >= 0 && number <= 100;
}

export function isValidIntegerRange(value, min, max) {
    const integer = Number(value);
    return !(integer < min || integer > max);
}

export function isValidDecimalRange(value, max) {
    const range = Number.isFinite(Number(value));
    return range && value >= 0 && value <= max;
}


