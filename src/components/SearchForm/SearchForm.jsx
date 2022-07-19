import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsSearch } from 'react-icons/bs';
import { Formik } from 'formik';
import { FormikForm, Btn, Input } from './SearchForm.styled';

export const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    if (values.query.trim() === '') {
      return toast('Please, enter the text');
    }
    onSubmit(values);
    resetForm();
  };

  return (
    <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
      <FormikForm>
        <Btn type="submit" aria-label="search">
          <BsSearch size={22} />
        </Btn>
        <Input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </FormikForm>
    </Formik>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
