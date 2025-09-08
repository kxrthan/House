import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`} className="block group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow">
        {project.thumbnailUrl ? (
          <img src={project.thumbnailUrl} alt={project.title} className="h-48 w-full object-cover" />
        ) : (
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold group-hover:underline">{project.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
          <div className="mt-2 text-xs text-gray-500">{project.category || 'Uncategorized'}</div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;



