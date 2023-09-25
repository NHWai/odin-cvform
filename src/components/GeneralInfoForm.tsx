import { useFormik } from "formik";
import { useState } from "react";
import Modal from "./Modal";
import GeneralInfo from "./GeneralInfo";
import { AiOutlineEdit } from "react-icons/ai";

interface Props {
  readMode: boolean;
}

export default function GeneralInfoForm({ readMode }: Props) {
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      occupation: "",
      email: "",
      phoneNo: "",
      location: "",
      about: "",
      skills: "",
    },
    validate: (values) => {
      const errors: {
        name?: string;
        occupation?: string;
        email?: string;
        phoneNo?: string;
        location?: string;
        about?: string;
        skills?: string;
      } = {};
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!values.email) {
        errors.email = "required";
      } else if (!emailRegex.test(values.email)) {
        errors.email = "Invalid Email Address";
      }

      const locationRegex = /^[A-Za-z\s]+,\s[A-Za-z\s]+$/; //Pattern "New York, USA"
      if (!values.location) {
        errors.location = "required";
      } else if (!locationRegex.test(values.location)) {
        errors.location = "Invalid Address";
      }

      if (!values.name) {
        errors.name = "required";
      }

      if (!values.occupation) {
        errors.occupation = "required";
      }

      if (!values.about) {
        errors.about = "required";
      }

      if (!values.skills) {
        errors.skills = "required";
      }

      const phoneNoRegex = /^[0-9]{2,4}-[0-9]{1,12}$/;
      if (!values.phoneNo) {
        errors.phoneNo = "required";
      } else if (!phoneNoRegex.test(values.phoneNo)) {
        errors.phoneNo = "Invalid Phone No";
      }

      return errors;
    },
    onSubmit: (values) => {
      setOpen(false);
    },
  });

  const closeModal = function () {
    setOpen(false);
    formik.resetForm();
  };

  const isValid = formik.isSubmitting && !open && formik.isValid;
  return (
    <div>
      {readMode && (
        <button
          style={{ color: "green", border: "1px solid green" }}
          onClick={() => setOpen(true)}
        >
          General Info <AiOutlineEdit />
        </button>
      )}
      <GeneralInfo
        name={formik.values.name}
        occupation={formik.values.occupation}
        about={formik.values.about}
        email={formik.values.email}
        location={formik.values.location}
        phoneNo={formik.values.phoneNo}
        skills={formik.values.skills}
        isValid={isValid}
      />

      <Modal open={open} closeModal={closeModal}>
        <div className="subHeader">General Info</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <small className="error">{formik.errors.name}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Occupation"
              {...formik.getFieldProps("occupation")}
            />
            {formik.touched.occupation && formik.errors.occupation ? (
              <small className="error">{formik.errors.occupation}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              type="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <small className="error">{formik.errors.email}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              type="location"
              placeholder="Township, State"
              {...formik.getFieldProps("location")}
            />
            {formik.touched.location && formik.errors.location ? (
              <small className="error">{formik.errors.location}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              type="tel"
              placeholder="PhoneNo: 09-[your number]"
              {...formik.getFieldProps("phoneNo")}
            />
            {formik.touched.phoneNo && formik.errors.phoneNo ? (
              <small className="error">{formik.errors.phoneNo}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <textarea
              placeholder="summary"
              rows={5}
              {...formik.getFieldProps("about")}
            />
            {formik.touched.about && formik.errors.about ? (
              <small className="error">{formik.errors.about}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <textarea
              rows={3}
              placeholder={`Skills \nFormat: Excel, Word, `}
              {...formik.getFieldProps("skills")}
            />
            {formik.touched.skills && formik.errors.skills ? (
              <small className="error">{formik.errors.skills}</small>
            ) : null}
          </div>
          <button
            style={{
              marginLeft: "auto",
              border: "1px solid #000",
            }}
            type="submit"
          >
            Done
          </button>
        </form>
      </Modal>
    </div>
  );
}
