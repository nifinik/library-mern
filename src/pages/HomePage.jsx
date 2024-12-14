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

  const categories = [
    "Все книги",
    "Фантастика",
    "Детективы",
    "Романы",
    "Научные",
    "Детские",
  ];

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
      <h1 className="text-5xl py-5">Главная страница</h1>
      {/* Количество отфильтрованных книг */}
      <div className="search-flex flex justify-between items-center">
        <input
          className="p-3 bg-zinc-900 rounded-lg w-3/5"
          type="text"
          placeholder="Поиск книги"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="left-home flex gap-5 items-center">
          <p>Отображаемых книг: {filteredBooks.length}</p>{" "}
          <button
            className="add-button bg-lime-700 p-3 rounded-lg"
            onClick={() => {
              setIsModalOpen(true);
              setCurrentBook(null);
            }}
          >
            Добавить книгу
          </button>
        </div>
      </div>
      {/* Кнопки для фильтрации */}
      <div className="flex gap-3 my-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory(category === "Все книги" ? "" : category)
            }
            style={{
              backgroundColor:
                selectedCategory === category ? "#FA6009" : "transparent",
              color: selectedCategory === category ? "white" : "white",
              border: "1px solid #FA6009",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            {category}
          </button>
        ))}
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
