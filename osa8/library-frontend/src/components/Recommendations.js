import React from 'react'
import { ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = ({ show, booksFromDB }) => {

    const me = useQuery(ME)

    if (!show) {
        return null
    }

    const books = booksFromDB

    let filteredBooks = books.filter(b => b.genres.includes(me.data.me.favoriteGenre))

    return (
        <div>
            <h2>recommendations</h2>
            books in your favorite genre <b>patterns</b>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
      </th>
                        <th>
                            published
      </th>
                    </tr>
                    {filteredBooks.map(b =>
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    )}
                </tbody>
            </table >
        </div>
    )
}

export default Recommendations