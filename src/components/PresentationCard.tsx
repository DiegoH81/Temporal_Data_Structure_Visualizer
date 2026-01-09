import '../components_styles/PresentationCard.css'

type PresentationCardProp = {
    name: string;
    imgDirection: string;
    imgAlternativeText: string;
    isSelected: boolean;
    onSelect: (name: string) => void;
}

function PresentationCard({name,imgDirection,imgAlternativeText,isSelected,onSelect}: PresentationCardProp) {
  return (
    <div onClick={() => onSelect(name)} className={`presentation-card ${isSelected ? 'is-selected' : ''}`}>
      <img src={imgDirection} alt={imgAlternativeText}/>
    </div>
  );
}

export default PresentationCard;