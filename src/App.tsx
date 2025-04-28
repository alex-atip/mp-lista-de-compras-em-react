import { useRef, useState } from "react";
import Item from "../src/components/Item";
import { nanoid } from "nanoid";
import { FaShoppingCart } from "react-icons/fa";

export type Item = {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
};

function App() {
  const [items, setItems] = useState<Item[]>([
    {
      id: nanoid(),
      name: "Pão francês",
      quantity: "2 dúzias",
      completed: true,
    },
    {
      id: nanoid(),
      name: "Margarina",
      quantity: "1 pote de 500 gramas",
      completed: false,
    },
    {
      id: nanoid(),
      name: "Tangerinas",
      quantity: "6 unidades",
      completed: true,
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);

  const completedItems = items.filter((item) => item.completed === true);
  const notCompletedItems = items.filter((item) => item.completed !== true);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formEl = event.currentTarget;

    const formData = new FormData(formEl);

    const name = formData.get("name") as string;
    const quantity = formData.get("quantity") as string;

    const item: Item = {
      id: nanoid(),
      name,
      quantity,
      completed: false,
    };

    const newItems = [item, ...items];
    setItems(newItems);

    formEl.reset();

    inputRef.current && inputRef.current.focus();
  }

  function handleClickComplete(id: string) {
    const newItems = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }

      return item;
    });

    setItems(newItems);
  }

  function handleClickDelete(id: string) {
    const newItems = items.filter((item) => item.id !== id);

    setItems(newItems);
  }

  return (
    <main className="max-w-2xl px-6 py-12 pb-20 mx-auto my-10 bg-white md:my-20 md:px-32 md:rounded-3xl">
      <header className="text-center">
        <FaShoppingCart className="mx-auto w-14 h-14 bg-green-500 p-2 rounded" />
        <h1 className="mt-4 text-3xl font-medium font-display">
          Lista de Compras
        </h1>
        <p className="text-sm text-slate-500">
          Facilite sua ida ao supermercado!
        </p>
        <hr className="w-1/3 mx-auto mt-6 mb-8" />
      </header>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <div className="flex-shrink">
          <label htmlFor="name" className="block text-xs text-slate-400">
            Item
          </label>
          <input
            ref={inputRef}
            type="text"
            name="name"
            id="name"
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <div className="flex-shrink">
          <label htmlFor="quantity" className="block text-xs text-slate-400">
            Quantidade
          </label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            className="block w-full px-3 py-2 border rounded-lg border-slate-300 text-slate-700"
          />
        </div>
        <button className="self-end flex-shrink h-10 px-4 font-extrabold text-white rounded-lg bg-green-500">
          +
        </button>
      </form>
      <section className="mt-10 space-y-3 ">
        {notCompletedItems.map((item) => (
          <Item
            handleClickComplete={handleClickComplete}
            handleClickDelete={handleClickDelete}
            key={item.id}
            item={item}
          />
        ))}
      </section>
      <section className="mt-16 space-y-3">
        <h2 className="mb-10 text-3xl text-center font-display">
          Itens já comprados
        </h2>
        <article className="flex w-full gap-4">
          <div className="flex-1">
            {completedItems.map((item) => (
              <Item
                handleClickComplete={handleClickComplete}
                handleClickDelete={handleClickDelete}
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}

export default App;
