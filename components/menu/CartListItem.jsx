import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import { MajCartItems } from "../../actions/cartItems.action";
import { useSelector } from "react-redux";

export default function CartListItem({ item }) {
  const product = useSelector(
    (state) => state.menu && state.menu.find((obj) => obj.id == item.product_id)
  );

  const adjustQuantityHandler = async (value) => {
    if (item.quantity == 1 && value == -1) {
      await MajCartItems("del", item);
    } else {
      await MajCartItems("edit", { ...item, quantity: item.quantity + value });
    }
  };
  return (
    <li className="flex sm:flex-col items-center p-2 border-b border-gray-300 border-opacity-30 gap-3">
      <div className="sm:self-end ring-1 ring-gray-300 ring-opacity-30 shadow-md drop-shadow-md rounded-full p-1 text-gray-400 hover:bg-gray-200 hover:text-red-500 hover:scale-105 transition-all">
        <CloseIcon
          fontSize="medium"
          onClick={async () => await MajCartItems("del", item)}
        />
      </div>
      <div className="max-w-[150px] min-w-[100px] h-30 rounded-lg overflow-hidden ">
        <img className="object-contain h-full" src={product.image} alt="" />
      </div>
      <p className="text-base font-bold text-primary flex-1 text-left md:text-center">
        {product.title}
      </p>
      <div className="flex sm:flex-col gap-3 items-center">
        <div className="flex gap-3 items-center">
          <div
            onClick={() => adjustQuantityHandler(1)}
            className="menu-counter-btn"
          >
            <AddIcon />
          </div>
          <span className="text-xl text-bold">{item.quantity}</span>
          <div
            onClick={() => adjustQuantityHandler(-1)}
            className="menu-counter-btn"
          >
            <RemoveIcon />
          </div>
        </div>
      </div>
    </li>
  );
}
