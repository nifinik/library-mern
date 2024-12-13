import React, { useState, useEffect } from "react";

const BookForm = ({ onSubmit, onCancel, initialData }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    pages: "",
    category: "Фантастика",
    imageUrl: null, // Ссылка на изображение
    pdfUrl: null, // Ссылка на PDF
    image: null, // Новый файл изображения
    pdfFile: null, // Новый файл PDF
  });

  // Инициализация данных для редактирования
  useEffect(() => {
    if (initialData) {
      setBook({
        ...initialData,
        image: null, // Очищаем поле файла для загрузки
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
    // Если новые файлы не выбраны, используем старые ссылки
    const updatedBook = {
      ...book,
      id: initialData ? initialData.id : Date.now(),
      favorite: initialData ? initialData.favorite : false,
      imageUrl: book.image ? URL.createObjectURL(book.image) : book.imageUrl, // Используем либо новое изображение, либо старое
      pdfUrl: book.pdfFile ? URL.createObjectURL(book.pdfFile) : book.pdfUrl, // Используем либо новый PDF, либо старый
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
        Категория:
        <select
          name="category"
          value={book.category}
          onChange={handleInputChange}
        >
          <option value="Фантастика">Фантастика</option>
          <option value="Детективы">Детективы</option>
          <option value="Романы">Романы</option>
          <option value="Научные">Научные</option>
          <option value="Детские">Детские</option>
        </select>
      </label>
      <label>
        Загрузить изображение:
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      {book.imageUrl && <p>Текущее изображение загружено.</p>}
      <label>
        Загрузить PDF:
        <input
          name="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
        />
      </label>
      {book.pdfUrl && <p>Текущий PDF загружен.</p>}
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
