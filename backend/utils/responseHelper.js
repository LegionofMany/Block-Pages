const success = (message, data = null) => ({
    status: 'success',
    message,
    data
});

const error = (message, data = null) => ({
    status: 'error',
    message,
    data
});

export default { success, error };