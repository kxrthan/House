import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects, isLoading, error }) => {
  if (isLoading) {
    return <div className="text-center py-10 text-gray-600">Loading projects…</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }
  if (!projects?.length) {
    return <div className="text-center py-10 text-gray-500">No projects yet</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p) => (
        <ProjectCard key={p._id} project={p} />
      ))}
    </div>
  );
};

export default ProjectList;



