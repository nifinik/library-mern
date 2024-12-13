import React, { useContext, useState } from "react";
import { BookContext } from "../context/BookContext";
import BookList from "../components/BookList";
import Modal from "react-modal";
import BookForm from "../components/BookForm";

Modal.setAppElement("#root");

const HomePage = () => {
  const { books, addBook, updateBook, deleteBook, toggleFavorite } =
    useContext(BookContext);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // Для редактируемой книги

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddBook = (newBook) => {
    addBook(newBook);
    setIsModalOpen(false);
    setCurrentBook(null);
  };

  const handleEditBook = (updatedBook) => {
    updateBook(updatedBook.id, updatedBook);
    setIsModalOpen(false);
    setCurrentBook(null);
  };

  const handleOpenEditModal = (book) => {
    setCurrentBook(book);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Главная страница</h1>
      <p>Всего книг: {books.length}</p>
      <input
        type="text"
        placeholder="Поиск книги"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        onClick={() => {
          setIsModalOpen(true);
          setCurrentBook(null);
        }}
      >
        Добавить книгу
      </button>

      {/* Модальное окно */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel={currentBook ? "Редактировать книгу" : "Добавить книгу"}
        style={{
          content: {
            maxWidth: "500px",
            margin: "auto",
            padding: "20px",
          },
        }}
      >
        <h2>{currentBook ? "Редактировать книгу" : "Добавить книгу"}</h2>
        <BookForm
          onSubmit={currentBook ? handleEditBook : handleAddBook}
          onCancel={() => setIsModalOpen(false)}
          initialData={currentBook}
        />
      </Modal>

      {/* Список книг */}
      <BookList
        books={filteredBooks}
        onDelete={deleteBook}
        onToggleFavorite={toggleFavorite}
        onEdit={handleOpenEditModal}
      />
    </div>
  );
};

export default HomePage;
