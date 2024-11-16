import { useEffect, useState, useContext } from 'react';
import useStyles from './styles';
import { Grid,Input,InputAdornment } from '@material-ui/core';
import Product from '../Products/Product/Product';
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import { AuthContext } from '../../context/authContext';

const Book = () => {

    const classes = useStyles();
    const {selectedBooks,setSelectedBooks} = useContext(AuthContext);
    const [searchTerm,setSearchTerm] = useState("");
    const [searchResult,setSearchResult] = useState();
    const [bookList,setBookList] = useState([
        {
            "id": "prod_kd6Ll2eLj5V2mj",
            "name": "The Jungle Book",
            "price": {
                "raw": 99,
                "formatted": "99.00",
                "formatted_with_symbol": "\u20b999.00",
                "formatted_with_code": "99.00 INR"
            },
            "media": {
                "type": "image",
                "source": "https:\/\/cdn.chec.io\/merchants\/28663\/assets\/cvLwYNXyje5f45bW|2.jpg"            }
        },
        {
            "id": "prod_kpnNwAEpawmXB3",
            "name": "The Sherlock Holmes",
            "price": {
                "raw": 136,
                "formatted": "136.00",
                "formatted_with_symbol": "\u20b9136.00",
                "formatted_with_code": "136.00 INR"
            },
            "media": {
                "type": "image",
                "source": "https:\/\/cdn.chec.io\/merchants\/28663\/assets\/L2Cj334oBGjdbHmK|1.jpg"            }
        },
        {
            "id": "prod_bO6J5aMkL85Ejp",
            "name": "A Passage To India",
            "price": {
                "raw": 189,
                "formatted": "189.00",
                "formatted_with_symbol": "\u20b9189.00",
                "formatted_with_code": "189.00 INR"
            },
            "media": {
                "type": "image",
                "source": "https:\/\/cdn.chec.io\/merchants\/28663\/assets\/SgZD7wLYNIwK97u8|71K-InZRoUL.jpg"            }
        },
        {
            "id": "prod_Op1YoVDKZDlXLv",
            "name": "Ghosts of The Silent Hills",
            "price": {
                "formatted": "159.00",
                "formatted_with_symbol": "\u20b9159.00",
                "formatted_with_code": "159.00 INR"
            },
            "media": {
                "type": "image",
                "source": "https:\/\/cdn.chec.io\/merchants\/28663\/assets\/rpXLx3xlXM1iWs5h|71NUqTiGrOL.jpg"            }
        },
        {
            "id": "prod_QG375vM6nYorMO",
            "name": "Treasure Island",
            "price": {
                "raw": 169,
                "formatted": "169.00",
                "formatted_with_symbol": "\u20b9169.00",
                "formatted_with_code": "169.00 INR"
            },
            "media": {
                "type": "image",
                "source": "https:\/\/cdn.chec.io\/merchants\/28663\/assets\/cqpteRf6VzYXJeLC|71+f+GXLk4L.jpg"            }
        }
    ]);

    const onAddToCart = (product,productId,quantity) => {
        if(product != undefined && product != null){
          setSelectedBooks([...selectedBooks,product]);
        }
    }

    async function fetchBooks(){
      try{
        const response = await axios.get('http://localhost:4000/books/');
        const bookList = response?.data?.books;
        if(bookList != undefined){
          console.log(bookList);
          setBookList(bookList)
        }
      }
      catch(error){
        console.log(error);
      }
    }

    const searchBooks = async() => {
      try{
        const response = await axios.get(`http://localhost:4000/books/${searchTerm}`);
        if(response != undefined){
          const bookResponse = response?.data?.books;
          if(bookResponse != undefined){
            setSearchResult(bookResponse);
          }
        }
      }
      catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      fetchBooks();
    },[])

    return (
        <>
          <main className={classes.mainPage}>
            <div className={classes.toolbar} />
    
            <>
              <div className={classes.categorySection}>
                <h3 className={classes.categoryHeader}>
                   <span style={{ color: "#f1361d" }}>Books</span>
                </h3>
                <h3 className={classes.categoryDesc}>
                  Browse our handpicked selection of books
                </h3>
                <div className={classes.searchs}>
            <Input
              className={classes.searchb}
              type="text"
              placeholder="Which book are you looking for?"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </div>
                <Grid
                  className={classes.categoryFeatured}
                  container
                  justify="center"
                  spacing={1}
                >
                    {bookList?.filter((product) => {
                      if(searchTerm === ""){
                        return product;
                      }
                      else {
                        if(product.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
                          return product;
                        }
                      }
                    })
                    .map((product) => (
                <Grid
                  className={classes.categoryFeatured}
                  item
                  xs={6}
                  sm={5}
                  md={3}
                  lg={2}
                  id="pro"
                >
                  <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
              ))}
                </Grid>
              </div>
            </>
          </main>
        </>
      );

}
export default Book;