import { GlobalActionType, GlobalStateType } from "@/types/global";
import { CONTEXT_TYPEs } from "../types";
import { ENUMs } from "@/lib/enum";

export const globalState: GlobalStateType = {
  oldData: null,
  checked: [],
  check_type: "one",
  theme: (localStorage.getItem("theme") as "dark" | "light") || "dark",
};

export const globalReducer = (
  state: GlobalStateType = globalState,
  action: GlobalActionType
) => {
  const { type, payload } = action;
  switch (type) {
    case CONTEXT_TYPEs.SET_OLD_DATA:
      return {
        ...state,
        oldData: payload,
      };
    case CONTEXT_TYPEs.CHECK:
      var result = state.checked;
      var typee = state.check_type;
      if (payload?.length == 0) {
        result = [];
        typee = "one";
      } else {
        if (state.checked.length < ENUMs.CHECK_LIMIT) {
          if (Array.isArray(payload)) {
            //you give whole
            result = payload;
            typee = "all";
          } else {
            result.push(payload);
          }
        }
      }
      return {
        ...state,
        checked: result,
        check_type: typee,
      };
    case CONTEXT_TYPEs.UNCHECK:
      return {
        ...state,
        checked: state.checked.filter(
          (val: any, _index: number) => val != payload
        ),
      };
    case CONTEXT_TYPEs.THEME:
      return {
        ...state,
        theme: payload,
      };
    default:
      return state;
  }
};
