import React from "react";
import useAuth from "../../hooks/useAuth";

const CreateSkill = () => {
  const { user } = useAuth();

  return (
    <div>
      <div>create a new Skill</div>
      <div>
        {user?.displayName}
        <br />
        {user?.photoURL}
      </div>
    </div>
  );
};

export default CreateSkill;
