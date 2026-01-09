import '../components_styles/SelectionModeSwitch.css';

type SelectionModeSwitchProps = {
    isMultiSelect: boolean;
    onToggle: () => void;
}

function SelectionModeSwitch({ isMultiSelect, onToggle }: SelectionModeSwitchProps) {

  return (
    <div className="selection-switch-container">      
        <button onClick={onToggle} className={ !isMultiSelect ? 'active left' : 'left'}>Single</button>
        <div className="divider" /> 
        <button onClick={onToggle} className={isMultiSelect ? 'active right' : 'right'}>Comparation</button>
    </div>
  );
}

export default SelectionModeSwitch;