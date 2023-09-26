import { useFormik } from "formik";
import { useState } from "react";
import Modal from "./Modal";
import EduInfo from "./EduInfo";
import { AiOutlinePlus } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

interface Props {
  readMode: boolean;
}

interface Study {
  id: string;
  schoolName: string;
  studyTitle: string;
  studyDate: string;
}

export default function EduInfoForm({ readMode }: Props) {
  const [open, setOpen] = useState(false);
  const [studies, setStudies] = useState<Study[]>([]);

  const formik = useFormik({
    initialValues: {
      id: "",
      schoolName: "",
      studyTitle: "",
      studyDate: "",
    },
    validate: (values) => {
      const errors: {
        schoolName?: string;
        studyTitle?: string;
        studyDate?: string;
      } = {};

      if (!values.schoolName) {
        errors.schoolName = "required";
      }

      if (!values.studyTitle) {
        errors.studyTitle = "required";
      }

      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!values.studyDate) {
        errors.studyDate = "required";
      } else if (!dateRegex.test(values.studyDate)) {
        errors.studyDate = "Invalid Date";
      }

      return errors;
    },
    onSubmit: (values) => {
      let newVal: Study = { ...values };
      if (newVal.id === "") {
        newVal.id = uuidv4();
        setStudies((pre) => [...pre, newVal]);
      } else {
        const targetId = studies.findIndex((item) => item.id === newVal.id);
        setStudies((pre) => {
          const newStudy = [...pre];
          newStudy[targetId] = newVal;
          return newStudy;
        });
      }
      setOpen(false);
    },
  });

  function editBox(id: string) {
    const targetBox = studies.filter((item) => item.id === id)[0];
    setOpen(true);
    formik.setValues(targetBox);
  }

  function delBox(id: string) {
    setStudies((pre) => pre.filter((item) => item.id !== id));
  }

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
          onClick={() => {
            setOpen(true);
            formik.resetForm();
          }}
        >
          Edu Info <AiOutlinePlus />
        </button>
      )}
      <div className="subHeader">Educational Information</div>
      <hr />
      <br />
      <div className="cardContainer">
        {studies.map((item) => (
          <EduInfo
            key={item.id}
            id={item.id}
            editBox={editBox}
            delBox={delBox}
            readMode={readMode}
            schoolName={item.schoolName}
            studyDate={item.studyDate}
            studyTitle={item.studyTitle}
            isValid={isValid}
          />
        ))}
      </div>

      <Modal open={open} closeModal={closeModal}>
        <div>Education Info</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="School Name"
              {...formik.getFieldProps("schoolName")}
            />
            {formik.touched.schoolName && formik.errors.schoolName ? (
              <small className="error">{formik.errors.schoolName}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder={`Date of Completion`}
              {...formik.getFieldProps("studyDate")}
            />
            <small>(Format:dd/mm/yyyy)</small>
            {formik.touched.studyDate && formik.errors.studyDate ? (
              <small className="error">{formik.errors.studyDate}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Title of Study"
              {...formik.getFieldProps("studyTitle")}
            />
            {formik.touched.studyTitle && formik.errors.studyTitle ? (
              <small className="error">{formik.errors.studyTitle}</small>
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
