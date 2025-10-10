import { StyleSheet } from 'react-native';
import theme from '../theme';

export const inputStyles = StyleSheet.create({
  formContainer: {
    padding: 20,

    flex: 1,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 15,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.textWhite,
    fontWeight: theme.fontWeights.bold,
  },
});
