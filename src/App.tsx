import { useState } from "react";
import GeneralInfoForm from "./components/GeneralInfoForm";
import EduInfoForm from "./components/EduInfoForm";
import ExperienceForm from "./components/ExperienceForm";
import SwitchButton from "./components/SwitchButton";

function App() {
  const [readMode, setReadMode] = useState(false);

  return (
    <div className="mainPage">
      <div style={{ padding: "0.5rem" }}>
        <span className="secondary">Read </span>
        <SwitchButton readMode={readMode} setReadMode={setReadMode} />
        <span className="secondary"> Edit</span>
      </div>
      <div className="cvPage">
        <GeneralInfoForm readMode={readMode} />
        <EduInfoForm readMode={readMode} />
        <ExperienceForm readMode={readMode} />
      </div>
    </div>
  );
}

export default App;
