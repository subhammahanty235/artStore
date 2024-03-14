function transformEmailForOTP(email) {
    // Split the email address into local part and domain part
    const [localPart, domainPart] = email.split('@');

    // If local part is shorter than 5 characters, use it as is
    const maskedLocalPart = localPart.length <= 5 ? localPart : localPart.substring(0, 2) + '*'.repeat(localPart.length - 5);

    // Construct the transformed email
    const transformedEmail = maskedLocalPart  + domainPart;

    return transformedEmail;
}

export {transformEmailForOTP}