export const generatePasswordHtml = (password: string) => {
  return `
        <div>
            <h1 style="font-size: 24px; font-weight: 600; color: #333333; margin-bottom: 24px;">
                Your new password has been created!
            </h1>
            <p style="font-size: 16px; color: #333333; margin-bottom: 24px;">
                Your new password is: <h1>${password}</h1>
            </p>
            <p style="font-size: 16px; color: #333333; margin-bottom: 24px;">
                Please login with your email and new password.
            </p>
        </div>
    `;
};
