import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface Props {
  isValid: boolean;
  schoolName: string;
  studyTitle: string;
  studyDate: string;
  readMode: boolean;
  editBox: (id: string) => void;
  delBox: (id: string) => void;
  id: string;
}

export default function EduInfo(props: Props) {
  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "1rem",
        }}
        className=" secondary"
      >
        <div>{props.schoolName}</div>
        <span>({props.studyDate})</span>
        {props.readMode && (
          <>
            <AiOutlineEdit
              style={{ cursor: "pointer" }}
              color="green"
              onClick={() => props.editBox(props.id)}
            />
            <AiOutlineDelete
              style={{ cursor: "pointer" }}
              color="red"
              onClick={() => props.delBox(props.id)}
            />
          </>
        )}
      </div>
      <div>{props.studyTitle}</div>
    </div>
  );
}
