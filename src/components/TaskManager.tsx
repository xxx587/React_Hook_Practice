import useTask from '../hooks/useTask';
import TaskItem from './TaskItem';
import { useRef, useEffect } from 'react';
import TaskFilter from './TaskFilter';

const TaskManager = () => {
	const { inputValue, setInputValue, handleAdd, handleDelete, handleToggle, setFilter, filteredTasks } = useTask();
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	});
	const onAddClick = () => {
		handleAdd();
		inputRef.current?.focus();
	};

	return (
		<div>
			<h1>TaskManager</h1>
			<div>
				<input
					type='text'
					placeholder='할 일을 입력하기'
					value={inputValue}
					ref={inputRef}
					onChange={(e) => setInputValue(e.target.value)}
				></input>
				<button onClick={onAddClick}>추가</button>
			</div>
			<hr />
			<div>
				<TaskFilter setFilter={setFilter} />
			</div>
			<div>
				<ul>
					{filteredTasks.map((task) => (
						<TaskItem key={task.id} task={task} handleToggle={handleToggle} handleDelete={handleDelete} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default TaskManager;
