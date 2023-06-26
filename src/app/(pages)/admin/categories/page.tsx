'use client';

import Modal from "../components/Modal";
import AddCategoryForm from "./components/AddCategoryForm";

export default function CategoriesPage(){
  return (
    <div className="grid grid-cols-6 gap-1 mb-12">
      <Modal buttonText="Добавить категорию">
        <AddCategoryForm/>
      </Modal>
      <div>catagories</div>
    </div>
  );
}