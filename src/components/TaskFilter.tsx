interface TaskFilterProps {
	setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

const TaskFilter = ({ setFilter }: TaskFilterProps) => {
	return (
		<div>
			<button onClick={() => setFilter('all')}>전체</button>
			<button onClick={() => setFilter('active')}>미완료</button>
			<button onClick={() => setFilter('completed')}>완료</button>
		</div>
	);
};

export default TaskFilter;
