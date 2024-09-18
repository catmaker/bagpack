"use client";

import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import styles from "./index.module.scss";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todoItems, setTodoItems] = useState<string[]>([]);
  const [lastCheckedDate, setLastCheckedDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkAndLoadTodos = () => {
      const currentDate = new Date().toLocaleDateString();
      const localLastCheckedDate = localStorage.getItem("lastCheckedDate");
      const localTodo = localStorage.getItem("todo");

      if (localLastCheckedDate !== currentDate) {
        setTodoItems([]);
        localStorage.removeItem("todo");
        localStorage.setItem("lastCheckedDate", currentDate);
        setLastCheckedDate(currentDate);
      } else if (localTodo) {
        try {
          const parsedTodos = JSON.parse(localTodo);
          setTodoItems(parsedTodos);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to parse todo items:", error);
          setTodoItems([]);
          setIsLoading(false);
        }
      }
    };

    checkAndLoadTodos();

    // 1분마다 날짜 변경 확인
    const intervalId = setInterval(checkAndLoadTodos, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAddTodoLocalStorage = () => {
    if (inputValue.trim()) {
      const newTodoItems = [...todoItems, inputValue.trim()];
      setTodoItems(newTodoItems);
      localStorage.setItem("todo", JSON.stringify(newTodoItems));
      setInputValue("");
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodoItems = todoItems.filter((_, i) => i !== index);
    setTodoItems(newTodoItems);
    localStorage.setItem("todo", JSON.stringify(newTodoItems));
  };

  return (
    <div className={styles.container}>
      <h1>TODOLIST</h1>
      <p className={styles.warning}>
        주의: 이 TODOLIST는 하루 일정에 적합합니다. 날짜가 바뀌면 모든 항목이
        삭제됩니다.
      </p>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="할 일을 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className={styles.button}
              onClick={handleAddTodoLocalStorage}
            >
              추가
            </button>
          </div>
          <ul className={styles.todoList}>
            {todoItems.length > 0 ? (
              todoItems.map((item, index) => (
                <li key={`todo-${index}`} className={styles.todoItem}>
                  <span>{item}</span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteTodo(index)}
                  >
                    삭제
                  </button>
                </li>
              ))
            ) : (
              <li className={styles.emptyList}>할 일이 없습니다.</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Todo;
