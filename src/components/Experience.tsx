import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface Props {
  companyName: string;
  startDate: string;
  endDate: string;
  positionTitle: string;
  responsibilities: string;
  id: string;
  editBox: (id: string) => void;
  delBox: (id: string) => void;
  readMode: boolean;
}

export default function Experience(props: Props) {
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
        <div>{props.companyName}</div>
        <span>
          ({props.startDate} to {props.endDate})
        </span>
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
      <div>{props.positionTitle}</div>
      <div>
        {props.responsibilities.split(",").map((item, idx) => (
          <div style={{ marginLeft: "0.5rem" }} key={idx}>
            &bull; {item}
          </div>
        ))}
      </div>
    </div>
  );
}
