interface Props {
  isValid: boolean;
  name: string;
  occupation: string;
  phoneNo: string;
  email: string;
  location: string;
  about: string;
  skills: string;
}

export default function GeneralInfo(props: Props) {
  return (
    <div>
      <div className="mainHeader">
        {(props.isValid && props.name) || "Your Name"}
      </div>
      <div className="subHeader secondary">
        {(props.isValid && props.occupation) || "Occupation"}
      </div>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2em",
          paddingInlineStart: "0px",
        }}
      >
        <li>{(props.isValid && props.phoneNo) || "phone"}</li>
        <li>{(props.isValid && props.email) || "email"}</li>
        <li>{(props.isValid && props.location) || "location"}</li>
      </ul>
      <div>
        <div className="subHeader">Summary</div>
        <hr />
        {props.isValid && props.about ? (
          <div className="summary"> {props.about} </div>
        ) : (
          <div>About You</div>
        )}
      </div>
      <div>
        <div className="subHeader">Skills</div>
        <hr />
        <p>
          {(props.isValid && props.skills.replace(/,/g, " ● ")) ||
            "Your skills"}
        </p>
      </div>
    </div>
  );
}
