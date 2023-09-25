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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          rowGap: "2em",
          columnGap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <div>&bull; {(props.isValid && props.phoneNo) || "phone"}</div>
        <div>&bull; {(props.isValid && props.email) || "email"}</div>
        <div>&bull; {(props.isValid && props.location) || "location"}</div>
      </div>
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
