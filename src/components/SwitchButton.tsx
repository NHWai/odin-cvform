import "../styles/switch.css";

interface Props {
  readMode: boolean;
  setReadMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function SwitchButton(props: Props) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={props.readMode}
        onChange={() => props.setReadMode((pre) => !pre)}
      />
      <span className="slider round"></span>
    </label>
  );
}

export default SwitchButton;
