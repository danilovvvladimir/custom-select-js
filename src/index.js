import "./index.html";
import "./index.scss";
import { Select } from "./modules/select.js";

const select = new Select("#select", {
  placeholder: "Выберите элемент",
  // selectedId: "4",
  data: [
    { id: "1", value: "React" },
    { id: "2", value: "Vue" },
    { id: "3", value: "Angular" },
    { id: "4", value: "Redux" },
    { id: "5", value: "Next.js" },
  ],
  onSelect(item) {
    console.log("Selected Item", item);
  },
});

window.s = select;
