function extractUsername(email) {
    // Using a regular expression to extract the username
    const match = email.match(/^([^@]+)/);

    // Check if there is a match and return the username, otherwise return null
    return match ? match[1] : null;
}

module.exports = extractUsername;
