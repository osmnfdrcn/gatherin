import { IPlace } from "@/types";
import { format } from "date-fns";

interface State {
  isEditing: boolean;
  isLoading: boolean;
  date: string;
  time: string;
  duration: number;
  description: string;
  place: IPlace | null;
  error: boolean;
}

type Action =
  | { type: "SET_ISEDITING"; payload: boolean }
  | { type: "SET_ISLOADING"; payload: boolean }
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_TIME"; payload: string }
  | { type: "SET_DURATION"; payload: number }
  | { type: "SET_DESCRIPTION"; payload: string }
  | { type: "SET_PLACE"; payload: IPlace }
  | { type: "SET_ERROR"; payload: boolean };

const today = format(new Date(), "dd/MM/yyyy");

export const initialState: State = {
  isEditing: false,
  isLoading: false,
  date: today,
  time: "00:00",
  duration: 30,
  description: "",
  place: null,
  error: false,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ISEDITING":
      return { ...state, isEditing: action.payload };
    case "SET_ISLOADING":
      return { ...state, isLoading: action.payload };
    case "SET_DATE":
      return { ...state, date: action.payload };
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "SET_DURATION":
      return { ...state, duration: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
    case "SET_PLACE":
      return { ...state, place: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
