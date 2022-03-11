import React from 'react';

export default function Paginated({ allCharacters, charactersPerPage, paginated }){
    const pageNumbers = [];

    console.log(Math.ceil(allCharacters/charactersPerPage))
    for(let i = 1; i <= Math.ceil(allCharacters / charactersPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <div>
            <nav>
                <ul>
                    {
                        pageNumbers && pageNumbers.map(pageNumber => {
                            return <li key={pageNumber}>
                                       <button onClick={() => paginated(pageNumber)}>{pageNumber}</button>
                                   </li>
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}