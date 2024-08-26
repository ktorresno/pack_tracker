export function ensureError(value: unknown): Error {
    return (value instanceof Error)
        ? value
        : getValidErrorObj(value);
}

function getValidErrorObj(value: unknown): Error{
    let stringified = '[Unable to stringify the thrown value]';
    try {
        stringified = JSON.stringify(value);
    } catch {
        console.error(`Class: AppError | Method: ensureError | Stringified error received: ${stringified}`);
    }
    return new Error(`This value was thrown as is, not through an Error: ${stringified}`);
}