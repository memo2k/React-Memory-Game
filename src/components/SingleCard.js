import React from 'react';

function singleCard({ card, handleCard, flipped, disabled }) {

    const handleClick = () => {
        if (!disabled) {
            handleCard(card);
        }
    }

    return (
        <div className="card">
            <div className={flipped ? "flipped" : ""}>
                <img className="card__front" src={card.src} alt="card front" width="200px" height="200px" />
                <img 
                    onClick={handleClick} 
                    className="card__cover" 
                    src="/images/cover.jpg" alt="card cover" 
                    width="200px" height="200px" 
                />
            </div>
        </div>
    )
}

export default singleCard