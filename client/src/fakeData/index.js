const express = require('express');

const router = express.Router();

// Controller
// import controller here
const { addUser, getUsers, getUser, deleteUser } = require('../controllers/users');
const { register, login, checkAuth } = require('../controllers/auth');
const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/books');
const { addTransaction, updateTransaction, getTransaction, getTransactions } = require('../controllers/transaction');
const { addBookList, getBookLists } = require('../controllers/booklist');

const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

const { getProfile, addProfile } = require("../controllers/profile");

// Route
// add route here

router.get("/profile", auth, getProfile);
router.post("/profile", auth, uploadFile("image"), addProfile);

router.post("/user", addUser);

router.get("/users", getUsers);
router.get("/user/:id", getUser);

router.delete("/user/:id", deleteUser);

router.post("/login", login);
router.post("/register", register);
router.get("/check-auth", auth, checkAuth);

router.get("/books", getBooks);
router.get("/book/:id", getBook);
router.post("/book", auth, uploadFile("image","bookFile"), addBook);
router.patch("/book/:id", auth, uploadFile("image","bookFile"), updateBook);
router.delete("/book/:id", auth, deleteBook);

router.post("/transaction", auth, uploadFile("transferProof"), addTransaction)
router.patch("/transaction/:id", auth, updateTransaction);
router.get("/transaction/:id", auth, getTransaction);
router.get("/transactions", auth, getTransactions);

router.post('/book-list', auth, addBookList);
router.get('/book-list', auth, getBookLists);

module.exports = router;