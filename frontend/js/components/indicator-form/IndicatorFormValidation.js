export default function hasPositiveIndicatorValue(data) {
    return Object.entries(data).some(([name, value]) =>
        name !== 'year'
        && value !== null
        && value !== ''
        && Number.isFinite(Number(value))
        && Number(value) > 0
    );
}