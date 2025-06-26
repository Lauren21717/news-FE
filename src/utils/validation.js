export const validateComment = (commentText) => {
    const errors = [];

    if (!commentText || commentText.trim().length === 0) {
        errors.push('Comment cannot be empty');
    }

    if (commentText && commentText.trim().length < 3) {
        errors.push('Comment must be at least 3 characters long');
    }

    if (commentText && commentText.length > 1000) {
        errors.push('Comment cannot exceed 1000 characters');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const sanitizeInput = (input) => {
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};