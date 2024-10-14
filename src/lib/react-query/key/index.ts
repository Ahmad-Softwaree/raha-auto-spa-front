export type QUERY_KEYS =
  // USERS
  | "SEARCH_USERS"
  | "USERS"
  | "DELETED_USERS"
  | "SEARCH_DELETED_USERS"
  | "USERS_SELECTION"

  //CUSTOMER
  | "CUSTOMERS"
  | "CUSTOMERS_SELECTION"
  | "DELETED_CUSTOMERS"
  | "SEARCH_DELETED_CUSTOMERS"
  | "SEARCH_CUSTOMERS"
  //EXPENSE
  | "EXPENSES"
  | "DELETED_EXPENSES"
  | "SEARCH_EXPENSES"
  | "SEARCH_DELETED_EXPENSES"
  //EXPENSE_TYPES
  | "EXPENSE_TYPES"
  | "EXPENSE_TYPES_SELECTION"
  | "DELETED_EXPENSE_TYPES"
  | "SEARCH_DELETED_EXPENSE_TYPES"
  | "SEARCH_EXPENSE_TYPES"
  //ROLES
  | "ROLES"
  | "ROLES_SELECTION"
  | "DELETED_ROLES"
  | "SEARCH_DELETED_ROLES"
  | "SEARCH_ROLES"

  //COLORS
  | "COLORS_SELECTION"
  | "COLORS"
  | "DELETED_COLORS"
  | "SEARCH_DELETED_COLORS"
  | "SEARCH_COLORS"
  //PRINTERS
  | "PRINTERS_SELECTION"
  | "PRINTERS"
  | "DELETED_PRINTERS"
  | "SEARCH_DELETED_PRINTERS"
  | "SEARCH_PRINTERS"
  //CAR_TYPES
  | "CAR_TYPES_SELECTION"
  | "CAR_TYPES"
  | "DELETED_CAR_TYPES"
  | "SEARCH_DELETED_CAR_TYPES"
  | "SEARCH_CAR_TYPES"
  //CAR_MODELS
  | "CAR_MODELS_SELECTION"
  | "CAR_MODELS"
  | "DELETED_CAR_MODELS"
  | "SEARCH_DELETED_CAR_MODELS"
  | "SEARCH_CAR_MODELS"

  //ITEM_TYPES
  | "ITEM_TYPES"
  | "ITEM_TYPES_SELECTION"
  | "DELETED_ITEM_TYPES"
  | "SEARCH_DELETED_ITEM_TYPES"
  | "SEARCH_ITEM_TYPES"
  //SERVICES
  | "SERVICES_SELECTION"
  | "SERVICES"
  | "DELETED_SERVICES"
  | "SEARCH_DELETED_SERVICES"
  | "SEARCH_SERVICES"
  //ITEMS
  | "ITEMS"
  | "LESS_ITEMS"
  | "SEARCH_LESS_ITEMS"
  | "SEARCH_ITEMS"
  | "DELETED_ITEMS"
  | "SEARCH_DELETED_ITEMS"
  | "ITEM_BY_ID"

  // SELL
  | "SELL"
  | "SELL_ITEMS"
  | "DELETED_SELL_ITEMS"
  | "SELL_PRINT"
  | "SEARCH_SELLS"
  | "SELLS"
  | "DELETED_SELLS"
  | "SEARCH_DELETED_SELLS"
  | "SELF_DELETED_SELL_ITEMS"
  | "SEARCH_SELF_DELETED_SELL_ITEMS"
  //RESERVATION
  | "PANEL_RESERVATIONS"
  | "SEARCH_RESERVATIONS"
  | "RESERVATIONS"
  | "DELETED_RESERVATIONS"
  | "SEARCH_DELETED_RESERVATIONS"
  //PART
  | "PARTS"
  | "ROLE_PARTS"
  //AUTH
  | "AUTH"
  //BACKUP
  | "BACKUPS"
  | "VULTR_BACKUPS"
  | "TABLE_NAMES"
  | "BACKUP"
  //FIREBASE
  | "FIREBASE"
  //DASHBOARD
  | "DASHBOARD"

  //REPORT
  | "SELL_REPORT"
  | "SELL_REPORT_INFORMATION"
  | "SELL_REPORT_SEARCH"
  | "SELL_REPORT_INFORMATION_SEARCH"
  | "SELL_PRINT_DATA"
  | "ITEM_REPORT"
  | "ITEM_REPORT_INFORMATION"
  | "ITEM_REPORT_SEARCH"
  | "ITEM_REPORT_INFORMATION_SEARCH"
  | "ITEM_PRINT_DATA"
  | "KOGA_ALL_REPORT"
  | "KOGA_ALL_REPORT_INFORMATION"
  | "KOGA_ALL_REPORT_SEARCH"
  | "KOGA_ALL_REPORT_INFORMATION_SEARCH"
  | "KOGA_ALL_PRINT_DATA"
  | "KOGA_NULL_REPORT"
  | "KOGA_NULL_REPORT_INFORMATION"
  | "KOGA_NULL_REPORT_SEARCH"
  | "KOGA_NULL_REPORT_INFORMATION_SEARCH"
  | "KOGA_NULL_PRINT_DATA"
  | "KOGA_LESS_REPORT"
  | "KOGA_LESS_REPORT_INFORMATION"
  | "KOGA_LESS_REPORT_SEARCH"
  | "KOGA_LESS_REPORT_INFORMATION_SEARCH"
  | "KOGA_LESS_PRINT_DATA"
  | "KOGA_MOVEMENT_REPORT"
  | "KOGA_MOVEMENT_REPORT_INFORMATION"
  | "KOGA_MOVEMENT_REPORT_SEARCH"
  | "KOGA_MOVEMENT_REPORT_INFORMATION_SEARCH"
  | "KOGA_MOVEMENT_PRINT_DATA"
  | "BILL_PROFIT_REPORT"
  | "BILL_PROFIT_REPORT_INFORMATION"
  | "BILL_PROFIT_REPORT_SEARCH"
  | "BILL_PROFIT_REPORT_INFORMATION_SEARCH"
  | "BILL_PROFIT_PRINT_DATA"
  | "ITEM_PROFIT_REPORT"
  | "ITEM_PROFIT_REPORT_INFORMATION"
  | "ITEM_PROFIT_REPORT_SEARCH"
  | "ITEM_PROFIT_REPORT_INFORMATION_SEARCH"
  | "ITEM_PROFIT_PRINT_DATA"
  | "EXPENSE_REPORT"
  | "EXPENSE_REPORT_INFORMATION"
  | "EXPENSE_REPORT_SEARCH"
  | "EXPENSE_REPORT_INFORMATION_SEARCH"
  | "EXPENSE_PRINT_DATA"
  | "CASE_REPORT"
  | "CASE_REPORT_INFORMATION"
  | "CASE_GLOBAL_DATA"
  | "CASE_REPORT_SEARCH"
  | "CASE_REPORT_INFORMATION_SEARCH"
  | "CASE_PRINT_DATA"
  | "RESERVATION_REPORT"
  | "RESERVATION_REPORT_INFORMATION"
  | "RESERVATION_REPORT_SEARCH"
  | "RESERVATION_REPORT_INFORMATION_SEARCH"
  | "RESERVATION_PRINT_DATA"

  //CONFIG
  | "CONFIGS";

export const QUERY_KEYs: { [key in QUERY_KEYS]: key } = {
  //CONFIG

  CONFIGS: "CONFIGS",

  //USER
  USERS: "USERS",
  SEARCH_USERS: "SEARCH_USERS",
  DELETED_USERS: "DELETED_USERS",
  USERS_SELECTION: "USERS_SELECTION",
  SEARCH_DELETED_USERS: "SEARCH_DELETED_USERS",
  //CUSTOMER
  CUSTOMERS_SELECTION: "CUSTOMERS_SELECTION",

  CUSTOMERS: "CUSTOMERS",
  SEARCH_CUSTOMERS: "SEARCH_CUSTOMERS",
  SEARCH_DELETED_CUSTOMERS: "SEARCH_DELETED_CUSTOMERS",
  DELETED_CUSTOMERS: "DELETED_CUSTOMERS",
  //ROLE
  ROLES: "ROLES",
  ROLES_SELECTION: "ROLES_SELECTION",
  SEARCH_ROLES: "SEARCH_ROLES",
  SEARCH_DELETED_ROLES: "SEARCH_DELETED_ROLES",
  DELETED_ROLES: "DELETED_ROLES",
  //COLOR
  COLORS_SELECTION: "COLORS_SELECTION",

  COLORS: "COLORS",
  SEARCH_COLORS: "SEARCH_COLORS",
  SEARCH_DELETED_COLORS: "SEARCH_DELETED_COLORS",
  DELETED_COLORS: "DELETED_COLORS",
  //PRINTER
  PRINTERS_SELECTION: "PRINTERS_SELECTION",

  PRINTERS: "PRINTERS",
  SEARCH_PRINTERS: "SEARCH_PRINTERS",
  SEARCH_DELETED_PRINTERS: "SEARCH_DELETED_PRINTERS",
  DELETED_PRINTERS: "DELETED_PRINTERS",
  //CAR_MODEL
  CAR_MODELS_SELECTION: "CAR_MODELS_SELECTION",

  CAR_MODELS: "CAR_MODELS",
  SEARCH_CAR_MODELS: "SEARCH_CAR_MODELS",
  SEARCH_DELETED_CAR_MODELS: "SEARCH_DELETED_CAR_MODELS",
  DELETED_CAR_MODELS: "DELETED_CAR_MODELS",
  //CAR_TYPE
  CAR_TYPES_SELECTION: "CAR_TYPES_SELECTION",

  CAR_TYPES: "CAR_TYPES",
  SEARCH_CAR_TYPES: "SEARCH_CAR_TYPES",
  SEARCH_DELETED_CAR_TYPES: "SEARCH_DELETED_CAR_TYPES",
  DELETED_CAR_TYPES: "DELETED_CAR_TYPES",
  //ITEM_TYPE
  ITEM_TYPES: "ITEM_TYPES",
  ITEM_TYPES_SELECTION: "ITEM_TYPES_SELECTION",
  LESS_ITEMS: "LESS_ITEMS",
  SEARCH_LESS_ITEMS: "SEARCH_LESS_ITEMS",
  SEARCH_ITEM_TYPES: "SEARCH_ITEM_TYPES",
  SEARCH_DELETED_ITEM_TYPES: "SEARCH_DELETED_ITEM_TYPES",
  DELETED_ITEM_TYPES: "DELETED_ITEM_TYPES",
  //SERVICE
  SERVICES_SELECTION: "SERVICES_SELECTION",

  SERVICES: "SERVICES",
  SEARCH_SERVICES: "SEARCH_SERVICES",
  SEARCH_DELETED_SERVICES: "SEARCH_DELETED_SERVICES",
  DELETED_SERVICES: "DELETED_SERVICES",
  //EXPENSE_TYPE
  EXPENSE_TYPES_SELECTION: "EXPENSE_TYPES_SELECTION",
  EXPENSE_TYPES: "EXPENSE_TYPES",
  SEARCH_EXPENSE_TYPES: "SEARCH_EXPENSE_TYPES",
  SEARCH_DELETED_EXPENSE_TYPES: "SEARCH_DELETED_EXPENSE_TYPES",
  DELETED_EXPENSE_TYPES: "DELETED_EXPENSE_TYPES",
  //EXPENSE
  EXPENSES: "EXPENSES",
  DELETED_EXPENSES: "DELETED_EXPENSES",
  SEARCH_EXPENSES: "SEARCH_EXPENSES",
  SEARCH_DELETED_EXPENSES: "SEARCH_DELETED_EXPENSES",
  //ITEMS
  ITEMS: "ITEMS",
  SEARCH_ITEMS: "SEARCH_ITEMS",
  DELETED_ITEMS: "DELETED_ITEMS",
  SEARCH_DELETED_ITEMS: "SEARCH_DELETED_ITEMS",
  ITEM_BY_ID: "ITEM_BY_ID",

  //SELL
  SELL: "SELL",
  SELL_ITEMS: "SELL_ITEMS",
  DELETED_SELL_ITEMS: "DELETED_SELL_ITEMS",

  SELL_PRINT: "SELL_PRINT",
  SELLS: "SELLS",
  SEARCH_SELLS: "SEARCH_SELLS",
  DELETED_SELLS: "DELETED_SELLS",
  SEARCH_DELETED_SELLS: "SEARCH_DELETED_SELLS",

  SELF_DELETED_SELL_ITEMS: "SELF_DELETED_SELL_ITEMS",
  SEARCH_SELF_DELETED_SELL_ITEMS: "SEARCH_SELF_DELETED_SELL_ITEMS",

  //RESERVATIONS
  PANEL_RESERVATIONS: "PANEL_RESERVATIONS",
  RESERVATIONS: "RESERVATIONS",
  SEARCH_RESERVATIONS: "SEARCH_RESERVATIONS",
  DELETED_RESERVATIONS: "DELETED_RESERVATIONS",
  SEARCH_DELETED_RESERVATIONS: "SEARCH_DELETED_RESERVATIONS",
  //PART
  ROLE_PARTS: "ROLE_PARTS",
  PARTS: "PARTS",

  //AUTH
  AUTH: "AUTH",

  //BACKUP
  BACKUPS: "BACKUPS",
  VULTR_BACKUPS: "VULTR_BACKUPS",

  TABLE_NAMES: "TABLE_NAMES",
  BACKUP: "BACKUP",
  //FIREBASE
  FIREBASE: "FIREBASE",
  //DASHBOARD
  DASHBOARD: "DASHBOARD",
  //REPORT
  SELL_REPORT: "SELL_REPORT",
  SELL_REPORT_INFORMATION: "SELL_REPORT_INFORMATION",
  SELL_REPORT_SEARCH: "SELL_REPORT_SEARCH",
  SELL_REPORT_INFORMATION_SEARCH: "SELL_REPORT_INFORMATION_SEARCH",
  SELL_PRINT_DATA: "SELL_PRINT_DATA",

  ITEM_REPORT: "ITEM_REPORT",
  ITEM_REPORT_INFORMATION: "ITEM_REPORT_INFORMATION",
  ITEM_REPORT_SEARCH: "ITEM_REPORT_SEARCH",
  ITEM_REPORT_INFORMATION_SEARCH: "ITEM_REPORT_INFORMATION_SEARCH",
  ITEM_PRINT_DATA: "ITEM_PRINT_DATA",

  KOGA_ALL_REPORT: "KOGA_ALL_REPORT",
  KOGA_ALL_REPORT_INFORMATION: "KOGA_ALL_REPORT_INFORMATION",
  KOGA_ALL_REPORT_SEARCH: "KOGA_ALL_REPORT_SEARCH",
  KOGA_ALL_REPORT_INFORMATION_SEARCH: "KOGA_ALL_REPORT_INFORMATION_SEARCH",
  KOGA_ALL_PRINT_DATA: "KOGA_ALL_PRINT_DATA",

  KOGA_NULL_REPORT: "KOGA_NULL_REPORT",
  KOGA_NULL_REPORT_INFORMATION: "KOGA_NULL_REPORT_INFORMATION",
  KOGA_NULL_REPORT_SEARCH: "KOGA_NULL_REPORT_SEARCH",
  KOGA_NULL_REPORT_INFORMATION_SEARCH: "KOGA_NULL_REPORT_INFORMATION_SEARCH",
  KOGA_NULL_PRINT_DATA: "KOGA_NULL_PRINT_DATA",

  KOGA_LESS_REPORT: "KOGA_LESS_REPORT",
  KOGA_LESS_REPORT_INFORMATION: "KOGA_LESS_REPORT_INFORMATION",
  KOGA_LESS_REPORT_SEARCH: "KOGA_LESS_REPORT_SEARCH",
  KOGA_LESS_REPORT_INFORMATION_SEARCH: "KOGA_LESS_REPORT_INFORMATION_SEARCH",
  KOGA_LESS_PRINT_DATA: "KOGA_LESS_PRINT_DATA",

  KOGA_MOVEMENT_REPORT: "KOGA_MOVEMENT_REPORT",
  KOGA_MOVEMENT_REPORT_INFORMATION: "KOGA_MOVEMENT_REPORT_INFORMATION",
  KOGA_MOVEMENT_REPORT_SEARCH: "KOGA_MOVEMENT_REPORT_SEARCH",
  KOGA_MOVEMENT_REPORT_INFORMATION_SEARCH:
    "KOGA_MOVEMENT_REPORT_INFORMATION_SEARCH",
  KOGA_MOVEMENT_PRINT_DATA: "KOGA_MOVEMENT_PRINT_DATA",

  BILL_PROFIT_REPORT: "BILL_PROFIT_REPORT",
  BILL_PROFIT_REPORT_INFORMATION: "BILL_PROFIT_REPORT_INFORMATION",
  BILL_PROFIT_REPORT_SEARCH: "BILL_PROFIT_REPORT_SEARCH",
  BILL_PROFIT_REPORT_INFORMATION_SEARCH:
    "BILL_PROFIT_REPORT_INFORMATION_SEARCH",
  BILL_PROFIT_PRINT_DATA: "BILL_PROFIT_PRINT_DATA",

  ITEM_PROFIT_REPORT: "ITEM_PROFIT_REPORT",
  ITEM_PROFIT_REPORT_INFORMATION: "ITEM_PROFIT_REPORT_INFORMATION",
  ITEM_PROFIT_REPORT_SEARCH: "ITEM_PROFIT_REPORT_SEARCH",
  ITEM_PROFIT_REPORT_INFORMATION_SEARCH:
    "ITEM_PROFIT_REPORT_INFORMATION_SEARCH",
  ITEM_PROFIT_PRINT_DATA: "ITEM_PROFIT_PRINT_DATA",

  EXPENSE_REPORT: "EXPENSE_REPORT",
  EXPENSE_REPORT_INFORMATION: "EXPENSE_REPORT_INFORMATION",
  EXPENSE_REPORT_SEARCH: "EXPENSE_REPORT_SEARCH",
  EXPENSE_REPORT_INFORMATION_SEARCH: "EXPENSE_REPORT_INFORMATION_SEARCH",
  EXPENSE_PRINT_DATA: "EXPENSE_PRINT_DATA",

  CASE_REPORT: "CASE_REPORT",
  CASE_GLOBAL_DATA: "CASE_GLOBAL_DATA",

  CASE_REPORT_INFORMATION: "CASE_REPORT_INFORMATION",
  CASE_REPORT_SEARCH: "CASE_REPORT_SEARCH",
  CASE_REPORT_INFORMATION_SEARCH: "CASE_REPORT_INFORMATION_SEARCH",
  CASE_PRINT_DATA: "CASE_PRINT_DATA",

  RESERVATION_REPORT: "RESERVATION_REPORT",
  RESERVATION_REPORT_INFORMATION: "RESERVATION_REPORT_INFORMATION",
  RESERVATION_REPORT_SEARCH: "RESERVATION_REPORT_SEARCH",
  RESERVATION_REPORT_INFORMATION_SEARCH:
    "RESERVATION_REPORT_INFORMATION_SEARCH",
  RESERVATION_PRINT_DATA: "RESERVATION_PRINT_DATA",
};
