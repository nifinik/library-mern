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

  // Категории
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
    const matchesCategory =
      selectedCategory === "" ||
      selectedCategory === "Все книги" ||
      book.category === selectedCategory;
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Главная страница</h1>
      <div className="flex items-start justify-between items-start">
        <div className="flex flex-col gap-4 mb-4 flex-1">
          <input
            type="text"
            placeholder="Поиск книги"
            className="p-2 rounded bg-light text-dark"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded ${
                  selectedCategory === category
                    ? "bg-secondary text-light"
                    : "bg-light text-dark hover:bg-secondary hover:text-light"
                }`}
                onClick={() =>
                  setSelectedCategory(category === "Все книги" ? "" : category)
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <p className="text-lg mb-4">
            Отображаемых книг: {filteredBooks.length}
          </p>{" "}
          {/* Количество отфильтрованных книг */}
          <button
            onClick={() => {
              setIsModalOpen(true);
              setCurrentBook(null);
            }}
            className="bg-secondary text-light px-4 py-2 rounded mb-4"
          >
            Добавить книгу
          </button>
        </div>
      </div>
      <BookList
        books={filteredBooks}
        onDelete={deleteBook}
        onToggleFavorite={toggleFavorite}
        onEdit={(book) => {
          setCurrentBook(book);
          setIsModalOpen(true);
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Добавить/Редактировать книгу"
        className="bg-dark text-light max-w-lg mx-auto p-4 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center"
      >
        <BookForm
          onSubmit={currentBook ? handleEditBook : handleAddBook}
          onCancel={() => setIsModalOpen(false)}
          initialData={currentBook}
        />
      </Modal>
    </div>
  );
};

export default HomePage;
