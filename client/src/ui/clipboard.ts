import { toaster } from 'evergreen-ui';

export const sendToClipboard = (value: string, description: string) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      toaster.notify('Sent to clipboard', {
        id: 'clipboard-success',
        description,
        duration: 1,
      });
    })
    .catch((err) => {
      toaster.danger('Failed to send to clipboard', {
        id: 'clipboard-failure',
        description: `${err.name} - ${err.message}`,
        duration: 2,
      });
    });
};
