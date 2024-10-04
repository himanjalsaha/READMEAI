// ParentComponent.js
import { useState } from 'react';
import Modal from './Modal'; // Adjust the import path accordingly
import GitHubRepos from './GithubRepos'; // Adjust the import path accordingly

const YourComponent = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="px-4 py-2 bg-black text-white rounded">
        Open GitHub Repositories
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <GitHubRepos />
      </Modal>
    </div>
  );
};

export default YourComponent;
