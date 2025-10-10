import { Pressable, TextInput, View } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import { inputStyles } from '../styles/styles';
import useSignUp from '../hooks/useSignUp';

const inputValidationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'username must have at least 5 characters')
    .max(30, 'username must have less than 30 characters')
    .required('username is required'),
  password: yup
    .string()
    .min(5, 'password must contain at least 5 characters')
    .max(50, 'password must contain less than 50 characters')
    .required('password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation must match password'
    )
    .required('password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

export const SignUpForm = ({ onSubmit }) => {
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
      <TextInput
        style={[
          inputStyles.input,
          formik.errors.passwordConfirmation ? inputStyles.inputError : {},
        ]}
        secureTextEntry
        placeholder='password confirmation'
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={{ color: 'red' }}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}
      <Pressable style={inputStyles.button} onPress={formik.handleSubmit}>
        <Text style={inputStyles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { createUser } = await signUp(values);
      const { username } = createUser;
      const { password } = values;

      const credentials = { password, username };

      await signIn(credentials);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
