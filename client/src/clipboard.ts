import { toaster } from 'evergreen-ui';

export const sendToClipboard = (value: string, description: string) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toaster.notify('Sent to clipboard', {
        description,
        duration: 2,
      });
    })
    .catch((err) => {
      toaster.danger('Failed to send to clipboard', {
        description: `${err.name} - ${err.message}`,
        duration: 2,
      });
    });
};
