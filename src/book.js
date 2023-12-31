import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";


// const sampleBookDetails =  {
//   "author": "Louis-Ferdinand Céline",
//   "country": "France",
//   "imageLink": "images/voyage-au-bout-de-la-nuit.jpg",
//   "language": "French",
//   "link": "https://en.wikipedia.org/wiki/Journey_to_the_End_of_the_Night\n",
//   "pages": 505,
//   "title": "Journey to the End of the Night",
//   "year": 1932
// }

function Book() {
  const [searchParams] = useSearchParams();
  const [bookDetails, setBookDetails] = useState({})
  const title = searchParams.get('title')
  const baseUrl = 'http://localhost:3001'

  async function getBookDetails(){
    //make GET - “/book/details?title=X” api call here to get details of the book.
    const response = await axios.get(`${baseUrl}/book/details`, {params: {title}})
    console.log(response)
    setBookDetails(response.data.data) // replace this sample data with response data you are getting from api call
  }

  useEffect(() => {
    getBookDetails()
  }, [title])
  
  return (
    <main className="book-details-container">
      <div id="book-card" className="book-details">
        <p><span>Title:</span> {bookDetails.title}</p>
        <p><span>Author:</span> {bookDetails.author}</p>
        <p><span>Year:</span> {bookDetails.year}</p>
        <p><span>country:</span> {bookDetails.country}</p>
        <p><span>pages:</span> {bookDetails.pages}</p>
        <p><span>language:</span> {bookDetails.language}</p>
      </div>
    </main>
  );
}

export default Book;