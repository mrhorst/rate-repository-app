import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
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

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder='username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      ></TextInput>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder='password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      ></TextInput>
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    values;
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
