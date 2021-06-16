import _ from 'lodash';

function create({ id, name }) {  
  const projectList = list();
  projectList.push({ id, name });
  localStorage.setItem('$projectList', JSON.stringify(projectList));

  select(id);
}

function list() {
  const projectListStr = localStorage.getItem('$projectList');
  let projectList = [];
  if(projectListStr) {
    projectList = JSON.parse(projectListStr);
  }
  return projectList;
}

function select(id) {
  localStorage.setItem('$projectId', id);
}

function currentId() {
  return localStorage.getItem('$projectId');
}

function current() {
  const projectList = list();
  const projectId = currentId();
  return _.find(projectList, { id: projectId });
}

function update({ id, name }) {
  const projectId = currentId();
  let projectList = list();
  projectList = projectList.filter(p => p.id !== projectId);
  projectList.push({ id, name });
  localStorage.setItem('$projectList', JSON.stringify(projectList));

  select(id);
}

function delet(id) {
  localStorage.removeItem(id);
  let projectList = list();
  projectList = projectList.filter(p => p.id !== id);
  localStorage.setItem('$projectList', JSON.stringify(projectList));
}

export default {
  create,
  list,
  select,
  currentId,
  current,
  update,
  delet,
};
