import React, { useState, useEffect } from "react";

const BookForm = ({ onSubmit, onCancel, initialData }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    pages: "",
    image: null,
    pdfFile: null,
  });

  useEffect(() => {
    if (initialData) {
      setBook({
        ...initialData,
        image: null, // Очистка, так как файл нельзя передать напрямую
        pdfFile: null,
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fieldName = e.target.name;
      setBook({ ...book, [fieldName]: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedBook = {
      ...book,
      id: initialData ? initialData.id : Date.now(),
      favorite: initialData ? initialData.favorite : false,
      imageUrl: book.image ? URL.createObjectURL(book.image) : book.imageUrl,
      pdfUrl: book.pdfFile ? URL.createObjectURL(book.pdfFile) : book.pdfUrl,
    };
    onSubmit(updatedBook);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Название"
        value={book.title}
        onChange={handleInputChange}
        required
      />
      <input
        name="author"
        placeholder="Автор"
        value={book.author}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={book.description}
        onChange={handleInputChange}
      />
      <input
        name="pages"
        type="number"
        placeholder="Количество страниц"
        value={book.pages}
        onChange={handleInputChange}
      />
      <label>
        Загрузить изображение:
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      <label>
        Загрузить PDF:
        <input
          name="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>
      <button type="submit">
        {initialData ? "Сохранить изменения" : "Добавить книгу"}
      </button>
      <button type="button" onClick={onCancel}>
        Отменить
      </button>
    </form>
  );
};

export default BookForm;
