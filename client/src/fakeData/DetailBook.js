import { useContext, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import { Button, Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import BigBook from "../assets/images/bigbook.png";
import Bookmark from "../assets/images/bookmark.png";
import Next from "../assets/images/next.png";

import { UserContext } from "../context/userContext";

import { API } from "../config/api";

export default function DetailBook() {
  let history = useHistory();
  let { id } = useParams();

  const [book, setBook] = useState({});
  const [isAdded, setIsAdded] = useState(false);
  const [myList, setMyList] = useState([]);
  const getBook = async (id) => {
    try {
      const response = await API.get("/book/" + id);
      setBook(response.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const exist = async () => {
    try {
      const getList = await API.get("/book-list");
      const filter = getList.data.data.filter((item) => {
        return item.id === +id;
      });
      filter.length > 0 ? setIsAdded(true) : setIsAdded(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddList = async () => {
    try {
      const body = {
        idBook: id,
      };
      const response = await API.post("/book-list", body);
      setMyList(response.data.data);
    } catch (error) {
      console.log(error);
    }

    history.push("/profile");
  };

  const handleReadBook = () => {
    history.push("/read-book/" + id);
  };

  useEffect(() => {
    getBook(id);
    exist();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <div className="d-flex flex-row mt-5">
              <img src={book?.image} alt="" />
              <div className="ms-5 d-flex flex-column justify-content-between">
                <div>
                  <h1 style={{ fontSize: "64px" }}>{book?.title}</h1>
                  <p style={{ fontSize: "24px" }}>{book?.author}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "24px" }}>Publication Date</h3>
                  <p style={{ fontSize: "18px" }}>{book?.publicationDate}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "24px" }}>Pages</h3>
                  <p style={{ fontSize: "18px" }}>{book?.pages}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "24px" }}>ISBN</h3>
                  <p style={{ fontSize: "18px" }}>{book?.isbn}</p>
                </div>
              </div>
            </div>
            <h2 className="mt-5 mb-3" style={{ fontSize: "36px" }}>
              About This Book
            </h2>
            <div className="me-4" style={{ textAlign: "justify" }}>
              <p style={{ fontSize: "18px" }}>{book?.about}</p>
            </div>
            <div className="d-flex align-items-end justify-content-end">
              <div className="mb-5">
                {isAdded ? null : (
                  <Button className="me-4" variant="danger">
                    Add My List <img src={Bookmark} alt="" />
                  </Button>
                )}
                <Button
                  onClick={handleReadBook}
                  variant="secondary"
                  style={{ color: "black" }}
                >
                  Read Book <img src={Next} alt="" />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
