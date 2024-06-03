import React, { useState } from 'react';
import './CourseManagement.css';
import CourseTable from './CourseTable';
import Modal from './Modal';
import Navbar from "../../components/NavBar/NavBar";

function CourseManagement() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Curso A', description: 'X e etc várias coisas' },
    { id: 2, name: 'Curso B', description: 'Y com R' },
    { id: 3, name: 'Curso C', description: 'Hoje é sábado' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [courseDesc, setCourseDesc] = useState('');
  const [editingId, setEditingId] = useState(null);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setShowModal(false);
    setCourseName('');
    setCourseDesc('');
    setEditingId(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editingId !== null) {
      const updatedCourses = courses.map(course =>
        course.id === editingId ? { ...course, name: courseName, description: courseDesc } : course
      );
      setCourses(updatedCourses);
    } else {
      const newCourse = {
        id: courses.length + 1,
        name: courseName,
        description: courseDesc
      };
      setCourses([...courses, newCourse]);
    }
    closeModal();
  };

  const handleEdit = (id) => {
    const course = courses.find(course => course.id === id);
    setCourseName(course.name);
    setCourseDesc(course.description);
    setEditingId(id);
    openModal();
  };

  const handleDelete = (id) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    setCourses(updatedCourses);
    closeModal();
  };

  return (
    <div className="course-management">
      <Navbar/>
      <div className="content-header">
        <h1>
          <img src="https://img.icons8.com/ios/50/000000/open-book.png" alt="Cursos Icon" />
          Cursos
        </h1>
      </div>
      <div className="buttons">
        <button className="add-btn" onClick={openModal}>Adicionar</button>
        <button className="remove-btn" onClick={handleDelete}>Remover</button>
      </div>
      <main className="main-content">
        <CourseTable courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
      <Modal
        showModal={showModal}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
        courseName={courseName}
        setCourseName={setCourseName}
        courseDesc={courseDesc}
        setCourseDesc={setCourseDesc}
        onDeleteCourse={() => handleDelete(editingId)}
      />
    </div>
  );
}

export default CourseManagement;
