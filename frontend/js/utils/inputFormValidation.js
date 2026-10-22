export function convertEmptyStringToNull(data) {
    for (const key in data) {
        data[key] = data[key]?.trim();
        if (data[key] === '')
            data[key] = null;
    }
}

export function getCurrentYear() {
    return new Date().getFullYear();
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
    return isNotNull(value) && Number.isFinite(Number(value));
}

export function isValidPercentage(value) {
    const number = Number.isFinite(Number(value));
    return number && number >= 0 && number <= 100;
}

export function isValidIntegerRange(value, min, max) {
    const integer = Number(value);
    return Number.isInteger(integer) && integer >= min && integer <= max;
}

export function isValidDecimalRange(value, max) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 0 && number <= max;
}


