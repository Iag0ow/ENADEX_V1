import React, { useState } from 'react';
import './CourseTable.css';

const CourseTable = ({ courses, onEdit, onDelete }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);

  const toggleCourseSelection = (id) => {
    const isSelected = selectedCourses.includes(id);
    if (isSelected) {
      setSelectedCourses(selectedCourses.filter(courseId => courseId !== id));
    } else {
      setSelectedCourses([...selectedCourses, id]);
    }
  };

  const handleEditClick = (id) => {
    onEdit(id);
  };

  const handleDeleteClick = () => {
    onDelete(selectedCourses);
    setSelectedCourses([]);
  };
  return (
    <table className="courses-table">
      <thead>
        <tr>
          <th></th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.id}>
            <td><input type="checkbox" onChange={() => toggleCourseSelection(course.id)} checked={selectedCourses.includes(course.id)} /></td>
            <td>{course.name}</td>
            <td>{course.description}</td>
            <td><button className="edit-btn" onClick={() => handleEditClick(course.id)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
};

export default CourseTable;
