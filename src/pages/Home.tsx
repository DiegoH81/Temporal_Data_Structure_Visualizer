import { useState } from 'react'
import PresentationCard from '../components/PresentationCard'
import SelectionModeSwitch from '../components/SelectionModeSwitch'
import '../pages_styles/Home.css'

function Home() {
    const [isMultiSelect, setIsMultiSelect] = useState(false);
    const [selectedCards, setSelectedCards] = useState<string[]>([]);
    const names = [
        "Vector",
        "Stack",
        "Queue",
        "Linked List",
        "Double Linked List",
        "Circular Linked List",
        "Doubly Circular Linked List",
        "Hash Table",
        "Binary Search Tree",
        "Red Black Tree",
        "AVL Tree",
        "B Tree",
        "B Plus Tree",
        "KD Tree",
        "R Tree",
        "Graph"
    ];

    const handleCardSelect = (cardName: string) => {
        if (isMultiSelect) {
            setSelectedCards(prev => prev.includes(cardName) ? prev.filter(name => name !== cardName) : [...prev, cardName]);
        } else {
            setSelectedCards(prev => prev.includes(cardName) ? [] : [cardName]);
        }
    };

    const handleToggleMode = () => {
        setIsMultiSelect(!isMultiSelect);
        if (isMultiSelect && selectedCards.length > 1) {
            setSelectedCards([selectedCards[0]]);
        }
    };

    const handleClearSelection = () => {
        setSelectedCards([]);
    };

    return (
        <>
            <h1>Menu</h1>
            
            <SelectionModeSwitch isMultiSelect={isMultiSelect} onToggle={handleToggleMode} />

            {selectedCards.length > 0 && (
                <div className='selected-item-show' style={{}}>
                    <p><strong>Selected:</strong> {selectedCards.join(', ')}</p>
            <button className="clear-button" onClick={handleClearSelection}> Clean Selection</button>

                </div>
            )}

            <div className="presentation-card-container">
                {names.map((name) => (
                    <PresentationCard name={name} imgDirection={`/images/cards/ds${name}.jpg`} imgAlternativeText={name.toLowerCase()} isSelected={selectedCards.includes(name)} onSelect={handleCardSelect} key={name} />
                ))}
            </div>
        </>
    )
}

export default Home
