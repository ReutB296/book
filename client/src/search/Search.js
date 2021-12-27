import './search.css';
import {useState, useEffect, useCallback} from 'react';
import debounce from 'lodash.debounce';
import logo from '../img/Book\ and\ Collect-logos_transparent.png';
import ReactPaginate from 'react-paginate';
import {Link} from "react-router-dom";


export default function Search(){

    const [value, setValue] = useState('');
    const [serachResults, setSerachResults] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isThereResults, setIsThereResults] = useState(false);

        
    const [finishStatus, setfinishStatus] = useState(false);

    const onBackButtonEvent = (e) => {
        console.log("im here")
        e.preventDefault();
        if (!finishStatus) {
            if (window.confirm("Do you want to go back ?")) {
                setfinishStatus(true)
                // your logic
               
            } else {
                window.history.pushState(null, null, window.location.pathname);
                setfinishStatus(false)
            }
        }
    }
    
      useEffect(() => {
        window.history.pushState(null, null, window.location.pathname);
        console.log("window.location.pathname",window.location.pathname)
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
          window.removeEventListener('popstate', onBackButtonEvent);  
        };
      }, []);
   
    const search = useCallback(debounce(() => {
      
        fetch(`/api/Books/search?page=${pageNumber}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({value})
        })
            .then(response => response.json())
            .then(data => {
                setSerachResults(data.docs);
                setPageCount(data.totalPages);
                data.docs.length > 0 ? setIsThereResults(true) : setIsThereResults(false);
                sessionStorage.setItem(`${value}`, JSON.stringify(data.docs));
            
            }).catch(err => {
                console.log(err);
            });
    }, 700), [value, pageNumber]);

  
    useEffect(() =>{
        if (value !== ''){
            search();
            return search.cancel;
        }else{
            setSerachResults([]);
        }

    }, [value, search]);


    const changePage = ({ selected }) =>{
        setPageNumber(selected + 1);
    };

     
  
    return(
        <div className="search_container">
            <div className="headerContainer">
                <img src={logo}/>
                <div className="input_container">
                    <input className="inputSearch" placeholder="Search a book..." value={value} onChange={(e) => setValue(e.target.value)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#828282" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
                </div>
            </div>
            <div className="results_container">
                { serachResults.length !== 0 ?
                <>
                        <ul className="booksList">
                            { serachResults.map (book =>
                                <li className="listItem">
                                    <Link to={{
                                            pathname: `/${book.title}`,
                                            state: {clickedBook: {...book}}
                                            }}
                                    >
                                        <div className="bookCover"><img src={`https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`}/></div>
                                    </Link>
                                    <div className="text_container">
                                        <Link to={`/${book.title}`}>  
                                            <div className="titleSearch">{book.title}</div>
                                        </Link>
                                        <div className="author_name">{book.author_name[0]}</div>
                                    </div>
                                    <button className="addToCart">
                                            <img class="mr-2" src="https://rails-assets-us.bookshop.org/assets/ic_cart_light-b26a46b06b6ae40a9499157d18cb2eba8f8d81b0de5637f93ef851ea54ceae4c.svg"/>
                                    ADD TO CART
                                    </button>     
                                </li>
                            
                            )}
                        </ul>
                        <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                        previousLinkClassName={"previousBttn"}
                        nextLinkClassName={"nextBttn"}
                        disabledClassName={"paginationDisabled"}
                        activeClassName={"paginationActive"}
                     />
                </>
                :
                ""
                }
                {
                    !isThereResults && 'no results'
                }
            </div>
        </div>
    )

}