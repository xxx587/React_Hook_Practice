import type { Task } from '../types/task';
import React from 'react';

interface TaskItemProps {
	task: Task;
	handleToggle: (id: number) => void;
	handleDelete: (id: number) => void;
}

const TaskItem = React.memo(({ task, handleToggle, handleDelete }: TaskItemProps) => {
	return (
		<li key={task.id}>
			<input type='checkbox' checked={task.completed} onChange={() => handleToggle(task.id)} />
			{task.id} - {task.text} - {task.completed ? '완료' : '미완료'}
			<button onClick={() => handleDelete(task.id)}>삭제</button>
		</li>
	);
});

export default TaskItem;
