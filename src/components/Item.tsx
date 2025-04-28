import type { Item } from "../App";
import { FaTrash } from "react-icons/fa";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";

type ItemProps = {
  item: Item;
  handleClickComplete: (id: string) => void;
  handleClickDelete: (id: string) => void;
};

export default function Item({
  item,
  handleClickComplete,
  handleClickDelete,
}: ItemProps) {
  return (
    <div>
      <article className="flex w-full gap-4">
        <button onClick={() => handleClickComplete(item.id)}>
          {item.completed ? (
            <FaCheckCircle className="text-green-700 w-6 h-6" />
          ) : (
            <FaRegCircle className="text-green-700 w-6 h-6" />
          )}
        </button>
        <div className="flex-1">
          <p
            className={`${item.completed ? `text-slate-400 line-through` : ""}`}
          >
            {item.name}
          </p>
          <p className="text-sm text-slate-400">{item.quantity}</p>
        </div>
        <button onClick={() => handleClickDelete(item.id)}>
          <FaTrash 
            className="text-green-600 w-5 h-5" 
          />
        </button>
      </article>
      <hr />
    </div>
  );
}
