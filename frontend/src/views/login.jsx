import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const { post } = useFetch();
  const [error, setUser] = useState("");
  const nav = useNavigate()
  useEffect(() => {
    if (user) return nav("/pages");
  });
  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await post("/login", data);
    if (res.status) {
      login(res.data.data);
    } else {
      setUser(res?.message);
      console.log(error);
    }
    console.log(res);

    console.log(user);
  };
  console.log(user);

  return (
    <>
      <div class="auth-panel">
        <div class="auth-card">
          <div class="auth-card__header">
            <h1 class="auth-card__title">Sign In</h1>
            <p class="auth-card__subtitle">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={submit} class="auth-card__body">
            <div class="form-group">
              <label class="form-label" for="email">
                Email Address
              </label>
              <input
                class="form-input"
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                autocomplete="email"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="password">
                Password
              </label>
              <input
                class={`form-input form-input${error ? "--error" : ""}`}
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                autocomplete="current-password"
              />
              {error && (
                <span class="form-error">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6.5"
                      cy="6.5"
                      r="5.5"
                      stroke="#c0392b"
                      stroke-width="1.5"
                    />
                    <path
                      d="M6.5 4v3"
                      stroke="#c0392b"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                    <circle cx="6.5" cy="9" r="0.7" fill="#c0392b" />
                  </svg>
                  {error}
                </span>
              )}
            </div>

            <button class="btn btn--primary btn--full" type="submit">
              Sign In
            </button>
          </form>

          <div class="auth-card__footer">
            <span>Don't have an account?</span>
            <a href="/register">Create one</a>
          </div>
        </div>
      </div>
    </>
  );
}
