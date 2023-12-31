import { useEffect, useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// const sampleCountryList = [
//   'Achaemenid Empire',
//   'Algeria',
//   'Argentina',
//   'Austria',
//   'Brazil',
//   'China',
//   'Colombia',
//   'Czechoslovakia',
//   'Denmark',
//   'Egypt',
//   'England',
//   'France',
//   'Germany'
// ]

// const sampleAuthorList = [
//   'Albert Camus',
//   'Alfred Döblin',
//   'Anton Chekhov',
//   'Astrid Lindgren',
//   'Charles Dickens',
//   'Chetan Bhagat',
//   'Chinua Achebe',
//   'D. H. Lawrence',
//   'Dante Alighieri',
//   'Denis Diderot',
//   'Doris Lessing',
//   'Edgar Allan Poe',
//   'Elsa Morante',
//   'Emily Brontë',
//   'Ernest Hemingway',
//   'Euripides',
//   'Federico García Lorca',
//   'Fernando Pessoa'
// ]

// const booksListSample = [
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd3030c"
//     },
//     "author": "Naguib Mahfouz",
//     "country": "Egypt",
//     "imageLink": "images/children-of-gebelawi.jpg",
//     "language": "Arabic",
//     "link": "https://en.wikipedia.org/wiki/Children_of_Gebelawi\n",
//     "pages": 355,
//     "title": "Children of Gebelawi",
//     "year": 1959
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302d9"
//     },
//     "author": "Honoré de Balzac",
//     "country": "France",
//     "imageLink": "images/le-pere-goriot.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Le_P%C3%A8re_Goriot\n",
//     "pages": 443,
//     "title": "Le Père Goriot",
//     "year": 1835
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302e5"
//     },
//     "author": "Charles Dickens",
//     "country": "United Kingdom",
//     "imageLink": "images/great-expectations.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Great_Expectations\n",
//     "pages": 194,
//     "title": "Great Expectations",
//     "year": 1861
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302f5"
//     },
//     "author": "Gabriel García Márquez",
//     "country": "Colombia",
//     "imageLink": "images/love-in-the-time-of-cholera.jpg",
//     "language": "Spanish",
//     "link": "https://en.wikipedia.org/wiki/Love_in_the_Time_of_Cholera\n",
//     "pages": 368,
//     "title": "Love in the Time of Cholera",
//     "year": 1985
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd3030a"
//     },
//     "author": "Astrid Lindgren",
//     "country": "Sweden",
//     "imageLink": "images/pippi-longstocking.jpg",
//     "language": "Swedish",
//     "link": "https://en.wikipedia.org/wiki/Pippi_Longstocking\n",
//     "pages": 160,
//     "title": "Pippi Longstocking",
//     "year": 1945
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd3031a"
//     },
//     "author": "Marcel Proust",
//     "country": "France",
//     "imageLink": "images/a-la-recherche-du-temps-perdu.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/In_Search_of_Lost_Time\n",
//     "pages": 2408,
//     "title": "In Search of Lost Time",
//     "year": 1920
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302e0"
//     },
//     "author": "Louis-Ferdinand Céline",
//     "country": "France",
//     "imageLink": "images/voyage-au-bout-de-la-nuit.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Journey_to_the_End_of_the_Night\n",
//     "pages": 505,
//     "title": "Journey to the End of the Night",
//     "year": 1932
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30300"
//     },
//     "author": "Franz Kafka",
//     "country": "Czechoslovakia",
//     "imageLink": "images/stories-of-franz-kafka.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/Franz_Kafka_bibliography#Short_stories\n",
//     "pages": 488,
//     "title": "Stories",
//     "year": 1924
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30326"
//     },
//     "author": "Stendhal",
//     "country": "France",
//     "imageLink": "images/le-rouge-et-le-noir.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/The_Red_and_the_Black\n",
//     "pages": 576,
//     "title": "The Red and the Black",
//     "year": 1830
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30327"
//     },
//     "author": "Laurence Sterne",
//     "country": "England",
//     "imageLink": "images/the-life-and-opinions-of-tristram-shandy.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/The_Life_and_Opinions_of_Tristram_Shandy,_Gentleman\n",
//     "pages": 640,
//     "title": "The Life And Opinions of Tristram Shandy",
//     "year": 1760
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302e2"
//     },
//     "author": "Geoffrey Chaucer",
//     "country": "England",
//     "imageLink": "images/the-canterbury-tales.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/The_Canterbury_Tales\n",
//     "pages": 544,
//     "title": "The Canterbury Tales",
//     "year": 1450
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302d2"
//     },
//     "author": "Hans Christian Andersen",
//     "country": "Denmark",
//     "imageLink": "images/fairy-tales.jpg",
//     "language": "Danish",
//     "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
//     "pages": 784,
//     "title": "Fairy tales",
//     "year": 1836
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302e7"
//     },
//     "author": "Alfred Döblin",
//     "country": "Germany",
//     "imageLink": "images/berlin-alexanderplatz.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/Berlin_Alexanderplatz\n",
//     "pages": 600,
//     "title": "Berlin Alexanderplatz",
//     "year": 1929
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302f4"
//     },
//     "author": "Gabriel García Márquez",
//     "country": "Colombia",
//     "imageLink": "images/one-hundred-years-of-solitude.jpg",
//     "language": "Spanish",
//     "link": "https://en.wikipedia.org/wiki/One_Hundred_Years_of_Solitude\n",
//     "pages": 417,
//     "title": "One Hundred Years of Solitude",
//     "year": 1967
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302f9"
//     },
//     "author": "João Guimarães Rosa",
//     "country": "Brazil",
//     "imageLink": "images/the-devil-to-pay-in-the-backlands.jpg",
//     "language": "Portuguese",
//     "link": "https://en.wikipedia.org/wiki/The_Devil_to_Pay_in_the_Backlands\n",
//     "pages": 494,
//     "title": "The Devil to Pay in the Backlands",
//     "year": 1956
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd3030b"
//     },
//     "author": "Lu Xun",
//     "country": "China",
//     "imageLink": "images/diary-of-a-madman.jpg",
//     "language": "Chinese",
//     "link": "https://en.wikipedia.org/wiki/A_Madman%27s_Diary\n",
//     "pages": 389,
//     "title": "Diary of a Madman",
//     "year": 1918
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd3031b"
//     },
//     "author": "François Rabelais",
//     "country": "France",
//     "imageLink": "images/gargantua-and-pantagruel.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Gargantua_and_Pantagruel\n",
//     "pages": 623,
//     "title": "Gargantua and Pantagruel",
//     "year": 1533
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302d5"
//     },
//     "author": "Unknown",
//     "country": "Achaemenid Empire",
//     "imageLink": "images/the-book-of-job.jpg",
//     "language": "Hebrew",
//     "link": "https://en.wikipedia.org/wiki/Book_of_Job\n",
//     "pages": 176,
//     "title": "The Book Of Job",
//     "year": -600
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302de"
//     },
//     "author": "Albert Camus",
//     "country": "Algeria",
//     "imageLink": "images/l-etranger.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/The_Stranger_(novel)\n",
//     "pages": 185,
//     "title": "The Stranger",
//     "year": 1942
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302d1"
//     },
//     "author": "Chinua Achebe",
//     "country": "Nigeria",
//     "imageLink": "images/things-fall-apart.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
//     "pages": 209,
//     "title": "Things Fall Apart",
//     "year": 1958
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302f3"
//     },
//     "author": "Federico García Lorca",
//     "country": "Spain",
//     "imageLink": "images/gypsy-ballads.jpg",
//     "language": "Spanish",
//     "link": "https://en.wikipedia.org/wiki/Gypsy_Ballads\n",
//     "pages": 218,
//     "title": "Gypsy Ballads",
//     "year": 1928
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30301"
//     },
//     "author": "Franz Kafka",
//     "country": "Czechoslovakia",
//     "imageLink": "images/the-trial.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Trial\n",
//     "pages": 160,
//     "title": "The Trial",
//     "year": 1925
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd3030d"
//     },
//     "author": "Thomas Mann",
//     "country": "Germany",
//     "imageLink": "images/buddenbrooks.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/Buddenbrooks\n",
//     "pages": 736,
//     "title": "Buddenbrooks",
//     "year": 1901
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd3030e"
//     },
//     "author": "Thomas Mann",
//     "country": "Germany",
//     "imageLink": "images/the-magic-mountain.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Magic_Mountain\n",
//     "pages": 720,
//     "title": "The Magic Mountain",
//     "year": 1924
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30311"
//     },
//     "author": "Elsa Morante",
//     "country": "Italy",
//     "imageLink": "images/history.jpg",
//     "language": "Italian",
//     "link": "https://en.wikipedia.org/wiki/History_(novel)\n",
//     "pages": 600,
//     "title": "History",
//     "year": 1974
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30323"
//     },
//     "author": "William Shakespeare",
//     "country": "England",
//     "imageLink": "images/king-lear.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/King_Lear\n",
//     "pages": 384,
//     "title": "King Lear",
//     "year": 1608
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30324"
//     },
//     "author": "William Shakespeare",
//     "country": "England",
//     "imageLink": "images/othello.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Othello\n",
//     "pages": 314,
//     "title": "Othello",
//     "year": 1609
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302e6"
//     },
//     "author": "Denis Diderot",
//     "country": "France",
//     "imageLink": "images/jacques-the-fatalist.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Jacques_the_Fatalist\n",
//     "pages": 596,
//     "title": "Jacques the Fatalist",
//     "year": 1796
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302fb"
//     },
//     "author": "Ernest Hemingway",
//     "country": "United States",
//     "imageLink": "images/the-old-man-and-the-sea.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/The_Old_Man_and_the_Sea\n",
//     "pages": 128,
//     "title": "The Old Man and the Sea",
//     "year": 1952
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30306"
//     },
//     "author": "D. H. Lawrence",
//     "country": "United Kingdom",
//     "imageLink": "images/sons-and-lovers.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Sons_and_Lovers\n",
//     "pages": 432,
//     "title": "Sons and Lovers",
//     "year": 1913
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30309"
//     },
//     "author": "Doris Lessing",
//     "country": "United Kingdom",
//     "imageLink": "images/the-golden-notebook.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/The_Golden_Notebook\n",
//     "pages": 688,
//     "title": "The Golden Notebook",
//     "year": 1962
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302f8"
//     },
//     "author": "Günter Grass",
//     "country": "Germany",
//     "imageLink": "images/the-tin-drum.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Tin_Drum\n",
//     "pages": 600,
//     "title": "The Tin Drum",
//     "year": 1959
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30318"
//     },
//     "author": "Fernando Pessoa",
//     "country": "Portugal",
//     "imageLink": "images/the-book-of-disquiet.jpg",
//     "language": "Portuguese",
//     "link": "https://en.wikipedia.org/wiki/The_Book_of_Disquiet\n",
//     "pages": 272,
//     "title": "The Book of Disquiet",
//     "year": 1928
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30334"
//     },
//     "author": "Marguerite Yourcenar",
//     "country": "France",
//     "imageLink": "images/memoirs-of-hadrian.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Memoirs_of_Hadrian\n",
//     "pages": 408,
//     "title": "Memoirs of Hadrian",
//     "year": 1951
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302d3"
//     },
//     "author": "Dante Alighieri",
//     "country": "Italy",
//     "imageLink": "images/the-divine-comedy.jpg",
//     "language": "Italian",
//     "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
//     "pages": 928,
//     "title": "The Divine Comedy",
//     "year": 1315
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302e3"
//     },
//     "author": "Anton Chekhov",
//     "country": "Russia",
//     "imageLink": "images/stories-of-anton-chekhov.jpg",
//     "language": "Russian",
//     "link": "https://en.wikipedia.org/wiki/List_of_short_stories_by_Anton_Chekhov\n",
//     "pages": 194,
//     "title": "Stories",
//     "year": 1886
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302f2"
//     },
//     "author": "Gustave Flaubert",
//     "country": "France",
//     "imageLink": "images/l-education-sentimentale.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Sentimental_Education\n",
//     "pages": 606,
//     "title": "Sentimental Education",
//     "year": 1869
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30314"
//     },
//     "author": "Robert Musil",
//     "country": "Austria",
//     "imageLink": "images/the-man-without-qualities.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Man_Without_Qualities\n",
//     "pages": 365,
//     "title": "The Man Without Qualities",
//     "year": 1931
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302f1"
//     },
//     "author": "Gustave Flaubert",
//     "country": "France",
//     "imageLink": "images/madame-bovary.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Madame_Bovary\n",
//     "pages": 528,
//     "title": "Madame Bovary",
//     "year": 1857
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30302"
//     },
//     "author": "Franz Kafka",
//     "country": "Czechoslovakia",
//     "imageLink": "images/the-castle.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Castle_(novel)\n",
//     "pages": 352,
//     "title": "The Castle",
//     "year": 1926
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302ee"
//     },
//     "author": "Euripides",
//     "country": "Greece",
//     "imageLink": "images/medea.jpg",
//     "language": "Greek",
//     "link": "https://en.wikipedia.org/wiki/Medea_(play)\n",
//     "pages": 104,
//     "title": "Medea",
//     "year": -431
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30310"
//     },
//     "author": "Michel de Montaigne",
//     "country": "France",
//     "imageLink": "images/essais.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/Essays_(Montaigne)\n",
//     "pages": 404,
//     "title": "Essays",
//     "year": 1595
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30319"
//     },
//     "author": "Edgar Allan Poe",
//     "country": "United States",
//     "imageLink": "images/tales-and-poems-of-edgar-allan-poe.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Edgar_Allan_Poe_bibliography#Tales\n",
//     "pages": 842,
//     "title": "Tales",
//     "year": 1950
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302dc"
//     },
//     "author": "Jorge Luis Borges",
//     "country": "Argentina",
//     "imageLink": "images/ficciones.jpg",
//     "language": "Spanish",
//     "link": "https://en.wikipedia.org/wiki/Ficciones\n",
//     "pages": 224,
//     "title": "Ficciones",
//     "year": 1965
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd302dd"
//     },
//     "author": "Emily Brontë",
//     "country": "United Kingdom",
//     "imageLink": "images/wuthering-heights.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Wuthering_Heights\n",
//     "pages": 342,
//     "title": "Wuthering Heights",
//     "year": 1847
//   },
//   {
//     "_id": {
//       "$oid": "658c0f8b37fb4567acd30322"
//     },
//     "author": "William Shakespeare",
//     "country": "England",
//     "imageLink": "images/hamlet.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Hamlet\n",
//     "pages": 432,
//     "title": "Hamlet",
//     "year": 1603
//   },
//   {
//     "_id": {
//       "$oid": "658c100e37fb4567acd30336"
//     },
//     "author": "Chetan Bhagat",
//     "country": "India",
//     "imageLink": "images/the-mahab-harata.jpg",
//     "language": "Sanskrit",
//     "link": "https://en.wikipedia.org/wiki/Mahabharata\n",
//     "pages": 276,
//     "title": "One Indian Girl",
//     "year": -700
//   },
//   {
//     "_id": {
//       "$oid": "658c130307041fd91e26e1b0"
//     },
//     "author": "Chinua Achebe",
//     "country": "Nigeria",
//     "imageLink": "images/things-fall-apart.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
//     "pages": 209,
//     "title": "Things Fall Apart",
//     "year": 1958
//   },
//   {
//     "_id": {
//       "$oid": "658c136937fb4567acd3033b"
//     },
//     "author": "Chetan Bhagat",
//     "country": "India",
//     "imageLink": "images/the-mahab-harata.jpg",
//     "language": "Sanskrit",
//     "link": "https://en.wikipedia.org/wiki/Mahabharata\n",
//     "pages": 276,
//     "title": "One Indian Girl",
//     "year": -700
//   },
//   {
//     "_id": {
//       "$oid": "658c138737fb4567acd30341"
//     },
//     "author": "Chetan Bhagat",
//     "country": "India",
//     "imageLink": "images/the-mahab-harata.jpg",
//     "language": "Sanskrit",
//     "link": "https://en.wikipedia.org/wiki/Mahabharata\n",
//     "pages": 276,
//     "title": "One Indian Girl",
//     "year": -700
//   },
//   {
//     "_id": {
//       "$oid": "658c13c237fb4567acd30343"
//     },
//     "author": "Hans Christian Andersen",
//     "country": "Denmark",
//     "imageLink": "images/fairy-tales.jpg",
//     "language": "Danish",
//     "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
//     "pages": 784,
//     "title": "Fairy tales",
//     "year": 1836
//   },
//   {
//     "_id": {
//       "$oid": "658c13c637fb4567acd30344"
//     },
//     "author": "Hans Christian Andersen",
//     "country": "Denmark",
//     "imageLink": "images/fairy-tales.jpg",
//     "language": "Danish",
//     "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
//     "pages": 784,
//     "title": "Fairy tales",
//     "year": 1836
//   },
//   {
//     "_id": {
//       "$oid": "658c13df37fb4567acd30345"
//     },
//     "author": "Dante Alighieri",
//     "country": "Italy",
//     "imageLink": "images/the-divine-comedy.jpg",
//     "language": "Italian",
//     "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
//     "pages": 928,
//     "title": "The Divine Comedy",
//     "year": 1315
//   },
//   {
//     "_id": {
//       "$oid": "658c13ea37fb4567acd30347"
//     },
//     "author": "Hans Christian Andersen",
//     "country": "Denmark",
//     "imageLink": "images/fairy-tales.jpg",
//     "language": "Danish",
//     "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
//     "pages": 784,
//     "title": "Fairy tales",
//     "year": 1836
//   },
//   {
//     "_id": {
//       "$oid": "658c13f837fb4567acd3034a"
//     },
//     "author": "Hans Christian Andersen",
//     "country": "Denmark",
//     "imageLink": "images/fairy-tales.jpg",
//     "language": "Danish",
//     "link": "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
//     "pages": 784,
//     "title": "Fairy tales",
//     "year": 1836
//   },
//   {
//     "_id": {
//       "$oid": "658c13fc37fb4567acd3034b"
//     },
//     "author": "Emily Brontë",
//     "country": "United Kingdom",
//     "imageLink": "images/wuthering-heights.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Wuthering_Heights\n",
//     "pages": 342,
//     "title": "Wuthering Heights",
//     "year": 1847
//   },
//   {
//     "_id": {
//       "$oid": "658c141a37fb4567acd3034f"
//     },
//     "author": "João Guimarães Rosa",
//     "country": "Brazil",
//     "imageLink": "images/the-devil-to-pay-in-the-backlands.jpg",
//     "language": "Portuguese",
//     "link": "https://en.wikipedia.org/wiki/The_Devil_to_Pay_in_the_Backlands\n",
//     "pages": 494,
//     "title": "The Devil to Pay in the Backlands",
//     "year": 1956
//   },
//   {
//     "_id": {
//       "$oid": "658c142037fb4567acd30350"
//     },
//     "author": "Dante Alighieri",
//     "country": "Italy",
//     "imageLink": "images/the-divine-comedy.jpg",
//     "language": "Italian",
//     "link": "https://en.wikipedia.org/wiki/Divine_Comedy\n",
//     "pages": 928,
//     "title": "The Divine Comedy",
//     "year": 1315
//   },
//   {
//     "_id": {
//       "$oid": "658c142937fb4567acd30352"
//     },
//     "author": "Albert Camus",
//     "country": "Algeria",
//     "imageLink": "images/l-etranger.jpg",
//     "language": "French",
//     "link": "https://en.wikipedia.org/wiki/The_Stranger_(novel)\n",
//     "pages": 185,
//     "title": "The Stranger",
//     "year": 1942
//   },
//   {
//     "_id": {
//       "$oid": "658c142e37fb4567acd30353"
//     },
//     "author": "Anton Chekhov",
//     "country": "Russia",
//     "imageLink": "images/stories-of-anton-chekhov.jpg",
//     "language": "Russian",
//     "link": "https://en.wikipedia.org/wiki/List_of_short_stories_by_Anton_Chekhov\n",
//     "pages": 194,
//     "title": "Stories",
//     "year": 1886
//   },
//   {
//     "_id": {
//       "$oid": "658c143a37fb4567acd30355"
//     },
//     "author": "João Guimarães Rosa",
//     "country": "Brazil",
//     "imageLink": "images/the-devil-to-pay-in-the-backlands.jpg",
//     "language": "Portuguese",
//     "link": "https://en.wikipedia.org/wiki/The_Devil_to_Pay_in_the_Backlands\n",
//     "pages": 494,
//     "title": "The Devil to Pay in the Backlands",
//     "year": 1956
//   },
//   {
//     "_id": {
//       "$oid": "658c144237fb4567acd30356"
//     },
//     "author": "Thomas Mann",
//     "country": "Germany",
//     "imageLink": "images/the-magic-mountain.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Magic_Mountain\n",
//     "pages": 720,
//     "title": "The Magic Mountain",
//     "year": 1924
//   },
//   {
//     "_id": {
//       "$oid": "658c145437fb4567acd30357"
//     },
//     "author": "William Shakespeare",
//     "country": "England",
//     "imageLink": "images/hamlet.jpg",
//     "language": "English",
//     "link": "https://en.wikipedia.org/wiki/Hamlet\n",
//     "pages": 432,
//     "title": "Hamlet",
//     "year": 1603
//   },
//   {
//     "_id": {
//       "$oid": "658c146037fb4567acd30358"
//     },
//     "author": "Lu Xun",
//     "country": "China",
//     "imageLink": "images/diary-of-a-madman.jpg",
//     "language": "Chinese",
//     "link": "https://en.wikipedia.org/wiki/A_Madman%27s_Diary\n",
//     "pages": 389,
//     "title": "Diary of a Madman",
//     "year": 1918
//   },
//   {
//     "_id": {
//       "$oid": "658c148d37fb4567acd3035a"
//     },
//     "author": "Franz Kafka",
//     "country": "Czechoslovakia",
//     "imageLink": "images/the-castle.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Castle_(novel)\n",
//     "pages": 352,
//     "title": "The Castle",
//     "year": 1926
//   },
//   {
//     "_id": {
//       "$oid": "658c149137fb4567acd3035b"
//     },
//     "author": "Jorge Luis Borges",
//     "country": "Argentina",
//     "imageLink": "images/ficciones.jpg",
//     "language": "Spanish",
//     "link": "https://en.wikipedia.org/wiki/Ficciones\n",
//     "pages": 224,
//     "title": "Ficciones",
//     "year": 1965
//   }
// ]

// const sampleFilteredBookListData = [
//   {
//     "_id": {
//       "$oid": "658c148d37fb4567acd3035a"
//     },
//     "author": "Franz Kafka",
//     "country": "Czechoslovakia",
//     "imageLink": "images/the-castle.jpg",
//     "language": "German",
//     "link": "https://en.wikipedia.org/wiki/The_Castle_(novel)\n",
//     "pages": 352,
//     "title": "The Castle",
//     "year": 1926
//   },
//   {
//     "_id": {
//       "$oid": "658c149137fb4567acd3035b"
//     },
//     "author": "Jorge Luis Borges",
//     "country": "Argentina",
//     "imageLink": "images/ficciones.jpg",
//     "language": "Spanish",
//     "link": "https://en.wikipedia.org/wiki/Ficciones\n",
//     "pages": 224,
//     "title": "Ficciones",
//     "year": 1965
//   }
// ]
function App() {

  const [uniqueAuthorList, setUniqueAuthorList] = useState([])
  const [uniqueCountryList, setUniqueCountryList] = useState([])
  const [bookList, setBookList] = useState([])
  const [author, setAuthor] = useState(null)
  const [country, setCountry] = useState(null)
  const [title, setTitle] = useState(null)
  const [year, setYear] = useState(null)
  const navigate = useNavigate()
  const baseUrl = 'http://localhost:3001'
  /*
    Hints on how to google:
    1.how to make api calls from react
    2.how to add query params in axios get api call react (if you are using axios to make api call or replace axios with what you are you're using)
    4.how to send multiple query params in axios react
    3. how to extract data from api response
    3. for error debug you can console api response and check in browser console
  */

  async function getUniqueAuthorList(){
    // This function make call to GET API "/authors" and Sets the "uniqueAuthorList" state value with response data.
    //currently I have set uniqueAuthorList with sample data. But you have to replace it with api response data you will recieve.
    // make your GET "/authors" API call here
    const response = await axios.get(`${baseUrl}/authors`)
    setUniqueAuthorList(response.data.data)  // you have to replace sampleAuthorList with the response data you will recieve from api. for example setUniqueAuthorList(response.data)
  }
  async function getUniqueCountryList(){
    // This function make call to GET API "/countries" and Sets the "uniqueCountryList" state value with response data.
    //currently I have set uniqueCountryList with sample data. But you have to replace it with api response data you will recieve.
    // make your GET "/countries" call API here
    const response = await axios.get(`${baseUrl}/countries`)
    setUniqueCountryList(response.data.data)  //replace sampleCountryList with response data you are getting via api
  }
  async function getAllUniqueBookList(){
    // This function make call to GET API "/all-books" and Sets the "bookList" state value with response data.
    //currently I have set uniqueCountryList with sample data. But you have to replace it with api response data you will recieve via api
    // make your GET "/all-books" call API here
    const response = await axios.get(`${baseUrl}/all-books`)
    setBookList(response.data.data)
  }

  useEffect(() => {
    getUniqueAuthorList()
    getAllUniqueBookList()
    getUniqueCountryList()
  }, [])
  
  function handleOnBookCardClick(title){
    navigate(`/book?title=${title}`)
  }

  async function handleOnSearch(){
  const queryParams = {
  }

  if(title){
    queryParams.title = title
  }
  if(year){
    queryParams.year = year
  }
  if(author){
    queryParams.author = author
  }
  if(country){
    queryParams.country = country
  }

  const response = await axios.get(`${baseUrl}/books`, {params: queryParams})



  // you can visit here to explore how to send query params in axiso get request https://masteringjs.io/tutorials/axios/get-query-params
  // make you GET - “/books?{query}” API call here
  //set the response data in bookList state variable
  setBookList(response.data.data) // this is sample data I am setting here. Replace sample data with api response data
  }
  return (
    <div className="App">
        <h1 className='title'>Books Library</h1>
        <section className='book-section'>
          <div className='search-container'>
              <select className='dropdown' id='author' onChange={(e)=> setAuthor(e.target.value)} value={author}>
                <option value={''} disabled selected>Select Author</option>
                {uniqueAuthorList.map((authorName, index)=>
                (
                  <option key={index} value={authorName}>{authorName}</option>
                ))
                  }
              </select>
              <select className='dropdown' id='country' onChange={(e)=> setCountry(e.target.value)} value={country}>
              <option value={''} disabled selected>Select Country</option>
              {uniqueCountryList.map((countryName, index)=>
                (
                  <option key={index} value={countryName}>{countryName}</option>
                ))
              }
                <option>Country</option>
              </select>
              <input type='text' id='book-name' placeholder='Enter Book Name to search' onChange={(e)=> setTitle(e.target.value)} value={title}></input>
              <input type='number' id='year' placeholder='Enter publish year to search' onChange={(e)=> setYear(e.target.value)} value={year}></input>
              <button onClick={()=> {
                setAuthor('')
                setCountry('')
                setYear('')
                setTitle('')
              }}>Clear All Filter</button>
          </div>
          <button id='search' className='search-btn' onClick={handleOnSearch}>Search</button>

          <div id='books' className='books'>

             {bookList.map((bookData, index)=>(
              <div key={index} id='book-card' className='book-card' onClick={()=> handleOnBookCardClick(bookData.title)}>
                <p>Title: {bookData.title}</p>
                <p>Author: {bookData.author}</p>
              </div>
               ))
              }
          </div>
        </section>
      </div>
  );
}

export default App;
