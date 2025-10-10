import { Pressable, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { inputStyles } from '../styles/styles';

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

export const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: inputValidationSchema,
    onSubmit,
  });

  return (
    <View style={inputStyles.formContainer}>
      <TextInput
        style={[
          inputStyles.input,
          formik.errors.username ? inputStyles.inputError : {},
        ]}
        placeholder='username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          inputStyles.input,
          formik.errors.password ? inputStyles.inputError : {},
        ]}
        secureTextEntry
        placeholder='password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={inputStyles.button} onPress={formik.handleSubmit}>
        <Text style={inputStyles.buttonText}>Sign in</Text>
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
