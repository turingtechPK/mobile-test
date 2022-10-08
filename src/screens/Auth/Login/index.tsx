import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../../components/CustomButton';
import Logo from '../../../components/Logo';
import TextInput from '../../../components/TextInput';
import colors from '../../../config/colors';
import {Formik} from 'formik';
import {FieldsValidation} from '../../../settings/Validation';
import {login} from '../../../api/user.post';
import {showMessage} from 'react-native-flash-message';
import authToken from '../../../api/authToken';
import {addJwtToken} from '../../../store/jwt.slice';
import {useDispatch} from 'react-redux';
const Login = () => {
  const [submitting, setsubmitting] = useState(false);
  const dispatch = useDispatch();

  interface ValuesInterface {
    email: string;
    password: string;
  }
  const handleSubmit = async (values: ValuesInterface) => {
    console.log('xx', values);
    try {
      setsubmitting(true);
      const res = await login(values.email, values.password);
      console.log(res?.data?.access_token);
      setsubmitting(false);
      if (res?.data?.access_token) {
        let userToken = res?.data?.access_token;
        await authToken.storeToken(userToken);
        dispatch(addJwtToken({token: userToken}));
      } else {
        showMessage({
          message: 'Error',
          description: 'Invalid Credentails',
          type: 'danger',
        });
      }
    } catch (err) {
      console.log('eee', err);
      showMessage({
        message: 'Error',
        description: 'An Error Occured',
        type: 'danger',
      });
      setsubmitting(false);
    }
  };

  return (
    <View style={styles.root}>
      <Logo title="TURING TECHNOLOGIES" />
      <Formik
        validationSchema={FieldsValidation?.LoginValidationSchema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values, {resetForm}) => {
          console.log(values.email, values.password);
          // resetForm();
          handleSubmit(values);
        }}>
        {({handleChange, handleSubmit, values, errors, touched}) => (
          <View>
            <TextInput
              placeholder="Email"
              size="xl"
              name={'email'}
              value={values?.email}
              onChangeText={handleChange('email')}
              error={errors.email && touched.email && errors.email}
            />

            <TextInput
              placeholder="Password"
              value={values?.password}
              onChangeText={handleChange('password')}
              error={errors.password && touched.password && errors.password}
              size="xl"
              name={'password'}
              secureTextEntery={true}
            />

            <CustomButton
              title={'LOGIN'}
              onPress={handleSubmit}
              isLoading={submitting}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors?.background,
  },
});
