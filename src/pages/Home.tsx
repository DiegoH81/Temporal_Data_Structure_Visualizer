import PresentationCard from '../components/PresentationCard'
import '../pages_styles/Home.css'

function Home() {
    const ids = [1,2,3,4,5,6]

    return (
    <>
        <h1>Menu</h1>
        <div className="presentation-card-container">
            {
                ids.map((id)=>(<PresentationCard imgDirection={`/images/cards/ds${id}.jpg`} imgAlternativeText={`ds${id}`} key={id}/>))
            }
        </div>
    </>
    )
}

export default Home
