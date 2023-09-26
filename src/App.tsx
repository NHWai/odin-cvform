import { useState, useRef } from "react";
import GeneralInfoForm from "./components/GeneralInfoForm";
import EduInfoForm from "./components/EduInfoForm";
import ExperienceForm from "./components/ExperienceForm";
import SwitchButton from "./components/SwitchButton";
import ReactToPrint from "react-to-print";

function App() {
  const [readMode, setReadMode] = useState(false);
  const toPrint = useRef<HTMLDivElement | null>(null);
  return (
    <div className="mainPage">
      <div style={{ padding: "0.5rem" }}>
        <span className="secondary">Read </span>
        <SwitchButton readMode={readMode} setReadMode={setReadMode} />
        <span className="secondary"> Edit</span>
        {!readMode && (
          <div>
            <ReactToPrint
              trigger={() => (
                <button
                  style={{
                    color: "dodgerblue",
                    border: "1px solid dodgerblue",
                  }}
                >
                  Download CV
                </button>
              )}
              content={() => toPrint.current}
            />
          </div>
        )}
      </div>
      <div className="cvPage" ref={toPrint}>
        <GeneralInfoForm readMode={readMode} />
        <EduInfoForm readMode={readMode} />
        <ExperienceForm readMode={readMode} />
      </div>
    </div>
  );
}

export default App;
