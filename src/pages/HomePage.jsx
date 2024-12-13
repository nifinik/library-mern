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
  const [selectedCategory, setSelectedCategory] = useState(""); // Категория фильтрации

  // Фильтруем книги по поиску и категории
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selectedCategory
      ? book.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

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
      <p>Отображаемых книг: {filteredBooks.length}</p>{" "}
      {/* Количество отфильтрованных книг */}
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
      {/* Кнопки для фильтрации */}
      <div>
        <button onClick={() => setSelectedCategory("")}>Все книги</button>
        <button onClick={() => setSelectedCategory("Фантастика")}>
          Фантастика
        </button>
        <button onClick={() => setSelectedCategory("Детективы")}>
          Детективы
        </button>
        <button onClick={() => setSelectedCategory("Романы")}>Романы</button>
        <button onClick={() => setSelectedCategory("Научные")}>Научные</button>
        <button onClick={() => setSelectedCategory("Детские")}>Детские</button>
      </div>
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
