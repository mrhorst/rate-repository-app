import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const inputValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'username must have at least 3 characters')
    .required('username is required'),
  password: yup
    .string()
    .min(8, 'password must contain at least 8 characters')
    .required('password is required'),
});

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

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: inputValidationSchema,
    onSubmit,
  });

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={[styles.input, formik.errors.username ? styles.inputError : {}]}
        placeholder='username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[styles.input, formik.errors.password ? styles.inputError : {}]}
        secureTextEntry
        placeholder='password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
