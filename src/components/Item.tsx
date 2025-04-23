import trash from '../assets/trash.svg';
import todo from '../assets/todo.svg';
import type { Item } from '../App';

type ItemProps = {
  item: Item
};

export default function Item({item}: ItemProps) {
  return (
    <div>
      <article className="flex w-full gap-4">
        <img src={todo} alt="#" />
        <div className="flex-1">
          <p>{item.name}</p>
          <p className="text-sm text-slate-400">
            {item.quantity}
          </p>
        </div>
        <img src={trash} alt="ícone de lixeira" className="justify-self-end" />
      </article>
      <hr />
    </div>
  );
}
