import {
  emailRegex,
  passwordWithOneUppercaseOneLowerCaseOneNumberMin8Chars,
} from "@/utils/regex";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("required").min(1).max(40),

  email: Yup.string()
    .required("a-valid-email-required")
    .matches(emailRegex, "a-valid-email-required"),

  password: Yup.string()
    .required("one-lowercase-one-uppercase-one-number-min-eight-chars-length")
    .matches(
      passwordWithOneUppercaseOneLowerCaseOneNumberMin8Chars,
      "one-lowercase-one-uppercase-one-number-min-eight-chars-length"
    ),

  confirmPassword: Yup.string()
    .required("passwords-must-match")
    .oneOf([Yup.ref("password")], "passwords-must-match"),
});

export default RegisterSchema;
