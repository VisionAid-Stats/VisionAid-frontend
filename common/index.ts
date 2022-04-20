import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

export const TOKEN_NAME = "vision_aid_session";
export const API_PATH = "https://api.visionaid-stats.com";
export const LANGUAGE_LIST = [
  {
    value: "Assamese",
    label: "Assamese",
  },
  {
    value: "Bengali",
    label: "Bengali",
  },
  {
    value: "English",
    label: "English",
  },
  {
    value: "Gujarati",
    label: "Gujarati",
  },
  {
    value: "Hindi",
    label: "Hindi",
  },
  {
    value: "Kannada",
    label: "Kannada",
  },
  {
    value: "Kashmiri",
    label: "Kashmiri",
  },
  {
    value: "Konkani",
    label: "Konkani",
  },
  {
    value: "Malayalam",
    label: "Malayalam",
  },
  {
    value: "Marathi",
    label: "Marathi",
  },
  {
    value: "Nepalese",
    label: "Nepalese",
  },
  {
    value: "Oriya",
    label: "Oriya",
  },
  {
    value: "Punjabi",
    label: "Punjabi",
  },
  {
    value: "Sanskrit",
    label: "Sanskrit",
  },
  {
    value: "Sindhi",
    label: "Sindhi",
  },
  {
    value: "Tamil",
    label: "Tamil",
  },
  {
    value: "Telugu",
    label: "Telugu",
  },
  {
    value: "Urdu",
    label: "Urdu",
  },
];

export function useSession() {
  const [cookie] = useCookies([TOKEN_NAME]);
  const session : any = cookie.vision_aid_session
    ? jwtDecode(cookie.vision_aid_session)
    : {};
  return {
    authenticated:  Object.keys(session).length !== 0,
    userId: session.user_id,
    isAdmin: session.is_admin === 1,
    name: session.name,
    email: session.email,
  }
}

export function useAuth(pageAccess : "ADMIN" | "PM" | "ALL") {
  const [cookie] = useCookies([TOKEN_NAME]);
  const session : any = cookie.vision_aid_session
    ? jwtDecode(cookie.vision_aid_session)
    : {};
  
  if (Object.keys(session).length !== 0) {
    if (session.is_admin !== 1 && pageAccess === "ADMIN") {
      window.location.href = "/";
    }
  } else {
    if (pageAccess !== "ALL") {
      window.location.href = "/";
    }
  }
}
