import React, { useState, useEffect } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  // Məlumatların Mock API-dən çəkilməsi
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Xəta baş verdi:', err));
  }, []);

  // Optimistic UI ilə Əlavə Etmə (Add)
  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const tempId = Date.now();
    const newTodo = { id: tempId, title: text, completed: false };

    // 1. Optimistic update: Server cavabını gözləmədən dərhal UI-a əlavə edirik
    setTodos((prev) => [newTodo, ...prev]);
    setText('');
    setLoading(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) throw new Error('Server xətası');
    } catch (error) {
      console.error('Serverə göndərilə bilmədi:', error);
      // Xəta olarsa, optimistik olaraq əlavə ediləni geri silirik
      setTodos((prev) => prev.filter((todo) => todo.id !== tempId));
      alert('Məlumat əlavə olunarkən xəta baş verdi!');
    } finally {
      setLoading(false);
    }
  };

  // Optimistic UI ilə Silmə (Delete)
  const deleteTodo = async (id) => {
    const previousTodos = [...todos];

    // 1. Optimistic update: Dərhal UI-dan silirik
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Silinmə xətası');
    } catch (error) {
      console.error('Silmək mümkün olmadı:', error);
      // Xəta olarsa, köhnə siyahını bərpa edirik
      setTodos(previousTodos);
      alert('Silinmə zamanı xəta baş verdi!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="p-8 max-w-md w-full bg-white rounded-lg shadow border">
        <h2 className="text-2xl font-bold mb-6">Optimistic UI & CRUD</h2>
        
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Yeni tapşırıq yazın..."
          />
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          >
            Əlavə et
          </button>
        </form>

        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center border p-3 rounded bg-gray-50">
              <span className={todo.completed ? 'line-through text-gray-400' : ''}>
                {todo.title}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer"
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
        {loading && <p className="text-xs text-gray-400 mt-4 text-center">Server ilə əlaqə saxlanılır...</p>}
      </div>
    </div>
  );
}