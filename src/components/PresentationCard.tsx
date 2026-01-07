import '../components_styles/PresentationCard.css'

type PresentationCardProp = {
    imgDirection: string;
    imgAlternativeText: string;
}

function PresentationCard({imgDirection, imgAlternativeText} : PresentationCardProp) {

    return(
        <>
            <div className="presentation-card">
                <img src={imgDirection} alt={imgAlternativeText} />
            </div>
        </>
    );
}

export default PresentationCard
