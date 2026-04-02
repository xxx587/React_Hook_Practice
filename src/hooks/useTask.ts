import type { Task } from '../types/task';
import { useState, useEffect, useMemo, useCallback } from 'react';

const useTask = () => {

    const [tasks, setTasks] = useState<Task[]>(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks])

    const [inputValue, setInputValue] = useState('');

    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const filteredTasks = useMemo(() => {
        console.log('필터링 중...');
        switch (filter) {
            case 'all' : return tasks;
            case 'active' : return tasks.filter(task => !task.completed);
            case 'completed' : return tasks.filter(task => task.completed);
            default : return tasks;
        }
    }, [tasks, filter])

	const handleAdd = useCallback(
          () => {
            if (inputValue.trim() === '') {
			alert('빈 글자는 추가할 수 없습니다.');
			return;
		}

		const newTask: Task = {
			id: new Date().getTime(),
			text: inputValue,
			completed: false,
		};

		setTasks((prev) => [...prev, newTask]);

		setInputValue('');
          }, [inputValue]);


	const handleDelete = useCallback((id: number) => {
		setTasks((prev) => prev.filter((task) => task.id !== id));
	}, []);

	const handleToggle = useCallback((id: number) => {
		setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
	}, []);

    return {
        inputValue,
        setInputValue,
        tasks,
        handleAdd,
        handleDelete,
        handleToggle,
        filter,
        setFilter,
        filteredTasks
    }
}

export default useTask;