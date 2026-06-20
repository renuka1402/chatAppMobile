import Toast from 'react-native-toast-message';

export const showToast = ({ type, title, message }) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};

export const showSuccessToast = (title, message) => {
  showToast({ type: 'success', title, message });
};

export const showErrorToast = (title, message) => {
  showToast({ type: 'error', title, message });
};

export const showInfoToast = (title, message) => {
  showToast({ type: 'info', title, message });
};
