import { useFormik } from "formik";
import { useState } from "react";
import Modal from "./Modal";
import Experience from "./Experience";
import { v4 as uuidv4 } from "uuid";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  readMode: boolean;
}

interface Experience {
  id: string;
  companyName: string;
  positionTitle: string;
  responsibilities: string;
  startDate: string;
  endDate: string;
}

const initialValues = {
  id: "",
  companyName: "",
  positionTitle: "",
  responsibilities: "",
  startDate: "",
  endDate: "",
};

export default function ExperienceForm({ readMode }: Props) {
  const [open, setOpen] = useState(false);
  const [exp, setExp] = useState<Experience[]>([]);

  const formik = useFormik({
    initialValues: initialValues,
    validate: (values) => {
      const errors: {
        companyName?: string;
        positionTitle?: string;
        responsibilities?: string;
        startDate?: string;
        endDate?: string;
      } = {};

      if (!values.companyName) {
        errors.companyName = "required";
      }

      if (!values.positionTitle) {
        errors.positionTitle = "required";
      }

      if (!values.responsibilities) {
        errors.responsibilities = "required";
      }

      if (!values.startDate) {
        errors.startDate = "required";
      }

      return errors;
    },
    onSubmit: (values) => {
      let newVal: Experience;
      if (!values.endDate) {
        newVal = { ...values, endDate: "Present" };
      } else {
        newVal = { ...values };
      }
      if (newVal.id === "") {
        newVal.id = uuidv4();
        setExp((pre) => [...pre, newVal]);
      } else {
        const targetId = exp.findIndex((item) => item.id === newVal.id);
        setExp((pre) => {
          const newExp = [...pre];
          newExp[targetId] = newVal;
          return newExp;
        });
      }

      setOpen(false);
    },
  });

  function editBox(id: string) {
    const targetBox = exp.filter((item) => item.id === id)[0];
    setOpen(true);
    formik.setValues(targetBox);
  }

  function delBox(id: string) {
    setExp((pre) => pre.filter((item) => item.id !== id));
  }

  const closeModal = function () {
    setOpen(false);
    formik.resetForm();
  };

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
          Work Exp <AiOutlinePlus />
        </button>
      )}
      <div className="subHeader">Work Experience</div>
      <hr />
      <br />

      <div className="cardContainer">
        {exp.map((item) => (
          <Experience
            key={item.id}
            id={item.id}
            responsibilities={item.responsibilities}
            companyName={item.companyName}
            endDate={item.endDate}
            startDate={item.startDate}
            positionTitle={item.positionTitle}
            editBox={editBox}
            delBox={delBox}
            readMode={readMode}
          />
        ))}
      </div>

      <Modal open={open} closeModal={closeModal}>
        <div style={{ fontSize: "1.8em" }}>Work Experience Info</div>
        <form onSubmit={formik.handleSubmit}>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Company Name"
              {...formik.getFieldProps("companyName")}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <small className="error">{formik.errors.companyName}</small>
            ) : null}
          </div>
          <div className="inputContainer">
            <input
              type="text"
              placeholder="Position Title"
              {...formik.getFieldProps("positionTitle")}
            />
            {formik.touched.positionTitle && formik.errors.positionTitle ? (
              <small className="error">{formik.errors.positionTitle}</small>
            ) : null}
          </div>

          <div className="inputContainer">
            <textarea
              rows={4}
              placeholder={`Format:write your responsiblities seperated by comma`}
              {...formik.getFieldProps("responsibilities")}
            />
            {formik.touched.responsibilities &&
            formik.errors.responsibilities ? (
              <small className="error">{formik.errors.responsibilities}</small>
            ) : null}
          </div>

          <div className="inputContainer">
            <input
              type="text"
              placeholder="Start Date"
              {...formik.getFieldProps("startDate")}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
              <small className="error">{formik.errors.startDate}</small>
            ) : null}
          </div>

          <div className="inputContainer">
            <input
              type="text"
              placeholder="End Date"
              {...formik.getFieldProps("endDate")}
            />
            <small>Left blank for current work</small>
            {formik.touched.endDate && formik.errors.endDate ? (
              <small className="error">{formik.errors.endDate}</small>
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
