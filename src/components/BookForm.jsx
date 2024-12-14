import React, { useState, useEffect } from "react";

const BookForm = ({ onSubmit, onCancel, initialData }) => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    pages: "",
    category: "Фантастика",
    imageUrl: null,
    pdfUrl: null,
    image: null,
    pdfFile: null,
  });

  useEffect(() => {
    if (initialData) {
      setBook({
        ...initialData,
        image: null,
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Название"
        value={book.title}
        onChange={handleInputChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="author"
        placeholder="Автор"
        value={book.author}
        onChange={handleInputChange}
        required
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <textarea
        name="description"
        placeholder="Описание"
        value={book.description}
        onChange={handleInputChange}
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        name="pages"
        type="number"
        placeholder="Количество страниц"
        value={book.pages}
        onChange={handleInputChange}
        className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <label className="block">
        Категория:
        <select
          name="category"
          value={book.category}
          onChange={handleInputChange}
          className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Фантастика">Фантастика</option>
          <option value="Детективы">Детективы</option>
          <option value="Романы">Романы</option>
          <option value="Научные">Научные</option>
          <option value="Детские">Детские</option>
        </select>
      </label>
      <label className="block">
        Загрузить изображение:
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
      <label className="block">
        Загрузить PDF:
        <input
          name="pdfFile"
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full p-2 rounded bg-gray-700 text-light border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-primary text-light px-4 py-2 rounded"
        >
          {initialData ? "Сохранить изменения" : "Добавить книгу"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-red-600 text-light px-4 py-2 rounded"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default BookForm;
