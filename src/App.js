import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  onEdit = (originalTask, newTask) => {
    const tasks = [...this.state.tasks];
    const editedTaskList = tasks.map(task => {
      if (originalTask === task) {
        task=newTask;
      }
    })
    this.setState({
      tasks: editedTaskList
    });
  }

  onSubmit = (task) => {
    this.setState({
      tasks: [...this.state.tasks, task]
    });
  }

  onDelete = (index) => {
    const arr = [...this.state.tasks];
    arr.splice(index, 1);
    this.setState({tasks: arr});
  }

  render() {
    return (
      <div class="TodoList"> 
        <Submit onSubmit={this.onSubmit}></Submit>
        <List tasks={this.state.tasks} onDelete={this.onDelete} onEdit={this.onEdit}></List>
      </div>
    );
  }
}

const List = (props) => {
  const tasks = props.tasks.map((task, index) => {
    return <Task content={task} key={index} id={index} onDelete={props.onDelete} onEdit={props.onEdit}/>
  })
  
  return(
    <div>
      <ul>
        {tasks}
      </ul>
    </div>
  )
}

const Task = (props) => {
  return(
    <div class="item">
      <li>
        <p> 
          <input type="text" id={props.key} value={props.content}
          onChange= {
            (e) => {
              props.onEdit(props.content, e.target.value)
            }
          }
          />
          <span>
            <button class="delete" onClick={()=> {props.onDelete(props.id)}}>X</button>
          </span>
        </p>
      </li>
    </div>
  );
}

class Submit extends React.Component {
  state = {term: ''};

  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.term === '') return;
    this.props.onSubmit(this.state.term);
    this.setState({term: ''});
  }

  render() {
    return(
      <div>
        <form onSubmit = {this.onSubmit}>
          <input 
            placeholder="Enter task" 
            onChange={(e) => this.setState({term: e.target.value})}
            value={this.state.term} 
          />
          <button class="submit"> Add </button>
        </form>
      </div>
    )
  }
}

export default TodoList;
