import React from 'react';
import { useSelector } from 'react-redux';

const AddSkill = () => {
  const { loading, error, message } = useSelector(state => state.skill);
  return <div className="ml-[90px] mt-[10px]">AddSkill</div>;
};

export default AddSkill;
