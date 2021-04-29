import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import ErrorDisplay from "../../components/ErrorDisplay";
import { axiosInstance } from "../../services/axios";
import AuthDialog from "../auth/AuthDialog";

const ContactForm = () => {
  const [openAuthDialog, setOpenAuthDialog] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [dialogMessage, setDialogMessage] = React.useState("");

  const closeAuthDialog = () => {
    setOpenAuthDialog(false);
  };

  const validate = Yup.object({
    email: Yup.string().required("Email address is required"),
    message: Yup.string()
      .min(50, "Must be More than 50 character")
      .max(500, "Must be 500 character or less")
      .required("Details is required"),
  });

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    axiosInstance
      .post(`/contactus/create/`, values)
      .then(() => {
        setSubmitting(false);
        resetForm({});
        setIsError(false);
        setDialogMessage(
          "contact info successfully sent, we'll get back to you soon."
        );
        setOpenAuthDialog(true);
      })
      .catch(() => {
        setSubmitting(false);
        setIsError(true);
        setDialogMessage(
          "sorry, we are experiencing iternal server error. try again later."
        );
        setOpenAuthDialog(true);
      });
  };
  return (
    <Formik
      initialValues={{
        email: "",
        message: "",
      }}
      onSubmit={(values, { setSubmitting, resetForm }) =>
        onSubmit(values, { setSubmitting, resetForm })
      }
      validationSchema={validate}
    >
      {({ handleChange, values, isSubmitting, touched, errors }) => (
        <Form className="lg:w-5/12  w-11/12">
          <AuthDialog
            isOpen={openAuthDialog}
            isClose={closeAuthDialog}
            isError={isError}
            content={dialogMessage}
          />
          <div className="flex flex-col mt-6">
            <label htmlFor="email">Email Address</label>
            <input
              className="auth-form-input"
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
            />
            <ErrorDisplay
              error={errors.email && touched.email && errors.email}
            />
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="email">Message</label>
            <textarea
              className="auth-form-input"
              id="message"
              name="message"
              type="text"
              onChange={handleChange}
              value={values.message}
            />
            <ErrorDisplay
              error={errors.message && touched.message && errors.message}
            />
          </div>
          <button
            className="mt-6 auth-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submiting" : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
