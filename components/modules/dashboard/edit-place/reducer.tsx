import { IPlace } from "@/types";
import { format } from "date-fns";

interface State {
  isLoading: boolean;
  image: string;
  bgImage: string;
  place: IPlace | null;
  error: boolean;
}

type Action =
  | { type: "SET_ISLOADING"; payload: boolean }
  | { type: "SET_IMAGE"; payload: string }
  | { type: "SET_BGIMAGE"; payload: string }
  | { type: "SET_ERROR"; payload: boolean }
  | { type: "SET_PLACE"; payload: IPlace };

const today = format(new Date(), "dd/MM/yyyy");

export const initialState: State = {
  isLoading: false,
  image: "",
  bgImage: "",
  place: null,
  error: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ISLOADING":
      return { ...state, isLoading: action.payload };
    case "SET_IMAGE":
      return { ...state, image: action.payload };
    case "SET_BGIMAGE":
      return { ...state, bgImage: action.payload };
    case "SET_PLACE":
      return { ...state, place: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
