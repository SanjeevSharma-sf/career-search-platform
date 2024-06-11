/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
// import { useDispatch } from "react-redux";
// import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/authSlice";
// import {
//   FormWrapper,
//   TermsAndConditionWrapper,
//   Button,
//   TermsAndConditionWrapperMobile,
// } from "./style";
// import NameInputs from "../../components/NameInputs/NameInputs";
// import LoginFieldsInput from "../../components/LoginFieldsInput/LoginFieldsInput";
import { setMessage } from "../../redux/messageSlice";
import { toast } from "react-toastify";
// import FormikControl from "../../components/FormikComponents/FormikControl";

const SignupForm = ({ setShowLoginModal, setShowSignUpModal, buttonStyle }) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleRegister = (values, setSubmitting) => {
  //   const { firstName, lastName, email, password, contactNo, checkBox } =
  //     values;
  //   setSubmitting(true);
  //   dispatch(
  //     register({
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       contactNo:
  //         contactNo?.slice(0, 2) === "+1"
  //           ? contactNo.replace(/^(\+1)/, "")
  //           : contactNo,
  //       checkBox,
  //     })
  //   )
  //     .unwrap()
  //     .then((result) => {
  //       if (result?.status === "ok") {
  //         dispatch(setMessage("Signed up successfully."));
  //         toast.success(result?.message);
  //         setShowLoginModal
  //           ? setShowLoginModal(false)
  //           : setShowSignUpModal
  //           ? setShowSignUpModal(false)
  //           : navigate("/book-now");
  //       } else {
  //         dispatch(setMessage(result?.message));
  //         toast.error(result?.message);
  //       }
  //       setSubmitting(false);
  //     })
  //     .catch(() => {
  //       setSubmitting(false);
  //     });
  // };

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    contactNo: "",
    checkBox: false,
  };
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required."),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required"),
    contactNo: Yup.string()
      .min(12, "Mobile number is too short")
      .max(12, "Mobile number is too long")
      .nullable(),
    // .required('This field is required.'),
    checkBox: Yup.boolean().oneOf([true], "This field is required"),
  });

  return (
    // <Formik
    //   initialValues={initialValues}
    //   validationSchema={validationSchema}
    //   onSubmit={(values, { setSubmitting }) =>
    //     handleRegister(values, setSubmitting)
    //   }
    // >
    //   {({ isSubmitting, values, setFieldValue }) => (
    //     <Form>
    //       <FormWrapper>
    //         <NameInputs setFieldValue={setFieldValue} />
    //         {(window.location.origin === "https://dev.tapnpark.app" ||
    //           window.location.hostname === "localhost") && (
    //             <div>
    //               <label style={{fontWeight:"600", fontSize:"13px",color: 'color: rgb(134 129 129);'}}>Mobile Number</label>
    //               <FormikControl
    //                 control="phoneinput"
    //                 name="contactNo"
    //                 placeholder="+1 xxx xxx xxx"
    //                 className="mobile-field"
    //                 labelClass="label-class"
    //                 errorMessage="error"
    //               />
    //               <ErrorMessage
    //                 name="contactNo"
    //                 component="div"
    //                 className="alert alert-danger"
    //               />
    //             </div>
    //           )}
    //         <LoginFieldsInput />
    //         <TermsAndConditionWrapper>
    //           <TermsAndConditionWrapperMobile>
    //             <Field
    //               type="checkbox"
    //               name="checkBox"
    //               id="checkBox"
    //               className="check-box"
    //             />
    //             <span className="terms-of-service" style={{ color: buttonStyle ? '#000' : null }}>
    //               I agree to the{" "}
    //               <strong
    //                 className="terms-of-use"
    //                 onClick={() => navigate("/terms-and-conditions")}
    //               >
    //                 Terms of Use
    //               </strong>{" "}
    //               and
    //               <strong
    //                 className="terms-of-use"
    //                 onClick={() => navigate("/privacy-policy")}
    //               >
    //                 {" "}
    //                 Privacy Policy
    //               </strong>
    //             </span>
    //           </TermsAndConditionWrapperMobile>
    //           <ErrorMessage
    //             name="checkBox"
    //             component="div"
    //             className="alert alert-danger"
    //           />
    //         </TermsAndConditionWrapper>

    //         <Button type="submit" style={buttonStyle ? buttonStyle : null} disabled={isSubmitting || !values?.checkBox}>
    //           Sign Up
    //         </Button>
    //       </FormWrapper>
    //     </Form>
    //   )}
    // </Formik>
    <input type="text" className="text" />
  );
};

export default SignupForm;
