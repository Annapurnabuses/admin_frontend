import React, { useState } from "react";
import TeamList from "../components/team/TeamList";
import TeamForm from "../components/team/TeamForm";
import RoleManager from "../components/team/RoleManager";

const TeamPage = () => {
  const [view, setView] = useState("list");
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setView("form");
  };

  const handleAddMember = () => {
    setSelectedMember(null);
    setView("form");
  };

  const handleSave = () => {
    setView("list");
    setSelectedMember(null);
  };

  const handleCancel = () => {
    setView("list");
    setSelectedMember(null);
  };

  return (
    <div>
      {view === "list" && (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
          <TeamList
            onSelectMember={handleSelectMember}
            onAddMember={handleAddMember}
          />
          <RoleManager />
        </div>
      )}

      {view === "form" && (
        <TeamForm
          member={selectedMember}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TeamPage;

// import React, { useState } from 'react';
// import TeamList from '../components/team/TeamList';
// import TeamForm from '../components/team/TeamForm';
// import RoleManager from '../components/team/RoleManager';

// const TeamPage = () => {
//   const [view, setView] = useState('list');
//   const [selectedMember, setSelectedMember] = useState(null);

//   const handleSelectMember = (member) => {
//     setSelectedMember(member);
//     setView('form');
//   };

//   const handleAddMember = () => {
//     setSelectedMember(null);
//     setView('form');
//   };

//   const handleSave = (formData) => {
//     console.log('Save team member:', formData);
//     setView('list');
//     setSelectedMember(null);
//   };

//   const handleCancel = () => {
//     setView('list');
//     setSelectedMember(null);
//   };

//   return (
//     <div>
//       {view === 'list' && (
//         <div className="space-y-6">
//           <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
//           <TeamList
//             onSelectMember={handleSelectMember}
//             onAddMember={handleAddMember}
//           />
//           <RoleManager />
//         </div>
//       )}

//       {view === 'form' && (
//         <TeamForm
//           member={selectedMember}
//           onSave={handleSave}
//           onCancel={handleCancel}
//         />
//       )}
//     </div>
//   );
// };

// export default TeamPage;
