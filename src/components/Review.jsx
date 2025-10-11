import { useFormik } from 'formik';
import { Button, FlatList, Pressable, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import { inputStyles } from '../styles/styles';
import Text from './Text';
import useReview from '../hooks/useReview';
import { useNavigate } from 'react-router-native';
import { ReviewItem } from './Repository';
import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';
import { ItemSeparator } from './RepositoryList';

const reviewFormValidationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .min(3, 'username must have at least 3 characters')
    .required('username is required'),
  repositoryName: Yup.string()
    .min(3, 'repository name must have at least 3 characters')
    .required(),
  rating: Yup.number().required(),
  text: Yup.string(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: null,
  text: '',
};

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: reviewFormValidationSchema,
    onSubmit,
  });

  return (
    <View style={inputStyles.formContainer}>
      <TextInput
        style={[
          inputStyles.input,
          formik.errors.username ? inputStyles.inputError : {},
        ]}
        placeholder='repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        style={[
          inputStyles.input,
          formik.errors.username ? inputStyles.inputError : {},
        ]}
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        style={[
          inputStyles.input,
          formik.errors.username ? inputStyles.inputError : {},
        ]}
        placeholder='Rating'
        value={Number(formik.values.rating)}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType='numeric'
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
        style={[
          inputStyles.input,
          formik.errors.username ? inputStyles.inputError : {},
        ]}
        placeholder='Review'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: 'red' }}>{formik.errors.text}</Text>
      )}
      <Pressable style={inputStyles.button} onPress={formik.handleSubmit}>
        <Text style={inputStyles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const Review = () => {
  const [review] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { createReview } = await review(values);

      navigate(`/${createReview.repositoryId}`);
    } catch (e) {
      console.log(e.errors[0].message);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: {
      includeReviews: true,
    },
  });

  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;

  const reviews = data ? data.me?.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews?.reverse()}
      renderItem={({ item }) => <ReviewItem review={item} myReviews={true} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default Review;
